/**
 * Create Material Formulas Table in Supabase
 * 
 * This script creates the material_formulas table in Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Supabase connection details from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Found (not showing for security)' : 'Not found');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// SQL query to create the material_formulas table
const createTableQuery = `
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

// Function to create the table
async function createTable() {
  console.log('Creating material_formulas table...');
  
  try {
    // Execute the SQL query
    const { error } = await supabase.rpc('exec_sql', { sql: createTableQuery });
    
    if (error) {
      console.error('Error creating material_formulas table:', error);
      return false;
    }
    
    console.log('Created material_formulas table successfully');
    return true;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return false;
  }
}

// Run the function
createTable().catch(error => {
  console.error('Failed to create table:', error);
});
