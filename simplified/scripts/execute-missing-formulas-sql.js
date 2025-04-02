/**
 * Execute Missing Formulas SQL
 * 
 * This script executes the SQL statements in missing-formulas.sql to add
 * the missing formulas to the material_formulas table in the Supabase database.
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Path to SQL file
const sqlFilePath = path.join(__dirname, 'missing-formulas.sql');

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Read SQL file
    console.log(`Reading SQL file: ${sqlFilePath}`);
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL into individual statements
    const sqlStatements = sqlContent.split('-- Add formula:')
      .filter(statement => statement.trim() !== '')
      .map(statement => {
        // Extract formula name from comment
        const nameMatch = statement.match(/^(.*?)INSERT/);
        const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
        
        // Get the full SQL statement
        return {
          name,
          sql: '-- Add formula: ' + statement.trim()
        };
      });
    
    console.log(`Found ${sqlStatements.length} SQL statements to execute.`);
    
    // Execute each statement
    console.log('\nExecuting SQL statements...');
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < sqlStatements.length; i++) {
      const { name, sql } = sqlStatements[i];
      
      try {
        console.log(`[${i + 1}/${sqlStatements.length}] Adding formula: ${name}`);
        await client.query(sql);
        successCount++;
      } catch (error) {
        console.error(`Error adding formula ${name}:`, error.message);
        errorCount++;
      }
    }
    
    // Get count of formulas in the database
    const countResult = await client.query(`
      SELECT COUNT(*) FROM material_formulas;
    `);
    
    const totalFormulas = parseInt(countResult.rows[0].count);
    
    console.log('\nExecution complete!');
    console.log(`- Successful statements: ${successCount}`);
    console.log(`- Failed statements: ${errorCount}`);
    console.log(`- Total formulas in database: ${totalFormulas}`);
    
  } catch (error) {
    console.error('Error executing SQL for missing formulas:', error);
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
