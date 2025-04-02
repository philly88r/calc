/**
 * Check Formula Questionnaire Triggers
 * 
 * This script checks the questionnaire_trigger field for all formulas
 * to ensure they have proper relationships with the questionnaire.
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
      SELECT id, name, questionnaire_trigger
      FROM material_formulas
      ORDER BY id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    
    // Check each formula's questionnaire trigger
    let formulasWithTrigger = 0;
    let formulasWithoutTrigger = 0;
    
    console.log('\nFormulas with questionnaire triggers:');
    for (const row of formulasResult.rows) {
      if (row.questionnaire_trigger && row.questionnaire_trigger.trim() !== '') {
        formulasWithTrigger++;
        console.log(`- ${row.id}: ${row.questionnaire_trigger}`);
      } else {
        formulasWithoutTrigger++;
        console.log(`- ${row.id}: NO TRIGGER`);
      }
    }
    
    console.log(`\nSummary:`);
    console.log(`- Formulas with trigger: ${formulasWithTrigger}`);
    console.log(`- Formulas without trigger: ${formulasWithoutTrigger}`);
    console.log(`- Total: ${formulasResult.rows.length} formulas`);
    
  } catch (error) {
    console.error('Error checking questionnaire triggers:', error);
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
