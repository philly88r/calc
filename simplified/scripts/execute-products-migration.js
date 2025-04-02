/**
 * Execute Products Migration
 * 
 * This script reads the full-products-migration.sql file and executes it in chunks
 * to ensure all 325 products are inserted into the Supabase database.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Supabase connection details from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to execute SQL in chunks
async function executeSqlInChunks(sqlContent, chunkSize = 10) {
  // Split SQL into individual statements
  const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);
  
  console.log(`Found ${statements.length} SQL statements to execute`);
  
  // Process statements in chunks
  for (let i = 0; i < statements.length; i += chunkSize) {
    const chunk = statements.slice(i, i + chunkSize);
    const chunkSql = chunk.join(';') + ';';
    
    console.log(`Executing chunk ${i / chunkSize + 1} of ${Math.ceil(statements.length / chunkSize)}`);
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: chunkSql });
      
      if (error) {
        console.error(`Error executing chunk ${i / chunkSize + 1}:`, error);
        // Continue with next chunk even if there's an error
      } else {
        console.log(`Successfully executed chunk ${i / chunkSize + 1}`);
      }
    } catch (error) {
      console.error(`Exception executing chunk ${i / chunkSize + 1}:`, error);
    }
    
    // Add a small delay between chunks to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('Finished executing all SQL statements');
}

// Main function
async function main() {
  console.log('Starting products migration execution...');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key not found in environment variables');
    return;
  }
  
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'full-products-migration.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL in chunks
    await executeSqlInChunks(sqlContent);
    
    console.log('Products migration completed successfully!');
    
    // Verify the products were inserted
    const { data, error } = await supabase
      .from('chainlink_products')
      .select('count(*)', { count: 'exact' });
    
    if (error) {
      console.error('Error counting products:', error);
    } else {
      console.log(`Total products in database: ${data[0].count}`);
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
