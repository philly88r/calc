/**
 * Check Questionnaire Items
 * 
 * This script checks the existing questionnaire items in the database.
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
    
    // Get all questionnaire items
    console.log('\nExisting questionnaire items:');
    const itemsResult = await client.query(`
      SELECT * FROM questionnaire_items
      ORDER BY section, "order";
    `);
    
    if (itemsResult.rows.length === 0) {
      console.log('No questionnaire items found in the database.');
    } else {
      itemsResult.rows.forEach(item => {
        console.log(`\nID: ${item.id}`);
        console.log(`Question: ${item.question_text}`);
        console.log(`Type: ${item.input_type}`);
        console.log(`Section: ${item.section}`);
        console.log(`Order: ${item.order}`);
        
        if (item.options) {
          console.log(`Options: ${JSON.stringify(item.options)}`);
        }
        
        if (item.default_value) {
          console.log(`Default Value: ${item.default_value}`);
        }
        
        if (item.dependent_on) {
          console.log(`Depends on: ${item.dependent_on} = ${item.dependent_value}`);
        }
      });
    }
    
    // Check which questionnaire items are referenced in material_formulas
    console.log('\nQuestionnaire triggers in material_formulas:');
    const triggersResult = await client.query(`
      SELECT id, name, questionnaire_trigger
      FROM material_formulas
      WHERE questionnaire_trigger IS NOT NULL
      ORDER BY id;
    `);
    
    if (triggersResult.rows.length === 0) {
      console.log('No questionnaire triggers found in material_formulas.');
    } else {
      triggersResult.rows.forEach(formula => {
        console.log(`\nFormula ID: ${formula.id}`);
        console.log(`Name: ${formula.name}`);
        console.log(`Trigger: ${formula.questionnaire_trigger}`);
      });
    }
    
    // Analyze which questionnaire items are needed
    console.log('\nQuestionnaire items referenced in formulas:');
    const formulaResult = await client.query(`
      SELECT calculation_details
      FROM material_formulas
      WHERE calculation_details IS NOT NULL;
    `);
    
    const referencedItems = new Set();
    
    formulaResult.rows.forEach(row => {
      if (row.calculation_details && row.calculation_details.formula) {
        const formula = row.calculation_details.formula;
        
        // Extract variable names from the formula
        const variableMatches = formula.match(/[a-zA-Z][a-zA-Z0-9_]*/g) || [];
        
        variableMatches.forEach(variable => {
          // Skip common JavaScript functions and constants
          const jsKeywords = ['Math', 'ceil', 'floor', 'round', 'min', 'max', 'true', 'false', 'null', 'undefined'];
          if (!jsKeywords.includes(variable)) {
            referencedItems.add(variable);
          }
        });
      }
    });
    
    console.log(`Found ${referencedItems.size} unique variables referenced in formulas:`);
    console.log(Array.from(referencedItems).sort().join(', '));
    
    // Compare with existing questionnaire items
    const existingItems = new Set(itemsResult.rows.map(row => row.id));
    
    console.log('\nQuestionnaire items that need to be added:');
    const missingItems = Array.from(referencedItems).filter(item => !existingItems.has(item));
    
    if (missingItems.length === 0) {
      console.log('All referenced items are already in the questionnaire_items table.');
    } else {
      missingItems.forEach(item => {
        console.log(`- ${item}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking questionnaire items:', error);
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
