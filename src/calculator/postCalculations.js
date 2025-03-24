// Post-related calculation functions extracted from FenceCalculator.js

/**
 * Find the closest post size that is greater than or equal to the required height
 */
export const findPostSize = (postCosts, material, thickness, diameter, requiredHeight) => {
  // Check if the material, thickness, and diameter exist in the postCosts
  if (!postCosts[material] || !postCosts[material][thickness] || !postCosts[material][thickness][diameter]) {
    return { size: null, cost: 0, sku: null };
  }
  
  // Get available sizes for this post type
  const availableSizes = Object.keys(postCosts[material][thickness][diameter]);
  
  // Convert sizes like "8ft" to numeric values
  const sizeValues = availableSizes.map(size => parseFloat(size.replace('ft', '')));
  
  // Sort sizes in ascending order
  sizeValues.sort((a, b) => a - b);
  
  // Find the smallest size that is >= requiredHeight
  let closestSize = null;
  for (let i = 0; i < sizeValues.length; i++) {
    if (sizeValues[i] >= requiredHeight) {
      closestSize = sizeValues[i];
      break;
    }
  }
  
  // If no size is big enough, return the largest available
  if (closestSize === null && sizeValues.length > 0) {
    closestSize = Math.max(...sizeValues);
  }
  
  if (closestSize) {
    const sizeKey = `${closestSize}ft`;
    const postData = postCosts[material][thickness][diameter][sizeKey];
    
    return {
      size: sizeKey,
      cost: postData.price || 0,
      sku: postData.sku || null
    };
  }
  
  // If no sizes available, return null and 0
  return { size: null, cost: 0, sku: null };
};

/**
 * Calculate the depth adjustment for posts based on hole depth and commercial/residential type
 */
export const calculateDepthAdjustment = (holeDepth, commercialOrResidential) => {
  if (commercialOrResidential === "Commercial") {
    if (holeDepth === 24 || holeDepth === 30) return 2;
    if (holeDepth === 36 || holeDepth === 42) return 3;
    if (holeDepth === 48) return 4;
    return 0;
  } else {
    if (holeDepth === 24 || holeDepth === 30) return 2;
    if (holeDepth === 36 || holeDepth === 42) return 3;
    return 0;
  }
};

/**
 * Calculate line posts needed based on pull lengths and post spacing
 */
export const calculateLinePostsNeeded = (pullLengths, postSpacing, numberOfPulls) => {
  return pullLengths.reduce((total, length) => {
    if (!length) return total;
    return total + Math.ceil(parseFloat(length) / postSpacing);
  }, 0) - numberOfPulls;
};
