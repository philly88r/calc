const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parser');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// CSV file path
const CSV_FILE_PATH = 'C:\\Users\\info\\Downloads\\Untitled spreadsheet - Sheet1.csv';

// Function to process the CSV file
async function importChainlinkProducts() {
  console.log('Starting import process...');
  
  try {
    // First, truncate the existing table
    console.log('Truncating existing table...');
    const { error: truncateError } = await supabase.rpc('truncate_chainlink_products');
    
    if (truncateError) {
      console.error('Error truncating table:', truncateError);
      return;
    }
    
    // Read and process the CSV file
    console.log(`Reading data from ${CSV_FILE_PATH}...`);
    const products = [];
    
    // Create a promise to read the CSV file
    const readCsvPromise = new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (row) => {
          // Convert empty strings to null
          Object.keys(row).forEach(key => {
            if (row[key] === '') {
              row[key] = null;
            }
          });
          
          // Handle numeric values
          const supplyPrice = row.supply_price ? parseFloat(row.supply_price) : 0;
          const retailPrice = row.retail_price ? parseFloat(row.retail_price) : 0;
          
          // Create a product object
          const product = {
            sku: row.sku,
            name: row.name,
            product_category: row.product_category,
            variant_option_one_name: row.variant_option_one_name,
            variant_option_one_value: row.variant_option_one_value,
            variant_option_two_name: row.variant_option_two_name,
            variant_option_two_value: row.variant_option_two_value,
            variant_option_three_name: row.variant_option_three_name,
            variant_option_three_value: row.variant_option_three_value,
            supply_price: supplyPrice,
            retail_price: retailPrice
          };
          
          products.push(product);
        })
        .on('end', () => {
          console.log(`Finished reading ${products.length} products from CSV`);
          resolve(products);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
    
    // Wait for CSV reading to complete
    await readCsvPromise;
    
    // Insert data in batches for better performance
    const batchSize = 100;
    const totalProducts = products.length;
    console.log(`Inserting ${totalProducts} products into the database...`);
    
    // Process in batches
    for (let i = 0; i < totalProducts; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      console.log(`Inserting batch ${batchNumber} (${batch.length} products)`);
      
      const { error: insertError } = await supabase
        .from('chainlink_products')
        .insert(batch);
      
      if (insertError) {
        console.error(`Error inserting batch ${batchNumber}:`, insertError);
      } else {
        console.log(`Successfully inserted batch ${batchNumber}`);
      }
    }
    
    // Verify the count in the database
    const { data: countData, error: countError } = await supabase
      .from('chainlink_products')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error getting count:', countError);
    } else {
      console.log(`Total products in database after import: ${countData.count}`);
    }
    
    console.log('Import process completed.');
    
  } catch (error) {
    console.error('Error during import process:', error);
  }
}

// Create the stored procedure for truncating the table (run this once)
async function createTruncateProcedure() {
  const { error } = await supabase.rpc('create_truncate_procedure');
  
  if (error) {
    console.error('Error creating procedure:', error);
  } else {
    console.log('Truncate procedure created successfully');
  }
}

// Function to create the stored procedure
async function setupDatabase() {
  // Create the stored procedure for truncating the table
  const { error } = await supabase.rpc('execute_sql', {
    sql_query: `
      CREATE OR REPLACE FUNCTION truncate_chainlink_products()
      RETURNS void AS $$
      BEGIN
        TRUNCATE TABLE public.chainlink_products;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `
  });
  
  if (error) {
    console.error('Error setting up database:', error);
  } else {
    console.log('Database setup completed');
    // Now run the import
    await importChainlinkProducts();
  }
}

// Run the script
setupDatabase().catch(console.error);
