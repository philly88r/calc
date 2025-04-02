/**
 * PostgreSQL Create Formula Products Relationship Table
 * 
 * This script creates a formula_products table in the Supabase database
 * that connects material formulas with product types, allowing for efficient
 * lookups based on formula IDs and product types.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Function to create the formula_products table
async function createFormulaProductsTable(client) {
  console.log('Creating formula_products table...');
  
  const createTableSql = `
    -- Drop the table if it exists to start fresh
    DROP TABLE IF EXISTS formula_products;

    -- Create the formula_products table
    CREATE TABLE formula_products (
      id SERIAL PRIMARY KEY,
      formula_id TEXT NOT NULL,
      product_type TEXT NOT NULL,
      lookup_criteria JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
      
      -- Create a unique constraint on formula_id and product_type
      CONSTRAINT unique_formula_product UNIQUE (formula_id, product_type)
    );

    -- Create indexes for faster lookups
    CREATE INDEX idx_formula_products_formula_id ON formula_products(formula_id);
    CREATE INDEX idx_formula_products_product_type ON formula_products(product_type);
  `;
  
  try {
    await client.query(createTableSql);
    console.log('Successfully created formula_products table');
    return true;
  } catch (error) {
    console.error('Error creating formula_products table:', error);
    return false;
  }
}

// Function to populate the formula_products table with relationships
async function populateFormulaProductsTable(client) {
  console.log('Populating formula_products table with relationships...');
  
  // Define the relationships between formulas and products
  const relationships = [
    // Line Posts
    {
      formula_id: 'line_posts',
      product_type: 'post',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'thickness', param: 'linePostThickness' },
          { field: 'diameter', param: 'linePostDiameter' }
        ],
        size_calculation: 'fence_height_plus_extra'
      }
    },
    
    // Terminal Posts
    {
      formula_id: 'terminal_posts',
      product_type: 'post',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'thickness', param: 'terminalPostThickness' },
          { field: 'diameter', param: 'terminalPostDiameter' }
        ],
        size_calculation: 'fence_height_plus_extra'
      }
    },
    
    // Corner Posts
    {
      formula_id: 'corner_posts',
      product_type: 'post',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'thickness', param: 'cornerPostThickness' },
          { field: 'diameter', param: 'cornerPostDiameter' }
        ],
        size_calculation: 'fence_height_plus_extra'
      }
    },
    
    // Top Rail
    {
      formula_id: 'top_rail',
      product_type: 'post',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'thickness', param: 'topRailThickness' },
          { field: 'diameter', param: 'topRailDiameter' }
        ],
        size_calculation: 'standard_length'
      }
    },
    
    // Mesh/Fabric
    {
      formula_id: 'mesh',
      product_type: 'mesh',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'type', param: 'meshType' }
        ],
        height_field: 'heightOfFence'
      }
    },
    
    // Tension Bands
    {
      formula_id: 'terminal_posts',
      product_type: 'tension_band',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'terminalPostDiameter' }
        ]
      }
    },
    
    // Brace Bands
    {
      formula_id: 'terminal_posts',
      product_type: 'brace_band',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'terminalPostDiameter' }
        ]
      }
    },
    
    // Dome Caps
    {
      formula_id: 'terminal_posts',
      product_type: 'dome_cap',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'terminalPostDiameter' }
        ]
      }
    },
    
    {
      formula_id: 'line_posts',
      product_type: 'dome_cap',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'linePostDiameter' }
        ]
      }
    },
    
    {
      formula_id: 'corner_posts',
      product_type: 'dome_cap',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'cornerPostDiameter' }
        ]
      }
    },
    
    // Rail End Caps
    {
      formula_id: 'top_rail',
      product_type: 'rail_end',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'topRailDiameter' }
        ]
      }
    },
    
    // Rail Clamps
    {
      formula_id: 'top_rail',
      product_type: 'rail_clamp',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'diameter', param: 'topRailDiameter' }
        ]
      }
    },
    
    // Single Gates
    {
      formula_id: 'single_gates',
      product_type: 'gate_frame',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'diameter', param: 'gateFrameDiameter' }
        ],
        size_field: 'singleGateSize',
        height_field: 'heightOfFence'
      }
    },
    
    // Double Gates
    {
      formula_id: 'double_gates',
      product_type: 'gate_frame',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'diameter', param: 'gateFrameDiameter' }
        ],
        size_field: 'doubleGateSize',
        height_field: 'heightOfFence'
      }
    },
    
    // Gate Hinges
    {
      formula_id: 'single_gates',
      product_type: 'gate_hinge',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'type', param: 'singleGateHingeType' }
        ]
      }
    },
    
    {
      formula_id: 'double_gates',
      product_type: 'gate_hinge',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'type', param: 'doubleGateHingeType' }
        ]
      }
    },
    
    // Gate Latches
    {
      formula_id: 'single_gates',
      product_type: 'gate_latch',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'type', param: 'singleGateLatchType' }
        ]
      }
    },
    
    {
      formula_id: 'double_gates',
      product_type: 'gate_latch',
      lookup_criteria: {
        criteria: [
          { field: 'material', param: 'gateFinish' },
          { field: 'type', param: 'doubleGateLatchType' }
        ]
      }
    }
  ];
  
  // Insert each relationship into the formula_products table
  for (const relationship of relationships) {
    const insertSql = `
      INSERT INTO formula_products (
        formula_id, product_type, lookup_criteria
      ) VALUES (
        $1, $2, $3
      )
      ON CONFLICT (formula_id, product_type) 
      DO UPDATE SET 
        lookup_criteria = $3,
        updated_at = now();
    `;
    
    try {
      await client.query(insertSql, [
        relationship.formula_id,
        relationship.product_type,
        JSON.stringify(relationship.lookup_criteria)
      ]);
      
      console.log(`Inserted relationship: ${relationship.formula_id} -> ${relationship.product_type}`);
    } catch (error) {
      console.error(`Error inserting relationship "${relationship.formula_id} -> ${relationship.product_type}":`, error);
    }
  }
  
  console.log('Finished populating formula_products table');
  return true;
}

// Main function
async function main() {
  console.log('Starting PostgreSQL create formula_products table...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create the formula_products table
    const tableCreated = await createFormulaProductsTable(client);
    if (!tableCreated) {
      console.error('Failed to create formula_products table. Aborting.');
      await client.end();
      return;
    }
    
    // Populate the formula_products table
    const tablePopulated = await populateFormulaProductsTable(client);
    if (!tablePopulated) {
      console.error('Failed to populate formula_products table.');
    }
    
    // Verify the relationships were inserted
    const countResult = await client.query('SELECT COUNT(*) FROM formula_products');
    console.log(`Total relationships in database: ${countResult.rows[0].count}`);
    
    console.log('Formula products table creation and population completed successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('Closing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
