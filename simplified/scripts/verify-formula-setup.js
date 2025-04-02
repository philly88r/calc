/**
 * Verify Formula Setup
 * 
 * This script verifies that all formulas are properly set up with:
 * 1. Specific calculation formulas
 * 2. Product relationships
 * 3. Questionnaire triggers
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
      SELECT mf.id, mf.name, mf.calculation_details, mf.questionnaire_trigger, COUNT(fp.id) as relationship_count
      FROM material_formulas mf
      LEFT JOIN formula_products fp ON mf.id = fp.formula_id
      GROUP BY mf.id, mf.name, mf.calculation_details, mf.questionnaire_trigger
      ORDER BY mf.id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    
    // Check each formula
    let formulasWithFormula = 0;
    let formulasWithoutFormula = 0;
    let formulasWithRelationships = 0;
    let formulasWithoutRelationships = 0;
    let formulasWithTrigger = 0;
    let formulasWithoutTrigger = 0;
    let fullySetupFormulas = 0;
    
    console.log('\nVerifying formula setup:');
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const details = row.calculation_details;
      const hasFormula = details && details.formula && details.formula.trim() !== '';
      const hasRelationships = row.relationship_count > 0;
      const hasTrigger = row.questionnaire_trigger && row.questionnaire_trigger.trim() !== '';
      
      if (hasFormula) {
        formulasWithFormula++;
      } else {
        formulasWithoutFormula++;
      }
      
      if (hasRelationships) {
        formulasWithRelationships++;
      } else {
        formulasWithoutRelationships++;
      }
      
      if (hasTrigger) {
        formulasWithTrigger++;
      } else {
        formulasWithoutTrigger++;
      }
      
      if (hasFormula && hasRelationships && hasTrigger) {
        fullySetupFormulas++;
      } else {
        console.log(`\n${formulaId}: ${row.name}`);
        if (!hasFormula) console.log(`  - Missing formula`);
        if (!hasRelationships) console.log(`  - Missing product relationships`);
        if (!hasTrigger) console.log(`  - Missing questionnaire trigger`);
      }
    }
    
    console.log(`\nSummary:`);
    console.log(`- Formulas with formula: ${formulasWithFormula} (${Math.round(formulasWithFormula / formulasResult.rows.length * 100)}%)`);
    console.log(`- Formulas with product relationships: ${formulasWithRelationships} (${Math.round(formulasWithRelationships / formulasResult.rows.length * 100)}%)`);
    console.log(`- Formulas with questionnaire trigger: ${formulasWithTrigger} (${Math.round(formulasWithTrigger / formulasResult.rows.length * 100)}%)`);
    console.log(`- Fully set up formulas: ${fullySetupFormulas} (${Math.round(fullySetupFormulas / formulasResult.rows.length * 100)}%)`);
    console.log(`- Total: ${formulasResult.rows.length} formulas`);
    
  } catch (error) {
    console.error('Error verifying formula setup:', error);
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
