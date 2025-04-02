/**
 * Test Fence Calculator
 * 
 * This script tests the fence calculator with specific parameters
 * and calculates the quantities and costs for all materials.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Test parameters
const testParams = {
  totalLinearLength: 120,
  heightOfFence: 8,
  numberOfPulls: 2,
  numberOfEndTerminals: 2,
  numberOfCorners: 1,
  numberOfSingleGates: 0,
  numberOfDoubleGates: 0,
  hasDuckbillGateStop: false,
  numberOfSlidingGates: 1,
  numberOfSolitaryPosts: 0,
  numberOfFlangedPosts: 0,
  numberOfFlangedPostsOffCentered: 0,
  commercialOrResidential: 'Commercial',
  material: 'Galvanized',
  meshGauge: '9G Galv',
  meshFold: 'KT',
  depthOfHoles: 36,
  widthOfHoles: 12,
  concreteType: 'Red',
  postSpacing: 10,
  extraRail: 'none',
  hasHBrace: false,
  hasTrussRods: false,
  hasThreeStrandBarbedWire: false,
  hasFenceSlats: false,
  fenceSlatsColor: 'Black',
  terminalPostDiameter: '2 7/8',
  cornerPostDiameter: '2 7/8',
  doubleGatePostDiameter: '4',
  slidingGatePostDiameter: '4',
  linePostDiameter: '1 7/8',
  topRailDiameter: '1 5/8',
  gatePipeDiameter: '1 7/8',
  terminalPostThickness: 'SCH 40',
  cornerPostThickness: 'SCH 40',
  doubleGatePostThickness: 'SCH 40',
  slidingGatePostThickness: 'SCH 40',
  linePostThickness: 'SCH 40',
  topRailThickness: 'SCH 40'
};

// Calculate derived values
const calculateDerivedValues = (params) => {
  const derived = { ...params };
  
  // Map parameter names to match formula expectations
  derived.fenceLength = derived.totalLinearLength;
  
  // Calculate number of terminal posts
  derived.numberOfTerminalPosts = derived.numberOfEndTerminals;
  
  // Calculate total number of posts
  derived.totalPosts = derived.numberOfTerminalPosts + derived.numberOfCorners + 
                      (derived.numberOfSingleGates * 2) + (derived.numberOfDoubleGates * 2) + 
                      (derived.numberOfSlidingGates * 2) + derived.numberOfSolitaryPosts;
  
  // Calculate line posts
  derived.linePostsCount = Math.ceil(derived.totalLinearLength / derived.postSpacing) - 
                          derived.numberOfTerminalPosts - derived.numberOfCorners - 
                          (derived.numberOfSingleGates * 2) - (derived.numberOfDoubleGates * 2) - 
                          (derived.numberOfSlidingGates * 2);
  
  // Add line posts to total posts
  derived.totalPosts += derived.linePostsCount;
  
  // Calculate number of gates
  derived.numberOfGates = derived.numberOfSingleGates + derived.numberOfDoubleGates + derived.numberOfSlidingGates;
  
  // Set standard lengths
  derived.railLength = 21; // Standard rail length in feet
  derived.rollLength = 50; // Standard mesh roll length in feet
  
  // Set hole depth in feet
  derived.holeDepth = derived.depthOfHoles / 12;
  derived.holeWidth = derived.widthOfHoles;
  
  // Set flags
  derived.isCommercial = derived.commercialOrResidential === 'Commercial';
  derived.hasBarbed = derived.hasThreeStrandBarbedWire;
  
  // Set fence height in feet
  derived.fenceHeight = derived.heightOfFence;
  
  // Set custom item quantities to 0
  derived.customItem1Quantity = 0;
  derived.customItem2Quantity = 0;
  derived.customItem3Quantity = 0;
  derived.customItem4Quantity = 0;
  derived.customItem5Quantity = 0;
  
  // Set single and double gate sizes (not used in this test)
  derived.singleGateSize = 0;
  derived.doubleGateSize = 0;
  derived.slidingGateSize = 12; // Assuming a 12-foot sliding gate
  
  return derived;
};

// Calculate quantities for each formula
const calculateQuantities = async (client, params) => {
  // Get all formulas from the database
  const formulasResult = await client.query(`
    SELECT id, name, calculation_details
    FROM material_formulas
    ORDER BY id;
  `);
  
  const quantities = {};
  
  for (const row of formulasResult.rows) {
    const formulaId = row.id;
    const details = row.calculation_details;
    
    if (details && details.formula) {
      try {
        // Create a function from the formula string
        const formula = new Function(
          'params',
          `
          const { 
            totalLinearLength, heightOfFence, numberOfPulls, numberOfEndTerminals, 
            numberOfCorners, numberOfSingleGates, numberOfDoubleGates, hasDuckbillGateStop,
            numberOfSlidingGates, numberOfSolitaryPosts, numberOfFlangedPosts, 
            numberOfFlangedPostsOffCentered, commercialOrResidential, material, 
            meshGauge, meshFold, depthOfHoles, widthOfHoles, concreteType, 
            postSpacing, extraRail, hasHBrace, hasTrussRods, hasThreeStrandBarbedWire,
            hasFenceSlats, fenceSlatsColor, terminalPostDiameter, cornerPostDiameter,
            doubleGatePostDiameter, slidingGatePostDiameter, linePostDiameter,
            topRailDiameter, gatePipeDiameter, terminalPostThickness, cornerPostThickness,
            doubleGatePostThickness, slidingGatePostThickness, linePostThickness,
            topRailThickness, numberOfTerminalPosts, totalPosts, linePostsCount,
            numberOfGates, railLength, rollLength, holeDepth, holeWidth, isCommercial, 
            hasBarbed, fenceHeight, fenceLength, customItem1Quantity, customItem2Quantity,
            customItem3Quantity, customItem4Quantity, customItem5Quantity,
            singleGateSize, doubleGateSize, slidingGateSize
          } = params;
          
          return ${details.formula};
          `
        );
        
        // Calculate the quantity
        const quantity = formula(params);
        quantities[formulaId] = {
          name: row.name,
          quantity: quantity,
          formula: details.formula
        };
      } catch (error) {
        console.error(`Error calculating quantity for ${formulaId}:`, error);
        quantities[formulaId] = {
          name: row.name,
          quantity: 0,
          formula: details.formula,
          error: error.message
        };
      }
    }
  }
  
  return quantities;
};

// Main function
async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Calculate derived values
    const params = calculateDerivedValues(testParams);
    
    console.log('Test Parameters:');
    console.log(JSON.stringify(params, null, 2));
    
    // Calculate quantities
    console.log('\nCalculating quantities...');
    const quantities = await calculateQuantities(client, params);
    
    // Display results
    console.log('\nCalculated Quantities:');
    console.log('=============================================');
    
    // Group by category
    const categories = {
      'Posts': ['terminal_posts', 'corner_posts', 'line_posts', 'single_gate_posts', 'double_gate_posts', 'sliding_gate_posts', 'duckbill_posts', 'flanged_posts_centered', 'flanged_posts_off_centered'],
      'Gates': ['single_gates', 'double_gates', 'sliding_gates'],
      'Concrete': ['concrete'],
      'Mesh': ['mesh'],
      'Rails': ['top_rail', 'fence_sleeve'],
      'Dome Caps': ['dome_cap_terminal', 'dome_cap_corner', 'dome_cap_single_gate', 'dome_cap_double_gate', 'dome_cap_sliding_gate', 'dome_cap_duckbill'],
      'Bands': ['tension_bands_terminal', 'tension_bands_corner', 'tension_bands_single_gate', 'tension_bands_double_gate', 'tension_bands_sliding_gate', 'brace_bands_terminal', 'brace_bands_corner', 'brace_bands_single_gate', 'brace_bands_double_gate', 'brace_bands_sliding_gate', 'brace_bands_line'],
      'Hardware': ['rail_ends', 'rail_clamps', 'fence_ties', 'tension_bars', 'hog_rings', 'eye_tops', 'nuts_and_bolts', 'wedge_anchors', 'truss_rods', 'slick_line'],
      'Gate Hardware': ['bulldog_hinges_single', 'bulldog_hinges_double', 'industrial_hinges_single', 'industrial_hinges_double', 'female_residential_hinge_single', 'female_residential_hinge_double', 'male_residential_hinge_single', 'male_residential_hinge_double', 'fork_latch_single', 'fork_latch_double', 'industrial_drop_latch', 'industrial_drop_latch_guides', 'cantilever_latch', 'cantilever_rollers', 'cane_bolts', 'gate_nut_bolt', 'collars', 'duckbill_gate_stop'],
      'Barbed Wire': ['barbed_wire', 'barb_arms'],
      'Privacy': ['fence_slats'],
      'Custom': ['custom_item_1', 'custom_item_2', 'custom_item_3', 'custom_item_4', 'custom_item_5']
    };
    
    // Display quantities by category
    for (const [category, formulaIds] of Object.entries(categories)) {
      console.log(`\n${category}:`);
      console.log('-----------------------------------------');
      
      for (const formulaId of formulaIds) {
        const item = quantities[formulaId];
        if (item && item.quantity > 0) {
          console.log(`${item.name}: ${item.quantity.toFixed(2)}`);
        }
      }
    }
    
    // Display all non-zero quantities
    console.log('\nAll Non-Zero Quantities:');
    console.log('=============================================');
    
    Object.entries(quantities)
      .filter(([_, item]) => item.quantity > 0)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .forEach(([formulaId, item]) => {
        console.log(`${item.name} (${formulaId}): ${item.quantity.toFixed(2)}`);
      });
    
    // Display errors if any
    const errors = Object.entries(quantities)
      .filter(([_, item]) => item.error)
      .map(([formulaId, item]) => ({ formulaId, name: item.name, error: item.error }));
    
    if (errors.length > 0) {
      console.log('\nErrors:');
      console.log('=============================================');
      errors.forEach(error => {
        console.log(`${error.name} (${error.formulaId}): ${error.error}`);
      });
    }
    
  } catch (error) {
    console.error('Error testing fence calculator:', error);
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
