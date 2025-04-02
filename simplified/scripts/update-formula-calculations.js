/**
 * Update Formula Calculations
 * 
 * This script updates the formulas in the material_formulas table with more accurate
 * quantity calculations based on the chainlink_formula_guide.js file.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Improved formula calculations
const improvedFormulas = {
  // Post formulas
  "terminal_posts": {
    formula: "Number of end terminals specified by user",
    calculation_details: {
      quantity_calculation: "Number of end terminals specified by user",
      price_calculation: "Post price × quantity + dome cap price × quantity"
    }
  },
  "corner_posts": {
    formula: "Number of corners specified by user",
    calculation_details: {
      quantity_calculation: "Number of corners specified by user",
      price_calculation: "Post price × quantity + dome cap price × quantity"
    }
  },
  "line_posts": {
    formula: "Math.ceil(fenceLength / postSpacing) - terminalPostsCount - cornerPostsCount - gatePostsCount",
    calculation_details: {
      quantity_calculation: "Math.ceil(fenceLength / postSpacing) - terminalPostsCount - cornerPostsCount - gatePostsCount",
      price_calculation: "Post price × quantity + loop cap price × quantity"
    }
  },
  "single_gate_posts": {
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2",
      price_calculation: "Post price × quantity + dome cap price × quantity"
    }
  },
  "double_gate_posts": {
    formula: "Number of double gates × 2",
    calculation_details: {
      quantity_calculation: "Number of double gates × 2",
      price_calculation: "Post price × quantity + dome cap price × quantity"
    }
  },
  "sliding_gate_posts": {
    formula: "Number of sliding gates × 2",
    calculation_details: {
      quantity_calculation: "Number of sliding gates × 2",
      price_calculation: "Post price × quantity + dome cap price × quantity"
    }
  },
  
  // Gate formulas
  "single_gates": {
    formula: "Number of single gates specified by user",
    calculation_details: {
      quantity_calculation: "Number of single gates specified by user",
      price_calculation: "Gate frame price + mesh price + hardware price (hinges, latch)"
    }
  },
  "double_gates": {
    formula: "Number of double gates specified by user",
    calculation_details: {
      quantity_calculation: "Number of double gates specified by user",
      price_calculation: "Gate frame price × 2 + mesh price + hardware price (hinges, latch, drop rod)"
    }
  },
  "sliding_gates": {
    formula: "Number of sliding gates specified by user",
    calculation_details: {
      quantity_calculation: "Number of sliding gates specified by user",
      price_calculation: "Gate frame price + mesh price + hardware price (rollers, track, latch)"
    }
  },
  
  // Material formulas
  "concrete": {
    formula: "Total number of posts × concrete per post",
    calculation_details: {
      quantity_calculation: "Line posts: π × (hole diameter/2)² × hole depth × line post count\nTerminal posts: π × (hole diameter/2)² × hole depth × terminal post count\nTotal cubic feet: line post concrete + terminal post concrete\nBags needed: Total cubic feet ÷ 0.6 cubic feet per bag",
      price_calculation: "Concrete price per bag × number of bags"
    }
  },
  "top_rail": {
    formula: "Math.ceil(fenceLength / 21)",
    calculation_details: {
      quantity_calculation: "Math.ceil(fenceLength / 21) - Top rail comes in 21ft sections",
      price_calculation: "Rail price × quantity + rail end price × terminal post count + rail sleeve price × (quantity - 1)"
    }
  },
  "fence_sleeve": {
    formula: "Math.ceil(fenceLength / 21) - 1",
    calculation_details: {
      quantity_calculation: "Number of top rail sections - 1",
      price_calculation: "Sleeve price × quantity"
    }
  },
  "mesh": {
    formula: "Math.ceil(fenceLength / 50)",
    calculation_details: {
      quantity_calculation: "Math.ceil(fenceLength / 50) - Mesh comes in 50ft rolls",
      price_calculation: "Mesh price per roll × quantity"
    }
  },
  "fence_slats": {
    formula: "Math.ceil(fenceLength / 10)",
    calculation_details: {
      quantity_calculation: "Math.ceil(fenceLength / 10) - Slats typically come in packages covering 10ft",
      price_calculation: "Slat package price × quantity"
    }
  },
  
  // Hardware formulas
  "dome_cap_terminal": {
    formula: "Number of terminal posts",
    calculation_details: {
      quantity_calculation: "Number of terminal posts",
      price_calculation: "Cap price × quantity"
    }
  },
  "dome_cap_corner": {
    formula: "Number of corner posts",
    calculation_details: {
      quantity_calculation: "Number of corner posts",
      price_calculation: "Cap price × quantity"
    }
  },
  "dome_cap_single_gate": {
    formula: "Number of single gate posts",
    calculation_details: {
      quantity_calculation: "Number of single gate posts",
      price_calculation: "Cap price × quantity"
    }
  },
  "dome_cap_double_gate": {
    formula: "Number of double gate posts",
    calculation_details: {
      quantity_calculation: "Number of double gate posts",
      price_calculation: "Cap price × quantity"
    }
  },
  "dome_cap_sliding_gate": {
    formula: "Number of sliding gate posts",
    calculation_details: {
      quantity_calculation: "Number of sliding gate posts",
      price_calculation: "Cap price × quantity"
    }
  },
  "eye_tops": {
    formula: "Number of line posts",
    calculation_details: {
      quantity_calculation: "Number of line posts",
      price_calculation: "Eye top price × quantity"
    }
  },
  "rail_clamps": {
    formula: "Number of line posts",
    calculation_details: {
      quantity_calculation: "Number of line posts",
      price_calculation: "Rail clamp price × quantity"
    }
  },
  "barb_arms": {
    formula: "Total number of posts",
    calculation_details: {
      quantity_calculation: "Line posts + terminal posts + corner posts + gate posts",
      price_calculation: "Barb arm price × quantity"
    }
  },
  "barbed_wire": {
    formula: "fenceLength × 3 strands ÷ 1320",
    calculation_details: {
      quantity_calculation: "Math.ceil((fenceLength × 3) / 1320) - Barbed wire comes in 1320ft rolls",
      price_calculation: "Barbed wire price per roll × quantity"
    }
  },
  "tension_bands_terminal": {
    formula: "Number of terminal posts × bands per post",
    calculation_details: {
      quantity_calculation: "Number of terminal posts × Math.ceil(fenceHeight)",
      price_calculation: "Band price × quantity"
    }
  },
  "tension_bands_corner": {
    formula: "Number of corner posts × bands per post",
    calculation_details: {
      quantity_calculation: "Number of corner posts × Math.ceil(fenceHeight)",
      price_calculation: "Band price × quantity"
    }
  },
  "tension_bands_single_gate": {
    formula: "Number of single gate posts × bands per post",
    calculation_details: {
      quantity_calculation: "Number of single gate posts × Math.ceil(fenceHeight)",
      price_calculation: "Band price × quantity"
    }
  },
  "tension_bands_double_gate": {
    formula: "Number of double gate posts × bands per post",
    calculation_details: {
      quantity_calculation: "Number of double gate posts × Math.ceil(fenceHeight)",
      price_calculation: "Band price × quantity"
    }
  },
  "tension_bands_sliding_gate": {
    formula: "Number of sliding gate posts × bands per post",
    calculation_details: {
      quantity_calculation: "Number of sliding gate posts × Math.ceil(fenceHeight)",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_terminal": {
    formula: "Number of terminal posts × 2",
    calculation_details: {
      quantity_calculation: "Number of terminal posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_corner": {
    formula: "Number of corner posts × 2",
    calculation_details: {
      quantity_calculation: "Number of corner posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_single_gate": {
    formula: "Number of single gate posts × 2",
    calculation_details: {
      quantity_calculation: "Number of single gate posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_double_gate": {
    formula: "Number of double gate posts × 2",
    calculation_details: {
      quantity_calculation: "Number of double gate posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_sliding_gate": {
    formula: "Number of sliding gate posts × 2",
    calculation_details: {
      quantity_calculation: "Number of sliding gate posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "brace_bands_line": {
    formula: "Number of line posts × 2",
    calculation_details: {
      quantity_calculation: "Number of line posts × 2",
      price_calculation: "Band price × quantity"
    }
  },
  "tension_bars": {
    formula: "Number of terminal posts + corner posts + gate posts",
    calculation_details: {
      quantity_calculation: "Terminal posts + corner posts + gate posts",
      price_calculation: "Bar price × quantity"
    }
  },
  "rail_ends": {
    formula: "Number of terminal posts + corner posts + gate posts",
    calculation_details: {
      quantity_calculation: "Terminal posts + corner posts + gate posts",
      price_calculation: "Rail end price × quantity"
    }
  },
  "nuts_and_bolts": {
    formula: "Number of brace bands + tension bands",
    calculation_details: {
      quantity_calculation: "Total number of brace bands and tension bands",
      price_calculation: "Bolt price × quantity"
    }
  },
  "wedge_anchors": {
    formula: "Number of flanged posts × 4",
    calculation_details: {
      quantity_calculation: "Number of flanged posts × 4 anchors per post",
      price_calculation: "Anchor price × quantity"
    }
  },
  "fence_ties": {
    formula: "Number of line posts × 5 + fenceLength",
    calculation_details: {
      quantity_calculation: "Number of line posts × 5 ties per post + 1 tie per foot of fence for top rail",
      price_calculation: "Tie price × quantity"
    }
  },
  "hog_rings": {
    formula: "fenceLength × 10",
    calculation_details: {
      quantity_calculation: "Approximately 10 hog rings per foot of fence",
      price_calculation: "Hog ring price per 100 × (quantity / 100)"
    }
  },
  "truss_rods": {
    formula: "Number of pull sections × 2",
    calculation_details: {
      quantity_calculation: "Number of pull sections × 2 rods per section",
      price_calculation: "Rod price × quantity"
    }
  },
  
  // Gate hardware formulas
  "male_residential_hinge_single": {
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2 hinges per gate",
      price_calculation: "Hinge price × quantity"
    }
  },
  "female_residential_hinge_single": {
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2 hinges per gate",
      price_calculation: "Hinge price × quantity"
    }
  },
  "male_residential_hinge_double": {
    formula: "Number of double gates × 4",
    calculation_details: {
      quantity_calculation: "Number of double gates × 4 hinges per gate (2 per leaf)",
      price_calculation: "Hinge price × quantity"
    }
  },
  "female_residential_hinge_double": {
    formula: "Number of double gates × 4",
    calculation_details: {
      quantity_calculation: "Number of double gates × 4 hinges per gate (2 per leaf)",
      price_calculation: "Hinge price × quantity"
    }
  },
  "gate_nut_bolt": {
    formula: "Number of gate hinges",
    calculation_details: {
      quantity_calculation: "Total number of gate hinges",
      price_calculation: "Bolt price × quantity"
    }
  },
  "bulldog_hinges_single": {
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2 hinges per gate",
      price_calculation: "Hinge price × quantity"
    }
  },
  "bulldog_hinges_double": {
    formula: "Number of double gates × 4",
    calculation_details: {
      quantity_calculation: "Number of double gates × 4 hinges per gate (2 per leaf)",
      price_calculation: "Hinge price × quantity"
    }
  },
  "industrial_hinges_single": {
    formula: "Number of single gates × 2",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2 hinges per gate",
      price_calculation: "Hinge price × quantity"
    }
  },
  "industrial_hinges_double": {
    formula: "Number of double gates × 4",
    calculation_details: {
      quantity_calculation: "Number of double gates × 4 hinges per gate (2 per leaf)",
      price_calculation: "Hinge price × quantity"
    }
  },
  "duckbill_gate_stop": {
    formula: "Number of sliding gates",
    calculation_details: {
      quantity_calculation: "Number of sliding gates",
      price_calculation: "Gate stop price × quantity"
    }
  },
  "cantilever_rollers": {
    formula: "Number of sliding gates × 2",
    calculation_details: {
      quantity_calculation: "Number of sliding gates × 2 rollers per gate",
      price_calculation: "Roller price × quantity"
    }
  },
  "cantilever_latch": {
    formula: "Number of sliding gates",
    calculation_details: {
      quantity_calculation: "Number of sliding gates",
      price_calculation: "Latch price × quantity"
    }
  },
  "collars": {
    formula: "Number of single gates × 2 + number of double gates × 4",
    calculation_details: {
      quantity_calculation: "Number of single gates × 2 + number of double gates × 4",
      price_calculation: "Collar price × quantity"
    }
  },
  "cane_bolts": {
    formula: "Number of double gates × 2",
    calculation_details: {
      quantity_calculation: "Number of double gates × 2 bolts per gate",
      price_calculation: "Bolt price × quantity"
    }
  },
  "industrial_drop_latch": {
    formula: "Number of double gates",
    calculation_details: {
      quantity_calculation: "Number of double gates",
      price_calculation: "Latch price × quantity"
    }
  },
  "industrial_drop_latch_guides": {
    formula: "Number of double gates × 2",
    calculation_details: {
      quantity_calculation: "Number of double gates × 2 guides per gate",
      price_calculation: "Guide price × quantity"
    }
  },
  "fork_latch_single": {
    formula: "Number of single gates",
    calculation_details: {
      quantity_calculation: "Number of single gates",
      price_calculation: "Latch price × quantity"
    }
  },
  "fork_latch_double": {
    formula: "Number of double gates",
    calculation_details: {
      quantity_calculation: "Number of double gates",
      price_calculation: "Latch price × quantity"
    }
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
    
    // Update each formula with improved calculations
    console.log('Updating formulas with improved calculations...');
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const [id, formula] of Object.entries(improvedFormulas)) {
      try {
        // Check if formula exists
        const checkResult = await client.query(
          'SELECT id FROM material_formulas WHERE id = $1',
          [id]
        );
        
        if (checkResult.rows.length === 0) {
          console.log(`Formula ${id} not found, skipping...`);
          skippedCount++;
          continue;
        }
        
        // Update formula
        console.log(`Updating formula: ${id}`);
        
        await client.query(
          `UPDATE material_formulas 
           SET formula = $1, calculation_details = $2, updated_at = NOW()
           WHERE id = $3`,
          [
            formula.formula,
            JSON.stringify(formula.calculation_details),
            id
          ]
        );
        
        updatedCount++;
      } catch (error) {
        console.error(`Error updating formula ${id}:`, error);
        skippedCount++;
      }
    }
    
    console.log(`\nUpdate complete!`);
    console.log(`- Updated formulas: ${updatedCount}`);
    console.log(`- Skipped formulas: ${skippedCount}`);
    
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
