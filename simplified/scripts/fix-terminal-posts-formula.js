/**
 * Fix Terminal Posts Formula
 * 
 * This script fixes the terminal posts formula to use the exact number specified
 * in the questionnaire rather than calculating it.
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
    
    // Get the current formula
    const currentFormulaResult = await client.query(`
      SELECT id, name, calculation_details
      FROM material_formulas
      WHERE id = 'terminal_posts';
    `);
    
    if (currentFormulaResult.rows.length === 0) {
      console.log('Terminal posts formula not found');
      return;
    }
    
    const currentFormula = currentFormulaResult.rows[0];
    console.log('Current terminal posts formula:');
    console.log(JSON.stringify(currentFormula.calculation_details, null, 2));
    
    // Update the formula
    const updatedDetails = currentFormula.calculation_details || {};
    updatedDetails.formula = "numberOfEndTerminals";
    
    await client.query(`
      UPDATE material_formulas
      SET 
        calculation_details = $1,
        updated_at = NOW()
      WHERE id = 'terminal_posts';
    `, [updatedDetails]);
    
    console.log('\nTerminal posts formula updated to: numberOfEndTerminals');
    
    // Verify the update
    const verifyResult = await client.query(`
      SELECT id, name, calculation_details
      FROM material_formulas
      WHERE id = 'terminal_posts';
    `);
    
    console.log('\nUpdated terminal posts formula:');
    console.log(JSON.stringify(verifyResult.rows[0].calculation_details, null, 2));
    
  } catch (error) {
    console.error('Error fixing terminal posts formula:', error);
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
