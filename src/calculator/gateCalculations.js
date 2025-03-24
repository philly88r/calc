// Gate-related calculation functions extracted from FenceCalculator.js

/**
 * Calculate hardware costs for single gates
 */
export const calculateSingleGateHardwareCost = (gate, material, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts) => {
  if (!gate || !gate.size) return 0;
  
  let hardwareCost = 0;
  
  // Add hinge costs based on type
  if (gate.hingeType === 'bulldog') {
    // Use bulldog hinges
    const hingeDiameter = "2 3/8"; // Default size for bulldog hinges
    if (bulldogHingeCosts[material] && bulldogHingeCosts[material][hingeDiameter]) {
      hardwareCost += bulldogHingeCosts[material][hingeDiameter].price * 2; // 2 hinges per gate
    }
  } else if (gate.hingeType === 'industrial') {
    // Use industrial hinges
    const hingeDiameter = "2 3/8"; // Default size for industrial hinges
    if (bulldogHingeCosts[material] && bulldogHingeCosts[material][hingeDiameter]) {
      hardwareCost += bulldogHingeCosts[material][hingeDiameter].price * 2; // 2 hinges per gate
    }
  } else {
    // Use residential hinges (female + male)
    const femaleDiameter = "1 3/8"; // Default size for female hinges
    const maleDiameter = "1 7/8"; // Default size for male hinges
    
    if (femaleGateHingeCosts[material] && femaleGateHingeCosts[material][femaleDiameter]) {
      hardwareCost += femaleGateHingeCosts[material][femaleDiameter].price;
    }
    
    if (maleGateHingeCosts[material] && maleGateHingeCosts[material][maleDiameter]) {
      hardwareCost += maleGateHingeCosts[material][maleDiameter].price;
    }
  }
  
  // Add latch costs
  if (gate.latchType === 'fork') {
    hardwareCost += 15.00; // Example fork latch cost
  } else if (gate.latchType === 'drop rod') {
    hardwareCost += 25.00; // Example drop rod latch cost
  }
  
  return hardwareCost;
};

/**
 * Calculate hardware costs for double gates
 */
export const calculateDoubleGateHardwareCost = (gate, material, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts, hasDuckbillGateStop) => {
  if (!gate || !gate.size) return 0;
  
  // Start with single gate hardware cost (for 2 gate leaves)
  let hardwareCost = calculateSingleGateHardwareCost(gate, material, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts) * 2;
  
  // Add drop rod costs for double gates
  hardwareCost += 35.00; // Example drop rod cost
  
  // Add duckbill gate stop if needed
  if (hasDuckbillGateStop) {
    hardwareCost += 25.00; // Example duckbill gate stop cost
  }
  
  return hardwareCost;
};

/**
 * Calculate hardware costs for sliding gates
 */
export const calculateSlidingGateHardwareCost = (gate, slidingGatePostDiameter, cantileverLatchCosts, rollerPrice) => {
  if (!gate || !gate.size) return 0;
  
  let hardwareCost = 0;
  
  // Add roller cost
  if (rollerPrice && rollerPrice.price) {
    hardwareCost += rollerPrice.price;
  }
  
  // Add latch cost based on post diameter
  if (cantileverLatchCosts && cantileverLatchCosts[slidingGatePostDiameter]) {
    hardwareCost += cantileverLatchCosts[slidingGatePostDiameter].price;
  }
  
  // Add track costs based on gate width
  const gateWidth = parseFloat(gate.size.split('x')[1]);
  const trackCostPerFoot = 12.00; // Example track cost per foot
  hardwareCost += gateWidth * trackCostPerFoot;
  
  return hardwareCost;
};
