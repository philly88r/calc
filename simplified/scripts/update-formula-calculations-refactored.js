/**
 * Update Formula Calculations - Refactored
 * 
 * This script updates the formula calculations in the material_formulas table
 * based on the chainlink_formula_guide.js file.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Formula mappings from chainlink_formula_guide.js to material_formulas table
const formulaMappings = {
  // Posts
  'terminal_posts': {
    quantityFormula: "numberOfPulls * 2 + numberOfCorners + (numberOfGates * 2)",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "End, corner, and gate posts that provide structural support at the ends and corners of the fence."
  },
  'line_posts': {
    quantityFormula: "Math.ceil(fenceLength / postSpacing) - numberOfCorners - (numberOfPulls * 2) - (numberOfGates * 2)",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "Intermediate posts placed between terminal posts to support the fence fabric."
  },
  'corner_posts': {
    quantityFormula: "numberOfCorners",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "Posts at corners of the fence that provide structural support."
  },
  'single_gate_posts': {
    quantityFormula: "numberOfSingleGates * 2",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "Posts specifically designed to support single gates."
  },
  'double_gate_posts': {
    quantityFormula: "numberOfDoubleGates * 2",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "Posts specifically designed to support double gates."
  },
  'sliding_gate_posts': {
    quantityFormula: "numberOfSlidingGates * 2",
    heightFormula: "fenceHeight + holeDepth + (hasBarbed ? 1 : 0)",
    description: "Posts specifically designed to support sliding gates."
  },
  'duckbill_posts': {
    quantityFormula: "hasDuckbillGateStop ? 1 : 0",
    heightFormula: "fenceHeight + holeDepth",
    description: "Posts used as gate stops for double gates."
  },
  'flanged_posts_centered': {
    quantityFormula: "numberOfFlangedPosts",
    heightFormula: "fenceHeight",
    description: "Surface-mounted posts with centered flanges for installation on concrete surfaces."
  },
  'flanged_posts_off_centered': {
    quantityFormula: "numberOfFlangedPostsOffCentered",
    heightFormula: "fenceHeight",
    description: "Surface-mounted posts with off-centered flanges for installation on concrete surfaces."
  },
  
  // Mesh
  'mesh': {
    quantityFormula: "Math.ceil(fenceLength / rollLength)",
    description: "The chainlink fabric/mesh that forms the main barrier of the fence."
  },
  
  // Top Rail
  'top_rail': {
    quantityFormula: "Math.ceil(fenceLength / railLength) + (numberOfCorners * 0.5) + (numberOfGates * 0.5)",
    description: "Horizontal rail at the top of the fence that provides structural support."
  },
  
  // Concrete
  'concrete': {
    quantityFormula: "totalPosts * (Math.PI * (holeWidth/24) * (holeWidth/24) * (holeDepth/12) / 27)",
    description: "Concrete used to secure posts in the ground."
  },
  
  // Hardware - Tension Bands
  'tension_bands_terminal': {
    quantityFormula: "numberOfTerminalPosts * Math.ceil(fenceHeight / 1)",
    description: "Bands that secure the mesh to terminal posts."
  },
  'tension_bands_corner': {
    quantityFormula: "numberOfCorners * Math.ceil(fenceHeight / 1)",
    description: "Bands that secure the mesh to corner posts."
  },
  'tension_bands_single_gate': {
    quantityFormula: "numberOfSingleGates * 2 * Math.ceil(fenceHeight / 1)",
    description: "Bands that secure the mesh to single gate posts."
  },
  'tension_bands_double_gate': {
    quantityFormula: "numberOfDoubleGates * 2 * Math.ceil(fenceHeight / 1)",
    description: "Bands that secure the mesh to double gate posts."
  },
  'tension_bands_sliding_gate': {
    quantityFormula: "numberOfSlidingGates * 2 * Math.ceil(fenceHeight / 1)",
    description: "Bands that secure the mesh to sliding gate posts."
  },
  
  // Hardware - Brace Bands
  'brace_bands_terminal': {
    quantityFormula: "numberOfTerminalPosts * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to terminal posts."
  },
  'brace_bands_corner': {
    quantityFormula: "numberOfCorners * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to corner posts."
  },
  'brace_bands_single_gate': {
    quantityFormula: "numberOfSingleGates * 2 * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to single gate posts."
  },
  'brace_bands_double_gate': {
    quantityFormula: "numberOfDoubleGates * 2 * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to double gate posts."
  },
  'brace_bands_sliding_gate': {
    quantityFormula: "numberOfSlidingGates * 2 * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to sliding gate posts."
  },
  'brace_bands_line': {
    quantityFormula: "linePostsCount * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Bands that secure the top rail to line posts."
  },
  
  // Hardware - Dome Caps
  'dome_cap_terminal': {
    quantityFormula: "numberOfTerminalPosts",
    description: "Caps for the tops of terminal posts."
  },
  'dome_cap_corner': {
    quantityFormula: "numberOfCorners",
    description: "Caps for the tops of corner posts."
  },
  'dome_cap_single_gate': {
    quantityFormula: "numberOfSingleGates * 2",
    description: "Caps for the tops of single gate posts."
  },
  'dome_cap_double_gate': {
    quantityFormula: "numberOfDoubleGates * 2",
    description: "Caps for the tops of double gate posts."
  },
  'dome_cap_sliding_gate': {
    quantityFormula: "numberOfSlidingGates * 2",
    description: "Caps for the tops of sliding gate posts."
  },
  'dome_cap_duckbill': {
    quantityFormula: "hasDuckbillGateStop ? 1 : 0",
    description: "Caps for the tops of duckbill gate stop posts."
  },
  
  // Hardware - Other
  'rail_ends': {
    quantityFormula: "numberOfTerminalPosts + numberOfCorners + (numberOfGates * 2)",
    description: "End caps for top rails."
  },
  'rail_clamps': {
    quantityFormula: "linePostsCount * (1 + (extraRail === 'middle' || extraRail === 'both' ? 1 : 0) + (extraRail === 'bottom' || extraRail === 'both' ? 1 : 0))",
    description: "Clamps that secure top rails to line posts."
  },
  'fence_ties': {
    quantityFormula: "linePostsCount * Math.ceil(fenceHeight * 1.5)",
    description: "Ties that secure mesh to line posts."
  },
  'tension_bars': {
    quantityFormula: "numberOfTerminalPosts + (numberOfGates * 2)",
    description: "Bars inserted through the mesh at terminal points for tensioning."
  },
  'fence_sleeve': {
    quantityFormula: "Math.ceil(fenceLength / railLength) - 1",
    description: "Sleeves that connect top rail sections."
  },
  'hog_rings': {
    quantityFormula: "Math.ceil(fenceLength / 10) * 100", // Approximately 100 rings per 10 feet
    description: "Rings that connect mesh sections."
  },
  'eye_tops': {
    quantityFormula: "linePostsCount",
    description: "Loop caps that fit on top of line posts to support the top rail."
  },
  'nuts_and_bolts': {
    quantityFormula: "numberOfTerminalPosts * Math.ceil(fenceHeight / 1) + numberOfCorners * Math.ceil(fenceHeight / 1) + (numberOfGates * 2) * Math.ceil(fenceHeight / 1)",
    description: "Nuts and bolts used to secure tension bands and other hardware."
  },
  'wedge_anchors': {
    quantityFormula: "numberOfFlangedPosts * 4 + numberOfFlangedPostsOffCentered * 4",
    description: "Anchors used to secure flanged posts to concrete surfaces."
  },
  'truss_rods': {
    quantityFormula: "hasTrussRods ? Math.ceil(fenceLength / 100) * 2 : 0",
    description: "Rods used to provide additional support for the fence structure."
  },
  'slick_line': {
    quantityFormula: "Math.ceil(fenceLength)",
    description: "Tension wire that runs along the bottom of the fence when no bottom rail is used."
  },
  
  // Gates
  'single_gates': {
    quantityFormula: "numberOfSingleGates",
    description: "Single swing gates for fence access."
  },
  'double_gates': {
    quantityFormula: "numberOfDoubleGates",
    description: "Double swing gates for fence access."
  },
  'sliding_gates': {
    quantityFormula: "numberOfSlidingGates",
    description: "Sliding gates for fence access."
  },
  
  // Gate Hardware
  'bulldog_hinges_single': {
    quantityFormula: "numberOfSingleGates * 2", // 2 hinges per gate
    description: "Heavy-duty hinges for single gates."
  },
  'bulldog_hinges_double': {
    quantityFormula: "numberOfDoubleGates * 4", // 4 hinges per double gate (2 per panel)
    description: "Heavy-duty hinges for double gates."
  },
  'industrial_hinges_single': {
    quantityFormula: "numberOfSingleGates * 2", // 2 hinges per gate
    description: "Industrial-grade hinges for single gates."
  },
  'industrial_hinges_double': {
    quantityFormula: "numberOfDoubleGates * 4", // 4 hinges per double gate (2 per panel)
    description: "Industrial-grade hinges for double gates."
  },
  'female_residential_hinge_single': {
    quantityFormula: "numberOfSingleGates * 2", // 2 hinges per gate
    description: "Female residential hinges for single gates."
  },
  'female_residential_hinge_double': {
    quantityFormula: "numberOfDoubleGates * 4", // 4 hinges per double gate (2 per panel)
    description: "Female residential hinges for double gates."
  },
  'male_residential_hinge_single': {
    quantityFormula: "numberOfSingleGates * 2", // 2 hinges per gate
    description: "Male residential hinges for single gates."
  },
  'male_residential_hinge_double': {
    quantityFormula: "numberOfDoubleGates * 4", // 4 hinges per double gate (2 per panel)
    description: "Male residential hinges for double gates."
  },
  'fork_latch_single': {
    quantityFormula: "numberOfSingleGates",
    description: "Fork latches for single gates."
  },
  'fork_latch_double': {
    quantityFormula: "numberOfDoubleGates",
    description: "Fork latches for double gates."
  },
  'industrial_drop_latch': {
    quantityFormula: "numberOfDoubleGates",
    description: "Industrial drop latches for double gates."
  },
  'industrial_drop_latch_guides': {
    quantityFormula: "numberOfDoubleGates * 2", // 2 guides per double gate
    description: "Guides for industrial drop latches."
  },
  'cantilever_latch': {
    quantityFormula: "numberOfSlidingGates",
    description: "Latches for sliding gates."
  },
  'cantilever_rollers': {
    quantityFormula: "numberOfSlidingGates * 2", // 2 rollers per sliding gate
    description: "Rollers for sliding gates."
  },
  'cane_bolts': {
    quantityFormula: "numberOfDoubleGates * 2", // 2 cane bolts per double gate
    description: "Cane bolts to secure double gates to the ground."
  },
  'gate_nut_bolt': {
    quantityFormula: "numberOfSingleGates * 4 + numberOfDoubleGates * 8", // 4 per single gate, 8 per double gate
    description: "Nuts and bolts used to assemble gate frames."
  },
  'collars': {
    quantityFormula: "numberOfSingleGates * 4 + numberOfDoubleGates * 8", // 4 per single gate, 8 per double gate
    description: "Collars used in gate frame construction."
  },
  'duckbill_gate_stop': {
    quantityFormula: "hasDuckbillGateStop ? 1 : 0",
    description: "Gate stop for double gates."
  },
  
  // Barbed Wire and Privacy
  'barbed_wire': {
    quantityFormula: "hasThreeStrandBarbedWire ? Math.ceil(fenceLength / 1320) * 3 : 0", // 1320 feet per roll, 3 strands
    description: "Barbed wire for the top of the fence for added security."
  },
  'barb_arms': {
    quantityFormula: "hasThreeStrandBarbedWire ? totalPosts : 0",
    description: "Arms that hold barbed wire at the top of the fence."
  },
  'fence_slats': {
    quantityFormula: "hasFenceSlats ? Math.ceil(fenceLength) : 0",
    description: "Privacy slats inserted into chainlink mesh."
  },
  
  // Custom Items
  'custom_item_1': {
    quantityFormula: "customItem1Quantity || 0",
    description: "Custom item 1 for special requirements."
  },
  'custom_item_2': {
    quantityFormula: "customItem2Quantity || 0",
    description: "Custom item 2 for special requirements."
  },
  'custom_item_3': {
    quantityFormula: "customItem3Quantity || 0",
    description: "Custom item 3 for special requirements."
  },
  'custom_item_4': {
    quantityFormula: "customItem4Quantity || 0",
    description: "Custom item 4 for special requirements."
  },
  'custom_item_5': {
    quantityFormula: "customItem5Quantity || 0",
    description: "Custom item 5 for special requirements."
  }
};

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Get all formulas from the database
    const formulasResult = await client.query(`
      SELECT id, name, calculation_details
      FROM material_formulas
      ORDER BY id;
    `);
    
    console.log(`Found ${formulasResult.rows.length} formulas in the database.`);
    
    // Update each formula with the mapping if available
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const mapping = formulaMappings[formulaId];
      
      if (mapping) {
        // Create or update calculation_details
        const calculationDetails = row.calculation_details || {};
        
        // Update with mapping data
        if (mapping.quantityFormula) {
          calculationDetails.formula = mapping.quantityFormula;
        }
        
        if (mapping.heightFormula) {
          calculationDetails.height_formula = mapping.heightFormula;
        }
        
        // Update the formula in the database
        await client.query(`
          UPDATE material_formulas
          SET 
            description = $1,
            calculation_details = $2,
            updated_at = NOW()
          WHERE id = $3;
        `, [
          mapping.description || row.description,
          calculationDetails,
          formulaId
        ]);
        
        console.log(`Updated formula: ${formulaId}`);
        updatedCount++;
      } else {
        console.log(`Skipped formula: ${formulaId} (no mapping available)`);
        skippedCount++;
      }
    }
    
    console.log(`\nUpdate summary:`);
    console.log(`- Updated: ${updatedCount} formulas`);
    console.log(`- Skipped: ${skippedCount} formulas`);
    console.log(`- Total: ${formulasResult.rows.length} formulas`);
    
  } catch (error) {
    console.error('Error updating formula calculations:', error);
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
