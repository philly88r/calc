/**
 * Migrate All Formulas to Supabase
 * 
 * This script extracts all formulas from materialFormulas.js and migrates them to Supabase.
 * It uses a direct approach to ensure all formulas are captured.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
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

// Function to read the materialFormulas.js file
function readMaterialFormulasFile() {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading materialFormulas.js:', error);
    return null;
  }
}

// Function to extract all formula objects from the file content
function extractAllFormulas(fileContent) {
  if (!fileContent) return {};
  
  const formulas = {};
  
  // Extract all export const statements
  const exportRegex = /export const (\w+) = ({[\s\S]*?});/g;
  let match;
  
  while ((match = exportRegex.exec(fileContent)) !== null) {
    const formulaName = match[1];
    const formulaContent = match[2];
    
    // Skip non-formula exports (like constants)
    if (formulaName === 'gateFormulas' || formulaName === 'postFormulas') {
      try {
        // Parse the formula content
        const formulaObj = parseFormulaContent(formulaContent);
        formulas[formulaName] = formulaObj;
      } catch (error) {
        console.error(`Error parsing ${formulaName}:`, error);
      }
    }
  }
  
  return formulas;
}

// Function to parse formula content into a JavaScript object
function parseFormulaContent(content) {
  try {
    // This is a simplified approach and may not work for all cases
    // For a production environment, you would want to use a more robust approach
    return eval(`(${content})`);
  } catch (error) {
    console.error('Error parsing formula content:', error);
    return {};
  }
}

// Function to prepare formulas for insertion
function prepareFormulasForInsertion(formulas) {
  const result = [];
  
  // Process gate formulas
  if (formulas.gateFormulas) {
    Object.entries(formulas.gateFormulas).forEach(([key, formula]) => {
      try {
        // Convert the code function to a string
        const codeString = formula.price_calculation.code.toString();
        
        result.push({
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
        });
      } catch (error) {
        console.error(`Error preparing gate formula ${key}:`, error);
      }
    });
  }
  
  // Process post formulas
  if (formulas.postFormulas) {
    Object.entries(formulas.postFormulas).forEach(([key, formula]) => {
      try {
        // Convert the code function to a string
        const codeString = formula.price_calculation.code.toString();
        
        result.push({
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
        });
      } catch (error) {
        console.error(`Error preparing post formula ${key}:`, error);
      }
    });
  }
  
  return result;
}

// Function to insert formulas into Supabase
async function insertFormulasIntoSupabase(formulas) {
  if (formulas.length === 0) {
    console.warn('No formulas to insert');
    return false;
  }
  
  console.log(`Inserting ${formulas.length} formulas into Supabase...`);
  
  // Insert in batches to avoid payload size limits
  const batchSize = 10;
  for (let i = 0; i < formulas.length; i += batchSize) {
    const batch = formulas.slice(i, i + batchSize);
    
    console.log(`Inserting batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(formulas.length / batchSize)}...`);
    
    try {
      const { data, error } = await supabase
        .from('material_formulas')
        .upsert(batch, { onConflict: 'id' });
      
      if (error) {
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
        return false;
      }
      
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} successfully`);
    } catch (error) {
      console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
      return false;
    }
  }
  
  console.log('All formulas inserted successfully');
  return true;
}

// Main function to migrate formulas
async function migrateFormulas() {
  console.log('Starting migration of all formulas to Supabase...');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key not found in environment variables');
    return;
  }
  
  // Read the materialFormulas.js file
  const fileContent = readMaterialFormulasFile();
  if (!fileContent) {
    console.error('Failed to read materialFormulas.js. Aborting migration.');
    return;
  }
  
  // Extract all formulas
  const formulas = extractAllFormulas(fileContent);
  console.log('Extracted formulas:', Object.keys(formulas));
  
  // Check if we have any formulas
  if (Object.keys(formulas).length === 0) {
    console.error('No formulas extracted. Aborting migration.');
    return;
  }
  
  // Prepare formulas for insertion
  const formulasToInsert = prepareFormulasForInsertion(formulas);
  console.log(`Prepared ${formulasToInsert.length} formulas for insertion`);
  
  // Insert formulas into Supabase
  const inserted = await insertFormulasIntoSupabase(formulasToInsert);
  if (!inserted) {
    console.error('Failed to insert formulas. Migration incomplete.');
    return;
  }
  
  console.log('Migration completed successfully!');
}

// Run the migration
migrateFormulas().catch(error => {
  console.error('Migration failed:', error);
});
