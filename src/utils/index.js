// Export all utility functions

// Labor calculations
export { 
  calculateInHouseLaborTotal,
  calculateOutsideLaborTotal
} from './laborCalculations';

// Gate hardware calculations
export {
  calculateSingleGateHardwareCost,
  calculateDoubleGateHardwareCost,
  calculateSlidingGateHardwareCost
} from './gateHardwareCalculations';

// Description handlers
export {
  handleDescriptionChange
} from './descriptionHandlers';

// Cost calculations
export {
  calculateLinePostsNeeded,
  findPostSize,
  calculateHoleVolume,
  calculateConcreteNeeded,
  categorizeCosts,
  formatDetailedCosts
} from './costCalculations';

// Fence calculations
export * from './fenceCalculations';

// Product lookup
export * from './productLookup';
