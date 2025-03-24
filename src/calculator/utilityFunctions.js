// Utility functions extracted from FenceCalculator.js

/**
 * Format a number as currency
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '$0.00';
  return `$${Number(value).toFixed(2)}`;
};

/**
 * Calculate outside labor costs
 */
export const calculateOutsideLaborTotal = (needsLineClearing, lineClearingFootage, needsTearOut, tearOutFootage, estimatedDays) => {
  let total = 0;
  
  // Line clearing costs
  if (needsLineClearing && lineClearingFootage) {
    total += lineClearingFootage * 2.5;
  }
  
  // Tear out costs
  if (needsTearOut && tearOutFootage) {
    total += tearOutFootage * 3;
  }
  
  // Traveling costs
  if (estimatedDays > 0) {
    total += estimatedDays * 50;
  }
  
  return total;
};

/**
 * Initialize or update gate arrays based on the number of gates
 */
export const updateGateArrays = (currentArray, newCount, defaultValues) => {
  if (newCount > currentArray.length) {
    // Add new gates
    return [
      ...currentArray,
      ...Array(newCount - currentArray.length).fill(0).map(() => ({...defaultValues}))
    ];
  } else if (newCount < currentArray.length) {
    // Remove excess gates
    return currentArray.slice(0, newCount);
  }
  return currentArray;
};

/**
 * Update a specific gate in an array
 */
export const updateGateInArray = (gateArray, index, field, value) => {
  const newGateArray = [...gateArray];
  if (newGateArray[index]) {
    newGateArray[index] = {
      ...newGateArray[index],
      [field]: value
    };
  }
  return newGateArray;
};

/**
 * Calculate the total number of posts needed
 */
export const calculateTotalPosts = (
  numberOfEndTerminals,
  numberOfSolitaryPosts,
  numberOfCorners,
  numberOfSingleGates,
  numberOfDoubleGates,
  numberOfSlidingGates,
  numberOfFlangedPosts,
  numberOfFlangedPostsOffCentered,
  linePostsNeeded
) => {
  return (
    parseInt(numberOfEndTerminals || 0) +
    parseInt(numberOfSolitaryPosts || 0) +
    parseInt(numberOfCorners || 0) +
    (parseInt(numberOfSingleGates || 0) * 2) +
    (parseInt(numberOfDoubleGates || 0) * 2) +
    (parseInt(numberOfSlidingGates || 0) * 3) +
    parseInt(numberOfFlangedPosts || 0) +
    parseInt(numberOfFlangedPostsOffCentered || 0) +
    linePostsNeeded
  );
};

/**
 * Calculate in-house labor costs based on fence length
 * Only applicable for fences under 300 feet
 */
export const calculateInHouseLabor = (totalLinearLength) => {
  // Don't show in-house labor for fences over 300 feet
  if (totalLinearLength > 300) {
    return {
      applicable: false,
      costs: {},
      total: 0
    };
  }

  const costs = {};
  let totalCost = 0;

  // 0-150 ft: 2 men crew for 1 day (1 lead, 1 crew)
  if (totalLinearLength <= 150) {
    costs["Lead Worker"] = {
      quantity: 1,
      unitPrice: 400,
      subtotal: 400
    };
    costs["Crew Worker"] = {
      quantity: 1,
      unitPrice: 230,
      subtotal: 230
    };
    totalCost = 630;
  }
  // 151-250 ft: 3 men crew for 1 day (1 lead, 2 crew)
  else if (totalLinearLength <= 250) {
    costs["Lead Worker"] = {
      quantity: 1,
      unitPrice: 400,
      subtotal: 400
    };
    costs["Crew Worker"] = {
      quantity: 2,
      unitPrice: 230,
      subtotal: 460
    };
    totalCost = 860;
  }
  // 251-300 ft: 2 men crew for 2 days (2 lead, 2 crew)
  else if (totalLinearLength <= 300) {
    costs["Lead Worker"] = {
      quantity: 2,
      unitPrice: 400,
      subtotal: 800
    };
    costs["Crew Worker"] = {
      quantity: 2,
      unitPrice: 230,
      subtotal: 460
    };
    totalCost = 1260;
  }

  return {
    applicable: true,
    costs,
    total: totalCost
  };
};

/**
 * Calculate sub-labor costs based on the updated requirements
 */
export const calculateSubLabor = (
  totalLinearLength, 
  heightOfFence, 
  numberOfSingleGates, 
  numberOfDoubleGates, 
  slidingGates, 
  needsLineClearing, 
  lineClearingFootage, 
  needsTearOut, 
  tearOutFootage, 
  estimatedDays
) => {
  const costs = {};
  let totalCost = 0;

  // Total footage labor calculation
  const footageUnitPrice = heightOfFence <= 5 ? 5 : 7;
  const footageSubtotal = totalLinearLength * footageUnitPrice;
  costs["Total Footage Labor"] = {
    quantity: totalLinearLength,
    unitPrice: footageUnitPrice,
    subtotal: footageSubtotal
  };
  totalCost += footageSubtotal;

  // Single gates installation
  if (numberOfSingleGates > 0) {
    const singleGateUnitPrice = 75;
    const singleGateSubtotal = numberOfSingleGates * singleGateUnitPrice;
    costs["Single Gate Installation"] = {
      quantity: numberOfSingleGates,
      unitPrice: singleGateUnitPrice,
      subtotal: singleGateSubtotal
    };
    totalCost += singleGateSubtotal;
  }

  // Double gates installation
  if (numberOfDoubleGates > 0) {
    const doubleGateUnitPrice = 150;
    const doubleGateSubtotal = numberOfDoubleGates * doubleGateUnitPrice;
    costs["Double Gate Installation"] = {
      quantity: numberOfDoubleGates,
      unitPrice: doubleGateUnitPrice,
      subtotal: doubleGateSubtotal
    };
    totalCost += doubleGateSubtotal;
  }

  // Sliding gates installation
  if (slidingGates && slidingGates.length > 0) {
    let slidingGateSubtotal = 0;
    slidingGates.forEach((gate, index) => {
      if (gate && gate.widthFeet) {
        const gateWidth = parseInt(gate.widthFeet) || 0;
        const gateInstallCost = gateWidth * 20;
        slidingGateSubtotal += gateInstallCost;
      }
    });

    if (slidingGateSubtotal > 0) {
      costs["Sliding Gate Installation"] = {
        quantity: slidingGates.length,
        unitPrice: "Varies",
        subtotal: slidingGateSubtotal
      };
      totalCost += slidingGateSubtotal;
    }
  }

  // Line clearing costs
  if (needsLineClearing && lineClearingFootage) {
    const lineClearingUnitPrice = 2.5;
    const lineClearingSubtotal = lineClearingFootage * lineClearingUnitPrice;
    costs["Line Clearing"] = {
      quantity: lineClearingFootage,
      unitPrice: lineClearingUnitPrice,
      subtotal: lineClearingSubtotal
    };
    totalCost += lineClearingSubtotal;
  }

  // Tear out costs
  if (needsTearOut && tearOutFootage) {
    const tearOutUnitPrice = 3;
    const tearOutSubtotal = tearOutFootage * tearOutUnitPrice;
    costs["Tear Out"] = {
      quantity: tearOutFootage,
      unitPrice: tearOutUnitPrice,
      subtotal: tearOutSubtotal
    };
    totalCost += tearOutSubtotal;
  }

  // Traveling costs
  if (estimatedDays > 0) {
    const travelingUnitPrice = 50;
    const travelingSubtotal = estimatedDays * travelingUnitPrice;
    costs["Traveling Cost"] = {
      quantity: estimatedDays,
      unitPrice: travelingUnitPrice,
      subtotal: travelingSubtotal
    };
    totalCost += travelingSubtotal;
  }

  return {
    costs,
    total: totalCost
  };
};
