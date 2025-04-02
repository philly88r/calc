/**
 * Check Material Formulas Columns
 * 
 * This script connects to the Supabase database and checks the columns
 * in the material_formulas table.
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
    
    // Get column information
    console.log('\nGetting column information for material_formulas table:');
    const columnsResult = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'material_formulas'
      ORDER BY ordinal_position;
    `);
    
    if (columnsResult.rows.length === 0) {
      console.log('No columns found or table does not exist');
      return;
    }
    
    console.log('Columns in material_formulas table:');
    columnsResult.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})${row.is_nullable === 'YES' ? ' [nullable]' : ''}${row.column_default ? ` [default: ${row.column_default}]` : ''}`);
    });
    
    // Get table constraints
    console.log('\nGetting constraints for material_formulas table:');
    const constraintsResult = await client.query(`
      SELECT con.conname as constraint_name, 
             con.contype as constraint_type,
             pg_get_constraintdef(con.oid) as constraint_definition
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
      WHERE rel.relname = 'material_formulas'
      AND nsp.nspname = 'public';
    `);
    
    if (constraintsResult.rows.length === 0) {
      console.log('No constraints found');
    } else {
      console.log('Constraints in material_formulas table:');
      constraintsResult.rows.forEach(row => {
        const constraintType = {
          'p': 'PRIMARY KEY',
          'f': 'FOREIGN KEY',
          'u': 'UNIQUE',
          'c': 'CHECK',
          't': 'TRIGGER'
        }[row.constraint_type] || row.constraint_type;
        
        console.log(`- ${row.constraint_name} (${constraintType}): ${row.constraint_definition}`);
      });
    }
    
    // Get indexes
    console.log('\nGetting indexes for material_formulas table:');
    const indexesResult = await client.query(`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'material_formulas'
      AND schemaname = 'public';
    `);
    
    if (indexesResult.rows.length === 0) {
      console.log('No indexes found');
    } else {
      console.log('Indexes in material_formulas table:');
      indexesResult.rows.forEach(row => {
        console.log(`- ${row.indexname}: ${row.indexdef}`);
      });
    }
    
    // Get sample data
    console.log('\nGetting sample data from material_formulas table:');
    const sampleResult = await client.query(`
      SELECT *
      FROM material_formulas
      LIMIT 1;
    `);
    
    if (sampleResult.rows.length === 0) {
      console.log('No data found in the table');
    } else {
      console.log('Sample row from material_formulas table:');
      const sampleRow = sampleResult.rows[0];
      Object.entries(sampleRow).forEach(([key, value]) => {
        console.log(`- ${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking material_formulas table:', error);
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
