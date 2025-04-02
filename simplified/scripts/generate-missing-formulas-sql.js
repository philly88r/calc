/**
 * Generate Missing Formulas SQL
 * 
 * This script generates SQL statements to add missing formulas to the material_formulas table
 * in the Supabase database.
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Path to output SQL file
const outputPath = path.join(__dirname, 'missing-formulas.sql');

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

// Formula templates by category
const formulaTemplates = {
  // Post formulas
  posts: {
    category: 'posts',
    description: '{name} are used to support the fence structure.',
    formula: 'Number of {id_readable} specified by user',
    calculation_details: {
      quantity_calculation: 'Number of {id_readable} specified by the user',
      price_calculation: 'Post price × quantity'
    },
    questionnaire_trigger: 'When user specifies number of {id_readable} greater than 0'
  },
  
  // Gate formulas
  gates: {
    category: 'gates',
    description: '{name} are used to provide access through the fence.',
    formula: 'Number of {id_readable} specified by user',
    calculation_details: {
      quantity_calculation: 'Number of {id_readable} specified by the user',
      price_calculation: 'Gate price × quantity'
    },
    questionnaire_trigger: 'When user specifies number of {id_readable} greater than 0'
  },
  
  // Hardware formulas
  hardware: {
    category: 'hardware',
    description: '{name} are used to connect and secure fence components.',
    formula: 'Quantity based on fence specifications',
    calculation_details: {
      quantity_calculation: 'Calculated based on fence specifications',
      price_calculation: 'Unit price × quantity'
    },
    questionnaire_trigger: 'When user specifies fence specifications'
  },
  
  // Material formulas
  materials: {
    category: 'materials',
    description: '{name} are used in fence construction.',
    formula: 'Quantity based on fence specifications',
    calculation_details: {
      quantity_calculation: 'Calculated based on fence specifications',
      price_calculation: 'Unit price × quantity'
    },
    questionnaire_trigger: 'When user specifies fence specifications'
  },
  
  // Custom items
  custom: {
    category: 'custom',
    description: 'Custom item that can be specified by the user.',
    formula: 'Quantity specified by user',
    calculation_details: {
      quantity_calculation: 'Quantity specified by the user',
      price_calculation: 'Unit price × quantity'
    },
    questionnaire_trigger: 'When user adds a custom item'
  }
};

// Specific formula details
const specificFormulas = {
  // Posts
  "single_gate_posts": {
    name: "Single Gate Posts",
    category: "posts",
    description: "Single gate posts are used to support single gates.",
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2",
      price_calculation: "Post price × quantity"
    },
    questionnaire_trigger: "When user specifies number of single gates greater than 0"
  },
  "double_gate_posts": {
    name: "Double Gate Posts",
    category: "posts",
    description: "Double gate posts are used to support double gates.",
    formula: "Number of double gates × 2",
    calculation_details: {
      quantity_calculation: "Number of double gates × 2",
      price_calculation: "Post price × quantity"
    },
    questionnaire_trigger: "When user specifies number of double gates greater than 0"
  },
  "sliding_gate_posts": {
    name: "Sliding Gate Posts",
    category: "posts",
    description: "Sliding gate posts are used to support sliding gates.",
    formula: "Number of sliding gates × 2",
    calculation_details: {
      quantity_calculation: "Number of sliding gates × 2",
      price_calculation: "Post price × quantity"
    },
    questionnaire_trigger: "When user specifies number of sliding gates greater than 0"
  },
  
  // Materials
  "fence_sleeve": {
    name: "Fence Sleeve",
    category: "hardware",
    description: "Fence sleeves are used to connect sections of top rail.",
    formula: "Number of top rail sections - 1",
    calculation_details: {
      quantity_calculation: "Number of top rail sections - 1",
      price_calculation: "Sleeve price × quantity"
    },
    questionnaire_trigger: "When user specifies fence length"
  },
  "mesh": {
    name: "Chain Link Mesh",
    category: "fabric",
    description: "Chain link mesh is the fabric that makes up the body of the fence.",
    formula: "Total linear length ÷ standard roll length (50ft), rounded up",
    calculation_details: {
      quantity_calculation: "Total linear length ÷ standard roll length (50ft), rounded up",
      price_calculation: "Mesh price × quantity"
    },
    questionnaire_trigger: "When user specifies fence height and length"
  },
  
  // Hardware
  "dome_cap_terminal": {
    name: "Dome Caps for Terminal Posts",
    category: "hardware",
    description: "Dome caps are placed on top of terminal posts to prevent water from entering the post and to provide a finished look.",
    formula: "Number of terminal posts",
    calculation_details: {
      quantity_calculation: "Number of terminal posts",
      price_calculation: "Cap price × quantity"
    },
    questionnaire_trigger: "When user specifies number of terminal posts greater than 0"
  },
  "dome_cap_corner": {
    name: "Dome Caps for Corner Posts",
    category: "hardware",
    description: "Dome caps are placed on top of corner posts to prevent water from entering the post and to provide a finished look.",
    formula: "Number of corner posts",
    calculation_details: {
      quantity_calculation: "Number of corner posts",
      price_calculation: "Cap price × quantity"
    },
    questionnaire_trigger: "When user specifies number of corner posts greater than 0"
  }
};

// Function to generate SQL for a formula
function generateFormulaSQL(id, formula) {
  const name = formula.name || id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const category = formula.category || getCategoryFromId(id);
  const description = formula.description || `${name} used in fence construction.`;
  const questionnaire_trigger = formula.questionnaire_trigger || `When user specifies fence specifications`;
  const formula_text = formula.formula || `Quantity based on fence specifications`;
  const calculation_details = formula.calculation_details || {
    quantity_calculation: "Calculated based on fence specifications",
    price_calculation: "Unit price × quantity"
  };
  
  return `
-- Add formula: ${name}
INSERT INTO material_formulas (id, name, category, description, questionnaire_trigger, formula, calculation_details)
VALUES (
  '${id}',
  '${name}',
  '${category}',
  '${description}',
  '${questionnaire_trigger}',
  '${formula_text}',
  '${JSON.stringify(calculation_details)}'
)
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  questionnaire_trigger = EXCLUDED.questionnaire_trigger,
  formula = EXCLUDED.formula,
  calculation_details = EXCLUDED.calculation_details,
  updated_at = NOW();
`;
}

// Function to determine category from ID
function getCategoryFromId(id) {
  if (id.includes('post')) return 'posts';
  if (id.includes('gate') && !id.includes('post')) return 'gates';
  if (id.includes('cap') || id.includes('band') || id.includes('clamp') || id.includes('hinge') || id.includes('latch')) return 'hardware';
  if (id.includes('rail') || id.includes('mesh') || id.includes('sleeve')) return 'rails';
  if (id.includes('custom')) return 'custom';
  return 'materials';
}

// Function to get formula template
function getFormulaTemplate(id) {
  // Check if there's a specific formula defined
  if (specificFormulas[id]) {
    return specificFormulas[id];
  }
  
  // Otherwise, use a template based on category
  const category = getCategoryFromId(id);
  const template = formulaTemplates[category] || formulaTemplates.materials;
  
  // Create a readable version of the ID for template substitution
  const id_readable = id.replace(/_/g, ' ');
  
  // Create a name from the ID
  const name = id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Clone the template and substitute values
  const formula = JSON.parse(JSON.stringify(template));
  formula.name = name;
  
  // Replace placeholders in template strings
  for (const key in formula) {
    if (typeof formula[key] === 'string') {
      formula[key] = formula[key].replace(/{id_readable}/g, id_readable).replace(/{name}/g, name);
    }
  }
  
  // Handle nested objects like calculation_details
  if (formula.calculation_details) {
    for (const key in formula.calculation_details) {
      if (typeof formula.calculation_details[key] === 'string') {
        formula.calculation_details[key] = formula.calculation_details[key]
          .replace(/{id_readable}/g, id_readable)
          .replace(/{name}/g, name);
      }
    }
  }
  
  return formula;
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
    
    // Get existing formulas from the database
    console.log('Checking existing formulas...');
    const existingFormulasResult = await client.query(`
      SELECT id FROM material_formulas;
    `);
    
    const existingFormulaIds = existingFormulasResult.rows.map(row => row.id);
    console.log(`Found ${existingFormulaIds.length} existing formulas in the database.`);
    
    // Identify missing formulas
    const missingFormulaIds = expectedFormulas.filter(id => !existingFormulaIds.includes(id));
    console.log(`Identified ${missingFormulaIds.length} missing formulas.`);
    
    // Generate SQL for missing formulas
    let sqlStatements = `-- SQL to add missing formulas to material_formulas table
-- Generated on ${new Date().toISOString()}
-- Total missing formulas: ${missingFormulaIds.length}

`;
    
    missingFormulaIds.forEach(id => {
      const formula = getFormulaTemplate(id);
      sqlStatements += generateFormulaSQL(id, formula);
    });
    
    // Write SQL to file
    fs.writeFileSync(outputPath, sqlStatements);
    console.log(`SQL statements written to ${outputPath}`);
    
    // Print summary of missing formulas by category
    const categoryCounts = {};
    missingFormulaIds.forEach(id => {
      const category = getCategoryFromId(id);
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    
    console.log('\nMissing formulas by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count}`);
    });
    
  } catch (error) {
    console.error('Error generating SQL for missing formulas:', error);
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
