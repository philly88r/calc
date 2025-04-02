/**
 * Create Formula Product Relationships - Complete
 * 
 * This script creates relationships between formulas and products for all formulas
 * that don't already have relationships.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Product type mappings
const productTypeMappings = {
  // Posts
  'terminal_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} },
    { product_type: 'tension_band', lookup_criteria: {} },
    { product_type: 'brace_band', lookup_criteria: {} }
  ],
  'line_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} }
  ],
  'corner_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} }
  ],
  'single_gate_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} },
    { product_type: 'tension_band', lookup_criteria: {} },
    { product_type: 'brace_band', lookup_criteria: {} }
  ],
  'double_gate_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} },
    { product_type: 'tension_band', lookup_criteria: {} },
    { product_type: 'brace_band', lookup_criteria: {} }
  ],
  'sliding_gate_posts': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'fence_height_plus_extra' } },
    { product_type: 'dome_cap', lookup_criteria: {} },
    { product_type: 'tension_band', lookup_criteria: {} },
    { product_type: 'brace_band', lookup_criteria: {} }
  ],
  'duckbill_posts': [
    { product_type: 'duckbill_post', lookup_criteria: {} }
  ],
  'flanged_posts_centered': [
    { product_type: 'flanged_post', lookup_criteria: { centered: true } }
  ],
  'flanged_posts_off_centered': [
    { product_type: 'flanged_post', lookup_criteria: { centered: false } }
  ],
  
  // Mesh
  'mesh': [
    { product_type: 'mesh', lookup_criteria: { height_field: 'heightOfFence' } }
  ],
  
  // Top Rail
  'top_rail': [
    { product_type: 'post', lookup_criteria: { size_calculation: 'standard_length' } },
    { product_type: 'rail_end', lookup_criteria: {} },
    { product_type: 'rail_clamp', lookup_criteria: {} }
  ],
  
  // Gates
  'single_gates': [
    { product_type: 'gate_frame', lookup_criteria: { size_field: 'singleGateSize', height_field: 'heightOfFence' } },
    { product_type: 'gate_hinge', lookup_criteria: {} },
    { product_type: 'gate_latch', lookup_criteria: {} }
  ],
  'double_gates': [
    { product_type: 'gate_frame', lookup_criteria: { size_field: 'doubleGateSize', height_field: 'heightOfFence' } },
    { product_type: 'gate_hinge', lookup_criteria: {} },
    { product_type: 'gate_latch', lookup_criteria: {} },
    { product_type: 'drop_rod', lookup_criteria: {} }
  ],
  'sliding_gates': [
    { product_type: 'gate_frame', lookup_criteria: { size_field: 'slidingGateSize', height_field: 'heightOfFence' } }
  ],
  
  // Hardware - Tension Bands
  'tension_bands_terminal': [
    { product_type: 'tension_band', lookup_criteria: { post_type: 'terminal' } }
  ],
  'tension_bands_corner': [
    { product_type: 'tension_band', lookup_criteria: { post_type: 'corner' } }
  ],
  'tension_bands_single_gate': [
    { product_type: 'tension_band', lookup_criteria: { post_type: 'single_gate' } }
  ],
  'tension_bands_double_gate': [
    { product_type: 'tension_band', lookup_criteria: { post_type: 'double_gate' } }
  ],
  'tension_bands_sliding_gate': [
    { product_type: 'tension_band', lookup_criteria: { post_type: 'sliding_gate' } }
  ],
  
  // Hardware - Brace Bands
  'brace_bands_terminal': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'terminal' } }
  ],
  'brace_bands_corner': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'corner' } }
  ],
  'brace_bands_single_gate': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'single_gate' } }
  ],
  'brace_bands_double_gate': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'double_gate' } }
  ],
  'brace_bands_sliding_gate': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'sliding_gate' } }
  ],
  'brace_bands_line': [
    { product_type: 'brace_band', lookup_criteria: { post_type: 'line' } }
  ],
  
  // Hardware - Dome Caps
  'dome_cap_terminal': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'terminal' } }
  ],
  'dome_cap_corner': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'corner' } }
  ],
  'dome_cap_single_gate': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'single_gate' } }
  ],
  'dome_cap_double_gate': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'double_gate' } }
  ],
  'dome_cap_sliding_gate': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'sliding_gate' } }
  ],
  'dome_cap_duckbill': [
    { product_type: 'dome_cap', lookup_criteria: { post_type: 'duckbill' } }
  ],
  
  // Hardware - Other
  'rail_ends': [
    { product_type: 'rail_end', lookup_criteria: {} }
  ],
  'rail_clamps': [
    { product_type: 'rail_clamp', lookup_criteria: {} }
  ],
  'fence_ties': [
    { product_type: 'fence_tie', lookup_criteria: {} }
  ],
  'tension_bars': [
    { product_type: 'tension_bar', lookup_criteria: {} }
  ],
  'fence_sleeve': [
    { product_type: 'sleeve', lookup_criteria: {} }
  ],
  'hog_rings': [
    { product_type: 'hog_ring', lookup_criteria: {} }
  ],
  'eye_tops': [
    { product_type: 'eye_top', lookup_criteria: {} }
  ],
  'nuts_and_bolts': [
    { product_type: 'nuts_and_bolts', lookup_criteria: {} }
  ],
  'wedge_anchors': [
    { product_type: 'wedge_anchor', lookup_criteria: {} }
  ],
  'truss_rods': [
    { product_type: 'truss_rod', lookup_criteria: {} }
  ],
  'slick_line': [
    { product_type: 'slick_line', lookup_criteria: {} }
  ],
  
  // Gate Hardware
  'bulldog_hinges_single': [
    { product_type: 'bulldog_hinge', lookup_criteria: { gate_type: 'single' } }
  ],
  'bulldog_hinges_double': [
    { product_type: 'bulldog_hinge', lookup_criteria: { gate_type: 'double' } }
  ],
  'industrial_hinges_single': [
    { product_type: 'industrial_hinge', lookup_criteria: { gate_type: 'single' } }
  ],
  'industrial_hinges_double': [
    { product_type: 'industrial_hinge', lookup_criteria: { gate_type: 'double' } }
  ],
  'female_residential_hinge_single': [
    { product_type: 'female_residential_hinge', lookup_criteria: { gate_type: 'single' } }
  ],
  'female_residential_hinge_double': [
    { product_type: 'female_residential_hinge', lookup_criteria: { gate_type: 'double' } }
  ],
  'male_residential_hinge_single': [
    { product_type: 'male_residential_hinge', lookup_criteria: { gate_type: 'single' } }
  ],
  'male_residential_hinge_double': [
    { product_type: 'male_residential_hinge', lookup_criteria: { gate_type: 'double' } }
  ],
  'fork_latch_single': [
    { product_type: 'fork_latch', lookup_criteria: { gate_type: 'single' } }
  ],
  'fork_latch_double': [
    { product_type: 'fork_latch', lookup_criteria: { gate_type: 'double' } }
  ],
  'industrial_drop_latch': [
    { product_type: 'industrial_drop_latch', lookup_criteria: {} }
  ],
  'industrial_drop_latch_guides': [
    { product_type: 'industrial_drop_latch_guide', lookup_criteria: {} }
  ],
  'cantilever_latch': [
    { product_type: 'cantilever_latch', lookup_criteria: {} }
  ],
  'cantilever_rollers': [
    { product_type: 'cantilever_roller', lookup_criteria: {} }
  ],
  'cane_bolts': [
    { product_type: 'cane_bolt', lookup_criteria: {} }
  ],
  'gate_nut_bolt': [
    { product_type: 'gate_nut_bolt', lookup_criteria: {} }
  ],
  'collars': [
    { product_type: 'collar', lookup_criteria: {} }
  ],
  'duckbill_gate_stop': [
    { product_type: 'duckbill_gate_stop', lookup_criteria: {} }
  ],
  
  // Barbed Wire and Privacy
  'barbed_wire': [
    { product_type: 'barbed_wire', lookup_criteria: {} }
  ],
  'barb_arms': [
    { product_type: 'barb_arm', lookup_criteria: {} }
  ],
  'fence_slats': [
    { product_type: 'fence_slat', lookup_criteria: {} }
  ],
  
  // Concrete
  'concrete': [
    { product_type: 'concrete', lookup_criteria: {} }
  ]
};

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Get formulas without relationships
    const formulasResult = await client.query(`
      SELECT mf.id, mf.name
      FROM material_formulas mf
      LEFT JOIN formula_products fp ON mf.id = fp.formula_id
      GROUP BY mf.id, mf.name
      HAVING COUNT(fp.id) = 0
      ORDER BY mf.id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas without relationships.`);
    
    // Create relationships for each formula
    let createdCount = 0;
    let skippedCount = 0;
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const mapping = productTypeMappings[formulaId];
      
      if (mapping) {
        console.log(`\nCreating relationships for ${formulaId}:`);
        
        for (const productMapping of mapping) {
          // Insert relationship into formula_products table
          await client.query(`
            INSERT INTO formula_products (
              formula_id, 
              product_type, 
              lookup_criteria,
              created_at,
              updated_at
            ) VALUES ($1, $2, $3, NOW(), NOW());
          `, [
            formulaId,
            productMapping.product_type,
            productMapping.lookup_criteria
          ]);
          
          console.log(`  - Added relationship with ${productMapping.product_type}`);
          createdCount++;
        }
      } else {
        console.log(`Skipped formula: ${formulaId} (no mapping available)`);
        skippedCount++;
      }
    }
    
    console.log(`\nRelationship creation summary:`);
    console.log(`- Created: ${createdCount} relationships`);
    console.log(`- Skipped: ${skippedCount} formulas`);
    console.log(`- Total formulas processed: ${formulasResult.rows.length}`);
    
    // Check final relationship counts
    const finalCountResult = await client.query(`
      SELECT COUNT(*) as count
      FROM formula_products;
    `);
    
    console.log(`\nTotal relationships in database: ${finalCountResult.rows[0].count}`);
    
  } catch (error) {
    console.error('Error creating formula product relationships:', error);
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
