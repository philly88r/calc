/**
 * Check Chainlink Products Structure
 * 
 * This script checks the structure and sample data of the chainlink_products table.
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
    
    // Get column information for chainlink_products table
    console.log('\nColumns in chainlink_products table:');
    const columnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'chainlink_products'
      ORDER BY ordinal_position;
    `);
    
    columnsResult.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
    
    // Check post products
    console.log('\nSample post products:');
    const postResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE type = 'post'
      LIMIT 10;
    `);
    
    postResult.rows.forEach((row, index) => {
      console.log(`\nPost ${index + 1}:`);
      Object.entries(row).forEach(([key, value]) => {
        console.log(`- ${key}: ${value === null ? 'null' : value}`);
      });
    });
    
    // Check for posts with specific diameter
    console.log('\nPosts with 2 7/8 diameter:');
    const specificPostResult = await client.query(`
      SELECT id, sku, material, diameter, thickness, height, length, price
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        diameter = '2 7/8'
      LIMIT 10;
    `);
    
    specificPostResult.rows.forEach(row => {
      console.log(`- ID: ${row.id}, SKU: ${row.sku}, Material: ${row.material}, Diameter: ${row.diameter}, Thickness: ${row.thickness}, Height: ${row.height}, Length: ${row.length}, Price: $${row.price}`);
    });
    
    // Check for Galvanized posts
    console.log('\nGalvanized posts:');
    const galvanizedPostResult = await client.query(`
      SELECT id, sku, material, diameter, thickness, height, length, price
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        LOWER(material) LIKE '%galv%'
      LIMIT 10;
    `);
    
    galvanizedPostResult.rows.forEach(row => {
      console.log(`- ID: ${row.id}, SKU: ${row.sku}, Material: ${row.material}, Diameter: ${row.diameter}, Thickness: ${row.thickness}, Height: ${row.height}, Length: ${row.length}, Price: $${row.price}`);
    });
    
    // Check for posts with non-null height
    console.log('\nPosts with non-null height:');
    const nonNullHeightResult = await client.query(`
      SELECT id, sku, material, diameter, thickness, height, length, price
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        height IS NOT NULL
      LIMIT 10;
    `);
    
    nonNullHeightResult.rows.forEach(row => {
      console.log(`- ID: ${row.id}, SKU: ${row.sku}, Material: ${row.material}, Diameter: ${row.diameter}, Thickness: ${row.thickness}, Height: ${row.height}, Length: ${row.length}, Price: $${row.price}`);
    });
    
    // Check for posts with non-null length
    console.log('\nPosts with non-null length:');
    const nonNullLengthResult = await client.query(`
      SELECT id, sku, material, diameter, thickness, height, length, price
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        length IS NOT NULL
      LIMIT 10;
    `);
    
    nonNullLengthResult.rows.forEach(row => {
      console.log(`- ID: ${row.id}, SKU: ${row.sku}, Material: ${row.material}, Diameter: ${row.diameter}, Thickness: ${row.thickness}, Height: ${row.height}, Length: ${row.length}, Price: $${row.price}`);
    });
    
  } catch (error) {
    console.error('Error checking chainlink products structure:', error);
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
