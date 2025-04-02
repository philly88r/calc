/**
 * Test Supabase Integration (Fixed)
 * 
 * This script tests the integration between the fence calculator questionnaire
 * and the Supabase database by simulating user inputs and calculating costs.
 * Updated with correct values that match the database.
 */

const { Client } = require('pg');
const util = require('util');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Simulated user inputs from the questionnaire - UPDATED with values that match the database
const userInputs = {
  // Basic Information
  totalLinearLength: '100',
  heightOfFence: '4',
  commercialOrResidential: 'Residential',
  material: 'Galv', // Changed from 'Galvanized' to 'Galv'
  meshType: '9 gauge',
  meshFold: 'Knuckle/Knuckle',
  concreteType: 'Premix',
  
  // Pull Section
  numberOfPulls: '2',
  
  // Gates
  numberOfSingleGates: '1',
  numberOfDoubleGates: '0',
  numberOfSlidingGates: '0',
  hasDuckbillGateStop: false,
  gateType: 'Chain Link',
  gateCommercialResidential: 'Residential',
  gateBarbed: false,
  gateFinish: 'Galv', // Changed from 'Galvanized' to 'Galv'
  gateFrameDiameter: '1 5/8',
  singleGateSize: '4ft',
  singleGateHingeType: 'Residential',
  singleGateLatchType: 'Fork Latch',
  
  // Posts
  terminalPostDiameter: '2 3/8',
  terminalPostThickness: 'SCH 20', // Updated to match available thickness
  linePostDiameter: '1 5/8',  // Changed to match available diameter
  linePostThickness: '0.065',
  cornerPostDiameter: '2 3/8',
  cornerPostThickness: 'SCH 20', // Updated to match available thickness
  numberOfCorners: '2',
  
  // Additional Info
  topRailDiameter: '1 5/8', // Changed to match available diameter
  topRailThickness: '0.065',
  hasBarbedWire: false,
  
  // Extra Work
  hasClearing: false,
  hasRockDrilling: false
};

// Function to get triggered formulas
async function getTriggeredFormulas(client, userInputs) {
  console.log('Getting triggered formulas...');
  
  // Get all questions from the questionnaire
  const questionsResult = await client.query('SELECT * FROM questionnaire');
  const questions = questionsResult.rows;
  
  // Collect all triggered formula IDs
  const triggeredFormulaIds = new Set();
  
  for (const question of questions) {
    const fieldName = question.field_name;
    const userValue = userInputs[fieldName];
    
    // Skip if user hasn't provided a value for this field
    if (userValue === undefined || userValue === null || userValue === '') {
      continue;
    }
    
    // For boolean fields, only consider true values as triggers
    if (question.field_type === 'boolean' && userValue !== true) {
      continue;
    }
    
    // For number fields, only consider values > 0 as triggers
    if (question.field_type === 'number' && parseFloat(userValue) <= 0) {
      continue;
    }
    
    // Check if this question triggers any formulas
    if (question.triggers && question.triggers.formulas) {
      for (const formulaId of question.triggers.formulas) {
        triggeredFormulaIds.add(formulaId);
      }
    }
  }
  
  return Array.from(triggeredFormulaIds);
}

// Function to get formula by ID
async function getFormulaById(client, formulaId) {
  const result = await client.query(
    'SELECT * FROM material_formulas WHERE id = $1',
    [formulaId]
  );
  
  return result.rows.length > 0 ? result.rows[0] : null;
}

// Function to get formula-product relationships
async function getFormulaProducts(client, formulaId) {
  const result = await client.query(
    'SELECT * FROM formula_products WHERE formula_id = $1',
    [formulaId]
  );
  
  return result.rows;
}

// Function to find products for a formula
async function findProductsForFormula(client, formulaId, userInputs) {
  // Get formula-product relationships
  const relationships = await getFormulaProducts(client, formulaId);
  
  // Find products for each relationship
  const products = [];
  for (const relationship of relationships) {
    const lookupCriteria = relationship.lookup_criteria;
    const productType = relationship.product_type;
    
    // Build the query based on lookup criteria
    let queryText = 'SELECT * FROM chainlink_products WHERE type = $1';
    const queryParams = [productType];
    let paramIndex = 2;
    
    // Apply criteria filters
    if (lookupCriteria.criteria && Array.isArray(lookupCriteria.criteria)) {
      for (const criterion of lookupCriteria.criteria) {
        const { field, param } = criterion;
        const value = userInputs[param];
        
        if (value) {
          queryText += ` AND ${field} = $${paramIndex}`;
          queryParams.push(value);
          paramIndex++;
        }
      }
    }
    
    // Debug query
    console.log(`Query for ${productType}:`, queryText);
    console.log('Query params:', queryParams);
    
    // Execute the query
    try {
      const result = await client.query(queryText, queryParams);
      console.log(`Found ${result.rows.length} ${productType} products`);
      
      if (result.rows.length > 0) {
        // Add the first matching product
        products.push({
          ...result.rows[0],
          relationship: relationship
        });
      } else {
        // If no exact match, try a more relaxed query
        console.log(`No exact match found for ${productType}, trying relaxed query...`);
        
        // Start with just the product type
        let relaxedQuery = 'SELECT * FROM chainlink_products WHERE type = $1';
        const relaxedParams = [productType];
        
        // Add material if available
        if (userInputs.material) {
          relaxedQuery += ' AND material = $2';
          relaxedParams.push(userInputs.material);
        }
        
        // Execute the relaxed query
        const relaxedResult = await client.query(relaxedQuery, relaxedParams);
        console.log(`Found ${relaxedResult.rows.length} ${productType} products with relaxed query`);
        
        if (relaxedResult.rows.length > 0) {
          products.push({
            ...relaxedResult.rows[0],
            relationship: relationship,
            note: 'Found with relaxed query'
          });
        }
      }
    } catch (error) {
      console.error(`Error finding product of type ${productType}:`, error);
    }
  }
  
  return products;
}

// Function to calculate basic costs for a formula
function calculateBasicCost(formulaId, products, userInputs) {
  let cost = 0;
  
  // Calculate quantity based on formula type
  for (const product of products) {
    let quantity = 1;
    
    switch (formulaId) {
      case 'line_posts':
        // Line posts are typically spaced 10 feet apart
        quantity = Math.ceil(parseFloat(userInputs.totalLinearLength) / 10);
        break;
      case 'terminal_posts':
        // Terminal posts are at the beginning and end of each pull section
        quantity = (parseInt(userInputs.numberOfPulls) || 0) * 2;
        break;
      case 'corner_posts':
        // Corner posts are at each corner
        quantity = parseInt(userInputs.numberOfCorners) || 0;
        break;
      case 'top_rail':
        // Top rail runs the entire length, comes in 21ft sections
        quantity = Math.ceil(parseFloat(userInputs.totalLinearLength) / 21);
        break;
      case 'mesh':
        // Mesh is sold in 50ft rolls
        quantity = Math.ceil(parseFloat(userInputs.totalLinearLength) / 50);
        break;
      case 'single_gates':
        quantity = parseInt(userInputs.numberOfSingleGates) || 0;
        break;
      case 'double_gates':
        quantity = parseInt(userInputs.numberOfDoubleGates) || 0;
        break;
      case 'sliding_gates':
        quantity = parseInt(userInputs.numberOfSlidingGates) || 0;
        break;
      default:
        quantity = 1;
    }
    
    const productCost = (product.price || 0) * quantity;
    cost += productCost;
    
    console.log(`  - ${product.sku || 'No SKU'}: ${quantity} x $${product.price || 0} = $${productCost.toFixed(2)}`);
  }
  
  return cost;
}

// Main function
async function main() {
  console.log('Starting Supabase integration test (FIXED)...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // First, check what products are available
    console.log('\nChecking available products...');
    
    // Check posts
    const postsQuery = await client.query("SELECT id, sku, material, type, diameter, thickness, length, price FROM chainlink_products WHERE type = 'post' LIMIT 10");
    console.log(`Available posts (${postsQuery.rows.length} found):`);
    postsQuery.rows.forEach(post => {
      console.log(`  - ${post.sku}: ${post.material} ${post.diameter} ${post.thickness} ${post.length} $${post.price}`);
    });
    
    // Check mesh
    const meshQuery = await client.query("SELECT id, sku, material, type, height, price FROM chainlink_products WHERE type = 'mesh' LIMIT 10");
    console.log(`\nAvailable mesh (${meshQuery.rows.length} found):`);
    meshQuery.rows.forEach(mesh => {
      console.log(`  - ${mesh.sku}: ${mesh.material} ${mesh.height} $${mesh.price}`);
    });
    
    // Get triggered formulas
    const triggeredFormulaIds = await getTriggeredFormulas(client, userInputs);
    console.log('\nTriggered formula IDs:', triggeredFormulaIds);
    
    // Calculate cost for each formula
    const breakdown = [];
    let totalCost = 0;
    
    for (const formulaId of triggeredFormulaIds) {
      // Get the formula
      const formula = await getFormulaById(client, formulaId);
      if (!formula) {
        console.log(`Formula ${formulaId} not found in database.`);
        continue;
      }
      
      console.log(`\nProcessing formula: ${formula.name} (${formulaId})`);
      
      // Find products for this formula
      const products = await findProductsForFormula(client, formulaId, userInputs);
      console.log(`Found ${products.length} products for formula ${formulaId}`);
      
      // Calculate basic cost
      console.log('Calculating cost:');
      const formulaCost = calculateBasicCost(formulaId, products, userInputs);
      console.log(`Total cost for ${formula.name}: $${formulaCost.toFixed(2)}`);
      
      // Add to breakdown
      breakdown.push({
        id: formulaId,
        name: formula.name,
        description: formula.description,
        cost: formulaCost,
        products: products
      });
      
      // Add to total
      totalCost += formulaCost;
      
      // Print product details
      if (products.length > 0) {
        console.log('Products:');
        for (const product of products) {
          console.log(`  - SKU: ${product.sku || 'No SKU'}, Type: ${product.type}, Material: ${product.material}, Price: $${product.price || 0}`);
          console.log(`    Specs: ${product.diameter || ''} ${product.thickness || ''} ${product.size || ''} ${product.length || ''} ${product.height || ''}`);
          if (product.note) {
            console.log(`    Note: ${product.note}`);
          }
        }
      } else {
        console.log('No products found for this formula.');
      }
    }
    
    // Print cost breakdown
    console.log('\n=== COST BREAKDOWN ===');
    console.log(`Total Cost: $${totalCost.toFixed(2)}`);
    console.log('\nBreakdown by Material:');
    
    for (const item of breakdown) {
      console.log(`${item.name}: $${item.cost.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('\nClosing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
