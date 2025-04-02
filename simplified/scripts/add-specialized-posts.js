/**
 * Add Specialized Post Products to Supabase
 * 
 * This script adds specialized post types like flanged posts,
 * duckbill gate stop posts, etc. to the Supabase database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Specialized post products to add
const specializedPosts = [
  // Duckbill gate stop posts
  {
    sku: '13301',
    type: 'duckbill_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: '',
    length: '6ft',
    height: '',
    price: 28.95
  },
  {
    sku: '13302',
    type: 'duckbill_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: '',
    length: '8ft',
    height: '',
    price: 36.95
  },
  {
    sku: '13303',
    type: 'duckbill_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: '',
    length: '6ft',
    height: '',
    price: 32.95
  },
  {
    sku: '13304',
    type: 'duckbill_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: '',
    length: '8ft',
    height: '',
    price: 42.95
  },
  
  // Flanged posts centered
  {
    sku: '13401',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2',
    size: 'Centered',
    length: '6ft',
    height: '',
    price: 34.95
  },
  {
    sku: '13402',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Centered',
    length: '6ft',
    height: '',
    price: 38.95
  },
  {
    sku: '13403',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '3',
    size: 'Centered',
    length: '6ft',
    height: '',
    price: 46.95
  },
  {
    sku: '13404',
    type: 'flanged_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2',
    size: 'Centered',
    length: '6ft',
    height: '',
    price: 39.95
  },
  {
    sku: '13405',
    type: 'flanged_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Centered',
    length: '6ft',
    height: '',
    price: 44.95
  },
  
  // Flanged posts off centered
  {
    sku: '13501',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2',
    size: 'Off Centered',
    length: '6ft',
    height: '',
    price: 36.95
  },
  {
    sku: '13502',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Off Centered',
    length: '6ft',
    height: '',
    price: 40.95
  },
  {
    sku: '13503',
    type: 'flanged_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '3',
    size: 'Off Centered',
    length: '6ft',
    height: '',
    price: 48.95
  },
  {
    sku: '13504',
    type: 'flanged_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2',
    size: 'Off Centered',
    length: '6ft',
    height: '',
    price: 41.95
  },
  {
    sku: '13505',
    type: 'flanged_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Off Centered',
    length: '6ft',
    height: '',
    price: 46.95
  },
  
  // Single gate posts
  {
    sku: '13601',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Single',
    length: '8ft',
    height: '',
    price: 32.95
  },
  {
    sku: '13602',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Single',
    length: '8ft',
    height: '',
    price: 42.95
  },
  {
    sku: '13603',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 3/8',
    size: 'Single',
    length: '8ft',
    height: '',
    price: 38.95
  },
  {
    sku: '13604',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Single',
    length: '8ft',
    height: '',
    price: 48.95
  },
  
  // Double gate posts
  {
    sku: '13701',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Double',
    length: '8ft',
    height: '',
    price: 42.95
  },
  {
    sku: '13702',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '4',
    size: 'Double',
    length: '8ft',
    height: '',
    price: 64.95
  },
  {
    sku: '13703',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Double',
    length: '8ft',
    height: '',
    price: 48.95
  },
  {
    sku: '13704',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '4',
    size: 'Double',
    length: '8ft',
    height: '',
    price: 72.95
  },
  
  // Sliding gate posts
  {
    sku: '13801',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Sliding',
    length: '8ft',
    height: '',
    price: 42.95
  },
  {
    sku: '13802',
    type: 'gate_post',
    material: 'Galv',
    thickness: 'SCH 40',
    diameter: '4',
    size: 'Sliding',
    length: '8ft',
    height: '',
    price: 64.95
  },
  {
    sku: '13803',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '2 7/8',
    size: 'Sliding',
    length: '8ft',
    height: '',
    price: 48.95
  },
  {
    sku: '13804',
    type: 'gate_post',
    material: 'Black',
    thickness: 'SCH 40',
    diameter: '4',
    size: 'Sliding',
    length: '8ft',
    height: '',
    price: 72.95
  }
];

// Main function
async function main() {
  console.log('Starting to add specialized post products to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each product
    console.log('Adding specialized post products...');
    
    for (const product of specializedPosts) {
      // Check if product already exists
      const checkResult = await client.query(
        'SELECT sku FROM chainlink_products WHERE sku = $1',
        [product.sku]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`Product with SKU ${product.sku} already exists, updating...`);
        
        // Update existing product
        await client.query(
          `UPDATE chainlink_products 
           SET type = $1, material = $2, thickness = $3, diameter = $4, size = $5, length = $6, height = $7, price = $8
           WHERE sku = $9`,
          [
            product.type,
            product.material,
            product.thickness,
            product.diameter,
            product.size,
            product.length,
            product.height,
            product.price,
            product.sku
          ]
        );
      } else {
        console.log(`Adding new product with SKU ${product.sku}...`);
        
        // Insert new product
        await client.query(
          `INSERT INTO chainlink_products 
           (sku, type, material, thickness, diameter, size, length, height, price)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            product.sku,
            product.type,
            product.material,
            product.thickness,
            product.diameter,
            product.size,
            product.length,
            product.height,
            product.price
          ]
        );
      }
    }
    
    // Count products by type
    const productTypes = [...new Set(specializedPosts.map(p => p.type))];
    
    for (const type of productTypes) {
      const countResult = await client.query(
        'SELECT COUNT(*) FROM chainlink_products WHERE type = $1',
        [type]
      );
      
      console.log(`${type} products in database: ${countResult.rows[0].count}`);
    }
    
    console.log('Specialized post products added successfully!');
    
  } catch (error) {
    console.error('Error adding specialized post products:', error);
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
