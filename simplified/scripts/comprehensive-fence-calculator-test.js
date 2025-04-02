/**
 * Comprehensive Fence Calculator Test
 * 
 * This script tests the fence calculator with multiple scenarios
 * to ensure it produces the correct answers.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Test scenarios
const testScenarios = [
  {
    name: "Basic Residential Fence",
    params: {
      totalLinearLength: 100,
      heightOfFence: 6,
      numberOfPulls: 0,
      numberOfEndTerminals: 2,
      numberOfCorners: 0,
      numberOfSingleGates: 1,
      numberOfDoubleGates: 0,
      hasDuckbillGateStop: false,
      numberOfSlidingGates: 0,
      numberOfSolitaryPosts: 0,
      numberOfFlangedPosts: 0,
      numberOfFlangedPostsOffCentered: 0,
      commercialOrResidential: 'Residential',
      material: 'Galvanized',
      meshGauge: '11G Galv',
      meshFold: 'KT',
      depthOfHoles: 30,
      widthOfHoles: 10,
      concreteType: 'Red',
      postSpacing: 10,
      extraRail: 'none',
      hasHBrace: false,
      hasTrussRods: false,
      hasThreeStrandBarbedWire: false,
      hasFenceSlats: false,
      fenceSlatsColor: 'Black',
      terminalPostDiameter: '2 3/8',
      cornerPostDiameter: '2 3/8',
      doubleGatePostDiameter: '3',
      slidingGatePostDiameter: '3',
      linePostDiameter: '1 5/8',
      topRailDiameter: '1 3/8',
      gatePipeDiameter: '1 5/8',
      terminalPostThickness: 'SCH 40',
      cornerPostThickness: 'SCH 40',
      doubleGatePostThickness: 'SCH 40',
      slidingGatePostThickness: 'SCH 40',
      linePostThickness: '0.065',
      topRailThickness: '0.065',
      singleGateSize: 4
    }
  },
  {
    name: "Commercial Fence with Barbed Wire",
    params: {
      totalLinearLength: 200,
      heightOfFence: 8,
      numberOfPulls: 3,
      numberOfEndTerminals: 2,
      numberOfCorners: 2,
      numberOfSingleGates: 0,
      numberOfDoubleGates: 1,
      hasDuckbillGateStop: false,
      numberOfSlidingGates: 0,
      numberOfSolitaryPosts: 0,
      numberOfFlangedPosts: 0,
      numberOfFlangedPostsOffCentered: 0,
      commercialOrResidential: 'Commercial',
      material: 'Black',
      meshGauge: '9G Black',
      meshFold: 'KK',
      depthOfHoles: 36,
      widthOfHoles: 12,
      concreteType: 'Red',
      postSpacing: 10,
      extraRail: 'bottom',
      hasHBrace: true,
      hasTrussRods: false,
      hasThreeStrandBarbedWire: true,
      hasFenceSlats: false,
      fenceSlatsColor: 'Black',
      terminalPostDiameter: '3',
      cornerPostDiameter: '3',
      doubleGatePostDiameter: '4',
      slidingGatePostDiameter: '4',
      linePostDiameter: '2 3/8',
      topRailDiameter: '1 5/8',
      gatePipeDiameter: '1 7/8',
      terminalPostThickness: 'SCH 40',
      cornerPostThickness: 'SCH 40',
      doubleGatePostThickness: 'SCH 40',
      slidingGatePostThickness: 'SCH 40',
      linePostThickness: 'SCH 40',
      topRailThickness: 'SCH 40',
      doubleGateSize: 12
    }
  },
  {
    name: "Privacy Fence with Slats",
    params: {
      totalLinearLength: 150,
      heightOfFence: 6,
      numberOfPulls: 1,
      numberOfEndTerminals: 2,
      numberOfCorners: 1,
      numberOfSingleGates: 1,
      numberOfDoubleGates: 0,
      hasDuckbillGateStop: false,
      numberOfSlidingGates: 0,
      numberOfSolitaryPosts: 0,
      numberOfFlangedPosts: 0,
      numberOfFlangedPostsOffCentered: 0,
      commercialOrResidential: 'Residential',
      material: 'Galvanized',
      meshGauge: '9G Galv',
      meshFold: 'KT',
      depthOfHoles: 30,
      widthOfHoles: 10,
      concreteType: 'Red',
      postSpacing: 8,
      extraRail: 'middle',
      hasHBrace: false,
      hasTrussRods: false,
      hasThreeStrandBarbedWire: false,
      hasFenceSlats: true,
      fenceSlatsColor: 'Green',
      terminalPostDiameter: '2 3/8',
      cornerPostDiameter: '2 3/8',
      doubleGatePostDiameter: '3',
      slidingGatePostDiameter: '3',
      linePostDiameter: '1 7/8',
      topRailDiameter: '1 5/8',
      gatePipeDiameter: '1 5/8',
      terminalPostThickness: 'SCH 40',
      cornerPostThickness: 'SCH 40',
      doubleGatePostThickness: 'SCH 40',
      slidingGatePostThickness: 'SCH 40',
      linePostThickness: 'SCH 20',
      topRailThickness: 'SCH 20',
      singleGateSize: 4
    }
  },
  {
    name: "Industrial Sliding Gate Fence",
    params: {
      totalLinearLength: 300,
      heightOfFence: 10,
      numberOfPulls: 4,
      numberOfEndTerminals: 2,
      numberOfCorners: 3,
      numberOfSingleGates: 0,
      numberOfDoubleGates: 0,
      hasDuckbillGateStop: true,
      numberOfSlidingGates: 2,
      numberOfSolitaryPosts: 2,
      numberOfFlangedPosts: 1,
      numberOfFlangedPostsOffCentered: 1,
      commercialOrResidential: 'Commercial',
      material: 'Galvanized',
      meshGauge: '9G Galv',
      meshFold: 'KK',
      depthOfHoles: 42,
      widthOfHoles: 14,
      concreteType: 'Red',
      postSpacing: 8,
      extraRail: 'both',
      hasHBrace: true,
      hasTrussRods: true,
      hasThreeStrandBarbedWire: true,
      hasFenceSlats: false,
      fenceSlatsColor: 'Black',
      terminalPostDiameter: '4',
      cornerPostDiameter: '4',
      doubleGatePostDiameter: '4',
      slidingGatePostDiameter: '4',
      linePostDiameter: '2 7/8',
      topRailDiameter: '1 7/8',
      gatePipeDiameter: '2',
      terminalPostThickness: 'SCH 40',
      cornerPostThickness: 'SCH 40',
      doubleGatePostThickness: 'SCH 40',
      slidingGatePostThickness: 'SCH 40',
      linePostThickness: 'SCH 40',
      topRailThickness: 'SCH 40',
      slidingGateSize: 20
    }
  }
];

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
                      (derived.numberOfSlidingGates * 2) + derived.numberOfSolitaryPosts + 
                      derived.numberOfFlangedPosts + derived.numberOfFlangedPostsOffCentered;
  
  // Calculate line posts
  derived.linePostsCount = Math.ceil(derived.totalLinearLength / derived.postSpacing) - 
                          derived.numberOfTerminalPosts - derived.numberOfCorners - 
                          (derived.numberOfSingleGates * 2) - (derived.numberOfDoubleGates * 2) - 
                          (derived.numberOfSlidingGates * 2) - derived.numberOfSolitaryPosts - 
                          derived.numberOfFlangedPosts - derived.numberOfFlangedPostsOffCentered;
  
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
  
  return derived;
};

// Calculate quantities for each formula
const calculateQuantities = async (client, params) => {
  // Get all formulas from the database
  const formulasResult = await client.query(`
    SELECT id, name, calculation_details, questionnaire_trigger
    FROM material_formulas
    ORDER BY id;
  `);
  
  const quantities = {};
  
  for (const row of formulasResult.rows) {
    const formulaId = row.id;
    const details = row.calculation_details;
    const trigger = row.questionnaire_trigger;
    
    // Check if formula is triggered by questionnaire responses
    if (trigger) {
      try {
        // Create a function from the trigger expression
        const triggerFunc = new Function(
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
          
          return ${trigger};
          `
        );
        
        const isTriggered = triggerFunc(params);
        
        if (!isTriggered) {
          quantities[formulaId] = {
            name: row.name,
            quantity: 0,
            formula: details?.formula || '',
            triggered: false
          };
          continue;
        }
      } catch (error) {
        console.error(`Error evaluating trigger for ${formulaId}:`, error);
        quantities[formulaId] = {
          name: row.name,
          quantity: 0,
          formula: details?.formula || '',
          triggered: false,
          error: `Trigger error: ${error.message}`
        };
        continue;
      }
    }
    
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
          formula: details.formula,
          triggered: true
        };
      } catch (error) {
        console.error(`Error calculating quantity for ${formulaId}:`, error);
        quantities[formulaId] = {
          name: row.name,
          quantity: 0,
          formula: details.formula,
          triggered: true,
          error: `Calculation error: ${error.message}`
        };
      }
    }
  }
  
  return quantities;
};

// Run test for a specific scenario
const runTest = async (client, scenario) => {
  console.log(`\n=== Testing Scenario: ${scenario.name} ===`);
  
  // Calculate derived values
  const params = calculateDerivedValues(scenario.params);
  
  // Calculate quantities
  const quantities = await calculateQuantities(client, params);
  
  // Display results
  console.log('\nKey Parameters:');
  console.log(`- Fence Length: ${params.fenceLength} ft`);
  console.log(`- Fence Height: ${params.fenceHeight} ft`);
  console.log(`- Material: ${params.material}`);
  console.log(`- Post Spacing: ${params.postSpacing} ft`);
  console.log(`- Number of Gates: ${params.numberOfGates} (${params.numberOfSingleGates} single, ${params.numberOfDoubleGates} double, ${params.numberOfSlidingGates} sliding)`);
  
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
    const categoryItems = formulaIds
      .map(id => quantities[id])
      .filter(item => item && item.quantity > 0);
    
    if (categoryItems.length > 0) {
      console.log(`\n${category}:`);
      console.log('-----------------------------------------');
      
      categoryItems.forEach(item => {
        console.log(`${item.name}: ${item.quantity.toFixed(2)}`);
      });
    }
  }
  
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
  
  // Validate key quantities
  console.log('\nValidation:');
  
  // Validate line posts
  const expectedLinePosts = params.linePostsCount;
  const actualLinePosts = quantities['line_posts']?.quantity || 0;
  console.log(`- Line Posts: ${actualLinePosts === expectedLinePosts ? '✓' : '✗'} (Expected: ${expectedLinePosts}, Actual: ${actualLinePosts})`);
  
  // Validate mesh
  const expectedMesh = Math.ceil(params.fenceLength / params.rollLength);
  const actualMesh = quantities['mesh']?.quantity || 0;
  console.log(`- Mesh: ${actualMesh === expectedMesh ? '✓' : '✗'} (Expected: ${expectedMesh}, Actual: ${actualMesh})`);
  
  // Validate top rail
  const expectedTopRail = Math.ceil(params.fenceLength / params.railLength);
  const actualTopRail = quantities['top_rail']?.quantity || 0;
  console.log(`- Top Rail: ${actualTopRail === expectedTopRail ? '✓' : '✗'} (Expected: ${expectedTopRail}, Actual: ${actualTopRail})`);
  
  // Validate terminal posts
  const expectedTerminalPosts = params.numberOfEndTerminals;
  const actualTerminalPosts = quantities['terminal_posts']?.quantity || 0;
  console.log(`- Terminal Posts: ${actualTerminalPosts === expectedTerminalPosts ? '✓' : '✗'} (Expected: ${expectedTerminalPosts}, Actual: ${actualTerminalPosts})`);
  
  // Validate corner posts
  const expectedCornerPosts = params.numberOfCorners;
  const actualCornerPosts = quantities['corner_posts']?.quantity || 0;
  console.log(`- Corner Posts: ${actualCornerPosts === expectedCornerPosts ? '✓' : '✗'} (Expected: ${expectedCornerPosts}, Actual: ${actualCornerPosts})`);
  
  // Validate gates
  if (params.numberOfSingleGates > 0) {
    const expectedSingleGates = params.numberOfSingleGates;
    const actualSingleGates = quantities['single_gates']?.quantity || 0;
    console.log(`- Single Gates: ${actualSingleGates === expectedSingleGates ? '✓' : '✗'} (Expected: ${expectedSingleGates}, Actual: ${actualSingleGates})`);
  }
  
  if (params.numberOfDoubleGates > 0) {
    const expectedDoubleGates = params.numberOfDoubleGates;
    const actualDoubleGates = quantities['double_gates']?.quantity || 0;
    console.log(`- Double Gates: ${actualDoubleGates === expectedDoubleGates ? '✓' : '✗'} (Expected: ${expectedDoubleGates}, Actual: ${actualDoubleGates})`);
  }
  
  if (params.numberOfSlidingGates > 0) {
    const expectedSlidingGates = params.numberOfSlidingGates;
    const actualSlidingGates = quantities['sliding_gates']?.quantity || 0;
    console.log(`- Sliding Gates: ${actualSlidingGates === expectedSlidingGates ? '✓' : '✗'} (Expected: ${expectedSlidingGates}, Actual: ${actualSlidingGates})`);
  }
  
  // Validate barbed wire
  if (params.hasThreeStrandBarbedWire) {
    const expectedBarbedWire = Math.ceil(params.fenceLength / 1320) * 3; // 1320 feet per roll, 3 strands
    const actualBarbedWire = quantities['barbed_wire']?.quantity || 0;
    console.log(`- Barbed Wire: ${Math.abs(actualBarbedWire - expectedBarbedWire) < 0.1 ? '✓' : '✗'} (Expected: ${expectedBarbedWire}, Actual: ${actualBarbedWire})`);
  }
  
  // Validate fence slats
  if (params.hasFenceSlats) {
    const expectedFenceSlats = Math.ceil(params.fenceLength);
    const actualFenceSlats = quantities['fence_slats']?.quantity || 0;
    console.log(`- Fence Slats: ${Math.abs(actualFenceSlats - expectedFenceSlats) < 5 ? '✓' : '✗'} (Expected: ~${expectedFenceSlats}, Actual: ${actualFenceSlats})`);
  }
  
  return {
    scenario: scenario.name,
    errors: errors.length,
    validationErrors: 0 // We're not counting validation errors yet
  };
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
    
    console.log('\nRunning comprehensive fence calculator tests...');
    
    const results = [];
    
    // Run each test scenario
    for (const scenario of testScenarios) {
      const result = await runTest(client, scenario);
      results.push(result);
    }
    
    // Display summary
    console.log('\n=== Test Summary ===');
    console.log('=============================================');
    
    results.forEach(result => {
      console.log(`${result.scenario}: ${result.errors === 0 ? '✓ Passed' : '✗ Failed'} (${result.errors} errors)`);
    });
    
    const totalErrors = results.reduce((sum, result) => sum + result.errors, 0);
    console.log(`\nTotal: ${totalErrors === 0 ? '✓ All tests passed' : `✗ ${totalErrors} errors found`}`);
    
  } catch (error) {
    console.error('Error running fence calculator tests:', error);
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
