/**
 * Check Questionnaire Table
 * 
 * This script checks the questionnaire table and its relationships with material_formulas.
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
    
    // Check if questionnaire table exists
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'questionnaire'
      );
    `);
    
    const tableExists = tableResult.rows[0].exists;
    console.log(`Questionnaire table exists: ${tableExists}`);
    
    if (tableExists) {
      // Get column information for questionnaire table
      console.log('\nColumns in questionnaire table:');
      const columnsResult = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'questionnaire'
        ORDER BY ordinal_position;
      `);
      
      columnsResult.rows.forEach(row => {
        console.log(`- ${row.column_name} (${row.data_type})`);
      });
      
      // Count records in questionnaire table
      const countResult = await client.query(`
        SELECT COUNT(*) as count
        FROM questionnaire;
      `);
      
      console.log(`\nTotal questions in the questionnaire table: ${countResult.rows[0].count}`);
      
      // Sample data from questionnaire table
      console.log('\nSample data from questionnaire table:');
      const sampleResult = await client.query(`
        SELECT *
        FROM questionnaire
        LIMIT 5;
      `);
      
      if (sampleResult.rows.length === 0) {
        console.log('No data found in the questionnaire table');
      } else {
        sampleResult.rows.forEach((row, index) => {
          console.log(`\nQuestion ${index + 1}:`);
          Object.entries(row).forEach(([key, value]) => {
            console.log(`- ${key}: ${value === null ? 'null' : value}`);
          });
        });
      }
      
      // Check questionnaire_trigger field in material_formulas
      console.log('\nChecking questionnaire_trigger field in material_formulas:');
      const triggerResult = await client.query(`
        SELECT id, name, questionnaire_trigger
        FROM material_formulas
        ORDER BY id;
      `);
      
      let formulasWithTrigger = 0;
      let formulasWithoutTrigger = 0;
      
      console.log('\nFormulas with questionnaire triggers:');
      triggerResult.rows.forEach(row => {
        if (row.questionnaire_trigger && row.questionnaire_trigger.trim() !== '') {
          formulasWithTrigger++;
          console.log(`- ${row.id}: ${row.questionnaire_trigger}`);
        } else {
          formulasWithoutTrigger++;
        }
      });
      
      console.log(`\nFormulas without questionnaire triggers: ${formulasWithoutTrigger}`);
      
      // Check if there's a relationship table between questionnaire and material_formulas
      const relationshipTableResult = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'questionnaire_formula'
        );
      `);
      
      const relationshipTableExists = relationshipTableResult.rows[0].exists;
      console.log(`\nQuestionnaire-formula relationship table exists: ${relationshipTableExists}`);
      
      if (relationshipTableExists) {
        // Get column information for questionnaire_formula table
        console.log('\nColumns in questionnaire_formula table:');
        const relationshipColumnsResult = await client.query(`
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'questionnaire_formula'
          ORDER BY ordinal_position;
        `);
        
        relationshipColumnsResult.rows.forEach(row => {
          console.log(`- ${row.column_name} (${row.data_type})`);
        });
        
        // Count records in questionnaire_formula table
        const relationshipCountResult = await client.query(`
          SELECT COUNT(*) as count
          FROM questionnaire_formula;
        `);
        
        console.log(`\nTotal relationships in the questionnaire_formula table: ${relationshipCountResult.rows[0].count}`);
      }
    }
    
  } catch (error) {
    console.error('Error checking questionnaire table:', error);
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
