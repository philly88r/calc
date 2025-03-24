// Material cost calculation functions extracted from FenceCalculator.js

/**
 * Calculate the total material cost from all cost items
 */
export const calculateTotalMaterialCost = (costs, singleGates, doubleGates, slidingGates, 
  calculateSingleGateHardwareCost, calculateDoubleGateHardwareCost, calculateSlidingGateHardwareCost) => {
  
  // Sum all material costs from the costs object
  const materialCost = Object.values(costs).reduce((total, item) => {
    return total + (item.subtotal || 0);
  }, 0);
  
  // Add single gate hardware costs
  const singleGateHardwareCost = singleGates.reduce((total, gate) => {
    return total + (gate.size ? calculateSingleGateHardwareCost(gate) : 0);
  }, 0);
  
  // Add double gate hardware costs
  const doubleGateHardwareCost = doubleGates.reduce((total, gate) => {
    return total + (gate.size ? calculateDoubleGateHardwareCost(gate) : 0);
  }, 0);
  
  // Add sliding gate hardware costs
  const slidingGateHardwareCost = slidingGates.reduce((total, gate) => {
    return total + (gate.size ? calculateSlidingGateHardwareCost(gate) : 0);
  }, 0);
  
  // Return the total
  return materialCost + singleGateHardwareCost + doubleGateHardwareCost + slidingGateHardwareCost;
};

/**
 * Calculate concrete costs based on hole dimensions and concrete type
 */
export const calculateConcreteCost = (
  numberOfHoles, 
  holeDepth, 
  holeWidth, 
  concreteType, 
  concreteCosts
) => {
  if (!numberOfHoles || !holeDepth || !holeWidth) return 0;
  
  // Calculate volume in cubic feet
  const radius = holeWidth / 24; // Convert to feet and divide by 2 for radius
  const depth = holeDepth / 12; // Convert to feet
  const volumePerHole = Math.PI * radius * radius * depth;
  const totalVolume = volumePerHole * numberOfHoles;
  
  // Calculate cost based on concrete type
  if (concreteType === "Red") {
    // Red concrete comes in 80lb bags, each covering about 0.6 cubic feet
    const bagsNeeded = Math.ceil(totalVolume / 0.6);
    return bagsNeeded * (concreteCosts.red?.price || 0);
  } else if (concreteType === "Yellow") {
    // Yellow concrete comes in 60lb bags, each covering about 0.45 cubic feet
    const bagsNeeded = Math.ceil(totalVolume / 0.45);
    return bagsNeeded * (concreteCosts.yellow?.price || 0);
  } else if (concreteType === "Truck") {
    // Truck concrete is priced per cubic yard (27 cubic feet)
    const cubicYards = totalVolume / 27;
    return cubicYards * (concreteCosts.truck?.price || 0);
  }
  
  return 0;
};

/**
 * Calculate mesh costs based on fence parameters
 */
export const calculateMeshCost = (
  totalLinearLength,
  heightOfFence,
  material,
  meshType,
  meshFold,
  meshCosts
) => {
  if (!totalLinearLength || !heightOfFence) return 0;
  
  // Determine the mesh category based on type
  const meshCategory = meshType === '9G' ? 'Commercial' : 'Residential';
  
  // Find the appropriate mesh cost
  if (meshCosts[material] && 
      meshCosts[material][meshCategory] && 
      meshCosts[material][meshCategory][heightOfFence]) {
    
    const meshData = meshCosts[material][meshCategory][heightOfFence];
    const costPerFoot = meshData.price / 50; // Assuming mesh comes in 50' rolls
    
    return totalLinearLength * costPerFoot;
  }
  
  return 0;
};

/**
 * Calculate rail costs based on fence parameters
 */
export const calculateRailCost = (
  totalLinearLength,
  topRailDiameter,
  topRailThickness,
  material,
  extraRail,
  topRailCosts
) => {
  if (!totalLinearLength || !topRailDiameter || !topRailThickness) return 0;
  
  // Find the appropriate rail cost
  if (topRailCosts[material] && 
      topRailCosts[material][topRailThickness] && 
      topRailCosts[material][topRailThickness][topRailDiameter]) {
    
    const railData = topRailCosts[material][topRailThickness][topRailDiameter]["21ft"];
    const costPer21Foot = railData.price;
    
    // Calculate number of 21' sections needed
    const sectionsNeeded = Math.ceil(totalLinearLength / 21);
    
    // Calculate multiplier based on extra rail selection
    let multiplier = 1; // Top rail only
    if (extraRail === 'mid') multiplier = 2; // Top + mid
    if (extraRail === 'bottom') multiplier = 2; // Top + bottom
    if (extraRail === 'both') multiplier = 3; // Top + mid + bottom
    
    return sectionsNeeded * costPer21Foot * multiplier;
  }
  
  return 0;
};
