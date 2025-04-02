/**
 * Update Remaining Generic Formulas
 * 
 * This script updates the remaining formulas in the material_formulas table
 * that are still using generic calculations.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Specific formula updates
const specificFormulas = {
  // Hardware
  "dome_cap_duckbill": {
    formula: "Number of duckbill posts",
    calculation_details: {
      quantity_calculation: "Number of duckbill posts (typically equal to number of sliding gates)",
      price_calculation: "Cap price × quantity"
    }
  },
  
  // Materials
  "slick_line": {
    formula: "Math.ceil(fenceLength / 1000)",
    calculation_details: {
      quantity_calculation: "Math.ceil(fenceLength / 1000) - Slick line comes in 1000ft rolls",
      price_calculation: "Slick line price per roll × quantity"
    }
  }
};

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Update each formula with specific calculations
    console.log('Updating formulas with specific calculations...');
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const [id, formula] of Object.entries(specificFormulas)) {
      try {
        // Check if formula exists
        const checkResult = await client.query(
          'SELECT id FROM material_formulas WHERE id = $1',
          [id]
        );
        
        if (checkResult.rows.length === 0) {
          console.log(`Formula ${id} not found, skipping...`);
          skippedCount++;
          continue;
        }
        
        // Update formula
        console.log(`Updating formula: ${id}`);
        
        await client.query(
          `UPDATE material_formulas 
           SET formula = $1, calculation_details = $2, updated_at = NOW()
           WHERE id = $3`,
          [
            formula.formula,
            JSON.stringify(formula.calculation_details),
            id
          ]
        );
        
        updatedCount++;
      } catch (error) {
        console.error(`Error updating formula ${id}:`, error);
        skippedCount++;
      }
    }
    
    console.log(`\nUpdate complete!`);
    console.log(`- Updated formulas: ${updatedCount}`);
    console.log(`- Skipped formulas: ${skippedCount}`);
    
    // Verify that the custom items have appropriate formulas
    console.log('\nVerifying custom item formulas...');
    
    const customItems = [
      'custom_item_1',
      'custom_item_2',
      'custom_item_3',
      'custom_item_4',
      'custom_item_5'
    ];
    
    for (const id of customItems) {
      try {
        const result = await client.query(
          'SELECT formula, calculation_details FROM material_formulas WHERE id = $1',
          [id]
        );
        
        if (result.rows.length === 0) {
          console.log(`Custom item ${id} not found.`);
          continue;
        }
        
        const formula = result.rows[0];
        console.log(`${id}: Formula = "${formula.formula}"`);
        
        if (formula.calculation_details) {
          const details = typeof formula.calculation_details === 'string' 
            ? JSON.parse(formula.calculation_details) 
            : formula.calculation_details;
            
          console.log(`  Quantity calculation: ${details.quantity_calculation || 'N/A'}`);
          console.log(`  Price calculation: ${details.price_calculation || 'N/A'}`);
        }
      } catch (error) {
        console.error(`Error verifying custom item ${id}:`, error);
      }
    }
    
    console.log('\nNote: Custom items are designed to be user-defined, so their generic formulas are appropriate.');
    
  } catch (error) {
    console.error('Error updating remaining formulas:', error);
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
