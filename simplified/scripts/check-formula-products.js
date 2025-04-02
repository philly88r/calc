/**
 * Check Formula Products
 * 
 * This script checks the structure and contents of the formula_products table.
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
    
    // Get column information for formula_products table
    console.log('Columns in formula_products table:');
    const columnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'formula_products'
      ORDER BY ordinal_position;
    `);
    
    columnsResult.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
    
    // Get sample data from formula_products table
    console.log('\nSample data from formula_products table:');
    const sampleResult = await client.query(`
      SELECT *
      FROM formula_products
      LIMIT 5;
    `);
    
    if (sampleResult.rows.length === 0) {
      console.log('No data found in the table');
    } else {
      sampleResult.rows.forEach((row, index) => {
        console.log(`\nRow ${index + 1}:`);
        Object.entries(row).forEach(([key, value]) => {
          console.log(`- ${key}: ${value === null ? 'null' : value}`);
        });
      });
    }
    
    // Count relationships by formula_id
    console.log('\nRelationships count by formula_id:');
    const countResult = await client.query(`
      SELECT formula_id, COUNT(*) as count
      FROM formula_products
      GROUP BY formula_id
      ORDER BY count DESC;
    `);
    
    countResult.rows.forEach(row => {
      console.log(`- ${row.formula_id}: ${row.count} relationships`);
    });
    
    // Join with material_formulas to get formula names
    console.log('\nFormula products with formula names:');
    const joinResult = await client.query(`
      SELECT fp.*, mf.name as formula_name
      FROM formula_products fp
      JOIN material_formulas mf ON fp.formula_id = mf.id
      LIMIT 10;
    `);
    
    if (joinResult.rows.length === 0) {
      console.log('No joined data found');
    } else {
      joinResult.rows.forEach((row, index) => {
        console.log(`\nRelationship ${index + 1}:`);
        console.log(`- Formula: ${row.formula_name} (${row.formula_id})`);
        console.log(`- Product Type: ${row.product_type || 'null'}`);
        if (row.product_size) console.log(`- Product Size: ${row.product_size}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking formula_products table:', error);
  } finally {
    // Close the PostgreSQL connection
    await client.end();
    console.log('\nPostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
