/**
 * Split Products Migration
 * 
 * This script splits the full-products-migration.sql file into smaller batch files
 * that can be executed directly in the Supabase SQL Editor.
 */

const fs = require('fs');
const path = require('path');

// Function to split SQL file into batches
function splitSqlIntoBatches(sqlFilePath, outputDir, batchSize = 20) {
  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);
    
    console.log(`Found ${statements.length} SQL statements to split`);
    
    // Calculate number of batches
    const numBatches = Math.ceil(statements.length / batchSize);
    console.log(`Splitting into ${numBatches} batches of ${batchSize} statements each`);
    
    // Process statements in batches
    for (let i = 0; i < numBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = Math.min(startIdx + batchSize, statements.length);
      const batchStatements = statements.slice(startIdx, endIdx);
      
      // Create batch SQL content
      let batchSql = `-- Products migration batch ${i + 1} of ${numBatches}\n`;
      batchSql += `-- Statements ${startIdx + 1} to ${endIdx} of ${statements.length}\n\n`;
      batchSql += batchStatements.join(';\n\n') + ';';
      
      // Write batch to file
      const batchFilePath = path.join(outputDir, `products-batch-${i + 1}.sql`);
      fs.writeFileSync(batchFilePath, batchSql);
      
      console.log(`Created batch file: ${batchFilePath}`);
    }
    
    console.log('Successfully split SQL file into batches');
    return true;
  } catch (error) {
    console.error('Error splitting SQL file:', error);
    return false;
  }
}

// Main function
function main() {
  const sqlFilePath = path.join(__dirname, '..', 'full-products-migration.sql');
  const outputDir = path.join(__dirname, '..', 'batches');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log(`Created output directory: ${outputDir}`);
  }
  
  // Split SQL file into batches
  const success = splitSqlIntoBatches(sqlFilePath, outputDir);
  
  if (success) {
    console.log('SQL file successfully split into batches');
    console.log('You can now execute these batch files in the Supabase SQL Editor');
  } else {
    console.error('Failed to split SQL file into batches');
  }
}

// Run the main function
main();
