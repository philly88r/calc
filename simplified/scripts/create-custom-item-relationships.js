/**
 * Create Custom Item Relationships
 * 
 * This script creates relationships for custom item formulas.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Custom item formulas
const customItems = [
  'custom_item_1',
  'custom_item_2',
  'custom_item_3',
  'custom_item_4',
  'custom_item_5'
];

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create relationships for custom items
    let createdCount = 0;
    
    for (const customItem of customItems) {
      console.log(`\nCreating relationship for ${customItem}:`);
      
      // Insert relationship into formula_products table
      await client.query(`
        INSERT INTO formula_products (
          formula_id, 
          product_type, 
          lookup_criteria,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, NOW(), NOW());
      `, [
        customItem,
        'custom',
        { custom: true }
      ]);
      
      console.log(`  - Added relationship with custom product type`);
      createdCount++;
    }
    
    console.log(`\nRelationship creation summary:`);
    console.log(`- Created: ${createdCount} relationships for custom items`);
    
    // Check final relationship counts
    const finalCountResult = await client.query(`
      SELECT COUNT(*) as count
      FROM formula_products;
    `);
    
    console.log(`\nTotal relationships in database: ${finalCountResult.rows[0].count}`);
    
  } catch (error) {
    console.error('Error creating custom item relationships:', error);
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
