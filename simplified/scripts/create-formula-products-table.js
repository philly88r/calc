/**
 * Create Formula Products Table
 * 
 * This script creates a formula_products table in Supabase to link formulas with product types.
 * This table will help establish relationships between formulas and the products they use.
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

// Function to create the formula_products table
async function createFormulaProductsTable() {
  console.log('Creating formula_products table...');
  
  try {
    // Create the formula_products table
    const { error } = await supabase
      .from('formula_products')
      .select('id')
      .limit(1)
      .catch(err => {
        // If the table doesn't exist, create it
        if (err.message.includes('relation "formula_products" does not exist')) {
          return { error: { code: '42P01' } };
        }
        return { error: err };
      });
    
    if (error && error.code === '42P01') {
      // Table doesn't exist, create it
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS formula_products (
          id SERIAL PRIMARY KEY,
          formula_id TEXT NOT NULL REFERENCES material_formulas(id),
          product_type TEXT NOT NULL,
          lookup_criteria JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
          UNIQUE (formula_id, product_type)
        );

        -- Create index on formula_id for faster lookups
        CREATE INDEX IF NOT EXISTS idx_formula_products_formula_id ON formula_products(formula_id);
      `;
      
      const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableQuery });
      
      if (createError) {
        console.error('Error creating formula_products table:', createError);
        return false;
      }
      
      console.log('Created formula_products table successfully');
    } else if (error) {
      console.error('Error checking formula_products table:', error);
      return false;
    } else {
      console.log('formula_products table already exists');
    }
    
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
      
      // Insert relationships for each product type
      for (const productType of productTypes) {
        const { error } = await supabase
          .from('formula_products')
          .upsert({
            formula_id: formula.id,
            product_type: productType,
            lookup_criteria: {
              formula_id: formula.id,
              product_type: productType,
              category: formula.category
            }
          }, { onConflict: 'formula_id, product_type' });
        
        if (error) {
          console.error(`Error inserting relationship for ${formula.id} and ${productType}:`, error);
        } else {
          console.log(`Inserted/updated relationship for ${formula.id} and ${productType}`);
        }
      }
    }
    
    console.log('Populated formula_products table successfully');
    return true;
  } catch (error) {
    console.error('Error in populateFormulaProductsTable:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting formula products table creation and population...');
  
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
  
  console.log('Formula products table creation and population completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
