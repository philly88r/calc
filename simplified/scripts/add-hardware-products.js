/**
 * Add Hardware Products to Supabase
 * 
 * This script adds hardware products like tension bands, brace bands, 
 * rail clamps, etc. to the Supabase database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Hardware products to add
const hardwareProducts = [
  // Dome caps for different post types
  {
    sku: '10073',
    type: 'dome_cap',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 0.95
  },
  {
    sku: '10074',
    type: 'dome_cap',
    material: 'Galv',
    thickness: '',
    diameter: '1 7/8',
    size: '',
    length: '',
    height: '',
    price: 1.10
  },
  {
    sku: '10075',
    type: 'dome_cap',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 1.25
  },
  {
    sku: '10076',
    type: 'dome_cap',
    material: 'Black',
    thickness: '',
    diameter: '1 7/8',
    size: '',
    length: '',
    height: '',
    price: 1.45
  },
  
  // Eye tops / loop caps
  {
    sku: '10081',
    type: 'eye_top',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 1.75
  },
  {
    sku: '10082',
    type: 'eye_top',
    material: 'Galv',
    thickness: '',
    diameter: '2',
    size: '',
    length: '',
    height: '',
    price: 1.95
  },
  {
    sku: '10083',
    type: 'eye_top',
    material: 'Galv',
    thickness: '',
    diameter: '2 3/8',
    size: '',
    length: '',
    height: '',
    price: 2.25
  },
  {
    sku: '10084',
    type: 'eye_top',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 2.15
  },
  
  // Rail clamps (line, corner, end)
  {
    sku: '10311',
    type: 'rail_clamp',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: 'Line',
    length: '',
    height: '',
    price: 2.75
  },
  {
    sku: '10312',
    type: 'rail_clamp',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: 'Corner',
    length: '',
    height: '',
    price: 2.95
  },
  {
    sku: '10313',
    type: 'rail_clamp',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: 'End',
    length: '',
    height: '',
    price: 2.85
  },
  {
    sku: '10314',
    type: 'rail_clamp',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: 'Line',
    length: '',
    height: '',
    price: 3.25
  },
  
  // Barb arms
  {
    sku: '10401',
    type: 'barb_arm',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: 'Single',
    length: '',
    height: '',
    price: 4.95
  },
  {
    sku: '10402',
    type: 'barb_arm',
    material: 'Galv',
    thickness: '',
    diameter: '2',
    size: 'Single',
    length: '',
    height: '',
    price: 5.25
  },
  {
    sku: '10403',
    type: 'barb_arm',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: 'Double',
    length: '',
    height: '',
    price: 6.95
  },
  
  // Barbed wire
  {
    sku: '10501',
    type: 'barbed_wire',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '4-point',
    length: '1320ft',
    height: '',
    price: 89.95
  },
  {
    sku: '10502',
    type: 'barbed_wire',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '2-point',
    length: '1320ft',
    height: '',
    price: 79.95
  },
  
  // Tension bands for different post types
  {
    sku: '10211',
    type: 'tension_band',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 0.85
  },
  {
    sku: '10212',
    type: 'tension_band',
    material: 'Galv',
    thickness: '',
    diameter: '2',
    size: '',
    length: '',
    height: '',
    price: 0.95
  },
  {
    sku: '10213',
    type: 'tension_band',
    material: 'Galv',
    thickness: '',
    diameter: '2 3/8',
    size: '',
    length: '',
    height: '',
    price: 1.05
  },
  {
    sku: '10214',
    type: 'tension_band',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 1.15
  },
  
  // Brace bands for different post types
  {
    sku: '10221',
    type: 'brace_band',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 0.95
  },
  {
    sku: '10222',
    type: 'brace_band',
    material: 'Galv',
    thickness: '',
    diameter: '2',
    size: '',
    length: '',
    height: '',
    price: 1.05
  },
  {
    sku: '10223',
    type: 'brace_band',
    material: 'Galv',
    thickness: '',
    diameter: '2 3/8',
    size: '',
    length: '',
    height: '',
    price: 1.15
  },
  {
    sku: '10224',
    type: 'brace_band',
    material: 'Black',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 1.25
  },
  
  // Tension bars
  {
    sku: '10231',
    type: 'tension_bar',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '4ft',
    price: 2.95
  },
  {
    sku: '10232',
    type: 'tension_bar',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '5ft',
    price: 3.45
  },
  {
    sku: '10233',
    type: 'tension_bar',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '6ft',
    price: 3.95
  },
  {
    sku: '10234',
    type: 'tension_bar',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '4ft',
    price: 3.45
  },
  
  // Rail ends
  {
    sku: '10191',
    type: 'rail_end',
    material: 'Galv',
    thickness: '',
    diameter: '1 3/8',
    size: '',
    length: '',
    height: '',
    price: 1.35
  },
  {
    sku: '10192',
    type: 'rail_end',
    material: 'Galv',
    thickness: '',
    diameter: '1 5/8',
    size: '',
    length: '',
    height: '',
    price: 1.45
  },
  {
    sku: '10193',
    type: 'rail_end',
    material: 'Black',
    thickness: '',
    diameter: '1 3/8',
    size: '',
    length: '',
    height: '',
    price: 1.65
  },
  
  // Nuts and bolts
  {
    sku: '10601',
    type: 'nuts_bolts',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '5/16" x 1 1/4"',
    length: '',
    height: '',
    price: 24.95
  },
  {
    sku: '10602',
    type: 'nuts_bolts',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '3/8" x 3"',
    length: '',
    height: '',
    price: 34.95
  },
  
  // Wedge anchors
  {
    sku: '10701',
    type: 'wedge_anchor',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '3/8" x 3"',
    length: '',
    height: '',
    price: 29.95
  },
  {
    sku: '10702',
    type: 'wedge_anchor',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '1/2" x 4"',
    length: '',
    height: '',
    price: 39.95
  },
  
  // Fence ties
  {
    sku: '10801',
    type: 'fence_tie',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '6"',
    length: '',
    height: '',
    price: 12.95
  },
  {
    sku: '10802',
    type: 'fence_tie',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9"',
    length: '',
    height: '',
    price: 14.95
  },
  {
    sku: '10803',
    type: 'fence_tie',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '6"',
    length: '',
    height: '',
    price: 15.95
  },
  
  // Hog rings
  {
    sku: '10901',
    type: 'hog_ring',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '',
    height: '',
    price: 9.95
  },
  {
    sku: '10902',
    type: 'hog_ring',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '11 gauge',
    length: '',
    height: '',
    price: 8.95
  },
  
  // Slick line
  {
    sku: '11001',
    type: 'slick_line',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '1320ft',
    height: '',
    price: 69.95
  },
  {
    sku: '11002',
    type: 'slick_line',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '11 gauge',
    length: '1320ft',
    height: '',
    price: 59.95
  },
  
  // Truss rods
  {
    sku: '11101',
    type: 'truss_rod',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '3/8"',
    length: '10ft',
    height: '',
    price: 12.95
  },
  {
    sku: '11102',
    type: 'truss_rod',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '1/2"',
    length: '10ft',
    height: '',
    price: 15.95
  }
];

// Main function
async function main() {
  console.log('Starting to add hardware products to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each product
    console.log('Adding hardware products...');
    
    for (const product of hardwareProducts) {
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
    const productTypes = [...new Set(hardwareProducts.map(p => p.type))];
    
    for (const type of productTypes) {
      const countResult = await client.query(
        'SELECT COUNT(*) FROM chainlink_products WHERE type = $1',
        [type]
      );
      
      console.log(`${type} products in database: ${countResult.rows[0].count}`);
    }
    
    console.log('Hardware products added successfully!');
    
  } catch (error) {
    console.error('Error adding hardware products:', error);
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
