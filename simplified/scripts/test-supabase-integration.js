/**
 * Test Supabase Integration
 * 
 * This script tests the integration between the fence calculator questionnaire
 * and the Supabase database by simulating user inputs and calculating costs.
 */

const { Client } = require('pg');
const util = require('util');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Simulated user inputs from the questionnaire
const userInputs = {
  // Basic Information
  totalLinearLength: '100',
  heightOfFence: '4',
  commercialOrResidential: 'Residential',
  material: 'Galvanized',
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
  gateFinish: 'Galvanized',
  gateFrameDiameter: '1 5/8',
  singleGateSize: '4ft',
  singleGateHingeType: 'Residential',
  singleGateLatchType: 'Fork Latch',
  
  // Posts
  terminalPostDiameter: '2 3/8',
  terminalPostThickness: '0.065',
  linePostDiameter: '1 3/8',
  linePostThickness: '0.065',
  cornerPostDiameter: '2 3/8',
  cornerPostThickness: '0.065',
  numberOfCorners: '2',
  
  // Additional Info
  topRailDiameter: '1 3/8',
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
    
    // Handle size calculations for posts
    if (lookupCriteria.size_calculation === 'fence_height_plus_extra') {
      const fenceHeight = parseFloat(userInputs.heightOfFence) || 0;
      const extraHeight = userInputs.hasBarbedWire ? 1 : 0;
      const totalHeight = fenceHeight + extraHeight + 2; // Add 2 feet for burial
      
      // Find the next size up for the post
      const sizesResult = await client.query(
        'SELECT DISTINCT length FROM chainlink_products WHERE type = $1 ORDER BY length',
        [productType]
      );
      
      // Find the smallest size that is >= the required total height
      let nextSizeUp = null;
      for (const sizeObj of sizesResult.rows) {
        // Convert to numeric for comparison (e.g., '10ft' -> 10)
        const size = parseFloat(sizeObj.length);
        if (size >= totalHeight) {
          nextSizeUp = sizeObj.length;
          break;
        }
      }
      
      if (nextSizeUp) {
        queryText += ` AND length = $${paramIndex}`;
        queryParams.push(nextSizeUp);
        paramIndex++;
      }
    }
    
    // Handle standard length for top rail
    if (lookupCriteria.size_calculation === 'standard_length') {
      // Top rails typically come in standard lengths (e.g., 21ft)
      queryText += ` AND length = $${paramIndex}`;
      queryParams.push('21ft');
      paramIndex++;
    }
    
    // Handle height field for mesh
    if (lookupCriteria.height_field && userInputs[lookupCriteria.height_field]) {
      const height = userInputs[lookupCriteria.height_field];
      queryText += ` AND height = $${paramIndex}`;
      queryParams.push(`${height}ft`);
      paramIndex++;
    }
    
    // Handle size field for gates
    if (lookupCriteria.size_field && userInputs[lookupCriteria.size_field]) {
      const size = userInputs[lookupCriteria.size_field];
      queryText += ` AND size = $${paramIndex}`;
      queryParams.push(size);
      paramIndex++;
    }
    
    // Execute the query
    try {
      const result = await client.query(queryText, queryParams);
      
      if (result.rows.length > 0) {
        products.push({
          ...result.rows[0],
          relationship: relationship
        });
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
    
    cost += (product.price || 0) * quantity;
  }
  
  return cost;
}

// Main function
async function main() {
  console.log('Starting Supabase integration test...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Get triggered formulas
    const triggeredFormulaIds = await getTriggeredFormulas(client, userInputs);
    console.log('Triggered formula IDs:', triggeredFormulaIds);
    
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
      const formulaCost = calculateBasicCost(formulaId, products, userInputs);
      
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
          console.log(`  - SKU: ${product.sku}, Type: ${product.type}, Material: ${product.material}, Price: $${product.price}`);
          console.log(`    Specs: ${product.diameter || ''} ${product.thickness || ''} ${product.size || ''} ${product.length || ''} ${product.height || ''}`);
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
    
    // Print detailed breakdown
    console.log('\n=== DETAILED BREAKDOWN ===');
    console.log(util.inspect(breakdown, { depth: null, colors: true }));
    
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
