/**
 * PostgreSQL Direct Products Migration
 * 
 * This script uses a direct PostgreSQL connection to migrate all products
 * from the full-products-migration.sql file to the Supabase database.
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Function to parse SQL statements from a file
function parseSqlStatements(sqlContent) {
  // Split SQL into individual statements
  return sqlContent
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0)
    .map(stmt => stmt + ';');
}

// Function to create the chainlink_products table
async function createProductsTable(client) {
  console.log('Creating chainlink_products table...');
  
  const createTableSql = `
    -- Drop the table if it exists to start fresh
    DROP TABLE IF EXISTS chainlink_products;

    -- Create a basic table with minimal features
    CREATE TABLE chainlink_products (
      id SERIAL PRIMARY KEY,
      sku TEXT,
      type TEXT,
      material TEXT,
      thickness TEXT,
      diameter TEXT,
      size TEXT,
      length TEXT,
      height TEXT,
      price NUMERIC(10, 2)
    );
  `;
  
  try {
    await client.query(createTableSql);
    console.log('Successfully created chainlink_products table');
    return true;
  } catch (error) {
    console.error('Error creating chainlink_products table:', error);
    return false;
  }
}

// Function to execute SQL statements in batches
async function executeStatements(client, statements, batchSize = 10) {
  console.log(`Executing ${statements.length} SQL statements in batches of ${batchSize}...`);
  
  // Process statements in batches
  for (let i = 0; i < statements.length; i += batchSize) {
    const batchStatements = statements.slice(i, Math.min(i + batchSize, statements.length));
    
    console.log(`Executing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(statements.length / batchSize)}`);
    
    // Execute each statement in the batch
    for (const statement of batchStatements) {
      try {
        await client.query(statement);
      } catch (error) {
        console.error(`Error executing statement: ${statement.substring(0, 100)}...`, error);
        // Continue with next statement even if there's an error
      }
    }
    
    console.log(`Completed batch ${Math.floor(i / batchSize) + 1}`);
  }
  
  console.log('Finished executing all SQL statements');
}

// Main function
async function main() {
  console.log('Starting PostgreSQL direct products migration...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create the chainlink_products table
    const tableCreated = await createProductsTable(client);
    if (!tableCreated) {
      console.error('Failed to create chainlink_products table. Aborting.');
      await client.end();
      return;
    }
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'full-products-migration.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Parse SQL statements
    const statements = parseSqlStatements(sqlContent);
    console.log(`Parsed ${statements.length} SQL statements from file`);
    
    // Execute statements
    await executeStatements(client, statements);
    
    // Verify the products were inserted
    const countResult = await client.query('SELECT COUNT(*) FROM chainlink_products');
    console.log(`Total products in database: ${countResult.rows[0].count}`);
    
    console.log('Products migration completed successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('Closing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
