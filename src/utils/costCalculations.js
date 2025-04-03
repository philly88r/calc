import {
  postCosts, topRailCosts, meshCosts, domeCapCosts, fenceTiesCosts, hogRingsCosts,
  wedgeAnchorCosts, eyeTopsCosts, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts, 
  industrialHingeCosts, rollerPrice, barbedWireCosts, braceBandsCosts, cantileverLatchCosts,
  tensionBandCosts, tensionBarsCosts, slatCosts, nutsAndBoltsCosts, concreteCosts,
  railClampsCosts, barbArmsCosts
} from '../data/costs.js';

/**
 * Calculates the number of line posts needed based on fence length and post spacing
 * @param {number} totalLength - Total linear length of the fence in feet
 * @param {number} postSpacing - Spacing between posts in feet
 * @returns {number} - Number of line posts needed
 */
export const calculateLinePostsNeeded = (totalLength, postSpacing) => {
  if (!totalLength || !postSpacing || postSpacing <= 0) return 0;
  return Math.ceil(totalLength / postSpacing) - 1; // Subtract 1 because end posts are counted separately
};

/**
 * Finds the appropriate post size based on requirements
 * @param {string} diameter - Post diameter (e.g., "2 7/8")
 * @param {string} thickness - Post thickness (e.g., "SCH 40")
 * @param {string} material - Material type (e.g., "Galvanized")
 * @param {number} height - Height of fence in feet
 * @returns {object|null} - Post cost information or null if not found
 */
export const findPostSize = (diameter, thickness, material, height) => {
  if (!diameter || !thickness || !material || !height) return null;
  
  const materialKey = material.toLowerCase() === 'black' ? 'black' : 'galvanized';
  
  if (!postCosts[materialKey]) return null;
  
  // Find the closest height that's at least as tall as the requested height
  const availableHeights = Object.keys(postCosts[materialKey])
    .map(h => parseInt(h))
    .filter(h => h >= height)
    .sort((a, b) => a - b);
  
  if (availableHeights.length === 0) return null;
  
  const closestHeight = availableHeights[0];
  const heightKey = closestHeight.toString();
  
  if (!postCosts[materialKey][heightKey]) return null;
  
  // Find the post with the specified diameter and thickness
  for (const post of postCosts[materialKey][heightKey]) {
    if (post.diameter === diameter && post.thickness === thickness) {
      return post;
    }
  }
  
  return null;
};

/**
 * Calculates the volume of concrete needed for a post hole
 * @param {number} depth - Depth of hole in inches
 * @param {number} width - Width of hole in inches
 * @returns {number} - Volume of concrete in cubic inches
 */
export const calculateHoleVolume = (depth, width) => {
  if (!depth || !width) return 0;
  // Volume of a cylinder: π * r² * h
  return Math.PI * Math.pow(width / 2, 2) * depth;
};

/**
 * Calculates the total concrete needed for all post holes
 * @param {object} params - Parameters for concrete calculation
 * @returns {object} - Object containing bagsNeeded and cubicYardsNeeded
 */
export const calculateConcreteNeeded = (params) => {
  const {
    terminalPostsQuantity, 
    cornerPostsQuantity, 
    linePostsQuantity,
    singleGatePostsQuantity,
    doubleGatePostsQuantity,
    slidingGatePostsQuantity,
    depthOfHoles,
    widthOfHoles,
    linePostHoleDepth,
    linePostHoleWidth,
    singleGateHoleDepth,
    singleGateHoleWidth,
    doubleGateHoleDepth,
    doubleGateHoleWidth,
    slidingGateHoleDepth,
    slidingGateHoleWidth,
    typeOfConcrete
  } = params;

  let totalVolume = 0;

  // Calculate volume for terminal posts
  const terminalHoleVolume = calculateHoleVolume(depthOfHoles || 36, widthOfHoles || 12);
  totalVolume += terminalHoleVolume * (terminalPostsQuantity || 0);

  // Calculate volume for corner posts
  const cornerHoleVolume = calculateHoleVolume(depthOfHoles || 36, widthOfHoles || 12);
  totalVolume += cornerHoleVolume * (cornerPostsQuantity || 0);

  // Calculate volume for line posts
  const linePostHoleVolume = calculateHoleVolume(linePostHoleDepth || 36, linePostHoleWidth || 12);
  totalVolume += linePostHoleVolume * (linePostsQuantity || 0);

  // Calculate volume for single gate posts
  const singleGateHoleVolume = calculateHoleVolume(singleGateHoleDepth || 36, singleGateHoleWidth || 12);
  totalVolume += singleGateHoleVolume * (singleGatePostsQuantity || 0);

  // Calculate volume for double gate posts
  const doubleGateHoleVolume = calculateHoleVolume(doubleGateHoleDepth || 36, doubleGateHoleWidth || 12);
  totalVolume += doubleGateHoleVolume * (doubleGatePostsQuantity || 0);

  // Calculate volume for sliding gate posts
  const slidingGateHoleVolume = calculateHoleVolume(slidingGateHoleDepth || 36, slidingGateHoleWidth || 12);
  totalVolume += slidingGateHoleVolume * (slidingGatePostsQuantity || 0);

  // Convert cubic inches to bags (multiply by 2.22 and divide by 1728 to convert from cubic inches)
  const bagsNeeded = Math.ceil((totalVolume / 1728) * 2.22);
  const cubicYardsNeeded = typeOfConcrete === "Truck" ? Math.ceil(bagsNeeded / 59) : null;

  return {
    bagsNeeded,
    cubicYardsNeeded
  };
};

/**
 * Categorizes costs into groups for the cost breakdown display
 * @param {object} costs - Raw costs object with all line items
 * @returns {object} - Categorized costs object
 */
export const categorizeCosts = (costs) => {
  if (!costs) return {};
  
  const categories = {
    postCosts: 0,
    gateCosts: 0,
    meshCosts: 0,
    concreteCosts: 0,
    additionalCosts: 0
  };
  
  // Post-related items
  const postItems = [
    'Terminal posts', 'Corner posts', 'Line posts', 'Single gate posts', 
    'Double gate posts', 'Sliding gate posts', 'Flanged posts', 'Duckbill gate stop posts'
  ];
  
  // Gate-related items
  const gateItems = [
    'Single Gate', 'Double Gate', 'Sliding Gate', 'Gate hardware'
  ];
  
  // Mesh-related items
  const meshItems = [
    'Chain Link Mesh', 'Fence Slats'
  ];
  
  // Concrete-related items
  const concreteItems = [
    'Concrete (Truck)', 'Concrete (Red 50 pound)', 'Concrete (Yellow 60 pound)'
  ];
  
  // Categorize each cost item
  Object.entries(costs).forEach(([item, details]) => {
    if (!details || !details.subtotal) return;
    
    const subtotal = Number(details.subtotal) || 0;
    
    if (postItems.some(post => item.includes(post))) {
      categories.postCosts += subtotal;
    } else if (gateItems.some(gate => item.includes(gate))) {
      categories.gateCosts += subtotal;
    } else if (meshItems.some(mesh => item.includes(mesh))) {
      categories.meshCosts += subtotal;
    } else if (concreteItems.some(concrete => item.includes(concrete))) {
      categories.concreteCosts += subtotal;
    } else {
      categories.additionalCosts += subtotal;
    }
  });
  
  // Calculate total material costs
  categories.materialCosts = Object.values(categories).reduce((sum, cost) => sum + cost, 0);
  
  return categories;
};

/**
 * Formats the detailed material costs for display
 * @param {object} costs - Raw costs object with all line items
 * @returns {array} - Array of formatted cost items for display
 */
export const formatDetailedCosts = (costs) => {
  if (!costs) return [];
  
  return Object.entries(costs).map(([item, details]) => {
    if (!details) return null;
    
    return {
      material: item,
      quantity: details.quantity || 0,
      description: details.description || '',
      unitCost: details.unitCost || 0,
      subtotal: details.subtotal || 0
    };
  }).filter(item => item !== null);
};
