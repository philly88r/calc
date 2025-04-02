/**
 * Migrate JSON Formulas to Supabase
 * 
 * This script reads the extracted formulas data from the JSON file
 * and migrates them to the Supabase PostgreSQL database.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Create a new client
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connections
  }
});

// Main migration function
async function migrateFormulas() {
  console.log('Starting JSON to PostgreSQL migration...');
  
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to PostgreSQL database');
    
    // Create the material_formulas table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS material_formulas (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        questionnaire_trigger TEXT,
        formula_text TEXT,
        height_calculation TEXT,
        price_calculation_steps JSONB,
        price_calculation_code TEXT,
        total_cost_formula TEXT,
        price_lookup TEXT,
        additional_info TEXT,
        available_options JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );
    `;
    
    await client.query(createTableQuery);
    console.log('Created material_formulas table (if it didn\'t exist)');
    
    // Read the JSON data file
    const jsonFilePath = path.join(__dirname, '..', 'formulas-data.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Process gate formulas
    const gateFormulas = [];
    if (jsonData.gateFormulas) {
      Object.entries(jsonData.gateFormulas).forEach(([key, formula]) => {
        gateFormulas.push({
          id: key,
          name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          category: 'gates',
          description: formula.description || '',
          questionnaire_trigger: formula.questionnaire_trigger || '',
          formula_text: formula.formula || '',
          price_calculation_steps: JSON.stringify(formula.price_calculation.steps || []),
          price_calculation_code: formula.price_calculation.code || '',
          total_cost_formula: formula.total_cost_formula || '',
          available_options: JSON.stringify(formula.available_options || {})
        });
      });
    }
    
    // Process post formulas
    const postFormulas = [];
    if (jsonData.postFormulas) {
      Object.entries(jsonData.postFormulas).forEach(([key, formula]) => {
        postFormulas.push({
          id: key,
          name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          category: 'posts',
          description: formula.description || '',
          questionnaire_trigger: formula.questionnaire_trigger || '',
          formula_text: formula.formula || '',
          height_calculation: formula.height_calculation || '',
          price_calculation_steps: JSON.stringify(formula.price_calculation.steps || []),
          price_calculation_code: formula.price_calculation.code || '',
          total_cost_formula: formula.total_cost_formula || '',
          price_lookup: formula.price_lookup || '',
          additional_info: formula.additional_info || '',
          available_options: JSON.stringify(formula.available_options || {})
        });
      });
    }
    
    // Combine all formulas
    const allFormulas = [...gateFormulas, ...postFormulas];
    console.log(`Prepared ${allFormulas.length} formulas for insertion (${gateFormulas.length} gates, ${postFormulas.length} posts)`);
    
    // Insert formulas into the database
    for (const formula of allFormulas) {
      const insertQuery = `
        INSERT INTO material_formulas (
          id, name, category, description, questionnaire_trigger, formula_text,
          height_calculation, price_calculation_steps, price_calculation_code,
          total_cost_formula, price_lookup, additional_info, available_options
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
        ) ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          questionnaire_trigger = EXCLUDED.questionnaire_trigger,
          formula_text = EXCLUDED.formula_text,
          height_calculation = EXCLUDED.height_calculation,
          price_calculation_steps = EXCLUDED.price_calculation_steps,
          price_calculation_code = EXCLUDED.price_calculation_code,
          total_cost_formula = EXCLUDED.total_cost_formula,
          price_lookup = EXCLUDED.price_lookup,
          additional_info = EXCLUDED.additional_info,
          available_options = EXCLUDED.available_options,
          updated_at = now()
      `;
      
      const values = [
        formula.id,
        formula.name,
        formula.category,
        formula.description,
        formula.questionnaire_trigger,
        formula.formula_text,
        formula.height_calculation,
        formula.price_calculation_steps,
        formula.price_calculation_code,
        formula.total_cost_formula,
        formula.price_lookup,
        formula.additional_info,
        formula.available_options
      ];
      
      await client.query(insertQuery, values);
      console.log(`Inserted/updated formula: ${formula.id}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  }
}

// Run the migration
migrateFormulas().catch(error => {
  console.error('Unhandled error:', error);
  client.end();
});
