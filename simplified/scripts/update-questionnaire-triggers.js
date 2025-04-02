/**
 * Update Questionnaire Triggers
 * 
 * This script updates the questionnaire_trigger field for all formulas
 * to ensure they have proper relationships with the questionnaire.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Questionnaire trigger mappings
const triggerMappings = {
  // Posts
  'terminal_posts': 'When the user selects chain link fence type',
  'line_posts': 'When the user selects chain link fence type',
  'corner_posts': 'When the user specifies number of corners greater than 0',
  'single_gate_posts': 'When the user specifies number of single gates greater than 0',
  'double_gate_posts': 'When the user specifies number of double gates greater than 0',
  'sliding_gate_posts': 'When the user specifies number of sliding gates greater than 0',
  'duckbill_posts': 'When the user selects duckbill gate stop option',
  'flanged_posts_centered': 'When user specifies flanged posts',
  'flanged_posts_off_centered': 'When user specifies flanged posts',
  
  // Mesh
  'mesh': 'When user specifies fence specifications',
  
  // Top Rail
  'top_rail': 'When user specifies fence height and length',
  
  // Concrete
  'concrete': 'When user specifies fence specifications',
  
  // Hardware - Tension Bands
  'tension_bands_terminal': 'When user specifies fence specifications',
  'tension_bands_corner': 'When user specifies number of corners greater than 0',
  'tension_bands_single_gate': 'When user specifies number of single gates greater than 0',
  'tension_bands_double_gate': 'When user specifies number of double gates greater than 0',
  'tension_bands_sliding_gate': 'When user specifies number of sliding gates greater than 0',
  
  // Hardware - Brace Bands
  'brace_bands_terminal': 'When user specifies fence specifications',
  'brace_bands_corner': 'When user specifies number of corners greater than 0',
  'brace_bands_single_gate': 'When user specifies number of single gates greater than 0',
  'brace_bands_double_gate': 'When user specifies number of double gates greater than 0',
  'brace_bands_sliding_gate': 'When user specifies number of sliding gates greater than 0',
  'brace_bands_line': 'When user specifies fence specifications',
  
  // Hardware - Dome Caps
  'dome_cap_terminal': 'When user specifies fence specifications',
  'dome_cap_corner': 'When user specifies number of corners greater than 0',
  'dome_cap_single_gate': 'When user specifies number of single gates greater than 0',
  'dome_cap_double_gate': 'When user specifies number of double gates greater than 0',
  'dome_cap_sliding_gate': 'When user specifies number of sliding gates greater than 0',
  'dome_cap_duckbill': 'When the user selects duckbill gate stop option',
  
  // Hardware - Other
  'rail_ends': 'When user specifies fence specifications',
  'rail_clamps': 'When user specifies fence specifications',
  'fence_ties': 'When user specifies fence specifications',
  'tension_bars': 'When user specifies fence specifications',
  'fence_sleeve': 'When user specifies fence specifications',
  'hog_rings': 'When user specifies fence specifications',
  'eye_tops': 'When user specifies fence specifications',
  'nuts_and_bolts': 'When user specifies fence specifications',
  'wedge_anchors': 'When user specifies fence specifications',
  'truss_rods': 'When user specifies fence specifications',
  'slick_line': 'When user specifies fence specifications',
  
  // Gates
  'single_gates': 'When the user specifies number of single gates greater than 0',
  'double_gates': 'When the user specifies number of double gates greater than 0',
  'sliding_gates': 'When the user specifies number of sliding gates greater than 0',
  
  // Gate Hardware
  'bulldog_hinges_single': 'When user selects bulldog hinges for single gates',
  'bulldog_hinges_double': 'When user selects bulldog hinges for double gates',
  'industrial_hinges_single': 'When user selects industrial hinges for single gates',
  'industrial_hinges_double': 'When user selects industrial hinges for double gates',
  'female_residential_hinge_single': 'When user selects residential hinges for single gates',
  'female_residential_hinge_double': 'When user selects residential hinges for double gates',
  'male_residential_hinge_single': 'When user selects residential hinges for single gates',
  'male_residential_hinge_double': 'When user selects residential hinges for double gates',
  'fork_latch_single': 'When user specifies fence specifications',
  'fork_latch_double': 'When user specifies fence specifications',
  'industrial_drop_latch': 'When user selects industrial drop latch for gates',
  'industrial_drop_latch_guides': 'When user selects industrial drop latch for gates',
  'cantilever_latch': 'When user selects cantilever latch for sliding gates',
  'cantilever_rollers': 'When user selects cantilever rollers for sliding gates',
  'cane_bolts': 'When user specifies number of double gates greater than 0',
  'gate_nut_bolt': 'When user specifies number of gate nut bolt greater than 0',
  'collars': 'When user specifies fence specifications',
  'duckbill_gate_stop': 'When the user selects duckbill gate stop option',
  
  // Barbed Wire and Privacy
  'barbed_wire': 'When user selects barbed wire option',
  'barb_arms': 'When user selects barbed wire option',
  'fence_slats': 'When user selects fence slats option',
  
  // Custom Items
  'custom_item_1': 'When user adds custom item 1',
  'custom_item_2': 'When user adds custom item 2',
  'custom_item_3': 'When user adds custom item 3',
  'custom_item_4': 'When user adds custom item 4',
  'custom_item_5': 'When user adds custom item 5'
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
    
    // Get all formulas from the database
    const formulasResult = await client.query(`
      SELECT id, name, questionnaire_trigger
      FROM material_formulas
      ORDER BY id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    
    // Update each formula with the trigger mapping if available
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const mapping = triggerMappings[formulaId];
      
      if (mapping) {
        // Update the questionnaire_trigger in the database
        await client.query(`
          UPDATE material_formulas
          SET 
            questionnaire_trigger = $1,
            updated_at = NOW()
          WHERE id = $2;
        `, [
          mapping,
          formulaId
        ]);
        
        console.log(`Updated trigger for ${formulaId}: ${mapping}`);
        updatedCount++;
      } else {
        console.log(`Skipped formula: ${formulaId} (no trigger mapping available)`);
        skippedCount++;
      }
    }
    
    console.log(`\nUpdate summary:`);
    console.log(`- Updated: ${updatedCount} formulas`);
    console.log(`- Skipped: ${skippedCount} formulas`);
    console.log(`- Total: ${formulasResult.rows.length} formulas`);
    
  } catch (error) {
    console.error('Error updating questionnaire triggers:', error);
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
