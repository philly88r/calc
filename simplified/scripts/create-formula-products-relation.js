/**
 * Create Formula Products Relation
 * 
 * This script creates relationships between material formulas and product types
 * in the formula_products table, allowing for efficient lookups.
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Supabase connection details from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create the formula_products table
async function createFormulaProductsTable() {
  console.log('Creating formula_products table...');
  
  try {
    // Create the formula_products table
    const createTableQuery = `
      -- Drop the table if it exists to start fresh
      DROP TABLE IF EXISTS formula_products;

      -- Create a basic table with minimal features
      CREATE TABLE formula_products (
        id SERIAL PRIMARY KEY,
        formula_id TEXT,
        product_type TEXT,
        lookup_criteria JSONB
      );
    `;
    
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableQuery });
    
    if (createError) {
      console.error('Error creating formula_products table:', createError);
      return false;
    }
    
    console.log('Created formula_products table successfully');
    return true;
  } catch (error) {
    console.error('Error in createFormulaProductsTable:', error);
    return false;
  }
}

// Function to populate the formula_products table with basic relationships
async function populateFormulaProductsTable() {
  console.log('Populating formula_products table with basic relationships...');
  
  try {
    // Get all formulas from the material_formulas table
    const { data: formulas, error: formulasError } = await supabase
      .from('material_formulas')
      .select('id, category');
    
    if (formulasError) {
      console.error('Error fetching formulas:', formulasError);
      return false;
    }
    
    if (!formulas || formulas.length === 0) {
      console.log('No formulas found in the material_formulas table');
      return false;
    }
    
    console.log(`Found ${formulas.length} formulas to process`);
    
    // Create basic relationships based on formula category
    const relationships = [];
    
    for (const formula of formulas) {
      const productTypes = [];
      
      // Determine product types based on formula category and id
      if (formula.category === 'gates') {
        productTypes.push('post');
        
        if (formula.id.includes('single_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('gate_hinge');
          productTypes.push('gate_latch');
        } else if (formula.id.includes('double_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('gate_hinge');
          productTypes.push('gate_latch');
          productTypes.push('drop_rod');
        } else if (formula.id.includes('sliding_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('cantilever_roller');
          productTypes.push('cantilever_latch');
        }
      } else if (formula.category === 'posts') {
        productTypes.push('post');
        
        if (formula.id.includes('terminal_posts') || formula.id.includes('corner_posts')) {
          productTypes.push('tension_band');
          productTypes.push('brace_band');
          productTypes.push('dome_cap');
        } else if (formula.id.includes('line_posts')) {
          productTypes.push('fence_tie');
          productTypes.push('dome_cap');
        }
      }
      
      // Add relationships for each product type
      for (const productType of productTypes) {
        relationships.push({
          formula_id: formula.id,
          product_type: productType,
          lookup_criteria: {
            formula_id: formula.id,
            product_type: productType,
            category: formula.category
          }
        });
      }
    }
    
    // Insert all relationships in a single batch
    if (relationships.length > 0) {
      const { error } = await supabase
        .from('formula_products')
        .insert(relationships);
      
      if (error) {
        console.error('Error inserting relationships:', error);
        return false;
      }
      
      console.log(`Inserted ${relationships.length} relationships successfully`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in populateFormulaProductsTable:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting formula products relation creation...');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key not found in environment variables');
    return;
  }
  
  // Create the formula_products table
  const tableCreated = await createFormulaProductsTable();
  if (!tableCreated) {
    console.error('Failed to create formula_products table. Aborting.');
    return;
  }
  
  // Populate the formula_products table
  const tablePopulated = await populateFormulaProductsTable();
  if (!tablePopulated) {
    console.error('Failed to populate formula_products table.');
    return;
  }
  
  console.log('Formula products relation creation completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
