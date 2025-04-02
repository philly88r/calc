/**
 * Verify Formula Calculations
 * 
 * This script verifies that the formula calculations in the material_formulas table
 * have been updated with more accurate quantity calculations.
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
    console.log('Retrieving formulas from the database...');
    const formulasResult = await client.query(`
      SELECT id, name, category, formula, calculation_details
      FROM material_formulas 
      ORDER BY category, name;
    `);
    
    const dbFormulas = formulasResult.rows;
    console.log(`Found ${dbFormulas.length} formulas in the database.`);
    
    // Group formulas by category
    const categorizedFormulas = {};
    
    dbFormulas.forEach(formula => {
      const category = formula.category || 'uncategorized';
      
      if (!categorizedFormulas[category]) {
        categorizedFormulas[category] = [];
      }
      
      categorizedFormulas[category].push({
        id: formula.id,
        name: formula.name,
        formula: formula.formula,
        calculation_details: formula.calculation_details
      });
    });
    
    // Print formulas by category
    console.log('\nFormulas by category:');
    Object.entries(categorizedFormulas).sort().forEach(([category, formulas]) => {
      console.log(`\n${category.toUpperCase()} (${formulas.length}):`);
      
      formulas.forEach(formula => {
        console.log(`- ${formula.id}: ${formula.name}`);
        console.log(`  Formula: ${formula.formula}`);
        
        if (formula.calculation_details) {
          const details = typeof formula.calculation_details === 'string' 
            ? JSON.parse(formula.calculation_details) 
            : formula.calculation_details;
            
          console.log(`  Quantity: ${details.quantity_calculation || 'N/A'}`);
          console.log(`  Price: ${details.price_calculation || 'N/A'}`);
        } else {
          console.log(`  No calculation details available`);
        }
        
        console.log('');
      });
    });
    
  } catch (error) {
    console.error('Error verifying formula calculations:', error);
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
