/**
 * Execute SQL Procedures in Supabase
 * 
 * This script executes the SQL procedures to create the necessary tables in Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase connection details
const supabaseUrl = 'https://kdhwrlhzevzekoanusbs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaHdybGh6ZXZ6ZWtvYW51c2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTczNDUsImV4cCI6MjA1MzEzMzM0NX0.qAA2en6uQPoTDq9oivjfSHajQjY6VKFQ2ymtwgJAyx8';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'create-formula-tables.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

// Split the SQL content into individual statements
const statements = sqlContent.split(';').filter(stmt => stmt.trim() !== '');

// Execute each SQL statement
async function executeStatements() {
  console.log('Executing SQL statements...');
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i].trim() + ';';
    console.log(`Executing statement ${i + 1}/${statements.length}`);
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
      } else {
        console.log(`Statement ${i + 1} executed successfully`);
      }
    } catch (err) {
      console.error(`Error executing statement ${i + 1}:`, err);
    }
  }
  
  console.log('SQL execution completed');
}

// Execute the statements
executeStatements().catch(error => {
  console.error('Execution failed:', error);
});
