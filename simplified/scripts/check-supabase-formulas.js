/**
 * Check Supabase Formulas
 * 
 * This script checks if the material formulas were successfully migrated to Supabase.
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

// Function to check if the material_formulas table exists and has data
async function checkFormulasTable() {
  console.log('Checking material_formulas table...');
  
  try {
    // Query the material_formulas table
    const { data, error } = await supabase
      .from('material_formulas')
      .select('id, name, category')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error querying material_formulas table:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No formulas found in the material_formulas table');
      return;
    }
    
    console.log(`Found ${data.length} formulas in the material_formulas table:`);
    
    // Group formulas by category
    const categorizedFormulas = data.reduce((acc, formula) => {
      if (!acc[formula.category]) {
        acc[formula.category] = [];
      }
      acc[formula.category].push(formula);
      return acc;
    }, {});
    
    // Display formulas by category
    Object.entries(categorizedFormulas).forEach(([category, formulas]) => {
      console.log(`\n${category.toUpperCase()} (${formulas.length}):`);
      formulas.forEach(formula => {
        console.log(`  - ${formula.name} (${formula.id})`);
      });
    });
    
    console.log('\nFormulas have been successfully migrated to Supabase!');
  } catch (error) {
    console.error('Error checking formulas table:', error);
  }
}

// Run the function
checkFormulasTable().catch(error => {
  console.error('Unhandled error:', error);
});
