/**
 * Setup Database Tables
 * 
 * This script sets up the necessary database tables for the fence calculator.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Check and create questionnaire_items table
    console.log('\nChecking questionnaire_items table...');
    const questionnaireTableExists = await checkTableExists(client, 'questionnaire_items');
    
    if (!questionnaireTableExists) {
      console.log('Creating questionnaire_items table...');
      await client.query(`
        CREATE TABLE questionnaire_items (
          id VARCHAR(50) PRIMARY KEY,
          question_text TEXT NOT NULL,
          input_type VARCHAR(20) NOT NULL,
          options JSONB,
          default_value TEXT,
          validation JSONB,
          dependent_on VARCHAR(50),
          dependent_value TEXT,
          "order" INTEGER NOT NULL,
          section VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      console.log('questionnaire_items table created successfully.');
    } else {
      console.log('questionnaire_items table already exists.');
    }
    
    // Check material_formulas table
    console.log('\nChecking material_formulas table...');
    const formulasTableExists = await checkTableExists(client, 'material_formulas');
    
    if (formulasTableExists) {
      console.log('material_formulas table exists.');
      
      // Check if questionnaire_trigger column exists
      const triggerColumnExists = await checkColumnExists(client, 'material_formulas', 'questionnaire_trigger');
      
      if (!triggerColumnExists) {
        console.log('Adding questionnaire_trigger column to material_formulas...');
        await client.query(`
          ALTER TABLE material_formulas
          ADD COLUMN questionnaire_trigger TEXT;
        `);
        console.log('questionnaire_trigger column added successfully.');
      } else {
        console.log('questionnaire_trigger column already exists.');
      }
    } else {
      console.log('material_formulas table does not exist. Please run the formula setup scripts first.');
    }
    
    // Check formula_products table
    console.log('\nChecking formula_products table...');
    const productsTableExists = await checkTableExists(client, 'formula_products');
    
    if (!productsTableExists) {
      console.log('Creating formula_products table...');
      await client.query(`
        CREATE TABLE formula_products (
          id SERIAL PRIMARY KEY,
          formula_id VARCHAR(50) NOT NULL,
          product_type VARCHAR(50) NOT NULL,
          lookup_criteria JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          FOREIGN KEY (formula_id) REFERENCES material_formulas(id)
        );
      `);
      console.log('formula_products table created successfully.');
    } else {
      console.log('formula_products table already exists.');
    }
    
    // Check chainlink_products table
    console.log('\nChecking chainlink_products table...');
    const chainlinkTableExists = await checkTableExists(client, 'chainlink_products');
    
    if (chainlinkTableExists) {
      console.log('chainlink_products table exists.');
    } else {
      console.log('chainlink_products table does not exist. Please run the product setup scripts first.');
    }
    
    // Print summary of database structure
    console.log('\nDatabase Structure Summary:');
    
    const tables = [
      'questionnaire_items',
      'material_formulas',
      'formula_products',
      'chainlink_products'
    ];
    
    for (const table of tables) {
      const exists = await checkTableExists(client, table);
      console.log(`- ${table}: ${exists ? 'Exists' : 'Does not exist'}`);
      
      if (exists) {
        const countResult = await client.query(`SELECT COUNT(*) FROM ${table};`);
        console.log(`  - Row count: ${countResult.rows[0].count}`);
      }
    }
    
    console.log('\nNext steps:');
    console.log('1. Ensure all questionnaire items are added to the questionnaire_items table.');
    console.log('2. Update material_formulas with appropriate questionnaire_trigger values.');
    console.log('3. Create formula_products mappings for all formulas.');
    console.log('4. Update the frontend to use the database-driven components.');
    
  } catch (error) {
    console.error('Error setting up database tables:', error);
  } finally {
    // Close the PostgreSQL connection
    await client.end();
    console.log('\nPostgreSQL connection closed');
  }
}

// Helper function to check if a table exists
async function checkTableExists(client, tableName) {
  const result = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = $1
    );
  `, [tableName]);
  
  return result.rows[0].exists;
}

// Helper function to check if a column exists
async function checkColumnExists(client, tableName, columnName) {
  const result = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = $1
      AND column_name = $2
    );
  `, [tableName, columnName]);
  
  return result.rows[0].exists;
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
