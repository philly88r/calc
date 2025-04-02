/**
 * Add Missing Formulas to Supabase
 * 
 * This script adds the missing formula types to the Supabase database
 * that were identified during testing.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Missing formulas to add
const missingFormulas = [
  {
    id: 'corner_posts',
    name: 'Corner Posts',
    category: 'posts',
    description: 'Corner posts are used at corners of the fence to provide stability and support.',
    calculation_details: {
      quantity_calculation: 'Number of corners specified by the user',
      price_calculation: 'Post price × quantity + dome cap price × quantity'
    },
    calculation_function: `
      // Calculate the cost of corner posts
      const quantity = parseInt(params.numberOfCorners) || 0;
      let cost = 0;
      
      // Add cost of posts
      const cornerPost = products.find(p => p.type === 'post');
      if (cornerPost) {
        cost += cornerPost.price * quantity;
      }
      
      // Add cost of dome caps
      const domeCap = products.find(p => p.type === 'dome_cap');
      if (domeCap) {
        cost += domeCap.price * quantity;
      }
      
      return cost;
    `
  },
  {
    id: 'top_rail',
    name: 'Top Rail',
    category: 'rails',
    description: 'Top rail runs along the top of the fence to provide stability and support for the mesh.',
    calculation_details: {
      quantity_calculation: 'Total linear length ÷ standard rail length (21ft), rounded up',
      price_calculation: 'Rail price × quantity + rail end price × 2 + rail clamp price × (line post quantity)'
    },
    calculation_function: `
      // Calculate the cost of top rail
      const linearLength = parseFloat(params.totalLinearLength) || 0;
      const railLength = 21; // Standard rail length in feet
      const quantity = Math.ceil(linearLength / railLength);
      let cost = 0;
      
      // Add cost of rails
      const topRail = products.find(p => p.type === 'post' && p.diameter === params.topRailDiameter);
      if (topRail) {
        cost += topRail.price * quantity;
      }
      
      // Add cost of rail ends (2 per fence)
      const railEnd = products.find(p => p.type === 'rail_end');
      if (railEnd) {
        cost += railEnd.price * 2;
      }
      
      // Add cost of rail clamps (1 per line post)
      const railClamp = products.find(p => p.type === 'rail_clamp');
      const linePostQuantity = Math.ceil(linearLength / 10); // Line posts every 10 feet
      if (railClamp) {
        cost += railClamp.price * linePostQuantity;
      }
      
      return cost;
    `
  },
  {
    id: 'mesh',
    name: 'Chain Link Mesh',
    category: 'fabric',
    description: 'Chain link mesh is the fabric that makes up the body of the fence.',
    calculation_details: {
      quantity_calculation: 'Total linear length ÷ standard roll length (50ft), rounded up',
      price_calculation: 'Mesh price × quantity'
    },
    calculation_function: `
      // Calculate the cost of mesh
      const linearLength = parseFloat(params.totalLinearLength) || 0;
      const rollLength = 50; // Standard roll length in feet
      const quantity = Math.ceil(linearLength / rollLength);
      let cost = 0;
      
      // Add cost of mesh
      const mesh = products.find(p => p.type === 'mesh');
      if (mesh) {
        cost += mesh.price * quantity;
      }
      
      return cost;
    `
  },
  {
    id: 'concrete',
    name: 'Concrete',
    category: 'materials',
    description: 'Concrete is used to secure posts in the ground.',
    calculation_details: {
      quantity_calculation: 'Total number of posts × concrete per post',
      price_calculation: 'Concrete price × quantity'
    },
    calculation_function: `
      // Calculate the cost of concrete
      const linearLength = parseFloat(params.totalLinearLength) || 0;
      const linePostQuantity = Math.ceil(linearLength / 10); // Line posts every 10 feet
      const terminalPostQuantity = (parseInt(params.numberOfPulls) || 0) * 2;
      const cornerPostQuantity = parseInt(params.numberOfCorners) || 0;
      const gatePostQuantity = (parseInt(params.numberOfSingleGates) || 0) * 2 + 
                              (parseInt(params.numberOfDoubleGates) || 0) * 2 +
                              (parseInt(params.numberOfSlidingGates) || 0) * 2;
      
      const totalPosts = linePostQuantity + terminalPostQuantity + cornerPostQuantity + gatePostQuantity;
      
      // Concrete per post in cubic feet
      const concretePerPost = 0.25; // 1/4 cubic foot per post
      
      // Concrete price per cubic foot
      const concretePrice = params.concreteType === 'Premix' ? 150 : 5.50;
      
      // Total concrete needed
      const totalConcrete = totalPosts * concretePerPost;
      
      // Calculate cost
      const cost = totalConcrete * concretePrice;
      
      return cost;
    `
  },
  {
    id: 'sliding_gates',
    name: 'Sliding Gates',
    category: 'gates',
    description: 'Sliding gates slide horizontally on a track instead of swinging open.',
    calculation_details: {
      quantity_calculation: 'Number of sliding gates specified by the user',
      price_calculation: 'Gate price × quantity + track price × quantity + hardware price × quantity'
    },
    calculation_function: `
      // Calculate the cost of sliding gates
      const quantity = parseInt(params.numberOfSlidingGates) || 0;
      
      // Base price for sliding gate
      const basePrice = 450;
      
      // Additional cost for commercial vs residential
      const commercialFactor = params.gateCommercialResidential === 'Commercial' ? 1.5 : 1;
      
      // Additional cost for height
      const heightFactor = parseFloat(params.heightOfFence) > 6 ? 1.25 : 1;
      
      // Additional cost for size
      const sizeFactors = {
        '10ft': 1,
        '12ft': 1.2,
        '14ft': 1.4,
        '16ft': 1.6,
        '18ft': 1.8,
        '20ft': 2
      };
      
      const sizeFactor = sizeFactors[params.slidingGateSize] || 1;
      
      // Calculate total cost
      const cost = basePrice * quantity * commercialFactor * heightFactor * sizeFactor;
      
      return cost;
    `
  }
];

// Main function
async function main() {
  console.log('Starting to add missing formulas to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each missing formula
    console.log('Adding missing formulas...');
    
    for (const formula of missingFormulas) {
      // Check if formula already exists
      const checkResult = await client.query(
        'SELECT id FROM material_formulas WHERE id = $1',
        [formula.id]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`Formula ${formula.id} already exists, updating...`);
        
        // Update existing formula
        await client.query(
          `UPDATE material_formulas 
           SET name = $1, category = $2, description = $3, calculation_details = $4, calculation_function = $5
           WHERE id = $6`,
          [
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.calculation_function,
            formula.id
          ]
        );
      } else {
        console.log(`Adding new formula: ${formula.id}`);
        
        // Insert new formula
        await client.query(
          `INSERT INTO material_formulas 
           (id, name, category, description, calculation_details, calculation_function)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            formula.id,
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.calculation_function
          ]
        );
      }
      
      // Add formula-product relationships if they don't exist
      if (formula.id === 'corner_posts') {
        // Add corner_posts -> post relationship
        await addFormulaProductRelationship(client, 'corner_posts', 'post', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'thickness', param: 'cornerPostThickness' },
            { field: 'diameter', param: 'cornerPostDiameter' }
          ],
          size_calculation: 'fence_height_plus_extra'
        });
        
        // Add corner_posts -> dome_cap relationship
        await addFormulaProductRelationship(client, 'corner_posts', 'dome_cap', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'diameter', param: 'cornerPostDiameter' }
          ]
        });
      } else if (formula.id === 'top_rail') {
        // Add top_rail -> post relationship (for the rail itself)
        await addFormulaProductRelationship(client, 'top_rail', 'post', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'thickness', param: 'topRailThickness' },
            { field: 'diameter', param: 'topRailDiameter' }
          ],
          size_calculation: 'standard_length'
        });
        
        // Add top_rail -> rail_end relationship
        await addFormulaProductRelationship(client, 'top_rail', 'rail_end', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'diameter', param: 'topRailDiameter' }
          ]
        });
        
        // Add top_rail -> rail_clamp relationship
        await addFormulaProductRelationship(client, 'top_rail', 'rail_clamp', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'diameter', param: 'topRailDiameter' }
          ]
        });
      } else if (formula.id === 'mesh') {
        // Add mesh -> mesh relationship
        await addFormulaProductRelationship(client, 'mesh', 'mesh', {
          criteria: [
            { field: 'material', param: 'material' },
            { field: 'type', param: 'meshType' }
          ],
          height_field: 'heightOfFence'
        });
      } else if (formula.id === 'sliding_gates') {
        // Add sliding_gates -> gate_frame relationship
        await addFormulaProductRelationship(client, 'sliding_gates', 'gate_frame', {
          criteria: [
            { field: 'material', param: 'gateFinish' },
            { field: 'diameter', param: 'gateFrameDiameter' }
          ],
          size_field: 'slidingGateSize',
          height_field: 'heightOfFence'
        });
      }
    }
    
    // Verify the formulas were added
    const countResult = await client.query('SELECT COUNT(*) FROM material_formulas');
    
    console.log(`Total formulas in database: ${countResult.rows[0].count}`);
    console.log('Missing formulas added successfully!');
    
  } catch (error) {
    console.error('Error adding missing formulas:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('Closing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Helper function to add formula-product relationship
async function addFormulaProductRelationship(client, formulaId, productType, lookupCriteria) {
  try {
    // Check if relationship already exists
    const checkResult = await client.query(
      'SELECT id FROM formula_products WHERE formula_id = $1 AND product_type = $2',
      [formulaId, productType]
    );
    
    if (checkResult.rows.length > 0) {
      console.log(`Relationship ${formulaId} -> ${productType} already exists, updating...`);
      
      // Update existing relationship
      await client.query(
        `UPDATE formula_products 
         SET lookup_criteria = $1, updated_at = now()
         WHERE formula_id = $2 AND product_type = $3`,
        [
          JSON.stringify(lookupCriteria),
          formulaId,
          productType
        ]
      );
    } else {
      console.log(`Adding new relationship: ${formulaId} -> ${productType}`);
      
      // Insert new relationship
      await client.query(
        `INSERT INTO formula_products 
         (formula_id, product_type, lookup_criteria)
         VALUES ($1, $2, $3)`,
        [
          formulaId,
          productType,
          JSON.stringify(lookupCriteria)
        ]
      );
    }
    
    return true;
  } catch (error) {
    console.error(`Error adding relationship ${formulaId} -> ${productType}:`, error);
    return false;
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
