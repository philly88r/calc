/**
 * Add Gate Products to Supabase
 * 
 * This script adds gate-related products to the Supabase database
 * that were missing from the original migration.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Gate products to add
const gateProducts = [
  // Gate Frames
  {
    sku: '20001',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '4ft',
    height: '4ft',
    price: 125.00
  },
  {
    sku: '20002',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '5ft',
    height: '4ft',
    price: 145.00
  },
  {
    sku: '20003',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '6ft',
    height: '4ft',
    price: 165.00
  },
  {
    sku: '20004',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '4ft',
    height: '5ft',
    price: 145.00
  },
  {
    sku: '20005',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '5ft',
    height: '5ft',
    price: 165.00
  },
  {
    sku: '20006',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '6ft',
    height: '5ft',
    price: 185.00
  },
  {
    sku: '20007',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '4ft',
    height: '6ft',
    price: 165.00
  },
  {
    sku: '20008',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '5ft',
    height: '6ft',
    price: 185.00
  },
  {
    sku: '20009',
    type: 'gate_frame',
    material: 'Galv',
    diameter: '1 5/8',
    size: '6ft',
    height: '6ft',
    price: 205.00
  },
  {
    sku: '20010',
    type: 'gate_frame',
    material: 'Black',
    diameter: '1 5/8',
    size: '4ft',
    height: '4ft',
    price: 135.00
  },
  {
    sku: '20011',
    type: 'gate_frame',
    material: 'Black',
    diameter: '1 5/8',
    size: '5ft',
    height: '4ft',
    price: 155.00
  },
  {
    sku: '20012',
    type: 'gate_frame',
    material: 'Black',
    diameter: '1 5/8',
    size: '6ft',
    height: '4ft',
    price: 175.00
  },
  
  // Gate Hinges
  {
    sku: '20101',
    type: 'gate_hinge',
    material: 'Galv',
    diameter: null,
    size: null,
    height: null,
    price: 12.50
  },
  {
    sku: '20102',
    type: 'gate_hinge',
    material: 'Black',
    diameter: null,
    size: null,
    height: null,
    price: 14.50
  },
  {
    sku: '20103',
    type: 'gate_hinge',
    material: 'Galv',
    diameter: null,
    size: 'Residential',
    height: null,
    price: 9.75
  },
  {
    sku: '20104',
    type: 'gate_hinge',
    material: 'Black',
    diameter: null,
    size: 'Residential',
    height: null,
    price: 11.75
  },
  {
    sku: '20105',
    type: 'gate_hinge',
    material: 'Galv',
    diameter: null,
    size: 'Commercial',
    height: null,
    price: 18.50
  },
  {
    sku: '20106',
    type: 'gate_hinge',
    material: 'Black',
    diameter: null,
    size: 'Commercial',
    height: null,
    price: 21.50
  },
  
  // Gate Latches
  {
    sku: '20201',
    type: 'gate_latch',
    material: 'Galv',
    diameter: null,
    size: 'Fork Latch',
    height: null,
    price: 15.25
  },
  {
    sku: '20202',
    type: 'gate_latch',
    material: 'Black',
    diameter: null,
    size: 'Fork Latch',
    height: null,
    price: 17.25
  },
  {
    sku: '20203',
    type: 'gate_latch',
    material: 'Galv',
    diameter: null,
    size: 'Drop Rod',
    height: null,
    price: 22.50
  },
  {
    sku: '20204',
    type: 'gate_latch',
    material: 'Black',
    diameter: null,
    size: 'Drop Rod',
    height: null,
    price: 24.50
  }
];

// Main function
async function main() {
  console.log('Starting to add gate products to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each gate product
    console.log('Adding gate products...');
    
    for (const product of gateProducts) {
      // Check if product already exists
      const checkResult = await client.query(
        'SELECT id FROM chainlink_products WHERE sku = $1',
        [product.sku]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`Product with SKU ${product.sku} already exists, updating...`);
        
        // Update existing product
        await client.query(
          `UPDATE chainlink_products 
           SET type = $1, material = $2, diameter = $3, size = $4, height = $5, price = $6
           WHERE sku = $7`,
          [
            product.type,
            product.material,
            product.diameter,
            product.size,
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
           (sku, type, material, diameter, size, height, price)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            product.sku,
            product.type,
            product.material,
            product.diameter,
            product.size,
            product.height,
            product.price
          ]
        );
      }
    }
    
    // Verify the products were added
    const countResult = await client.query(
      "SELECT COUNT(*) FROM chainlink_products WHERE type IN ('gate_frame', 'gate_hinge', 'gate_latch')"
    );
    
    console.log(`Total gate products in database: ${countResult.rows[0].count}`);
    console.log('Gate products added successfully!');
    
  } catch (error) {
    console.error('Error adding gate products:', error);
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
