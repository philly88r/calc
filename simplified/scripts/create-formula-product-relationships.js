/**
 * Create Formula-Product Relationships
 * 
 * This script creates relationships between formulas and products in the database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Formula-product relationships to create
const relationships = [
  // Post formulas
  {
    formula_id: 'terminal_posts',
    product_type: 'post',
    product_material: null, // Will be determined by user input
    product_thickness: null, // Will be determined by user input
    product_size: null // Will be determined by user input
  },
  {
    formula_id: 'corner_posts',
    product_type: 'post',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'line_posts',
    product_type: 'post',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'single_gate_posts',
    product_type: 'post',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'double_gate_posts',
    product_type: 'post',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'sliding_gate_posts',
    product_type: 'post',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  
  // Gate formulas
  {
    formula_id: 'single_gates',
    product_type: 'gate',
    product_material: null,
    product_thickness: null,
    product_size: 'single'
  },
  {
    formula_id: 'double_gates',
    product_type: 'gate',
    product_material: null,
    product_thickness: null,
    product_size: 'double'
  },
  {
    formula_id: 'sliding_gates',
    product_type: 'gate',
    product_material: null,
    product_thickness: null,
    product_size: 'sliding'
  },
  
  // Material formulas
  {
    formula_id: 'concrete',
    product_type: 'concrete',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'top_rail',
    product_type: 'rail',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'fence_sleeve',
    product_type: 'sleeve',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'mesh',
    product_type: 'mesh',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'fence_slats',
    product_type: 'slat',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  
  // Hardware formulas
  {
    formula_id: 'dome_cap_terminal',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'terminal'
  },
  {
    formula_id: 'dome_cap_corner',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'corner'
  },
  {
    formula_id: 'dome_cap_single_gate',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'dome_cap_double_gate',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'dome_cap_sliding_gate',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'dome_cap_duckbill',
    product_type: 'cap',
    product_material: null,
    product_thickness: null,
    product_size: 'duckbill'
  },
  {
    formula_id: 'eye_tops',
    product_type: 'eye_top',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'rail_clamps',
    product_type: 'rail_clamp',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'barb_arms',
    product_type: 'barb_arm',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'barbed_wire',
    product_type: 'barbed_wire',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'tension_bands_terminal',
    product_type: 'tension_band',
    product_material: null,
    product_thickness: null,
    product_size: 'terminal'
  },
  {
    formula_id: 'tension_bands_corner',
    product_type: 'tension_band',
    product_material: null,
    product_thickness: null,
    product_size: 'corner'
  },
  {
    formula_id: 'tension_bands_single_gate',
    product_type: 'tension_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'tension_bands_double_gate',
    product_type: 'tension_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'tension_bands_sliding_gate',
    product_type: 'tension_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'brace_bands_terminal',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'terminal'
  },
  {
    formula_id: 'brace_bands_corner',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'corner'
  },
  {
    formula_id: 'brace_bands_single_gate',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'brace_bands_double_gate',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'brace_bands_sliding_gate',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'brace_bands_line',
    product_type: 'brace_band',
    product_material: null,
    product_thickness: null,
    product_size: 'line'
  },
  {
    formula_id: 'tension_bars',
    product_type: 'tension_bar',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'rail_ends',
    product_type: 'rail_end',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'nuts_and_bolts',
    product_type: 'bolt',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'wedge_anchors',
    product_type: 'anchor',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'fence_ties',
    product_type: 'tie',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'hog_rings',
    product_type: 'hog_ring',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'slick_line',
    product_type: 'slick_line',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'truss_rods',
    product_type: 'truss_rod',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  
  // Gate hardware formulas
  {
    formula_id: 'male_residential_hinge_single',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'male_residential'
  },
  {
    formula_id: 'female_residential_hinge_single',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'female_residential'
  },
  {
    formula_id: 'male_residential_hinge_double',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'male_residential'
  },
  {
    formula_id: 'female_residential_hinge_double',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'female_residential'
  },
  {
    formula_id: 'gate_nut_bolt',
    product_type: 'bolt',
    product_material: null,
    product_thickness: null,
    product_size: 'gate'
  },
  {
    formula_id: 'bulldog_hinges_single',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'bulldog'
  },
  {
    formula_id: 'bulldog_hinges_double',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'bulldog'
  },
  {
    formula_id: 'industrial_hinges_single',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'industrial'
  },
  {
    formula_id: 'industrial_hinges_double',
    product_type: 'hinge',
    product_material: null,
    product_thickness: null,
    product_size: 'industrial'
  },
  {
    formula_id: 'duckbill_gate_stop',
    product_type: 'gate_stop',
    product_material: null,
    product_thickness: null,
    product_size: 'duckbill'
  },
  {
    formula_id: 'cantilever_rollers',
    product_type: 'roller',
    product_material: null,
    product_thickness: null,
    product_size: 'cantilever'
  },
  {
    formula_id: 'cantilever_latch',
    product_type: 'latch',
    product_material: null,
    product_thickness: null,
    product_size: 'cantilever'
  },
  {
    formula_id: 'collars',
    product_type: 'collar',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'cane_bolts',
    product_type: 'cane_bolt',
    product_material: null,
    product_thickness: null,
    product_size: null
  },
  {
    formula_id: 'industrial_drop_latch',
    product_type: 'latch',
    product_material: null,
    product_thickness: null,
    product_size: 'industrial_drop'
  },
  {
    formula_id: 'industrial_drop_latch_guides',
    product_type: 'latch_guide',
    product_material: null,
    product_thickness: null,
    product_size: 'industrial_drop'
  },
  {
    formula_id: 'fork_latch_single',
    product_type: 'latch',
    product_material: null,
    product_thickness: null,
    product_size: 'fork'
  },
  {
    formula_id: 'fork_latch_double',
    product_type: 'latch',
    product_material: null,
    product_thickness: null,
    product_size: 'fork'
  }
];

async function createFormulaProductRelationship(client, formulaId, productType, productSize, productMaterial, productThickness) {
  try {
    // Check if the formula exists
    const formulaCheckResult = await client.query(
      'SELECT id FROM material_formulas WHERE id = $1',
      [formulaId]
    );
    
    if (formulaCheckResult.rows.length === 0) {
      console.log(`Formula ${formulaId} not found, skipping...`);
      return null;
    }
    
    // Check if the relationship already exists
    const checkQuery = `
      SELECT id FROM formula_products WHERE formula_id = $1
    `;
    
    const checkResult = await client.query(checkQuery, [formulaId]);
    
    if (checkResult.rows.length > 0) {
      console.log(`Relationship for formula ${formulaId} already exists, updating...`);
      
      // Update existing relationship
      const updateQuery = `
        UPDATE formula_products 
        SET 
          product_type = $2,
          product_size = $3,
          product_material = $4,
          product_thickness = $5,
          updated_at = NOW()
        WHERE formula_id = $1
        RETURNING id
      `;
      
      const updateResult = await client.query(updateQuery, [
        formulaId,
        productType,
        productSize,
        productMaterial,
        productThickness
      ]);
      
      return updateResult.rows[0].id;
    } else {
      console.log(`Creating new relationship for formula ${formulaId}...`);
      
      // Insert new relationship
      const insertQuery = `
        INSERT INTO formula_products 
        (formula_id, product_type, product_size, product_material, product_thickness)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      
      const insertResult = await client.query(insertQuery, [
        formulaId,
        productType,
        productSize,
        productMaterial,
        productThickness
      ]);
      
      return insertResult.rows[0].id;
    }
  } catch (error) {
    console.error(`Error creating relationship for formula ${formulaId}:`, error);
    return null;
  }
}

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Check if formula_products table exists
    console.log('Checking if formula_products table exists...');
    const tableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'formula_products'
      );
    `);
    
    const tableExists = tableCheckResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('formula_products table does not exist. Creating it...');
      
      // Create formula_products table
      await client.query(`
        CREATE TABLE formula_products (
          id SERIAL PRIMARY KEY,
          formula_id TEXT NOT NULL REFERENCES material_formulas(id),
          product_type TEXT NOT NULL,
          product_size TEXT,
          product_material TEXT,
          product_thickness TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      console.log('formula_products table created successfully.');
    }
    
    // Create formula-product relationships
    console.log('Creating formula-product relationships...');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const relationship of relationships) {
      try {
        const id = await createFormulaProductRelationship(
          client,
          relationship.formula_id,
          relationship.product_type,
          relationship.product_size,
          relationship.product_material,
          relationship.product_thickness
        );
        
        if (id) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        console.error(`Error creating relationship for formula ${relationship.formula_id}:`, error);
        errorCount++;
      }
    }
    
    console.log(`\nRelationship creation complete!`);
    console.log(`- Successful relationships: ${successCount}`);
    console.log(`- Failed relationships: ${errorCount}`);
    
    // Count total relationships
    const countResult = await client.query(`
      SELECT COUNT(*) FROM formula_products;
    `);
    
    console.log(`- Total relationships in database: ${countResult.rows[0].count}`);
    
  } catch (error) {
    console.error('Error creating formula-product relationships:', error);
  } finally {
    // Close the PostgreSQL connection
    await client.end();
    console.log('\nPostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
