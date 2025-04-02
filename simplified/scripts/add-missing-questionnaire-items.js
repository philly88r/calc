/**
 * Add Missing Questionnaire Items
 * 
 * This script adds the missing questionnaire items to the database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Define missing questionnaire items
const missingItems = [
  // Basic Info
  {
    id: 'fenceLength',
    question_text: 'Fence Length (ft)',
    input_type: 'number',
    default_value: '100',
    order: 15,
    section: 'basicInfo'
  },
  {
    id: 'commercialOrResidential',
    question_text: 'Commercial or Residential',
    input_type: 'select',
    options: ['Commercial', 'Residential'],
    default_value: 'Commercial',
    order: 25,
    section: 'basicInfo'
  },
  {
    id: 'material',
    question_text: 'Material',
    input_type: 'select',
    options: ['Black', 'Galvanized'],
    default_value: 'Galvanized',
    order: 30,
    section: 'basicInfo'
  },
  
  // Post Info
  {
    id: 'numberOfCorners',
    question_text: 'Number of Corners',
    input_type: 'number',
    default_value: '0',
    order: 40,
    section: 'postInfo'
  },
  {
    id: 'postSpacing',
    question_text: 'Post Spacing (ft)',
    input_type: 'select',
    options: [8, 10],
    default_value: '10',
    order: 50,
    section: 'postInfo'
  },
  {
    id: 'numberOfSolitaryPosts',
    question_text: 'Number of Solitary Posts',
    input_type: 'number',
    default_value: '0',
    order: 60,
    section: 'postInfo'
  },
  {
    id: 'numberOfFlangedPosts',
    question_text: 'Number of Flanged Posts (Centered)',
    input_type: 'number',
    default_value: '0',
    order: 70,
    section: 'postInfo'
  },
  {
    id: 'numberOfFlangedPostsOffCentered',
    question_text: 'Number of Flanged Posts (Off-Centered)',
    input_type: 'number',
    default_value: '0',
    order: 80,
    section: 'postInfo'
  },
  
  // Post Specifications
  {
    id: 'terminalPostDiameter',
    question_text: 'Terminal Post Diameter',
    input_type: 'select',
    options: ['1 5/8', '2', '2 3/8', '2 7/8', '3', '3 1/2', '4'],
    default_value: '2 7/8',
    order: 90,
    section: 'postSpecs'
  },
  {
    id: 'cornerPostDiameter',
    question_text: 'Corner Post Diameter',
    input_type: 'select',
    options: ['1 5/8', '2', '2 3/8', '2 7/8', '3', '3 1/2', '4'],
    default_value: '2 7/8',
    order: 100,
    section: 'postSpecs'
  },
  {
    id: 'linePostDiameter',
    question_text: 'Line Post Diameter',
    input_type: 'select',
    options: ['1 3/8', '1 5/8', '1 7/8', '2', '2 3/8', '2 7/8'],
    default_value: '1 7/8',
    order: 110,
    section: 'postSpecs'
  },
  {
    id: 'terminalPostThickness',
    question_text: 'Terminal Post Thickness',
    input_type: 'select',
    options: ['0.065', 'SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 120,
    section: 'postSpecs'
  },
  {
    id: 'cornerPostThickness',
    question_text: 'Corner Post Thickness',
    input_type: 'select',
    options: ['0.065', 'SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 130,
    section: 'postSpecs'
  },
  {
    id: 'linePostThickness',
    question_text: 'Line Post Thickness',
    input_type: 'select',
    options: ['0.065', 'SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 140,
    section: 'postSpecs'
  },
  
  // Gate Info
  {
    id: 'numberOfSingleGates',
    question_text: 'Number of Single Gates',
    input_type: 'number',
    default_value: '0',
    order: 150,
    section: 'gateInfo'
  },
  {
    id: 'numberOfDoubleGates',
    question_text: 'Number of Double Gates',
    input_type: 'number',
    default_value: '0',
    order: 160,
    section: 'gateInfo'
  },
  {
    id: 'numberOfSlidingGates',
    question_text: 'Number of Sliding Gates',
    input_type: 'number',
    default_value: '0',
    order: 170,
    section: 'gateInfo'
  },
  {
    id: 'hasDuckbillGateStop',
    question_text: 'Has Duckbill Gate Stop',
    input_type: 'checkbox',
    default_value: 'false',
    order: 180,
    section: 'gateInfo',
    dependent_on: 'numberOfSlidingGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'singleGateSize',
    question_text: 'Single Gate Size (ft)',
    input_type: 'select',
    options: [3, 4, 5, 6],
    default_value: '4',
    order: 190,
    section: 'gateInfo',
    dependent_on: 'numberOfSingleGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'doubleGateSize',
    question_text: 'Double Gate Size (ft)',
    input_type: 'select',
    options: [6, 8, 10, 12, 14, 16],
    default_value: '12',
    order: 200,
    section: 'gateInfo',
    dependent_on: 'numberOfDoubleGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'slidingGateSize',
    question_text: 'Sliding Gate Size (ft)',
    input_type: 'select',
    options: [10, 12, 14, 16, 18, 20, 24, 30],
    default_value: '12',
    order: 210,
    section: 'gateInfo',
    dependent_on: 'numberOfSlidingGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'doubleGatePostDiameter',
    question_text: 'Double Gate Post Diameter',
    input_type: 'select',
    options: ['2 7/8', '3', '3 1/2', '4'],
    default_value: '4',
    order: 220,
    section: 'gateInfo',
    dependent_on: 'numberOfDoubleGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'slidingGatePostDiameter',
    question_text: 'Sliding Gate Post Diameter',
    input_type: 'select',
    options: ['2 7/8', '3', '3 1/2', '4'],
    default_value: '4',
    order: 230,
    section: 'gateInfo',
    dependent_on: 'numberOfSlidingGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'doubleGatePostThickness',
    question_text: 'Double Gate Post Thickness',
    input_type: 'select',
    options: ['SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 240,
    section: 'gateInfo',
    dependent_on: 'numberOfDoubleGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'slidingGatePostThickness',
    question_text: 'Sliding Gate Post Thickness',
    input_type: 'select',
    options: ['SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 250,
    section: 'gateInfo',
    dependent_on: 'numberOfSlidingGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  {
    id: 'gatePipeDiameter',
    question_text: 'Gate Pipe Diameter',
    input_type: 'select',
    options: ['1 3/8', '1 5/8', '1 7/8', '2'],
    default_value: '1 7/8',
    order: 260,
    section: 'gateInfo',
    dependent_on: 'numberOfGates',
    dependent_value: '0',
    validation: { min: 1 }
  },
  
  // Mesh Info
  {
    id: 'meshGauge',
    question_text: 'Mesh Gauge',
    input_type: 'select',
    options: ['9G Galv', '11G Galv', '9G Black', '11G Black'],
    default_value: '9G Galv',
    order: 270,
    section: 'meshInfo'
  },
  {
    id: 'meshFold',
    question_text: 'Mesh Fold',
    input_type: 'select',
    options: ['KT', 'KK'],
    default_value: 'KT',
    order: 280,
    section: 'meshInfo'
  },
  {
    id: 'hasFenceSlats',
    question_text: 'Has Fence Slats',
    input_type: 'checkbox',
    default_value: 'false',
    order: 290,
    section: 'meshInfo'
  },
  {
    id: 'fenceSlatsColor',
    question_text: 'Fence Slats Color',
    input_type: 'select',
    options: ['Black', 'Green', 'Brown', 'White', 'Beige', 'Gray'],
    default_value: 'Black',
    order: 300,
    section: 'meshInfo',
    dependent_on: 'hasFenceSlats',
    dependent_value: 'true'
  },
  
  // Rail Info
  {
    id: 'topRailDiameter',
    question_text: 'Top Rail Diameter',
    input_type: 'select',
    options: ['1 3/8', '1 5/8', '1 7/8'],
    default_value: '1 5/8',
    order: 310,
    section: 'railInfo'
  },
  {
    id: 'topRailThickness',
    question_text: 'Top Rail Thickness',
    input_type: 'select',
    options: ['0.065', 'SCH 20', 'SCH 40'],
    default_value: 'SCH 40',
    order: 320,
    section: 'railInfo'
  },
  {
    id: 'extraRail',
    question_text: 'Extra Rail',
    input_type: 'select',
    options: ['none', 'middle', 'bottom', 'both'],
    default_value: 'none',
    order: 330,
    section: 'railInfo'
  },
  {
    id: 'hasHBrace',
    question_text: 'Has H-Brace',
    input_type: 'checkbox',
    default_value: 'false',
    order: 340,
    section: 'railInfo'
  },
  {
    id: 'hasTrussRods',
    question_text: 'Has Truss Rods',
    input_type: 'checkbox',
    default_value: 'false',
    order: 350,
    section: 'railInfo'
  },
  
  // Barbed Wire
  {
    id: 'hasThreeStrandBarbedWire',
    question_text: 'Has Three Strand Barbed Wire',
    input_type: 'checkbox',
    default_value: 'false',
    order: 360,
    section: 'barbedWireInfo'
  },
  
  // Concrete Info
  {
    id: 'depthOfHoles',
    question_text: 'Depth of Holes (inches)',
    input_type: 'number',
    default_value: '36',
    order: 370,
    section: 'concreteInfo'
  },
  {
    id: 'widthOfHoles',
    question_text: 'Width of Holes (inches)',
    input_type: 'number',
    default_value: '12',
    order: 380,
    section: 'concreteInfo'
  },
  {
    id: 'concreteType',
    question_text: 'Concrete Type',
    input_type: 'select',
    options: ['Red', 'Gray'],
    default_value: 'Red',
    order: 390,
    section: 'concreteInfo'
  },
  
  // Custom Items
  {
    id: 'customItem1Quantity',
    question_text: 'Custom Item 1 Quantity',
    input_type: 'number',
    default_value: '0',
    order: 400,
    section: 'customItems'
  },
  {
    id: 'customItem2Quantity',
    question_text: 'Custom Item 2 Quantity',
    input_type: 'number',
    default_value: '0',
    order: 410,
    section: 'customItems'
  },
  {
    id: 'customItem3Quantity',
    question_text: 'Custom Item 3 Quantity',
    input_type: 'number',
    default_value: '0',
    order: 420,
    section: 'customItems'
  },
  {
    id: 'customItem4Quantity',
    question_text: 'Custom Item 4 Quantity',
    input_type: 'number',
    default_value: '0',
    order: 430,
    section: 'customItems'
  },
  {
    id: 'customItem5Quantity',
    question_text: 'Custom Item 5 Quantity',
    input_type: 'number',
    default_value: '0',
    order: 440,
    section: 'customItems'
  },
  
  // Calculated fields (not displayed in questionnaire)
  {
    id: 'holeDepth',
    question_text: 'Hole Depth (ft)',
    input_type: 'calculated',
    default_value: '3',
    order: 1000,
    section: 'calculatedFields'
  },
  {
    id: 'numberOfGates',
    question_text: 'Total Number of Gates',
    input_type: 'calculated',
    default_value: '0',
    order: 1010,
    section: 'calculatedFields'
  },
  {
    id: 'totalPosts',
    question_text: 'Total Number of Posts',
    input_type: 'calculated',
    default_value: '0',
    order: 1020,
    section: 'calculatedFields'
  },
  {
    id: 'linePostsCount',
    question_text: 'Number of Line Posts',
    input_type: 'calculated',
    default_value: '0',
    order: 1030,
    section: 'calculatedFields'
  },
  {
    id: 'rollLength',
    question_text: 'Roll Length (ft)',
    input_type: 'calculated',
    default_value: '50',
    order: 1040,
    section: 'calculatedFields'
  },
  {
    id: 'railLength',
    question_text: 'Rail Length (ft)',
    input_type: 'calculated',
    default_value: '21',
    order: 1050,
    section: 'calculatedFields'
  },
  {
    id: 'isCommercial',
    question_text: 'Is Commercial',
    input_type: 'calculated',
    default_value: 'true',
    order: 1060,
    section: 'calculatedFields'
  },
  {
    id: 'hasBarbed',
    question_text: 'Has Barbed Wire',
    input_type: 'calculated',
    default_value: 'false',
    order: 1070,
    section: 'calculatedFields'
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
    
    // Get existing questionnaire items
    const existingItemsResult = await client.query(`
      SELECT id FROM questionnaire_items;
    `);
    
    const existingItemIds = new Set(existingItemsResult.rows.map(row => row.id));
    
    // Add missing items
    console.log('\nAdding missing questionnaire items...');
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const item of missingItems) {
      if (existingItemIds.has(item.id)) {
        console.log(`Skipping existing item: ${item.id}`);
        skippedCount++;
        continue;
      }
      
      console.log(`Adding item: ${item.id}`);
      
      await client.query(`
        INSERT INTO questionnaire_items (
          id, question_text, input_type, options, default_value,
          validation, dependent_on, dependent_value, "order", section
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `, [
        item.id,
        item.question_text,
        item.input_type,
        item.options ? JSON.stringify(item.options) : null,
        item.default_value,
        item.validation ? JSON.stringify(item.validation) : null,
        item.dependent_on,
        item.dependent_value,
        item.order,
        item.section
      ]);
      
      addedCount++;
    }
    
    console.log(`\nAdded ${addedCount} new questionnaire items.`);
    console.log(`Skipped ${skippedCount} existing items.`);
    
    // Verify the total count
    const countResult = await client.query(`
      SELECT COUNT(*) FROM questionnaire_items;
    `);
    
    console.log(`\nTotal questionnaire items in database: ${countResult.rows[0].count}`);
    
    // Update questionnaire triggers in material_formulas
    console.log('\nUpdating questionnaire triggers in material_formulas...');
    
    const triggerUpdates = [
      { id: 'terminal_posts', trigger: 'numberOfEndTerminals > 0' },
      { id: 'corner_posts', trigger: 'numberOfCorners > 0' },
      { id: 'line_posts', trigger: 'true' }, // Always included
      { id: 'single_gate_posts', trigger: 'numberOfSingleGates > 0' },
      { id: 'double_gate_posts', trigger: 'numberOfDoubleGates > 0' },
      { id: 'sliding_gate_posts', trigger: 'numberOfSlidingGates > 0' },
      { id: 'single_gates', trigger: 'numberOfSingleGates > 0' },
      { id: 'double_gates', trigger: 'numberOfDoubleGates > 0' },
      { id: 'sliding_gates', trigger: 'numberOfSlidingGates > 0' },
      { id: 'concrete', trigger: 'true' }, // Always included
      { id: 'mesh', trigger: 'true' }, // Always included
      { id: 'top_rail', trigger: 'true' }, // Always included
      { id: 'fence_sleeve', trigger: 'true' }, // Always included
      { id: 'dome_cap_terminal', trigger: 'numberOfEndTerminals > 0' },
      { id: 'dome_cap_corner', trigger: 'numberOfCorners > 0' },
      { id: 'dome_cap_single_gate', trigger: 'numberOfSingleGates > 0' },
      { id: 'dome_cap_double_gate', trigger: 'numberOfDoubleGates > 0' },
      { id: 'dome_cap_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
      { id: 'tension_bands_terminal', trigger: 'numberOfEndTerminals > 0' },
      { id: 'tension_bands_corner', trigger: 'numberOfCorners > 0' },
      { id: 'tension_bands_single_gate', trigger: 'numberOfSingleGates > 0' },
      { id: 'tension_bands_double_gate', trigger: 'numberOfDoubleGates > 0' },
      { id: 'tension_bands_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
      { id: 'brace_bands_terminal', trigger: 'numberOfEndTerminals > 0' },
      { id: 'brace_bands_corner', trigger: 'numberOfCorners > 0' },
      { id: 'brace_bands_single_gate', trigger: 'numberOfSingleGates > 0' },
      { id: 'brace_bands_double_gate', trigger: 'numberOfDoubleGates > 0' },
      { id: 'brace_bands_sliding_gate', trigger: 'numberOfSlidingGates > 0' },
      { id: 'brace_bands_line', trigger: 'true' }, // Always included
      { id: 'rail_ends', trigger: 'true' }, // Always included
      { id: 'rail_clamps', trigger: 'true' }, // Always included
      { id: 'fence_ties', trigger: 'true' }, // Always included
      { id: 'tension_bars', trigger: 'true' }, // Always included
      { id: 'hog_rings', trigger: 'true' }, // Always included
      { id: 'eye_tops', trigger: 'true' }, // Always included
      { id: 'nuts_and_bolts', trigger: 'true' }, // Always included
      { id: 'barbed_wire', trigger: 'hasThreeStrandBarbedWire' },
      { id: 'barb_arms', trigger: 'hasThreeStrandBarbedWire' },
      { id: 'bulldog_hinges_single', trigger: 'numberOfSingleGates > 0' },
      { id: 'bulldog_hinges_double', trigger: 'numberOfDoubleGates > 0' },
      { id: 'fork_latch_single', trigger: 'numberOfSingleGates > 0' },
      { id: 'fork_latch_double', trigger: 'numberOfDoubleGates > 0' },
      { id: 'cantilever_latch', trigger: 'numberOfSlidingGates > 0' },
      { id: 'cantilever_rollers', trigger: 'numberOfSlidingGates > 0' },
      { id: 'cane_bolts', trigger: 'numberOfDoubleGates > 0' },
      { id: 'gate_nut_bolt', trigger: 'numberOfGates > 0' },
      { id: 'collars', trigger: 'numberOfGates > 0' },
      { id: 'duckbill_gate_stop', trigger: 'hasDuckbillGateStop' },
      { id: 'fence_slats', trigger: 'hasFenceSlats' },
      { id: 'custom_item_1', trigger: 'customItem1Quantity > 0' },
      { id: 'custom_item_2', trigger: 'customItem2Quantity > 0' },
      { id: 'custom_item_3', trigger: 'customItem3Quantity > 0' },
      { id: 'custom_item_4', trigger: 'customItem4Quantity > 0' },
      { id: 'custom_item_5', trigger: 'customItem5Quantity > 0' }
    ];
    
    let triggerUpdateCount = 0;
    
    for (const update of triggerUpdates) {
      const result = await client.query(`
        UPDATE material_formulas
        SET 
          questionnaire_trigger = $1,
          updated_at = NOW()
        WHERE id = $2;
      `, [update.trigger, update.id]);
      
      if (result.rowCount > 0) {
        console.log(`Updated trigger for ${update.id}: ${update.trigger}`);
        triggerUpdateCount++;
      }
    }
    
    console.log(`\nUpdated ${triggerUpdateCount} questionnaire triggers.`);
    
    console.log('\nDatabase is now fully set up for the fence calculator!');
    
  } catch (error) {
    console.error('Error adding missing questionnaire items:', error);
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
