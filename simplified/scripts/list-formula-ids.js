/**
 * List Formula IDs
 * 
 * This script lists all formula IDs in the material_formulas table.
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
    
    // Get all formula IDs from the database
    const formulasResult = await client.query(`
      SELECT id, name
      FROM material_formulas
      ORDER BY id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    console.log('\nFormula IDs:');
    
    formulasResult.rows.forEach(row => {
      console.log(`'${row.id}': { // ${row.name}`);
      console.log(`  quantityFormula: "",`);
      console.log(`  description: ""`);
      console.log(`},`);
    });
    
  } catch (error) {
    console.error('Error listing formula IDs:', error);
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
