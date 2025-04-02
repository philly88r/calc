/**
 * Check Lookup Criteria
 * 
 * This script checks the lookup_criteria field in the formula_products table.
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
    
    // Get lookup_criteria from formula_products table
    console.log('Lookup criteria in formula_products table:');
    const lookupResult = await client.query(`
      SELECT formula_id, product_type, lookup_criteria
      FROM formula_products
      ORDER BY formula_id, product_type;
    `);
    
    if (lookupResult.rows.length === 0) {
      console.log('No data found in the table');
    } else {
      lookupResult.rows.forEach((row, index) => {
        console.log(`\n${index + 1}. ${row.formula_id} -> ${row.product_type}:`);
        if (row.lookup_criteria) {
          const criteria = row.lookup_criteria;
          Object.entries(criteria).forEach(([key, value]) => {
            console.log(`   - ${key}: ${value === null ? 'null' : value}`);
          });
        } else {
          console.log('   No lookup criteria defined');
        }
      });
    }
    
    // Check how the lookup criteria is used with chainlink_products
    console.log('\nExample of how lookup criteria is used:');
    const exampleResult = await client.query(`
      SELECT fp.formula_id, fp.product_type, fp.lookup_criteria, 
             COUNT(cp.id) as matching_products
      FROM formula_products fp
      LEFT JOIN chainlink_products cp ON cp.type = fp.product_type
      GROUP BY fp.formula_id, fp.product_type, fp.lookup_criteria
      LIMIT 10;
    `);
    
    exampleResult.rows.forEach((row, index) => {
      console.log(`\n${index + 1}. ${row.formula_id} -> ${row.product_type}:`);
      console.log(`   - Matching products: ${row.matching_products}`);
      if (row.lookup_criteria) {
        console.log('   - Lookup criteria:');
        const criteria = row.lookup_criteria;
        Object.entries(criteria).forEach(([key, value]) => {
          console.log(`     * ${key}: ${value === null ? 'null' : value}`);
        });
      }
    });
    
    // Check a specific formula's products
    const formulaToCheck = 'terminal_posts';
    console.log(`\nProducts for formula ${formulaToCheck}:`);
    
    const specificFormulaResult = await client.query(`
      SELECT fp.product_type, fp.lookup_criteria
      FROM formula_products fp
      WHERE fp.formula_id = $1
      ORDER BY fp.product_type;
    `, [formulaToCheck]);
    
    specificFormulaResult.rows.forEach((row, index) => {
      console.log(`\n${index + 1}. ${row.product_type}:`);
      if (row.lookup_criteria) {
        const criteria = row.lookup_criteria;
        Object.entries(criteria).forEach(([key, value]) => {
          console.log(`   - ${key}: ${value === null ? 'null' : value}`);
        });
      } else {
        console.log('   No lookup criteria defined');
      }
    });
    
  } catch (error) {
    console.error('Error checking lookup criteria:', error);
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
