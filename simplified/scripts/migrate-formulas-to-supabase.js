/**
 * Migration Script: Material Formulas to Supabase
 * 
 * This script migrates the material formulas from JavaScript objects to Supabase tables.
 * It creates the necessary tables and inserts the data from materialFormulas.js.
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Supabase connection details from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Found (not showing for security)' : 'Not found');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Since materialFormulas.js uses ES modules and we're using CommonJS,
// we'll need to extract the data manually
const extractFormulasData = () => {
  try {
    // Read the materialFormulas.js file
    const materialFormulasPath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
    const fileContent = fs.readFileSync(materialFormulasPath, 'utf8');
    
    // Extract gate formulas using regex
    const gateFormulasMatch = fileContent.match(/export const gateFormulas = ({[\s\S]*?});/);
    const gateFormulasString = gateFormulasMatch ? gateFormulasMatch[1] : '{}';
    
    // Extract post formulas using regex
    const postFormulasMatch = fileContent.match(/export const postFormulas = ({[\s\S]*?});/);
    const postFormulasString = postFormulasMatch ? postFormulasMatch[1] : '{}';
    
    // Convert to JavaScript objects (this is a simplified approach and may not work for complex objects)
    // For a production environment, you would want to use a more robust approach
    const gateFormulas = eval(`(${gateFormulasString})`);
    const postFormulas = eval(`(${postFormulasString})`);
    
    return { gateFormulas, postFormulas };
  } catch (error) {
    console.error('Error extracting formulas data:', error);
    return { gateFormulas: {}, postFormulas: {} };
  }
};

// Extract the formulas data
const { gateFormulas, postFormulas } = extractFormulasData();

// Function to create the material_formulas table
async function createMaterialFormulasTable() {
  console.log('Creating material_formulas table...');
  
  try {
    // Check if the table exists
    const { data, error } = await supabase
      .from('material_formulas')
      .select('id')
      .limit(1);
    
    if (error && error.code === '42P01') { // Table doesn't exist
      // Create the table using SQL query
      const { error: createError } = await supabase
        .from('_sql')
        .rpc('execute', {
          query: `
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
          `
        });
      
      if (createError) {
        console.error('Error creating material_formulas table:', createError);
        return false;
      }
      
      console.log('Created material_formulas table');
      return true;
    } else if (error) {
      console.error('Error checking material_formulas table:', error);
      return false;
    }
    
    console.log('material_formulas table already exists');
    return true;
  } catch (error) {
    console.error('Error in createMaterialFormulasTable:', error);
    return false;
  }
}

// Function to insert gate formulas
async function insertGateFormulas() {
  console.log('Inserting gate formulas...');
  
  try {
    const formulas = Object.entries(gateFormulas).map(([key, formula]) => {
      // Convert the code function to a string
      const codeString = formula.price_calculation.code.toString();
      
      return {
        id: key,
        name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        category: 'gates',
        description: formula.description || '',
        questionnaire_trigger: formula.questionnaire_trigger || '',
        formula_text: formula.formula || '',
        price_calculation_steps: formula.price_calculation.steps || [],
        price_calculation_code: codeString,
        total_cost_formula: formula.total_cost_formula || '',
        available_options: formula.available_options || {}
      };
    });
    
    if (formulas.length === 0) {
      console.warn('No gate formulas found to insert');
      return true;
    }
    
    const { data, error } = await supabase
      .from('material_formulas')
      .upsert(formulas, { onConflict: 'id' });
    
    if (error) {
      console.error('Error inserting gate formulas:', error);
      return false;
    }
    
    console.log(`Inserted ${formulas.length} gate formulas`);
    return true;
  } catch (error) {
    console.error('Error in insertGateFormulas:', error);
    return false;
  }
}

// Function to insert post formulas
async function insertPostFormulas() {
  console.log('Inserting post formulas...');
  
  try {
    const formulas = Object.entries(postFormulas).map(([key, formula]) => {
      // Convert the code function to a string
      const codeString = formula.price_calculation.code.toString();
      
      return {
        id: key,
        name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        category: 'posts',
        description: formula.description || '',
        questionnaire_trigger: formula.questionnaire_trigger || '',
        formula_text: formula.formula || '',
        height_calculation: formula.height_calculation || '',
        price_calculation_steps: formula.price_calculation.steps || [],
        price_calculation_code: codeString,
        total_cost_formula: formula.total_cost_formula || '',
        price_lookup: formula.price_lookup || '',
        additional_info: formula.additional_info || '',
        available_options: formula.available_options || {}
      };
    });
    
    if (formulas.length === 0) {
      console.warn('No post formulas found to insert');
      return true;
    }
    
    const { data, error } = await supabase
      .from('material_formulas')
      .upsert(formulas, { onConflict: 'id' });
    
    if (error) {
      console.error('Error inserting post formulas:', error);
      return false;
    }
    
    console.log(`Inserted ${formulas.length} post formulas`);
    return true;
  } catch (error) {
    console.error('Error in insertPostFormulas:', error);
    return false;
  }
}

// Main migration function
async function migrateFormulasToSupabase() {
  console.log('Starting migration of material formulas to Supabase...');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key not found in environment variables');
    return;
  }
  
  // Create the material_formulas table if it doesn't exist
  const tableCreated = await createMaterialFormulasTable();
  if (!tableCreated) {
    console.error('Failed to create material_formulas table. Aborting migration.');
    return;
  }
  
  // Insert the gate formulas
  const gateFormulasInserted = await insertGateFormulas();
  if (!gateFormulasInserted) {
    console.error('Failed to insert gate formulas. Aborting migration.');
    return;
  }
  
  // Insert the post formulas
  const postFormulasInserted = await insertPostFormulas();
  if (!postFormulasInserted) {
    console.error('Failed to insert post formulas. Aborting migration.');
    return;
  }
  
  console.log('Migration completed successfully!');
}

// Run the migration
migrateFormulasToSupabase().catch(error => {
  console.error('Migration failed:', error);
});
