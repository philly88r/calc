/**
 * PostgreSQL Create Questionnaire Table
 * 
 * This script creates a questionnaire table in the Supabase database
 * that connects user inputs to material formulas and products.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Function to create the questionnaire table
async function createQuestionnaireTable(client) {
  console.log('Creating questionnaire table...');
  
  const createTableSql = `
    -- Drop the table if it exists to start fresh
    DROP TABLE IF EXISTS questionnaire;

    -- Create the questionnaire table
    CREATE TABLE questionnaire (
      id SERIAL PRIMARY KEY,
      section TEXT NOT NULL,
      question TEXT NOT NULL,
      field_name TEXT NOT NULL,
      field_type TEXT NOT NULL,
      options JSONB,
      default_value TEXT,
      triggers JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );

    -- Create index on section for faster lookups
    CREATE INDEX idx_questionnaire_section ON questionnaire(section);
  `;
  
  try {
    await client.query(createTableSql);
    console.log('Successfully created questionnaire table');
    return true;
  } catch (error) {
    console.error('Error creating questionnaire table:', error);
    return false;
  }
}

// Function to populate the questionnaire table with questions from the refactored calculator
async function populateQuestionnaireTable(client) {
  console.log('Populating questionnaire table with questions...');
  
  // Define the questions from the refactored calculator
  const questions = [
    // Basic Information Section
    {
      section: 'basic_information',
      question: 'Total Linear Length Excluding Gates (ft)',
      field_name: 'totalLinearLength',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['line_posts', 'terminal_posts', 'corner_posts', 'top_rail', 'mesh']
      }
    },
    {
      section: 'basic_information',
      question: 'Height of Fence (ft)',
      field_name: 'heightOfFence',
      field_type: 'select',
      options: JSON.stringify(['3', '3.5', '4', '5', '6', '7', '8', '10', '12']),
      default_value: '4',
      triggers: {
        formulas: ['line_posts', 'terminal_posts', 'corner_posts', 'top_rail', 'mesh']
      }
    },
    {
      section: 'basic_information',
      question: 'Commercial or Residential',
      field_name: 'commercialOrResidential',
      field_type: 'select',
      options: JSON.stringify(['Commercial', 'Residential']),
      default_value: 'Residential',
      triggers: {
        formulas: ['line_posts', 'terminal_posts', 'corner_posts']
      }
    },
    {
      section: 'basic_information',
      question: 'Material',
      field_name: 'material',
      field_type: 'select',
      options: JSON.stringify(['Galvanized', 'Black']),
      default_value: 'Galvanized',
      triggers: {
        product_types: ['post', 'mesh', 'dome_cap', 'tension_band', 'brace_band']
      }
    },
    {
      section: 'basic_information',
      question: 'Mesh Type',
      field_name: 'meshType',
      field_type: 'select',
      options: JSON.stringify(['9 gauge', '11 gauge', '11.5 gauge', '12.5 gauge']),
      default_value: '9 gauge',
      triggers: {
        product_types: ['mesh']
      }
    },
    {
      section: 'basic_information',
      question: 'Mesh Fold',
      field_name: 'meshFold',
      field_type: 'select',
      options: JSON.stringify(['Knuckle/Knuckle', 'Knuckle/Twist', 'Twist/Twist']),
      default_value: 'Knuckle/Knuckle',
      triggers: {
        product_types: ['mesh']
      }
    },
    {
      section: 'basic_information',
      question: 'Concrete Type',
      field_name: 'concreteType',
      field_type: 'select',
      options: JSON.stringify(['Premix', 'Bag Mix']),
      default_value: 'Premix',
      triggers: {
        formulas: ['concrete']
      }
    },
    
    // Pull Section
    {
      section: 'pull_section',
      question: 'Number of Pulls',
      field_name: 'numberOfPulls',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['terminal_posts']
      }
    },
    
    // Gates Section
    {
      section: 'gates',
      question: 'Number of Single Gates',
      field_name: 'numberOfSingleGates',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['single_gates']
      }
    },
    {
      section: 'gates',
      question: 'Number of Double Gates',
      field_name: 'numberOfDoubleGates',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['double_gates']
      }
    },
    {
      section: 'gates',
      question: 'Number of Sliding Gates',
      field_name: 'numberOfSlidingGates',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['sliding_gates']
      }
    },
    {
      section: 'gates',
      question: 'Has Duckbill Gate Stop',
      field_name: 'hasDuckbillGateStop',
      field_type: 'boolean',
      options: null,
      default_value: 'false',
      triggers: {
        formulas: ['duckbill_gate_stop']
      }
    },
    {
      section: 'gates',
      question: 'Gate Type',
      field_name: 'gateType',
      field_type: 'select',
      options: JSON.stringify(['Chain Link', 'Ornamental']),
      default_value: 'Chain Link',
      triggers: {
        formulas: ['single_gates', 'double_gates', 'sliding_gates']
      }
    },
    {
      section: 'gates',
      question: 'Gate Commercial/Residential',
      field_name: 'gateCommercialResidential',
      field_type: 'select',
      options: JSON.stringify(['Commercial', 'Residential']),
      default_value: 'Residential',
      triggers: {
        formulas: ['single_gates', 'double_gates', 'sliding_gates']
      }
    },
    {
      section: 'gates',
      question: 'Gate Barbed',
      field_name: 'gateBarbed',
      field_type: 'boolean',
      options: null,
      default_value: 'false',
      triggers: {
        formulas: ['barb_arm']
      }
    },
    {
      section: 'gates',
      question: 'Gate Finish',
      field_name: 'gateFinish',
      field_type: 'select',
      options: JSON.stringify(['Galvanized', 'Black']),
      default_value: 'Galvanized',
      triggers: {
        product_types: ['gate_frame', 'gate_hinge', 'gate_latch']
      }
    },
    {
      section: 'gates',
      question: 'Gate Frame Diameter',
      field_name: 'gateFrameDiameter',
      field_type: 'select',
      options: JSON.stringify(['1 5/8', '2']),
      default_value: '1 5/8',
      triggers: {
        product_types: ['gate_frame']
      }
    },
    
    // Posts Section
    {
      section: 'posts',
      question: 'Terminal Post Diameter',
      field_name: 'terminalPostDiameter',
      field_type: 'select',
      options: JSON.stringify(['2 3/8', '2 7/8', '3 1/2', '4']),
      default_value: '2 3/8',
      triggers: {
        formulas: ['terminal_posts'],
        product_types: ['post']
      }
    },
    {
      section: 'posts',
      question: 'Terminal Post Thickness',
      field_name: 'terminalPostThickness',
      field_type: 'select',
      options: JSON.stringify(['0.065', 'SCH 20', 'SCH 40']),
      default_value: '0.065',
      triggers: {
        formulas: ['terminal_posts'],
        product_types: ['post']
      }
    },
    {
      section: 'posts',
      question: 'Line Post Diameter',
      field_name: 'linePostDiameter',
      field_type: 'select',
      options: JSON.stringify(['1 3/8', '1 5/8', '1 7/8', '2']),
      default_value: '1 3/8',
      triggers: {
        formulas: ['line_posts'],
        product_types: ['post']
      }
    },
    {
      section: 'posts',
      question: 'Line Post Thickness',
      field_name: 'linePostThickness',
      field_type: 'select',
      options: JSON.stringify(['0.065', 'SCH 20', 'SCH 40']),
      default_value: '0.065',
      triggers: {
        formulas: ['line_posts'],
        product_types: ['post']
      }
    },
    {
      section: 'posts',
      question: 'Corner Post Diameter',
      field_name: 'cornerPostDiameter',
      field_type: 'select',
      options: JSON.stringify(['2 3/8', '2 7/8', '3 1/2', '4']),
      default_value: '2 3/8',
      triggers: {
        formulas: ['corner_posts'],
        product_types: ['post']
      }
    },
    {
      section: 'posts',
      question: 'Corner Post Thickness',
      field_name: 'cornerPostThickness',
      field_type: 'select',
      options: JSON.stringify(['0.065', 'SCH 20', 'SCH 40']),
      default_value: '0.065',
      triggers: {
        formulas: ['corner_posts'],
        product_types: ['post']
      }
    },
    
    // Additional Info Section
    {
      section: 'additional_info',
      question: 'Top Rail Diameter',
      field_name: 'topRailDiameter',
      field_type: 'select',
      options: JSON.stringify(['1 3/8', '1 5/8', '1 7/8']),
      default_value: '1 3/8',
      triggers: {
        formulas: ['top_rail'],
        product_types: ['rail_clamp']
      }
    },
    {
      section: 'additional_info',
      question: 'Top Rail Thickness',
      field_name: 'topRailThickness',
      field_type: 'select',
      options: JSON.stringify(['0.065', 'SCH 20', 'SCH 40']),
      default_value: '0.065',
      triggers: {
        formulas: ['top_rail']
      }
    },
    {
      section: 'additional_info',
      question: 'Has Barbed Wire',
      field_name: 'hasBarbedWire',
      field_type: 'boolean',
      options: null,
      default_value: 'false',
      triggers: {
        formulas: ['barb_arm', 'barbed_wire']
      }
    },
    {
      section: 'additional_info',
      question: 'Number of Strands of Barbed Wire',
      field_name: 'numberOfStrandsOfBarbedWire',
      field_type: 'select',
      options: JSON.stringify(['3', '4', '5', '6']),
      default_value: '3',
      triggers: {
        formulas: ['barbed_wire']
      }
    },
    
    // Extra Work Section
    {
      section: 'extra_work',
      question: 'Has Clearing',
      field_name: 'hasClearing',
      field_type: 'boolean',
      options: null,
      default_value: 'false',
      triggers: {
        formulas: ['clearing']
      }
    },
    {
      section: 'extra_work',
      question: 'Clearing Linear Feet',
      field_name: 'clearingLinearFeet',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['clearing']
      }
    },
    {
      section: 'extra_work',
      question: 'Has Rock Drilling',
      field_name: 'hasRockDrilling',
      field_type: 'boolean',
      options: null,
      default_value: 'false',
      triggers: {
        formulas: ['rock_drilling']
      }
    },
    {
      section: 'extra_work',
      question: 'Number of Rock Drilling Holes',
      field_name: 'numberOfRockDrillingHoles',
      field_type: 'number',
      options: null,
      default_value: '0',
      triggers: {
        formulas: ['rock_drilling']
      }
    }
  ];
  
  // Insert each question into the questionnaire table
  for (const question of questions) {
    const insertSql = `
      INSERT INTO questionnaire (
        section, question, field_name, field_type, options, default_value, triggers
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
    `;
    
    try {
      await client.query(insertSql, [
        question.section,
        question.question,
        question.field_name,
        question.field_type,
        question.options ? question.options : null,
        question.default_value,
        JSON.stringify(question.triggers)
      ]);
      
      console.log(`Inserted question: ${question.question}`);
    } catch (error) {
      console.error(`Error inserting question "${question.question}":`, error);
    }
  }
  
  console.log('Finished populating questionnaire table');
  return true;
}

// Main function
async function main() {
  console.log('Starting PostgreSQL create questionnaire table...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create the questionnaire table
    const tableCreated = await createQuestionnaireTable(client);
    if (!tableCreated) {
      console.error('Failed to create questionnaire table. Aborting.');
      await client.end();
      return;
    }
    
    // Populate the questionnaire table
    const tablePopulated = await populateQuestionnaireTable(client);
    if (!tablePopulated) {
      console.error('Failed to populate questionnaire table.');
    }
    
    // Verify the questions were inserted
    const countResult = await client.query('SELECT COUNT(*) FROM questionnaire');
    console.log(`Total questions in database: ${countResult.rows[0].count}`);
    
    console.log('Questionnaire table creation and population completed successfully!');
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
