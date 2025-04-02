/**
 * Add Gate Hardware Products to Supabase
 * 
 * This script adds specialized gate hardware products like hinges, latches,
 * cantilever rollers, etc. to the Supabase database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Gate hardware products to add
const gateHardwareProducts = [
  // Male residential hinges (single gate)
  {
    sku: '20111',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Male Residential',
    length: '',
    height: '',
    price: 11.95
  },
  {
    sku: '20112',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Male Residential',
    length: '',
    height: '',
    price: 13.95
  },
  
  // Female residential hinges (single gate)
  {
    sku: '20121',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Female Residential',
    length: '',
    height: '',
    price: 11.95
  },
  {
    sku: '20122',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Female Residential',
    length: '',
    height: '',
    price: 13.95
  },
  
  // Male residential hinges (double gate)
  {
    sku: '20131',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Male Residential Double',
    length: '',
    height: '',
    price: 12.95
  },
  {
    sku: '20132',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Male Residential Double',
    length: '',
    height: '',
    price: 14.95
  },
  
  // Female residential hinges (double gate)
  {
    sku: '20141',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Female Residential Double',
    length: '',
    height: '',
    price: 12.95
  },
  {
    sku: '20142',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Female Residential Double',
    length: '',
    height: '',
    price: 14.95
  },
  
  // 3/8" x 3" nut and bolt (for gates)
  {
    sku: '20151',
    type: 'gate_bolt',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '3/8" x 3"',
    length: '',
    height: '',
    price: 0.95
  },
  {
    sku: '20152',
    type: 'gate_bolt',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '3/8" x 3"',
    length: '',
    height: '',
    price: 1.25
  },
  
  // Bulldog hinges (Single gate)
  {
    sku: '20161',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Bulldog Single',
    length: '',
    height: '',
    price: 18.95
  },
  {
    sku: '20162',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Bulldog Single',
    length: '',
    height: '',
    price: 21.95
  },
  
  // Bulldog hinges (Double gate)
  {
    sku: '20171',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Bulldog Double',
    length: '',
    height: '',
    price: 19.95
  },
  {
    sku: '20172',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Bulldog Double',
    length: '',
    height: '',
    price: 22.95
  },
  
  // 180 degree hinges (Single gate)
  {
    sku: '20181',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '180 Degree Single',
    length: '',
    height: '',
    price: 24.95
  },
  {
    sku: '20182',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '180 Degree Single',
    length: '',
    height: '',
    price: 27.95
  },
  
  // 180 degree hinges (Double gate)
  {
    sku: '20191',
    type: 'gate_hinge',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '180 Degree Double',
    length: '',
    height: '',
    price: 25.95
  },
  {
    sku: '20192',
    type: 'gate_hinge',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '180 Degree Double',
    length: '',
    height: '',
    price: 28.95
  },
  
  // Duckbill gate stop
  {
    sku: '20401',
    type: 'duckbill_gate_stop',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 45.95
  },
  {
    sku: '20402',
    type: 'duckbill_gate_stop',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 49.95
  },
  
  // Cantilever/sliding gate rollers
  {
    sku: '20501',
    type: 'gate_roller',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Standard',
    length: '',
    height: '',
    price: 29.95
  },
  {
    sku: '20502',
    type: 'gate_roller',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Heavy Duty',
    length: '',
    height: '',
    price: 39.95
  },
  
  // Cantilever/sliding gate latch
  {
    sku: '20511',
    type: 'sliding_gate_latch',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 24.95
  },
  {
    sku: '20512',
    type: 'sliding_gate_latch',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 27.95
  },
  
  // Collars
  {
    sku: '20601',
    type: 'gate_collar',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 2.95
  },
  {
    sku: '20602',
    type: 'gate_collar',
    material: 'Galv',
    thickness: '',
    diameter: '2',
    size: '',
    length: '',
    height: '',
    price: 3.45
  },
  {
    sku: '20603',
    type: 'gate_collar',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 3.95
  },
  
  // Cane bolts
  {
    sku: '20701',
    type: 'cane_bolt',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '18"',
    length: '',
    height: '',
    price: 14.95
  },
  {
    sku: '20702',
    type: 'cane_bolt',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '24"',
    length: '',
    height: '',
    price: 16.95
  },
  {
    sku: '20703',
    type: 'cane_bolt',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '18"',
    length: '',
    height: '',
    price: 17.95
  },
  
  // Industrial drop latch
  {
    sku: '20801',
    type: 'industrial_drop_latch',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 34.95
  },
  {
    sku: '20802',
    type: 'industrial_drop_latch',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 39.95
  },
  
  // Industrial drop latch guides
  {
    sku: '20811',
    type: 'industrial_drop_latch_guide',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 9.95
  },
  {
    sku: '20812',
    type: 'industrial_drop_latch_guide',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 11.95
  },
  
  // Fork latch single gate
  {
    sku: '20211',
    type: 'gate_latch',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Fork Single',
    length: '',
    height: '',
    price: 14.95
  },
  {
    sku: '20212',
    type: 'gate_latch',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Fork Single',
    length: '',
    height: '',
    price: 16.95
  },
  
  // Fork latch double gate
  {
    sku: '20221',
    type: 'gate_latch',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: 'Fork Double',
    length: '',
    height: '',
    price: 15.95
  },
  {
    sku: '20222',
    type: 'gate_latch',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: 'Fork Double',
    length: '',
    height: '',
    price: 17.95
  }
];

// Main function
async function main() {
  console.log('Starting to add gate hardware products to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each product
    console.log('Adding gate hardware products...');
    
    for (const product of gateHardwareProducts) {
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
    const productTypes = [...new Set(gateHardwareProducts.map(p => p.type))];
    
    for (const type of productTypes) {
      const countResult = await client.query(
        'SELECT COUNT(*) FROM chainlink_products WHERE type = $1',
        [type]
      );
      
      console.log(`${type} products in database: ${countResult.rows[0].count}`);
    }
    
    console.log('Gate hardware products added successfully!');
    
  } catch (error) {
    console.error('Error adding gate hardware products:', error);
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
