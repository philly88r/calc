/**
 * Labor calculation utility functions
 */

/**
 * Calculate the total cost for in-house labor
 * @param {Object} params - Labor parameters
 * @returns {number} - Total in-house labor cost
 */
export const calculateInHouseLaborTotal = (params = {}) => {
  const {
    totalLinearLength = 0,
    fenceHeight = 0,
    numberOfSingleGates = 0,
    numberOfDoubleGates = 0,
    numberOfSlidingGates = 0,
    needsTearOut = false,
    tearOutFootage = 0,
    needsLineClearing = false,
    lineClearingFootage = 0,
    hasThreeStrandBarbedWire = false,
    hasFenceSlats = false,
    commercialOrResidential = 'Commercial',
    laborRate = 35 // Default hourly rate for in-house labor
  } = params;

  // Base labor calculation (hours per linear foot)
  const baseHoursPerFoot = commercialOrResidential === 'Commercial' ? 0.15 : 0.12;
  const heightMultiplier = Math.min(2, Math.max(1, fenceHeight / 6)); // Height adjustment
  
  // Calculate base labor hours
  let totalHours = totalLinearLength * baseHoursPerFoot * heightMultiplier;
  
  // Add hours for gates
  totalHours += numberOfSingleGates * 1.5; // 1.5 hours per single gate
  totalHours += numberOfDoubleGates * 2.5; // 2.5 hours per double gate
  totalHours += numberOfSlidingGates * 4; // 4 hours per sliding gate
  
  // Add hours for tear out if needed
  if (needsTearOut && tearOutFootage > 0) {
    totalHours += tearOutFootage * 0.1; // 0.1 hours per foot for tear out
  }
  
  // Add hours for line clearing if needed
  if (needsLineClearing && lineClearingFootage > 0) {
    totalHours += lineClearingFootage * 0.05; // 0.05 hours per foot for line clearing
  }
  
  // Add hours for barbed wire
  if (hasThreeStrandBarbedWire) {
    totalHours += totalLinearLength * 0.05; // 0.05 hours per foot for barbed wire
  }
  
  // Add hours for fence slats
  if (hasFenceSlats) {
    totalHours += totalLinearLength * 0.08; // 0.08 hours per foot for fence slats
  }
  
  // Calculate total labor cost
  return totalHours * laborRate;
};

/**
 * Calculate the total cost for outside labor
 * @param {Object} params - Labor parameters
 * @returns {number} - Total outside labor cost
 */
export const calculateOutsideLaborTotal = (params = {}) => {
  const {
    totalLinearLength = 0,
    fenceHeight = 0,
    numberOfSingleGates = 0,
    numberOfDoubleGates = 0,
    numberOfSlidingGates = 0,
    needsTearOut = false,
    tearOutFootage = 0,
    needsLineClearing = false,
    lineClearingFootage = 0,
    hasThreeStrandBarbedWire = false,
    hasFenceSlats = false,
    commercialOrResidential = 'Commercial',
    outsideLaborRate = 45 // Default hourly rate for outside labor
  } = params;

  // Outside labor typically costs more than in-house
  // Base labor calculation (hours per linear foot)
  const baseHoursPerFoot = commercialOrResidential === 'Commercial' ? 0.15 : 0.12;
  const heightMultiplier = Math.min(2, Math.max(1, fenceHeight / 6)); // Height adjustment
  
  // Calculate base labor hours
  let totalHours = totalLinearLength * baseHoursPerFoot * heightMultiplier;
  
  // Add hours for gates
  totalHours += numberOfSingleGates * 1.5; // 1.5 hours per single gate
  totalHours += numberOfDoubleGates * 2.5; // 2.5 hours per double gate
  totalHours += numberOfSlidingGates * 4; // 4 hours per sliding gate
  
  // Add hours for tear out if needed
  if (needsTearOut && tearOutFootage > 0) {
    totalHours += tearOutFootage * 0.1; // 0.1 hours per foot for tear out
  }
  
  // Add hours for line clearing if needed
  if (needsLineClearing && lineClearingFootage > 0) {
    totalHours += lineClearingFootage * 0.05; // 0.05 hours per foot for line clearing
  }
  
  // Add hours for barbed wire
  if (hasThreeStrandBarbedWire) {
    totalHours += totalLinearLength * 0.05; // 0.05 hours per foot for barbed wire
  }
  
  // Add hours for fence slats
  if (hasFenceSlats) {
    totalHours += totalLinearLength * 0.08; // 0.08 hours per foot for fence slats
  }
  
  // Calculate total labor cost
  return totalHours * outsideLaborRate;
};
