/**
 * Fix Questionnaire Triggers
 * 
 * This script fixes the questionnaire triggers in the material_formulas table.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Define correct triggers
const correctTriggers = [
  { id: 'terminal_posts', trigger: 'numberOfEndTerminals > 0' },
  { id: 'corner_posts', trigger: 'numberOfCorners > 0' },
  { id: 'line_posts', trigger: 'true' }, // Always included
  { id: 'single_gate_posts', trigger: 'numberOfSingleGates > 0' },
  { id: 'double_gate_posts', trigger: 'numberOfDoubleGates > 0' },
  { id: 'sliding_gate_posts', trigger: 'numberOfSlidingGates > 0' },
  { id: 'single_gates', trigger: 'numberOfSingleGates > 0' },
  { id: 'double_gates', trigger: 'numberOfDoubleGates > 0' },
  { id: 'sliding_gates', trigger: 'numberOfSlidingGates > 0' },
  { id: 'concrete', trigger: 'true' }, // Always included
  { id: 'mesh', trigger: 'true' }, // Always included
  { id: 'top_rail', trigger: 'true' }, // Always included
  { id: 'fence_sleeve', trigger: 'true' }, // Always included
  { id: 'dome_cap_terminal', trigger: 'numberOfEndTerminals > 0' },
  { id: 'dome_cap_corner', trigger: 'numberOfCorners > 0' },
  { id: 'dome_cap_single_gate', trigger: 'numberOfSingleGates > 0' },
  { id: 'dome_cap_double_gate', trigger: 'numberOfDoubleGates > 0' },
  { id: 'dome_cap_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
  { id: 'dome_cap_duckbill', trigger: 'hasDuckbillGateStop' },
  { id: 'tension_bands_terminal', trigger: 'numberOfEndTerminals > 0' },
  { id: 'tension_bands_corner', trigger: 'numberOfCorners > 0' },
  { id: 'tension_bands_single_gate', trigger: 'numberOfSingleGates > 0' },
  { id: 'tension_bands_double_gate', trigger: 'numberOfDoubleGates > 0' },
  { id: 'tension_bands_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
  { id: 'brace_bands_terminal', trigger: 'numberOfEndTerminals > 0' },
  { id: 'brace_bands_corner', trigger: 'numberOfCorners > 0' },
  { id: 'brace_bands_single_gate', trigger: 'numberOfSingleGates > 0' },
  { id: 'brace_bands_double_gate', trigger: 'numberOfDoubleGates > 0' },
  { id: 'brace_bands_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
  { id: 'brace_bands_line', trigger: 'true' }, // Always included
  { id: 'rail_ends', trigger: 'true' }, // Always included
  { id: 'rail_clamps', trigger: 'true' }, // Always included
  { id: 'fence_ties', trigger: 'true' }, // Always included
  { id: 'tension_bars', trigger: 'true' }, // Always included
  { id: 'hog_rings', trigger: 'true' }, // Always included
  { id: 'eye_tops', trigger: 'true' }, // Always included
  { id: 'nuts_and_bolts', trigger: 'true' }, // Always included
  { id: 'wedge_anchors', trigger: 'numberOfFlangedPosts > 0 || numberOfFlangedPostsOffCentered > 0' },
  { id: 'truss_rods', trigger: 'hasTrussRods' },
  { id: 'slick_line', trigger: 'true' }, // Always included
  { id: 'barbed_wire', trigger: 'hasThreeStrandBarbedWire' },
  { id: 'barb_arms', trigger: 'hasThreeStrandBarbedWire' },
  { id: 'bulldog_hinges_single', trigger: 'numberOfSingleGates > 0' },
  { id: 'bulldog_hinges_double', trigger: 'numberOfDoubleGates > 0' },
  { id: 'industrial_hinges_single', trigger: 'numberOfSingleGates > 0 && isCommercial' },
  { id: 'industrial_hinges_double', trigger: 'numberOfDoubleGates > 0 && isCommercial' },
  { id: 'female_residential_hinge_single', trigger: 'numberOfSingleGates > 0 && !isCommercial' },
  { id: 'female_residential_hinge_double', trigger: 'numberOfDoubleGates > 0 && !isCommercial' },
  { id: 'male_residential_hinge_single', trigger: 'numberOfSingleGates > 0 && !isCommercial' },
  { id: 'male_residential_hinge_double', trigger: 'numberOfDoubleGates > 0 && !isCommercial' },
  { id: 'fork_latch_single', trigger: 'numberOfSingleGates > 0' },
  { id: 'fork_latch_double', trigger: 'numberOfDoubleGates > 0' },
  { id: 'industrial_drop_latch', trigger: 'numberOfSingleGates > 0 && isCommercial' },
  { id: 'industrial_drop_latch_guides', trigger: 'numberOfSingleGates > 0 && isCommercial' },
  { id: 'cantilever_latch', trigger: 'numberOfSlidingGates > 0' },
  { id: 'cantilever_rollers', trigger: 'numberOfSlidingGates > 0' },
  { id: 'cane_bolts', trigger: 'numberOfDoubleGates > 0' },
  { id: 'gate_nut_bolt', trigger: 'numberOfGates > 0' },
  { id: 'collars', trigger: 'numberOfGates > 0' },
  { id: 'duckbill_gate_stop', trigger: 'hasDuckbillGateStop' },
  { id: 'fence_slats', trigger: 'hasFenceSlats' },
  { id: 'custom_item_1', trigger: 'customItem1Quantity > 0' },
  { id: 'custom_item_2', trigger: 'customItem2Quantity > 0' },
  { id: 'custom_item_3', trigger: 'customItem3Quantity > 0' },
  { id: 'custom_item_4', trigger: 'customItem4Quantity > 0' },
  { id: 'custom_item_5', trigger: 'customItem5Quantity > 0' }
];

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Update triggers
    console.log('\nUpdating questionnaire triggers...');
    
    let updateCount = 0;
    
    for (const trigger of correctTriggers) {
      const result = await client.query(`
        UPDATE material_formulas
        SET 
          questionnaire_trigger = $1,
          updated_at = NOW()
        WHERE id = $2;
      `, [trigger.trigger, trigger.id]);
      
      if (result.rowCount > 0) {
        console.log(`Updated trigger for ${trigger.id}: ${trigger.trigger}`);
        updateCount++;
      } else {
        console.log(`Formula not found: ${trigger.id}`);
      }
    }
    
    console.log(`\nUpdated ${updateCount} questionnaire triggers.`);
    
    // Verify the update
    console.log('\nVerifying triggers...');
    
    const verifyResult = await client.query(`
      SELECT id, name, questionnaire_trigger
      FROM material_formulas
      WHERE questionnaire_trigger IS NOT NULL
      ORDER BY id;
    `);
    
    if (verifyResult.rows.length === 0) {
      console.log('No questionnaire triggers found.');
    } else {
      console.log(`Found ${verifyResult.rows.length} triggers.`);
      
      // Check for any triggers with "user" in them
      const badTriggers = verifyResult.rows.filter(row => 
        row.questionnaire_trigger && row.questionnaire_trigger.includes('user')
      );
      
      if (badTriggers.length > 0) {
        console.log('\nFound triggers with "user" in them:');
        badTriggers.forEach(row => {
          console.log(`- ${row.id}: ${row.questionnaire_trigger}`);
        });
      } else {
        console.log('No bad triggers found.');
      }
    }
    
  } catch (error) {
    console.error('Error fixing questionnaire triggers:', error);
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
