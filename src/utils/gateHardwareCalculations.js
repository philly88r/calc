/**
 * Gate hardware calculation utility functions
 */

import {
  bulldogHingeCosts, 
  femaleGateHingeCosts, 
  maleGateHingeCosts,
  industrialHingeCosts, 
  cantileverLatchCosts,
  rollerPrice
} from '../data/costs.js';

/**
 * Calculate the hardware cost for a single gate
 * @param {Object} params - Gate parameters
 * @returns {number} - Total hardware cost for a single gate
 */
export const calculateSingleGateHardwareCost = (params = {}) => {
  const {
    gate = {},
    material = 'Galvanized',
    singleGatePostDiameter = '2 7/8',
    gatePipeDiameter = '1 3/8'
  } = params;
  
  // Determine coating type for hardware
  const coating = material.toLowerCase().includes('black') ? 'Black' : 'Galvanized';
  
  // Calculate hinge cost
  let hingeCost = 0;
  if (gate.hingeType === 'residential') {
    // Residential hinges use male and female components
    const maleHingeCost = maleGateHingeCosts[coating]?.[singleGatePostDiameter]?.price || 0;
    const femaleHingeCost = femaleGateHingeCosts[coating]?.[gatePipeDiameter]?.price || 0;
    hingeCost = (maleHingeCost + femaleHingeCost) * 2; // Two sets of hinges per gate
  } else if (gate.hingeType === 'industrial') {
    // Industrial hinges are a single component
    hingeCost = (industrialHingeCosts[coating]?.[singleGatePostDiameter]?.price || 0) * 2;
  } else if (gate.hingeType === 'bulldog') {
    // Bulldog hinges are a specific type
    hingeCost = (bulldogHingeCosts[coating]?.price || 0) * 2;
  }
  
  // Calculate latch cost
  let latchCost = 0;
  if (gate.latchType === 'fork') {
    latchCost = 15; // Standard fork latch
  } else if (gate.latchType === 'cantilever') {
    latchCost = cantileverLatchCosts[coating]?.price || 25;
  } else {
    latchCost = 20; // Default latch cost
  }
  
  // Add additional hardware costs (nuts, bolts, etc.)
  const additionalHardwareCost = 10;
  
  // Return total hardware cost
  return hingeCost + latchCost + additionalHardwareCost;
};

/**
 * Calculate the hardware cost for a double gate
 * @param {Object} params - Gate parameters
 * @returns {number} - Total hardware cost for a double gate
 */
export const calculateDoubleGateHardwareCost = (params = {}) => {
  const {
    gate = {},
    material = 'Galvanized',
    doubleGatePostDiameter = '4',
    gatePipeDiameter = '1 3/8'
  } = params;
  
  // Determine coating type for hardware
  const coating = material.toLowerCase().includes('black') ? 'Black' : 'Galvanized';
  
  // Calculate hinge cost (double gates use 4 hinges)
  let hingeCost = 0;
  if (gate.hingeType === 'residential') {
    // Residential hinges use male and female components
    const maleHingeCost = maleGateHingeCosts[coating]?.[doubleGatePostDiameter]?.price || 0;
    const femaleHingeCost = femaleGateHingeCosts[coating]?.[gatePipeDiameter]?.price || 0;
    hingeCost = (maleHingeCost + femaleHingeCost) * 4; // Four sets of hinges for double gate
  } else if (gate.hingeType === 'industrial') {
    // Industrial hinges are a single component
    hingeCost = (industrialHingeCosts[coating]?.[doubleGatePostDiameter]?.price || 0) * 4;
  } else if (gate.hingeType === 'bulldog') {
    // Bulldog hinges are a specific type
    hingeCost = (bulldogHingeCosts[coating]?.price || 0) * 4;
  }
  
  // Calculate latch cost - double gates typically use drop rods
  let latchCost = 0;
  if (gate.latchType === 'drop rod') {
    latchCost = 35; // Standard drop rod
  } else if (gate.latchType === 'cantilever') {
    latchCost = cantileverLatchCosts[coating]?.price || 25;
  } else {
    latchCost = 30; // Default latch cost for double gates
  }
  
  // Add additional hardware costs (nuts, bolts, center stop, etc.)
  const additionalHardwareCost = 25;
  
  // Return total hardware cost
  return hingeCost + latchCost + additionalHardwareCost;
};

/**
 * Calculate the hardware cost for a sliding gate
 * @param {Object} params - Gate parameters
 * @returns {number} - Total hardware cost for a sliding gate
 */
export const calculateSlidingGateHardwareCost = (params = {}) => {
  const {
    gate = {},
    material = 'Galvanized',
    slidingGatePostDiameter = '4'
  } = params;
  
  // Determine coating type for hardware
  const coating = material.toLowerCase().includes('black') ? 'Black' : 'Galvanized';
  
  // Calculate roller cost (sliding gates typically use 4 rollers)
  const rollerCost = (rollerPrice?.price || 25) * 4;
  
  // Calculate track cost based on gate width
  const gateWidth = parseInt(gate.width || 10);
  const trackCostPerFoot = 15;
  const trackCost = gateWidth * trackCostPerFoot;
  
  // Calculate latch cost
  let latchCost = 0;
  if (gate.latchType === 'cantilever') {
    latchCost = cantileverLatchCosts[coating]?.price || 40;
  } else {
    latchCost = 35; // Default latch cost for sliding gates
  }
  
  // Add additional hardware costs (guide wheels, stops, etc.)
  const additionalHardwareCost = 50;
  
  // Return total hardware cost
  return rollerCost + trackCost + latchCost + additionalHardwareCost;
};
