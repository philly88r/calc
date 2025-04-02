
    // Constants
    const PRODUCT_TYPES = {
  "POST": "post",
  "MESH": "mesh",
  "EYE_TOP": "eye_top",
  "DOME_CAP": "dome_cap",
  "RAIL_END": "rail_end",
  "TENSION_BAND": "tension_band",
  "BRACE_BAND": "brace_band",
  "BARB_ARM": "barb_arm",
  "FENCE_TIE": "fence_tie",
  "HOG_RINGS": "hog_rings",
  "SLEEVE": "sleeve",
  "RAIL_CLAMP": "rail_clamp",
  "GATE_COLLAR": "gate_collar",
  "CANE_BOLT": "cane_bolt",
  "DROP_ROD": "drop_rod",
  "FORK_LATCH": "fork_latch",
  "TENSION_BAR": "tension_bar",
  "TENSION_WIRE": "tension_wire",
  "TOP_RAIL": "top_rail",
  "BOTTOM_RAIL": "bottom_rail",
  "BARBED_WIRE": "barbed_wire",
  "CONCRETE": "concrete",
  "GATE_FRAME": "gate_frame",
  "GATE_HARDWARE": "gate_hardware"
};
    const MATERIAL_TYPES = {
  "BLACK": "Black",
  "GALVANIZED": "Galvanized"
};
    const THICKNESS_TYPES = {
  "LIGHT": "0.065",
  "SCH_20": "SCH 20",
  "SCH_40": "SCH 40"
};
    const DIAMETER_SIZES = {
  "ONE_THREE_EIGHTHS": "1 3/8",
  "ONE_FIVE_EIGHTHS": "1 5/8",
  "ONE_SEVEN_EIGHTHS": "1 7/8",
  "TWO": "2",
  "TWO_AND_HALF": "2 1/2",
  "THREE": "3",
  "FOUR": "4"
};
    
    // Mock functions
    const findPostProduct = () => ({ price: 0 });
    const findMeshProduct = () => ({ price: 0 });
    const findProduct = () => ({ price: 0 });
    
    // Formulas
    const gateFormulas = {
  "single_gates": {
    id: "single_gates",
    questionnaire_trigger: "Single gates count input field",
    formula: "Number of single gates specified by user",
    description: "Single gates are standard swing gates with one panel. The quantity is directly specified by the user input.",
    dynamic_questionnaire: "When user enters a number of single gates (e.g., 2), that many input boxes will appear below to enter details for each gate (height, width, latch type, etc.)",
    price_calculation: {
      steps: [
        "1. For each single gate, calculate the materials based on the specifications entered",
        "2. Each gate requires its own frame, mesh, hinges, and latch",
        "3. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)"
      ],
      code: (params, costs) => {
        const { singleGatesCount = 0 } = params;
        return parseInt(singleGatesCount || 0);
      }
    },
    total_cost_formula: "Sum of all single gates costs = singleGates.reduce((total, gate) => total + calculateSingleGateCost(gate), 0)",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      sizes: ["3ft", "4ft", "5ft", "6ft", "7ft", "8ft", "10ft", "12ft"],
      hinge_types: ["Residential", "Commercial", "Industrial"],
      latch_types: ["Fork", "Plunger", "Drop Rod"]
    }
  },
  
  "double_gates": {
    id: "double_gates",
    questionnaire_trigger: "Double gates count input field",
    formula: "Number of double gates specified by user",
    description: "Double gates have two swinging panels. The quantity is directly specified by the user input.",
    dynamic_questionnaire: "When user enters a number of double gates (e.g., 2), that many input boxes will appear below to enter details for each gate (height, width, latch type, etc.)",
    price_calculation: {
      steps: [
        "1. For each double gate, calculate the materials based on the specifications entered",
        "2. Each double gate requires two frames, mesh, hinges, and a latch system",
        "3. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)"
      ],
      code: (params, costs) => {
        const { doubleGatesCount = 0 } = params;
        return parseInt(doubleGatesCount || 0);
      }
    },
    total_cost_formula: "Sum of all double gates costs = doubleGates.reduce((total, gate) => total + calculateDoubleGateCost(gate), 0)",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      sizes: ["6ft", "8ft", "10ft", "12ft", "14ft", "16ft", "18ft", "20ft"],
      types: ["Standard", "Industrial"],
      latch_types: ["Drop Rod", "Cane Bolt", "Plunger"]
    }
  },
  
  "sliding_gates": {
    id: "sliding_gates",
    questionnaire_trigger: "Sliding gates count input field",
    formula: "Number of sliding gates specified by user",
    description: "Sliding gates move horizontally on a track. The quantity is directly specified by the user input.",
    dynamic_questionnaire: "When user enters a number of sliding gates (e.g., 2), that many input boxes will appear below to enter details for each gate (height, width, track type, etc.)",
    price_calculation: {
      steps: [
        "1. For each sliding gate, calculate the materials based on the specifications entered",
        "2. Each sliding gate requires a frame, mesh, track system, and rollers",
        "3. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)"
      ],
      code: (params, costs) => {
        const { slidingGatesCount = 0 } = params;
        return parseInt(slidingGatesCount || 0);
      }
    },
    total_cost_formula: "Sum of all sliding gates costs = slidingGates.reduce((total, gate) => total + calculateSlidingGateCost(gate), 0)",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      sizes: ["10ft", "12ft", "14ft", "16ft", "18ft", "20ft", "24ft", "30ft"],
      track_types: ["V-Track", "Cantilever"],
      roller_types: ["V-Groove", "Cantilever"]
    }
  }
};
    const postFormulas = {
  // Terminal Posts
  "terminal_posts": {
    id: "terminal_posts",
    questionnaire_trigger: "Terminal posts count input field",
    formula: "Number of terminal posts specified by user",
    description: "Terminal posts are the end posts of the fence. The quantity is directly specified by the user input.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: Math.ceil(fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12))",
        "2. Find the post in costs.js using product identifiers: PRODUCT_TYPES.POST, MATERIAL_TYPES, THICKNESS_TYPES",
        "3. Use findPostProduct utility to get the product with cost and SKU",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Terminal posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          terminalPostsCount = 0,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          terminalPostDiameter = DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS,
          terminalPostThickness 
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Determine appropriate thickness based on diameter
        const diameter = parseFloat(terminalPostDiameter.split(" ")[0]);
        const thickness = terminalPostThickness || (diameter >= 2.375 ? THICKNESS_TYPES.COMMERCIAL_SCH_40 : THICKNESS_TYPES.SCH_20);
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          terminalPostDiameter,
          thickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost (ensure we have a valid price)
        const unitCost = postProduct?.price || 0;
        return unitCost * parseInt(terminalPostsCount || 0);
      }
    },
    total_cost_formula: "Terminal posts count × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    additional_info: "Terminal posts are typically larger in diameter than line posts for added stability.",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.COMMERCIAL_SCH_40],
      diameter: [DIAMETER_SIZES.TWO_AND_SEVEN_EIGHTHS, DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS, DIAMETER_SIZES.FOUR],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  // Corner Posts
  "corner_posts": {
    id: "corner_posts",
    questionnaire_trigger: "Corner posts count input field",
    formula: "Number of corner posts specified by user",
    description: "Corner posts are placed at each corner of the fence. The quantity is directly specified by the user input.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: Math.ceil(fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12))",
        "2. Find the post in costs.js using product identifiers: PRODUCT_TYPES.POST, MATERIAL_TYPES, THICKNESS_TYPES",
        "3. Use findPostProduct utility to get the product with cost and SKU",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Corner posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          cornerPostsCount = 0,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          cornerPostDiameter = DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS,
          cornerPostThickness 
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Determine appropriate thickness based on diameter
        const diameter = parseFloat(cornerPostDiameter.split(" ")[0]);
        const thickness = cornerPostThickness || (diameter >= 2.375 ? THICKNESS_TYPES.COMMERCIAL_SCH_40 : THICKNESS_TYPES.SCH_20);
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          cornerPostDiameter,
          thickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost (ensure we have a valid price)
        const unitCost = postProduct?.price || 0;
        return unitCost * parseInt(cornerPostsCount || 0);
      }
    },
    total_cost_formula: "Corner posts count × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.COMMERCIAL_SCH_40],
      diameter: [DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS, DIAMETER_SIZES.TWO_AND_SEVEN_EIGHTHS, DIAMETER_SIZES.FOUR],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  // Line Posts
  "line_posts": {
    id: "line_posts",
    questionnaire_trigger: "Fence length and Post spacing input fields",
    formula: "Math.ceil(Fence length / Post spacing) - 1",
    description: "Line posts are placed between terminal and corner posts. The quantity is calculated by dividing the total fence length by the post spacing and subtracting 1.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12)",
        "2. Calculate the line posts count: Math.ceil(fenceLength / postSpacing) - 1",
        "3. Find the post in costs.js using material and diameter",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Line posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          fenceLength = 0,
          postSpacing = 8,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          linePostDiameter = DIAMETER_SIZES.ONE_AND_SEVEN_EIGHTHS,
          linePostThickness 
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Calculate the number of line posts needed
        const linePostsNeeded = Math.max(0, Math.ceil(parseFloat(fenceLength) / parseFloat(postSpacing)) - 1);
        
        // Determine appropriate thickness based on diameter
        const diameter = parseFloat(linePostDiameter.split(" ")[0]);
        const thickness = linePostThickness || (diameter >= 2.375 ? THICKNESS_TYPES.COMMERCIAL_SCH_40 : THICKNESS_TYPES.SCH_20);
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          linePostDiameter,
          thickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost (ensure we have a valid price and non-negative quantity)
        const unitCost = postProduct?.price || 0;
        return unitCost * linePostsNeeded;
      }
    },
    total_cost_formula: "Line posts count × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.SCH_20],
      diameter: [DIAMETER_SIZES.ONE_AND_THREE_EIGHTHS, DIAMETER_SIZES.ONE_AND_FIVE_EIGHTHS, DIAMETER_SIZES.ONE_AND_SEVEN_EIGHTHS, DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  // Gate Posts
  "single_gate_posts": {
    id: "single_gate_posts",
    questionnaire_trigger: "Single gates count input field",
    formula: "Single gates count × 2",
    description: "Each single gate requires 2 posts. The quantity is calculated by multiplying the number of single gates by 2.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12)",
        "2. Calculate the number of gate posts needed: singleGatesCount × 2",
        "3. Find the post in costs.js using material and diameter",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Gate posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          singleGatesCount = 0,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          singleGatePostDiameter = DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS,
          singleGatePostThickness = THICKNESS_TYPES.SCH_40
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Calculate the number of gate posts needed (2 per single gate)
        const gatePostsNeeded = parseInt(singleGatesCount || 0) * 2;
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          singleGatePostDiameter,
          singleGatePostThickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost
        const unitCost = postProduct?.price || 0;
        return unitCost * gatePostsNeeded;
      }
    },
    total_cost_formula: "Single gates count × 2 × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.SCH_40],
      diameter: [DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS, DIAMETER_SIZES.TWO_AND_SEVEN_EIGHTHS, DIAMETER_SIZES.FOUR],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  "double_gate_posts": {
    id: "double_gate_posts",
    questionnaire_trigger: "Double gates count input field",
    formula: "Double gates count × 2",
    description: "Each double gate requires 2 posts. The quantity is calculated by multiplying the number of double gates by 2.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12)",
        "2. Calculate the number of gate posts needed: doubleGatesCount × 2",
        "3. Find the post in costs.js using material and diameter",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Gate posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          doubleGatesCount = 0,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          doubleGatePostDiameter = DIAMETER_SIZES.FOUR,
          doubleGatePostThickness = THICKNESS_TYPES.SCH_40
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Calculate the number of gate posts needed (2 per double gate)
        const gatePostsNeeded = parseInt(doubleGatesCount || 0) * 2;
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          doubleGatePostDiameter,
          doubleGatePostThickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost
        const unitCost = postProduct?.price || 0;
        return unitCost * gatePostsNeeded;
      }
    },
    total_cost_formula: "Double gates count × 2 × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.SCH_40],
      diameter: [DIAMETER_SIZES.FOUR, DIAMETER_SIZES.SIX_AND_FIVE_EIGHTHS],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  "sliding_gate_posts": {
    id: "sliding_gate_posts",
    questionnaire_trigger: "Sliding gates count input field",
    formula: "Sliding gates count × 2",
    description: "Each sliding gate requires 2 posts. The quantity is calculated by multiplying the number of sliding gates by 2.",
    height_calculation: "Post height = Fence height + Barbed wire height (if applicable) + Post hole depth (in feet)",
    price_calculation: {
      steps: [
        "1. Calculate required post height: fenceHeight + (threeStrandBarbedWire ? 1 : 0) + (postHoleDepth / 12)",
        "2. Calculate the number of gate posts needed: slidingGatesCount × 2",
        "3. Find the post in costs.js using material and diameter",
        "4. IMPORTANT: If exact size isn't available, ALWAYS use the next size UP (you can cut but you can't add)",
        "5. Multiply the unit cost by the quantity: Unit cost × Gate posts count"
      ],
      code: (params, costs) => {
        const { 
          fenceHeight = 0, 
          threeStrandBarbedWire = false, 
          postHoleDepth = 0,
          slidingGatesCount = 0,
          fenceMaterial = MATERIAL_TYPES.GALVANIZED,
          slidingGatePostDiameter = DIAMETER_SIZES.FOUR,
          slidingGatePostThickness = THICKNESS_TYPES.SCH_40
        } = params;
        
        // Calculate required post height
        const extraHeightForBarbedWire = threeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(fenceHeight) + extraHeightForBarbedWire;
        const postHeightBelowGround = parseFloat(postHoleDepth) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHeightBelowGround);
        
        // Calculate the number of gate posts needed (2 per sliding gate)
        const gatePostsNeeded = parseInt(slidingGatesCount || 0) * 2;
        
        // Use the findPostProduct utility to get the correct post with cost and SKU
        const postProduct = findPostProduct(
          costs,
          slidingGatePostDiameter,
          slidingGatePostThickness,
          fenceMaterial,
          requiredHeight
        );
        
        // Calculate the cost
        const unitCost = postProduct?.price || 0;
        return unitCost * gatePostsNeeded;
      }
    },
    total_cost_formula: "Sliding gates count × 2 × Unit cost",
    price_lookup: "Using findPostProduct utility with PRODUCT_TYPES.POST",
    available_options: {
      material: [MATERIAL_TYPES.BLACK, MATERIAL_TYPES.GALVANIZED],
      thickness: [THICKNESS_TYPES.SCH_40],
      diameter: [DIAMETER_SIZES.FOUR, DIAMETER_SIZES.SIX_AND_FIVE_EIGHTHS],
      heights: ["6ft", "7ft", "8ft", "10.5ft"]
    }
  },
  
  // ... rest of the formulas ...
};
    
    // Export as JSON
    const formulasData = {
      gateFormulas,
      postFormulas
    };
    
    // Convert functions to strings
    const processFormulas = (formulas) => {
      const result = {};
      
      Object.entries(formulas).forEach(([key, formula]) => {
        result[key] = {
          ...formula,
          price_calculation: {
            ...formula.price_calculation,
            code: formula.price_calculation.code.toString()
          }
        };
      });
      
      return result;
    };
    
    const processedData = {
      gateFormulas: processFormulas(gateFormulas),
      postFormulas: processFormulas(postFormulas)
    };
    
    console.log(JSON.stringify(processedData, null, 2));
  