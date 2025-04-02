/**
 * Add Additional Missing Products to Supabase
 * 
 * This script adds additional missing products identified during testing:
 * 1. Drop rods for double gates
 * 2. 9 gauge mesh products
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Additional products to add
const additionalProducts = [
  // Drop rods for double gates
  {
    sku: '20301',
    type: 'drop_rod',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 18.75
  },
  {
    sku: '20302',
    type: 'drop_rod',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '',
    length: '',
    height: '',
    price: 22.50
  },
  
  // 9 gauge mesh products
  {
    sku: '11601',
    type: 'mesh',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '4ft',
    price: 135.99
  },
  {
    sku: '11602',
    type: 'mesh',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '5ft',
    price: 169.99
  },
  {
    sku: '11603',
    type: 'mesh',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '6ft',
    price: 199.99
  },
  {
    sku: '11604',
    type: 'mesh',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '7ft',
    price: 229.99
  },
  {
    sku: '11605',
    type: 'mesh',
    material: 'Galv',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '8ft',
    price: 259.99
  },
  {
    sku: '11611',
    type: 'mesh',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '4ft',
    price: 165.99
  },
  {
    sku: '11612',
    type: 'mesh',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '5ft',
    price: 199.99
  },
  {
    sku: '11613',
    type: 'mesh',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '6ft',
    price: 239.99
  },
  {
    sku: '11614',
    type: 'mesh',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '7ft',
    price: 269.99
  },
  {
    sku: '11615',
    type: 'mesh',
    material: 'Black',
    thickness: '',
    diameter: '',
    size: '9 gauge',
    length: '50ft',
    height: '8ft',
    price: 299.99
  }
];

// Main function
async function main() {
  console.log('Starting to add additional products to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each product
    console.log('Adding additional products...');
    
    for (const product of additionalProducts) {
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
    const dropRodCount = await client.query(
      "SELECT COUNT(*) FROM chainlink_products WHERE type = 'drop_rod'"
    );
    
    const meshCount = await client.query(
      "SELECT COUNT(*) FROM chainlink_products WHERE type = 'mesh' AND size = '9 gauge'"
    );
    
    console.log(`Drop rod products in database: ${dropRodCount.rows[0].count}`);
    console.log(`9 gauge mesh products in database: ${meshCount.rows[0].count}`);
    
    // Fix the mesh lookup query in formula_products
    console.log('Updating mesh formula product relationship...');
    
    const meshFormulaResult = await client.query(
      "SELECT id FROM formula_products WHERE formula_id = 'mesh' AND product_type = 'mesh'"
    );
    
    if (meshFormulaResult.rows.length > 0) {
      const meshFormulaId = meshFormulaResult.rows[0].id;
      
      // Update the lookup criteria to correctly find mesh products
      const updatedLookupCriteria = {
        criteria: [
          { field: 'material', param: 'material' },
          { field: 'size', param: 'meshGauge' }
        ],
        height_field: 'heightOfFence'
      };
      
      await client.query(
        `UPDATE formula_products 
         SET lookup_criteria = $1, updated_at = now()
         WHERE id = $2`,
        [
          JSON.stringify(updatedLookupCriteria),
          meshFormulaId
        ]
      );
      
      console.log('Mesh formula product relationship updated successfully.');
    } else {
      console.log('Mesh formula product relationship not found.');
    }
    
    console.log('Additional products added successfully!');
    
  } catch (error) {
    console.error('Error adding additional products:', error);
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
