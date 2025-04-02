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
    formula: 'Number of corners × (post price + dome cap price)',
    calculation_details: {
      quantity_calculation: 'Number of corners specified by the user',
      price_calculation: 'Post price × quantity + dome cap price × quantity'
    },
    questionnaire_trigger: 'When user specifies number of corners greater than 0'
  },
  {
    id: 'top_rail',
    name: 'Top Rail',
    category: 'rails',
    description: 'Top rail runs along the top of the fence to provide stability and support for the mesh.',
    formula: 'Total linear length ÷ standard rail length (21ft), rounded up',
    calculation_details: {
      quantity_calculation: 'Total linear length ÷ standard rail length (21ft), rounded up',
      price_calculation: 'Rail price × quantity + rail end price × 2 + rail clamp price × (line post quantity)'
    },
    questionnaire_trigger: 'When user specifies fence height and length'
  },
  {
    id: 'mesh',
    name: 'Chain Link Mesh',
    category: 'fabric',
    description: 'Chain link mesh is the fabric that makes up the body of the fence.',
    formula: 'Total linear length ÷ standard roll length (50ft), rounded up',
    calculation_details: {
      quantity_calculation: 'Total linear length ÷ standard roll length (50ft), rounded up',
      price_calculation: 'Mesh price × quantity'
    },
    questionnaire_trigger: 'When user specifies fence height and length'
  },
  {
    id: 'concrete',
    name: 'Concrete',
    category: 'materials',
    description: 'Concrete is used to secure posts in the ground.',
    formula: 'Total number of posts × concrete per post',
    calculation_details: {
      quantity_calculation: 'Total number of posts × concrete per post',
      price_calculation: 'Concrete price × quantity'
    },
    questionnaire_trigger: 'When user specifies any post quantity'
  },
  {
    id: 'sliding_gates',
    name: 'Sliding Gates',
    category: 'gates',
    description: 'Sliding gates slide horizontally on a track instead of swinging open.',
    formula: 'Number of sliding gates × base price × commercial factor × height factor × size factor',
    calculation_details: {
      quantity_calculation: 'Number of sliding gates specified by the user',
      price_calculation: 'Gate price × quantity + track price × quantity + hardware price × quantity'
    },
    questionnaire_trigger: 'When user specifies number of sliding gates greater than 0'
  },
  {
    id: 'single_gates',
    name: 'Single Gates',
    category: 'gates',
    description: 'Single gates are the most common type of gate used in chain link fence installations.',
    formula: 'Number of single gates × base price × commercial factor × height factor × size factor',
    calculation_details: {
      quantity_calculation: 'Number of single gates specified by the user',
      price_calculation: 'Gate frame price + hinges price + latch price'
    },
    questionnaire_trigger: 'When user specifies number of single gates greater than 0'
  },
  {
    id: 'double_gates',
    name: 'Double Gates',
    category: 'gates',
    description: 'Double gates consist of two gate leaves that meet in the middle.',
    formula: 'Number of double gates × base price × commercial factor × height factor × size factor',
    calculation_details: {
      quantity_calculation: 'Number of double gates specified by the user',
      price_calculation: 'Gate frame price × 2 + hinges price × 2 + latch price + drop rod price'
    },
    questionnaire_trigger: 'When user specifies number of double gates greater than 0'
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
           SET name = $1, category = $2, description = $3, calculation_details = $4, formula = $5, questionnaire_trigger = $6
           WHERE id = $7`,
          [
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.formula,
            formula.questionnaire_trigger,
            formula.id
          ]
        );
      } else {
        console.log(`Adding new formula: ${formula.id}`);
        
        // Insert new formula
        await client.query(
          `INSERT INTO material_formulas 
           (id, name, category, description, calculation_details, formula, questionnaire_trigger)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            formula.id,
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.formula,
            formula.questionnaire_trigger
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
      } else if (formula.id === 'single_gates') {
        // Add single_gates -> gate_frame relationship
        await addFormulaProductRelationship(client, 'single_gates', 'gate_frame', {
          criteria: [
            { field: 'material', param: 'gateFinish' },
            { field: 'diameter', param: 'gateFrameDiameter' }
          ],
          size_field: 'singleGateSize',
          height_field: 'heightOfFence'
        });
        
        // Add single_gates -> gate_hinge relationship
        await addFormulaProductRelationship(client, 'single_gates', 'gate_hinge', {
          criteria: [
            { field: 'material', param: 'gateFinish' }
          ]
        });
        
        // Add single_gates -> gate_latch relationship
        await addFormulaProductRelationship(client, 'single_gates', 'gate_latch', {
          criteria: [
            { field: 'material', param: 'gateFinish' }
          ]
        });
      } else if (formula.id === 'double_gates') {
        // Add double_gates -> gate_frame relationship
        await addFormulaProductRelationship(client, 'double_gates', 'gate_frame', {
          criteria: [
            { field: 'material', param: 'gateFinish' },
            { field: 'diameter', param: 'gateFrameDiameter' }
          ],
          size_field: 'doubleGateSize',
          height_field: 'heightOfFence'
        });
        
        // Add double_gates -> gate_hinge relationship
        await addFormulaProductRelationship(client, 'double_gates', 'gate_hinge', {
          criteria: [
            { field: 'material', param: 'gateFinish' }
          ]
        });
        
        // Add double_gates -> gate_latch relationship
        await addFormulaProductRelationship(client, 'double_gates', 'gate_latch', {
          criteria: [
            { field: 'material', param: 'gateFinish' }
          ]
        });
        
        // Add double_gates -> drop_rod relationship
        await addFormulaProductRelationship(client, 'double_gates', 'drop_rod', {
          criteria: [
            { field: 'material', param: 'gateFinish' }
          ]
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
