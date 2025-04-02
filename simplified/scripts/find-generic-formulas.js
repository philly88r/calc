/**
 * Find Generic Formulas
 * 
 * This script identifies formulas in the material_formulas table that are still
 * using generic calculations.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Generic formula patterns to look for
const genericPatterns = [
  'Quantity based on fence specifications',
  'Calculated based on fence specifications',
  'Quantity specified by user',
  'specified by the user',
  'Unit price × quantity'
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
    
    // Get all formulas from the database
    console.log('Retrieving formulas from the database...');
    const formulasResult = await client.query(`
      SELECT id, name, category, formula, calculation_details
      FROM material_formulas 
      ORDER BY category, name;
    `);
    
    const dbFormulas = formulasResult.rows;
    console.log(`Found ${dbFormulas.length} formulas in the database.`);
    
    // Identify generic formulas
    const genericFormulas = [];
    
    dbFormulas.forEach(formula => {
      let isGeneric = false;
      let genericReason = '';
      
      // Check formula text
      if (formula.formula && typeof formula.formula === 'string') {
        for (const pattern of genericPatterns) {
          if (formula.formula.includes(pattern)) {
            isGeneric = true;
            genericReason = `Formula contains "${pattern}"`;
            break;
          }
        }
      }
      
      // Check calculation details
      if (!isGeneric && formula.calculation_details) {
        const details = typeof formula.calculation_details === 'string' 
          ? JSON.parse(formula.calculation_details) 
          : formula.calculation_details;
          
        if (details.quantity_calculation) {
          for (const pattern of genericPatterns) {
            if (details.quantity_calculation.includes(pattern)) {
              isGeneric = true;
              genericReason = `Quantity calculation contains "${pattern}"`;
              break;
            }
          }
        }
        
        if (!isGeneric && details.price_calculation) {
          for (const pattern of genericPatterns) {
            if (details.price_calculation.includes(pattern)) {
              isGeneric = true;
              genericReason = `Price calculation contains "${pattern}"`;
              break;
            }
          }
        }
      }
      
      if (isGeneric) {
        genericFormulas.push({
          id: formula.id,
          name: formula.name,
          category: formula.category,
          reason: genericReason
        });
      }
    });
    
    // Print generic formulas by category
    console.log(`\nFound ${genericFormulas.length} formulas with generic calculations:`);
    
    // Group by category
    const categorizedGenericFormulas = {};
    
    genericFormulas.forEach(formula => {
      const category = formula.category || 'uncategorized';
      
      if (!categorizedGenericFormulas[category]) {
        categorizedGenericFormulas[category] = [];
      }
      
      categorizedGenericFormulas[category].push(formula);
    });
    
    // Print by category
    Object.entries(categorizedGenericFormulas).sort().forEach(([category, formulas]) => {
      console.log(`\n${category.toUpperCase()} (${formulas.length}):`);
      
      formulas.forEach(formula => {
        console.log(`- ${formula.id}: ${formula.name}`);
        console.log(`  Reason: ${formula.reason}`);
      });
    });
    
  } catch (error) {
    console.error('Error finding generic formulas:', error);
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
