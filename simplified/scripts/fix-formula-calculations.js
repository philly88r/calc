/**
 * Fix Formula Calculations
 * 
 * This script fixes the calculation formulas for terminal posts, line posts, and top rail.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Define formula fixes
const formulaFixes = [
  { 
    id: 'terminal_posts', 
    formula: 'numberOfEndTerminals',
    description: 'Fixed to use numberOfEndTerminals directly instead of calculating from pulls, corners, and gates'
  },
  { 
    id: 'line_posts', 
    formula: 'linePostsCount',
    description: 'Fixed to use linePostsCount directly'
  },
  { 
    id: 'top_rail', 
    formula: 'Math.ceil(fenceLength / railLength)',
    description: 'Fixed to calculate based on fence length and rail length'
  }
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
    
    // Get current formulas
    console.log('\nCurrent formulas:');
    
    for (const fix of formulaFixes) {
      const result = await client.query(`
        SELECT id, name, calculation_details
        FROM material_formulas
        WHERE id = $1;
      `, [fix.id]);
      
      if (result.rows.length > 0) {
        const formula = result.rows[0];
        console.log(`\n${formula.name} (${formula.id}):`);
        console.log(`Current formula: ${formula.calculation_details?.formula || 'None'}`);
      }
    }
    
    // Update formulas
    console.log('\nUpdating formulas...');
    
    for (const fix of formulaFixes) {
      const result = await client.query(`
        SELECT calculation_details
        FROM material_formulas
        WHERE id = $1;
      `, [fix.id]);
      
      if (result.rows.length > 0) {
        const details = result.rows[0].calculation_details || {};
        details.formula = fix.formula;
        
        await client.query(`
          UPDATE material_formulas
          SET 
            calculation_details = $1,
            updated_at = NOW()
          WHERE id = $2;
        `, [details, fix.id]);
        
        console.log(`Updated ${fix.id} formula to: ${fix.formula}`);
        console.log(`Reason: ${fix.description}`);
      } else {
        console.log(`Formula not found: ${fix.id}`);
      }
    }
    
    // Verify the update
    console.log('\nVerifying updated formulas:');
    
    for (const fix of formulaFixes) {
      const result = await client.query(`
        SELECT id, name, calculation_details
        FROM material_formulas
        WHERE id = $1;
      `, [fix.id]);
      
      if (result.rows.length > 0) {
        const formula = result.rows[0];
        console.log(`\n${formula.name} (${formula.id}):`);
        console.log(`Updated formula: ${formula.calculation_details?.formula || 'None'}`);
      }
    }
    
  } catch (error) {
    console.error('Error fixing formula calculations:', error);
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
