/**
 * Check Updated Formulas
 * 
 * This script checks the updated formulas in the material_formulas table.
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
    
    // Get all formulas from the database
    const formulasResult = await client.query(`
      SELECT id, name, description, calculation_details
      FROM material_formulas
      ORDER BY id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    
    // Check each formula
    let formulasWithFormula = 0;
    let formulasWithoutFormula = 0;
    
    console.log('\nChecking formulas:');
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const details = row.calculation_details;
      
      if (details && details.formula) {
        formulasWithFormula++;
        console.log(`\n${formulaId}: ${row.name}`);
        console.log(`  Description: ${row.description}`);
        console.log(`  Formula: ${details.formula}`);
        if (details.height_formula) {
          console.log(`  Height Formula: ${details.height_formula}`);
        }
      } else {
        formulasWithoutFormula++;
        console.log(`\n${formulaId}: ${row.name} (NO FORMULA)`);
      }
    }
    
    console.log(`\nSummary:`);
    console.log(`- Formulas with formula: ${formulasWithFormula}`);
    console.log(`- Formulas without formula: ${formulasWithoutFormula}`);
    console.log(`- Total: ${formulasResult.rows.length} formulas`);
    
    // Check formula-product relationships
    const relationshipsResult = await client.query(`
      SELECT mf.id, mf.name, COUNT(fp.id) as relationship_count
      FROM material_formulas mf
      LEFT JOIN formula_products fp ON mf.id = fp.formula_id
      GROUP BY mf.id, mf.name
      ORDER BY relationship_count DESC;
    `);
    
    let formulasWithRelationships = 0;
    let formulasWithoutRelationships = 0;
    
    console.log('\nFormula-Product Relationships:');
    
    for (const row of relationshipsResult.rows) {
      if (row.relationship_count > 0) {
        formulasWithRelationships++;
        console.log(`${row.id}: ${row.name} (${row.relationship_count} relationships)`);
      } else {
        formulasWithoutRelationships++;
      }
    }
    
    console.log(`\nRelationship Summary:`);
    console.log(`- Formulas with relationships: ${formulasWithRelationships}`);
    console.log(`- Formulas without relationships: ${formulasWithoutRelationships}`);
    console.log(`- Total: ${relationshipsResult.rows.length} formulas`);
    
  } catch (error) {
    console.error('Error checking updated formulas:', error);
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
