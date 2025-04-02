/**
 * Verify Formulas
 * 
 * This script verifies that all expected formulas are in the material_formulas table
 * in the Supabase database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Expected formulas list
const expectedFormulas = [
  "terminal_posts",
  "corner_posts",
  "single_gate_posts",
  "double_gate_posts",
  "sliding_gate_posts",
  "line_posts",
  "duckbill_posts",
  "flanged_posts_centered",
  "flanged_posts_off_centered",
  "concrete",
  "top_rail",
  "fence_sleeve",
  "mesh",
  "fence_slats",
  "dome_cap_terminal",
  "dome_cap_corner",
  "dome_cap_single_gate",
  "dome_cap_double_gate",
  "dome_cap_sliding_gate",
  "dome_cap_duckbill",
  "eye_tops",
  "rail_clamps",
  "barb_arms",
  "barbed_wire",
  "tension_bands_terminal",
  "tension_bands_corner",
  "tension_bands_single_gate",
  "tension_bands_double_gate",
  "tension_bands_sliding_gate",
  "brace_bands_terminal",
  "brace_bands_corner",
  "brace_bands_single_gate",
  "brace_bands_double_gate",
  "brace_bands_sliding_gate",
  "brace_bands_line",
  "tension_bars",
  "rail_ends",
  "nuts_and_bolts",
  "wedge_anchors",
  "fence_ties",
  "hog_rings",
  "slick_line",
  "truss_rods",
  "single_gates",
  "double_gates",
  "sliding_gates",
  "male_residential_hinge_single",
  "female_residential_hinge_single",
  "male_residential_hinge_double",
  "female_residential_hinge_double",
  "gate_nut_bolt",
  "bulldog_hinges_single",
  "bulldog_hinges_double",
  "industrial_hinges_single",
  "industrial_hinges_double",
  "duckbill_gate_stop",
  "cantilever_rollers",
  "cantilever_latch",
  "collars",
  "cane_bolts",
  "industrial_drop_latch",
  "industrial_drop_latch_guides",
  "fork_latch_single",
  "fork_latch_double",
  "custom_item_1",
  "custom_item_2",
  "custom_item_3",
  "custom_item_4",
  "custom_item_5"
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
    
    // Get all formulas from the database
    console.log('Retrieving formulas from the database...');
    const formulasResult = await client.query(`
      SELECT id, name, category 
      FROM material_formulas 
      ORDER BY category, name;
    `);
    
    const dbFormulas = formulasResult.rows;
    console.log(`Found ${dbFormulas.length} formulas in the database.`);
    
    // Check if all expected formulas are in the database
    const dbFormulaIds = dbFormulas.map(row => row.id);
    const missingFormulas = expectedFormulas.filter(id => !dbFormulaIds.includes(id));
    
    if (missingFormulas.length === 0) {
      console.log('\nAll expected formulas are in the database!');
    } else {
      console.log(`\nMissing ${missingFormulas.length} formulas:`);
      missingFormulas.forEach(id => {
        console.log(`- ${id}`);
      });
    }
    
    // Check if there are any unexpected formulas in the database
    const unexpectedFormulas = dbFormulaIds.filter(id => !expectedFormulas.includes(id));
    
    if (unexpectedFormulas.length > 0) {
      console.log(`\nFound ${unexpectedFormulas.length} unexpected formulas:`);
      unexpectedFormulas.forEach(id => {
        const formula = dbFormulas.find(f => f.id === id);
        console.log(`- ${id}: ${formula.name} (${formula.category})`);
      });
    }
    
    // Group formulas by category
    const categorizedFormulas = {};
    
    dbFormulas.forEach(formula => {
      const category = formula.category || 'uncategorized';
      
      if (!categorizedFormulas[category]) {
        categorizedFormulas[category] = [];
      }
      
      categorizedFormulas[category].push({
        id: formula.id,
        name: formula.name
      });
    });
    
    // Print formulas by category
    console.log('\nFormulas by category:');
    Object.entries(categorizedFormulas).sort().forEach(([category, formulas]) => {
      console.log(`\n${category.toUpperCase()} (${formulas.length}):`);
      
      formulas.forEach(formula => {
        console.log(`- ${formula.id}: ${formula.name}`);
      });
    });
    
  } catch (error) {
    console.error('Error verifying formulas:', error);
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
