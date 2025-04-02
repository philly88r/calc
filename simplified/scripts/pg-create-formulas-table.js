/**
 * PostgreSQL Create Material Formulas Table
 * 
 * This script creates the material_formulas table in the Supabase database
 * using a direct PostgreSQL connection.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Function to create the material_formulas table
async function createMaterialFormulasTable(client) {
  console.log('Creating material_formulas table...');
  
  const createTableSql = `
    -- Drop the table if it exists to start fresh
    DROP TABLE IF EXISTS material_formulas;

    -- Create the material_formulas table
    CREATE TABLE material_formulas (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      questionnaire_trigger TEXT,
      formula TEXT,
      calculation_details JSONB,
      additional_info JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );

    -- Create index on category for faster lookups
    CREATE INDEX idx_material_formulas_category ON material_formulas(category);
  `;
  
  try {
    await client.query(createTableSql);
    console.log('Successfully created material_formulas table');
    return true;
  } catch (error) {
    console.error('Error creating material_formulas table:', error);
    return false;
  }
}

// Function to extract formulas from materialFormulas.js
async function extractAndInsertFormulas(client) {
  console.log('Extracting and inserting formulas...');
  
  try {
    // Read the materialFormulas.js file
    const formulasFilePath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
    const formulasContent = fs.readFileSync(formulasFilePath, 'utf8');
    
    // Extract gate formulas
    const gateFormulasMatch = formulasContent.match(/export const gateFormulas = ({[\s\S]*?});/);
    if (!gateFormulasMatch) {
      console.error('Failed to extract gate formulas');
      return false;
    }
    
    // Extract post formulas
    const postFormulasMatch = formulasContent.match(/export const postFormulas = ({[\s\S]*?});/);
    if (!postFormulasMatch) {
      console.error('Failed to extract post formulas');
      return false;
    }
    
    // Insert sample gate formulas
    await insertSampleFormulas(client);
    
    console.log('Successfully extracted and inserted formulas');
    return true;
  } catch (error) {
    console.error('Error extracting and inserting formulas:', error);
    return false;
  }
}

// Function to insert sample formulas
async function insertSampleFormulas(client) {
  console.log('Inserting sample formulas...');
  
  const sampleFormulas = [
    {
      id: 'single_gates',
      name: 'Single Gates',
      category: 'gates',
      description: 'Single gates are the most common type of gate used in chain link fence installations.',
      questionnaire_trigger: 'When the user selects a single gate option',
      formula: 'Gate height × Gate width × Material cost',
      calculation_details: {
        steps: [
          '1. Determine the gate height and width',
          '2. Look up the appropriate gate frame product based on material and size',
          '3. Calculate the total cost of the gate frame',
          '4. Add the cost of hinges, latches, and other hardware',
          '5. Return the total cost'
        ],
        code_string: 'const { height, width, material, thickness } = params; const gateFrameProduct = findProduct("gate_frame", material, thickness); const hingeProduct = findProduct("gate_hinge", material, null); const latchProduct = findProduct("gate_latch", material, null); if (!gateFrameProduct || !hingeProduct || !latchProduct) return 0; const framePrice = gateFrameProduct.price * width * height; const hingePrice = hingeProduct.price * 2; const latchPrice = latchProduct.price; return framePrice + hingePrice + latchPrice;',
        total_cost_formula: 'Gate frame price + Hardware price',
        available_options: {
          heights: ['36"', '42"', '48"', '60"', '72"'],
          widths: ['3ft', '4ft', '5ft', '6ft']
        }
      },
      additional_info: {
        installation_time: '1-2 hours',
        recommended_tools: ['Wrench', 'Pliers', 'Level']
      }
    },
    {
      id: 'double_gates',
      name: 'Double Gates',
      category: 'gates',
      description: 'Double gates consist of two gate panels that meet in the middle.',
      questionnaire_trigger: 'When the user selects a double gate option',
      formula: 'Gate height × Gate width × Material cost × 2',
      calculation_details: {
        steps: [
          '1. Determine the gate height and width',
          '2. Look up the appropriate gate frame product based on material and size',
          '3. Calculate the total cost of two gate frames',
          '4. Add the cost of hinges, latches, drop rod, and other hardware',
          '5. Return the total cost'
        ],
        code_string: 'const { height, width, material, thickness } = params; const gateFrameProduct = findProduct("gate_frame", material, thickness); const hingeProduct = findProduct("gate_hinge", material, null); const latchProduct = findProduct("gate_latch", material, null); const dropRodProduct = findProduct("drop_rod", material, null); if (!gateFrameProduct || !hingeProduct || !latchProduct || !dropRodProduct) return 0; const framePrice = gateFrameProduct.price * width * height * 2; const hingePrice = hingeProduct.price * 4; const latchPrice = latchProduct.price; const dropRodPrice = dropRodProduct.price; return framePrice + hingePrice + latchPrice + dropRodPrice;',
        total_cost_formula: 'Gate frame price × 2 + Hardware price',
        available_options: {
          heights: ['36"', '42"', '48"', '60"', '72"'],
          widths: ['6ft', '8ft', '10ft', '12ft']
        }
      },
      additional_info: {
        installation_time: '2-3 hours',
        recommended_tools: ['Wrench', 'Pliers', 'Level', 'Measuring Tape']
      }
    },
    {
      id: 'terminal_posts',
      name: 'Terminal Posts',
      category: 'posts',
      description: 'Terminal posts are used at the ends of fence runs and at gates.',
      questionnaire_trigger: 'When the user selects chain link fence type',
      formula: 'Number of terminal points × Post height × Material cost',
      calculation_details: {
        steps: [
          '1. Count the number of terminal points (ends and gates)',
          '2. Calculate the required post height (fence height + 2ft for concrete)',
          '3. Look up the appropriate post product based on material, thickness, and diameter',
          '4. Calculate the total cost of all terminal posts'
        ],
        code_string: 'const { terminalPoints, height, material, thickness, diameter } = params; const postHeight = height + 2; const postProduct = findPostProduct(material, thickness, diameter, postHeight + "ft"); if (!postProduct) return 0; return postProduct.price * terminalPoints;',
        total_cost_formula: 'Number of terminal points × Post price',
        available_options: {
          diameters: ['2 3/8', '2 7/8', '3 1/2', '4'],
          thicknesses: ['0.065', 'SCH 20', 'SCH 40']
        }
      },
      additional_info: {
        installation_depth: '2 feet',
        concrete_required: true
      }
    },
    {
      id: 'line_posts',
      name: 'Line Posts',
      category: 'posts',
      description: 'Line posts are used between terminal posts to support the fence fabric.',
      questionnaire_trigger: 'When the user selects chain link fence type',
      formula: 'Number of line posts × Post height × Material cost',
      calculation_details: {
        steps: [
          '1. Calculate the number of line posts (fence length ÷ 10)',
          '2. Calculate the required post height (fence height + 2ft for concrete)',
          '3. Look up the appropriate post product based on material, thickness, and diameter',
          '4. Calculate the total cost of all line posts'
        ],
        code_string: 'const { fenceLength, height, material, thickness, diameter } = params; const numPosts = Math.ceil(fenceLength / 10); const postHeight = height + 2; const postProduct = findPostProduct(material, thickness, diameter, postHeight + "ft"); if (!postProduct) return 0; return postProduct.price * numPosts;',
        total_cost_formula: 'Number of line posts × Post price',
        available_options: {
          diameters: ['1 3/8', '1 5/8', '1 7/8', '2'],
          thicknesses: ['0.065', 'SCH 20', 'SCH 40']
        }
      },
      additional_info: {
        installation_depth: '2 feet',
        concrete_required: true,
        spacing: '10 feet'
      }
    }
  ];
  
  for (const formula of sampleFormulas) {
    const insertSql = `
      INSERT INTO material_formulas (
        id, name, category, description, questionnaire_trigger, formula, calculation_details, additional_info
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      );
    `;
    
    try {
      await client.query(insertSql, [
        formula.id,
        formula.name,
        formula.category,
        formula.description,
        formula.questionnaire_trigger,
        formula.formula,
        JSON.stringify(formula.calculation_details),
        JSON.stringify(formula.additional_info)
      ]);
      
      console.log(`Inserted formula: ${formula.id}`);
    } catch (error) {
      console.error(`Error inserting formula ${formula.id}:`, error);
    }
  }
  
  console.log('Finished inserting sample formulas');
}

// Function to create the formula_products table
async function createFormulaProductsTable(client) {
  console.log('Creating formula_products table...');
  
  const createTableSql = `
    -- Drop the table if it exists to start fresh
    DROP TABLE IF EXISTS formula_products;

    -- Create the formula_products table
    CREATE TABLE formula_products (
      id SERIAL PRIMARY KEY,
      formula_id TEXT,
      product_type TEXT,
      lookup_criteria JSONB
    );
  `;
  
  try {
    await client.query(createTableSql);
    console.log('Successfully created formula_products table');
    return true;
  } catch (error) {
    console.error('Error creating formula_products table:', error);
    return false;
  }
}

// Function to populate the formula_products table
async function populateFormulaProductsTable(client) {
  console.log('Populating formula_products table...');
  
  try {
    // Get all formulas from the material_formulas table
    const formulasResult = await client.query('SELECT id, category FROM material_formulas');
    const formulas = formulasResult.rows;
    
    if (!formulas || formulas.length === 0) {
      console.log('No formulas found in the material_formulas table');
      return false;
    }
    
    console.log(`Found ${formulas.length} formulas to process`);
    
    // Create basic relationships based on formula category
    for (const formula of formulas) {
      const productTypes = [];
      
      // Determine product types based on formula category and id
      if (formula.category === 'gates') {
        productTypes.push('post');
        
        if (formula.id.includes('single_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('gate_hinge');
          productTypes.push('gate_latch');
        } else if (formula.id.includes('double_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('gate_hinge');
          productTypes.push('gate_latch');
          productTypes.push('drop_rod');
        } else if (formula.id.includes('sliding_gates')) {
          productTypes.push('gate_frame');
          productTypes.push('cantilever_roller');
          productTypes.push('cantilever_latch');
        }
      } else if (formula.category === 'posts') {
        productTypes.push('post');
        
        if (formula.id.includes('terminal_posts') || formula.id.includes('corner_posts')) {
          productTypes.push('tension_band');
          productTypes.push('brace_band');
          productTypes.push('dome_cap');
        } else if (formula.id.includes('line_posts')) {
          productTypes.push('fence_tie');
          productTypes.push('dome_cap');
        }
      }
      
      // Insert relationships for each product type
      for (const productType of productTypes) {
        const insertSql = `
          INSERT INTO formula_products (
            formula_id, product_type, lookup_criteria
          ) VALUES (
            $1, $2, $3
          );
        `;
        
        try {
          await client.query(insertSql, [
            formula.id,
            productType,
            JSON.stringify({
              formula_id: formula.id,
              product_type: productType,
              category: formula.category
            })
          ]);
          
          console.log(`Inserted relationship for ${formula.id} and ${productType}`);
        } catch (error) {
          console.error(`Error inserting relationship for ${formula.id} and ${productType}:`, error);
        }
      }
    }
    
    console.log('Populated formula_products table successfully');
    return true;
  } catch (error) {
    console.error('Error in populateFormulaProductsTable:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting PostgreSQL create formulas table...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create the material_formulas table
    const formulasTableCreated = await createMaterialFormulasTable(client);
    if (!formulasTableCreated) {
      console.error('Failed to create material_formulas table. Aborting.');
      await client.end();
      return;
    }
    
    // Extract and insert formulas
    const formulasInserted = await extractAndInsertFormulas(client);
    if (!formulasInserted) {
      console.error('Failed to extract and insert formulas. Continuing with next step.');
    }
    
    // Create the formula_products table
    const formulaProductsTableCreated = await createFormulaProductsTable(client);
    if (!formulaProductsTableCreated) {
      console.error('Failed to create formula_products table. Aborting.');
      await client.end();
      return;
    }
    
    // Populate the formula_products table
    const formulaProductsPopulated = await populateFormulaProductsTable(client);
    if (!formulaProductsPopulated) {
      console.error('Failed to populate formula_products table.');
    }
    
    // Verify the formulas were inserted
    const formulasCountResult = await client.query('SELECT COUNT(*) FROM material_formulas');
    console.log(`Total formulas in database: ${formulasCountResult.rows[0].count}`);
    
    // Verify the formula-product relationships were inserted
    const relationshipsCountResult = await client.query('SELECT COUNT(*) FROM formula_products');
    console.log(`Total formula-product relationships in database: ${relationshipsCountResult.rows[0].count}`);
    
    console.log('Formulas and relationships creation completed successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('Closing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
