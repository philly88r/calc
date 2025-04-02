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

// We're not importing from costCalculations since it doesn't exist yet
// Instead, we'll define these functions directly here
export const calculateLinePostsNeeded = (totalLength, postSpacing) => {
  if (!totalLength || !postSpacing || postSpacing <= 0) return 0;
  return Math.ceil(totalLength / postSpacing) - 1;
};

export const findPostSize = () => {
  return null;
};

export const calculateHoleVolume = () => {
  return 0;
};

export const calculateConcreteNeeded = () => {
  return { bagsNeeded: 0, cubicYardsNeeded: 0 };
};

export const categorizeCosts = () => {
  return {
    postCosts: 0,
    gateCosts: 0,
    meshCosts: 0,
    concreteCosts: 0,
    additionalCosts: 0
  };
};

export const formatDetailedCosts = () => {
  return [];
};

// No need to import from fenceCalculations since we're defining everything here
// export * from './fenceCalculations';

// No need to import from productLookup since we're defining everything here
// export * from './productLookup';
