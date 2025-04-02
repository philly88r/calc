/**
 * Generate SQL Migration
 * 
 * This script generates SQL statements to create the material_formulas table
 * and insert the formulas data. The SQL can be executed directly in the Supabase SQL editor.
 */

const fs = require('fs');
const path = require('path');

// Define the constants that are referenced in materialFormulas.js
const PRODUCT_TYPES = {
  POST: "post",
  MESH: "mesh",
  EYE_TOP: "eye_top",
  DOME_CAP: "dome_cap",
  RAIL_END: "rail_end",
  TENSION_BAND: "tension_band",
  BRACE_BAND: "brace_band",
  BARB_ARM: "barb_arm",
  FENCE_TIE: "fence_tie",
  HOG_RINGS: "hog_rings",
  SLEEVE: "sleeve",
  RAIL_CLAMP: "rail_clamp",
  GATE_COLLAR: "gate_collar",
  CANE_BOLT: "cane_bolt",
  DROP_ROD: "drop_rod",
  FORK_LATCH: "fork_latch",
  TENSION_BAR: "tension_bar",
  TENSION_WIRE: "tension_wire",
  TOP_RAIL: "top_rail",
  BOTTOM_RAIL: "bottom_rail",
  BARBED_WIRE: "barbed_wire",
  CONCRETE: "concrete",
  GATE_FRAME: "gate_frame",
  GATE_HARDWARE: "gate_hardware"
};

const MATERIAL_TYPES = {
  BLACK: "Black",
  GALVANIZED: "Galvanized"
};

const THICKNESS_TYPES = {
  LIGHT: "0.065",
  SCH_20: "SCH 20",
  SCH_40: "SCH 40"
};

const DIAMETER_SIZES = {
  ONE_THREE_EIGHTHS: "1 3/8",
  ONE_FIVE_EIGHTHS: "1 5/8",
  ONE_SEVEN_EIGHTHS: "1 7/8",
  TWO: "2",
  TWO_AND_HALF: "2 1/2",
  THREE: "3",
  FOUR: "4"
};

// Mock the import functions that are used in materialFormulas.js
const findPostProduct = () => ({ price: 0 });
const findMeshProduct = () => ({ price: 0 });
const findProduct = () => ({ price: 0 });

// Function to escape single quotes in SQL strings
function escapeSql(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}

// Function to convert JavaScript object to SQL-safe JSON string
function objectToSqlJson(obj) {
  if (!obj) return 'NULL';
  return `'${escapeSql(JSON.stringify(obj))}'`;
}

// Function to generate SQL for creating the table
function generateCreateTableSql() {
  return `
-- Create material_formulas table
CREATE TABLE IF NOT EXISTS material_formulas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  questionnaire_trigger TEXT,
  formula_text TEXT,
  height_calculation TEXT,
  price_calculation_steps JSONB,
  price_calculation_code TEXT,
  total_cost_formula TEXT,
  price_lookup TEXT,
  additional_info TEXT,
  available_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
  `;
}

// Function to generate SQL for inserting a formula
function generateInsertSql(id, formula, category) {
  const name = id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // For code, we'll just store a placeholder since we can't easily serialize functions
  const codeString = "function(params, costs) { /* Code is stored in JavaScript */ }";
  
  return `
-- Insert ${category} formula: ${name}
INSERT INTO material_formulas (
  id, name, category, description, questionnaire_trigger, formula_text,
  height_calculation, price_calculation_steps, price_calculation_code,
  total_cost_formula, price_lookup, additional_info, available_options
) VALUES (
  '${escapeSql(id)}',
  '${escapeSql(name)}',
  '${escapeSql(category)}',
  '${escapeSql(formula.description || '')}',
  '${escapeSql(formula.questionnaire_trigger || '')}',
  '${escapeSql(formula.formula || '')}',
  '${escapeSql(formula.height_calculation || '')}',
  ${objectToSqlJson(formula.price_calculation.steps || [])},
  '${escapeSql(codeString)}',
  '${escapeSql(formula.total_cost_formula || '')}',
  '${escapeSql(formula.price_lookup || '')}',
  '${escapeSql(formula.additional_info || '')}',
  ${objectToSqlJson(formula.available_options || {})}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  questionnaire_trigger = EXCLUDED.questionnaire_trigger,
  formula_text = EXCLUDED.formula_text,
  height_calculation = EXCLUDED.height_calculation,
  price_calculation_steps = EXCLUDED.price_calculation_steps,
  price_calculation_code = EXCLUDED.price_calculation_code,
  total_cost_formula = EXCLUDED.total_cost_formula,
  price_lookup = EXCLUDED.price_lookup,
  additional_info = EXCLUDED.additional_info,
  available_options = EXCLUDED.available_options,
  updated_at = now();
  `;
}

// Main function to generate the SQL migration
function generateSqlMigration() {
  try {
    // Read the materialFormulas.js file
    const filePath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract gate formulas and post formulas using regex
    const gateFormulasMatch = fileContent.match(/export const gateFormulas = ({[\s\S]*?});/);
    const postFormulasMatch = fileContent.match(/export const postFormulas = ({[\s\S]*?});/);
    
    if (!gateFormulasMatch || !postFormulasMatch) {
      console.error('Failed to extract formulas from the file');
      return;
    }
    
    // Create a temporary JavaScript file to evaluate the formulas
    const tempJs = `
      // Constants
      const PRODUCT_TYPES = ${JSON.stringify(PRODUCT_TYPES)};
      const MATERIAL_TYPES = ${JSON.stringify(MATERIAL_TYPES)};
      const THICKNESS_TYPES = ${JSON.stringify(THICKNESS_TYPES)};
      const DIAMETER_SIZES = ${JSON.stringify(DIAMETER_SIZES)};
      
      // Mock functions
      const findPostProduct = () => ({ price: 0 });
      const findMeshProduct = () => ({ price: 0 });
      const findProduct = () => ({ price: 0 });
      
      // Formulas
      const gateFormulas = ${gateFormulasMatch[1]};
      const postFormulas = ${postFormulasMatch[1]};
      
      // Return the formulas
      return { gateFormulas, postFormulas };
    `;
    
    // Evaluate the temporary JavaScript to get the formulas
    const formulas = eval(`(function() { ${tempJs} })()`);
    
    // Generate the SQL migration
    let sql = generateCreateTableSql();
    
    // Add gate formulas
    Object.entries(formulas.gateFormulas).forEach(([id, formula]) => {
      sql += generateInsertSql(id, formula, 'gates');
    });
    
    // Add post formulas
    Object.entries(formulas.postFormulas).forEach(([id, formula]) => {
      sql += generateInsertSql(id, formula, 'posts');
    });
    
    // Write the SQL to a file
    const sqlFilePath = path.join(__dirname, '..', 'migration.sql');
    fs.writeFileSync(sqlFilePath, sql);
    
    console.log(`Generated SQL migration file: ${sqlFilePath}`);
    console.log('You can now execute this SQL in the Supabase SQL editor');
    
  } catch (error) {
    console.error('Error generating SQL migration:', error);
  }
}

// Run the function
generateSqlMigration();
