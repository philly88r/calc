/**
 * Check Material Formulas
 * 
 * This script checks the material_formulas table to see what formulas are currently in the database.
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
    
    // Get column information for material_formulas table
    console.log('Columns in material_formulas table:');
    const columnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'material_formulas'
      ORDER BY ordinal_position;
    `);
    
    columnsResult.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
    
    // Count formulas in the table
    const countResult = await client.query(`
      SELECT COUNT(*) as count
      FROM material_formulas;
    `);
    
    console.log(`\nTotal formulas in the database: ${countResult.rows[0].count}`);
    
    // Get all formulas with their calculation_details
    const formulasResult = await client.query(`
      SELECT id, name, calculation_details
      FROM material_formulas
      ORDER BY id;
    `);
    
    // Check for generic formulas
    const genericFormulas = [];
    const nonGenericFormulas = [];
    
    formulasResult.rows.forEach(row => {
      const details = row.calculation_details;
      // Check if calculation_details contains a generic formula
      if (!details || !details.formula || details.formula === 'quantity * unit_price') {
        genericFormulas.push(row);
      } else {
        nonGenericFormulas.push(row);
      }
    });
    
    console.log(`\nGeneric formulas: ${genericFormulas.length}`);
    genericFormulas.forEach((row, index) => {
      if (index < 10) { // Show only first 10 to avoid overwhelming output
        console.log(`- ${row.id}: ${row.name}`);
      } else if (index === 10) {
        console.log('- ... (more generic formulas not shown)');
      }
    });
    
    console.log(`\nNon-generic formulas: ${nonGenericFormulas.length}`);
    nonGenericFormulas.forEach(row => {
      console.log(`- ${row.id}: ${row.name}`);
      if (row.calculation_details && row.calculation_details.formula) {
        console.log(`  Formula: ${row.calculation_details.formula}`);
      }
    });
    
    // Check for formulas with relationships in formula_products
    const withRelationshipsResult = await client.query(`
      SELECT mf.id, mf.name, COUNT(fp.id) as relationship_count
      FROM material_formulas mf
      LEFT JOIN formula_products fp ON mf.id = fp.formula_id
      GROUP BY mf.id, mf.name
      HAVING COUNT(fp.id) > 0
      ORDER BY relationship_count DESC;
    `);
    
    console.log(`\nFormulas with product relationships: ${withRelationshipsResult.rows.length}`);
    withRelationshipsResult.rows.forEach(row => {
      console.log(`- ${row.id}: ${row.name} (${row.relationship_count} relationships)`);
    });
    
    // Check for formulas without relationships in formula_products
    const withoutRelationshipsResult = await client.query(`
      SELECT mf.id, mf.name
      FROM material_formulas mf
      LEFT JOIN formula_products fp ON mf.id = fp.formula_id
      GROUP BY mf.id, mf.name
      HAVING COUNT(fp.id) = 0
      ORDER BY mf.id;
    `);
    
    console.log(`\nFormulas without product relationships: ${withoutRelationshipsResult.rows.length}`);
    withoutRelationshipsResult.rows.forEach((row, index) => {
      if (index < 10) { // Show only first 10 to avoid overwhelming output
        console.log(`- ${row.id}: ${row.name}`);
      } else if (index === 10) {
        console.log('- ... (more formulas without relationships not shown)');
      }
    });
    
  } catch (error) {
    console.error('Error checking material formulas:', error);
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
