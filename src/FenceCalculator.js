import React, { useState, useEffect, useCallback } from 'react';
import {
  postCosts as defaultPostCosts,
  meshCosts,
  domeCapCosts,
  fenceTiesCosts,
  hogRingsCosts,
  wedgeAnchorCosts,
  eyeTopsCosts,
  hingePrices,
  rollerPrice
} from './data/costs';
import OutsideLabor from './components/OutsideLabor';
import TotalCostBreakdown from './components/TotalCostBreakdown';
import Proposal from './components/Proposal';
import { 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  AccordionActions,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useIsMobile = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  return isMobile;
};

const FenceCalculator = ({ customerData = {} }) => {
  const isMobile = useIsMobile();
  
  // General inputs
  const [heightOfFence, setHeightOfFence] = useState('');
  const [heightOfFenceInFeet, setHeightOfFenceInFeet] = useState('8');
  const [totalLinearLength, setTotalLinearLength] = useState('');
  const [numberOfEndTerminals, setNumberOfEndTerminals] = useState('');
  const [numberOfSolitaryPosts, setNumberOfSolitaryPosts] = useState('');
  const [numberOfCorners, setNumberOfCorners] = useState('');
  const [numberOfSingleGates, setNumberOfSingleGates] = useState(0);
  const [numberOfDoubleGates, setNumberOfDoubleGates] = useState(0);
  const [numberOfSlidingGates, setNumberOfSlidingGates] = useState(0);
  const [numberOfFlangedPosts, setNumberOfFlangedPosts] = useState(0);
  const [numberOfFlangedPostsOffCentered, setNumberOfFlangedPostsOffCentered] = useState(0);
  const [extraRail, setExtraRail] = useState('none');
  const [hasHBrace, setHasHBrace] = useState(false);
  const [material, setMaterial] = useState("Galvanized");
  const [postThickness, setPostThickness] = useState("SCH 40");
  const [duckbillPostThickness, setDuckbillPostThickness] = useState("SCH 40");
  const [hasDuckbillGateStop, setHasDuckbillGateStop] = useState(false);
  const [depthOfHoles, setDepthOfHoles] = useState(36);
  const [widthOfHoles, setWidthOfHoles] = useState(8);
  const [linePostHoleDepth, setLinePostHoleDepth] = useState(36);
  const [linePostHoleWidth, setLinePostHoleWidth] = useState(12);
  const [doubleGateHoleDepth, setDoubleGateHoleDepth] = useState('');
  const [doubleGateHoleWidth, setDoubleGateHoleWidth] = useState(12);
  const [slidingGateHoleDepth, setSlidingGateHoleDepth] = useState('');
  const [slidingGateHoleWidth, setSlidingGateHoleWidth] = useState(12);
  const [singleGatePostHoleDepth, setSingleGatePostHoleDepth] = useState('');
  const [singleGatePostHoleWidth, setSingleGatePostHoleWidth] = useState('');
  const [typeOfConcrete, setTypeOfConcrete] = useState("");
  const [commercialOrResidential, setCommercialOrResidential] = useState("Commercial");
  const [threeStrandBarbedWire, setThreeStrandBarbedWire] = useState(false);
  const [numberOfPulls, setNumberOfPulls] = useState('');

  // Post dimensions
  const [terminalPostDiameter, setTerminalPostDiameter] = useState("2 7/8");
  const [terminalPostThickness, setTerminalPostThickness] = useState("SCH 40");
  const [cornerPostDiameter, setCornerPostDiameter] = useState("2 7/8");
  const [cornerPostThickness, setCornerPostThickness] = useState("SCH 40");
  const [linePostDiameter, setLinePostDiameter] = useState("1 7/8");
  const [linePostThickness, setLinePostThickness] = useState("SCH 40");
  const [singleGatePostDiameter, setSingleGatePostDiameter] = useState("2 7/8");
  const [singleGatePostThickness, setSingleGatePostThickness] = useState("SCH 40");
  const [doubleGatePostDiameter, setDoubleGatePostDiameter] = useState("4");
  const [doubleGatePostThickness, setDoubleGatePostThickness] = useState("SCH 40");
  const [slidingGatePostDiameter, setSlidingGatePostDiameter] = useState("4");
  const [slidingGatePostThickness, setSlidingGatePostThickness] = useState("SCH 40");
  const [topRailDiameter, setTopRailDiameter] = useState("1 5/8");
  const [topRailThickness, setTopRailThickness] = useState("SCH 40"); // updated default value
  const [gatePipeDiameter, setGatePipeDiameter] = useState("1 3/8");
  const [flangedPostDiameter, setFlangedPostDiameter] = useState('2 7/8');
  const [flangedPostThickness, setFlangedPostThickness] = useState('SCH 40');
  const [flangedPostHoleDepth, setFlangedPostHoleDepth] = useState(36);
  const [flangedPostHoleWidth, setFlangedPostHoleWidth] = useState(8);
  const [flangedPostOffCenteredDiameter, setFlangedPostOffCenteredDiameter] = useState('2 7/8');
  const [flangedPostOffCenteredThickness, setFlangedPostOffCenteredThickness] = useState('SCH 40');
  const [flangedPostOffCenteredHoleDepth, setFlangedPostOffCenteredHoleDepth] = useState(36);
  const [flangedPostOffCenteredHoleWidth, setFlangedPostOffCenteredHoleWidth] = useState(8);

  const [outsideLaborTotal, setOutsideLaborTotal] = useState(0);
  const [maxPriceFromBreakdown, setMaxPriceFromBreakdown] = useState(0);
  const [pullLengths, setPullLengths] = useState([]);
  const [postSpacing, setPostSpacing] = useState(10);
  const [costs, setCosts] = useState({});
  const [meshType, setMeshType] = useState('9G');
  const [meshFold, setMeshFold] = useState('kk');
  const [hasFenceSlats, setHasFenceSlats] = useState('No');
  const [hasTrussRods, setHasTrussRods] = useState("No");
  const [needsTearOut, setNeedsTearOut] = useState(false);
  const [tearOutFootage, setTearOutFootage] = useState(0);
  const [needsLineClearing, setNeedsLineClearing] = useState(false);
  const [lineClearingFootage, setLineClearingFootage] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState('');
  const [fenceSlatsColor, setFenceSlatsColor] = useState("Black");
  const [singleGates, setSingleGates] = useState([]);
  const [doubleGates, setDoubleGates] = useState([]);
  const [slidingGates, setSlidingGates] = useState([]);

  // Gate details
  const [singleGateSize, setSingleGateSize] = useState('4');
  const [singleGateHingeType, setSingleGateHingeType] = useState('residential');
  const [singleGateLatchType, setSingleGateLatchType] = useState('fork');
  const [doubleGateSize, setDoubleGateSize] = useState('6');
  const [doubleGateHingeType, setDoubleGateHingeType] = useState('residential');
  const [doubleGateLatchType, setDoubleGateLatchType] = useState('fork');
  const [slidingGateSize, setSlidingGateSize] = useState('6');

  // Mesh costs
  const meshTypeOptions = meshCosts;

  // Dome cap costs
  const domeCapOptions = domeCapCosts;
  
  // Handle max price calculation from TotalCostBreakdown
  const handleMaxPriceCalculated = useCallback((price) => {
    setMaxPriceFromBreakdown(price);
  }, []);

  // Wedge anchor costs
  const wedgeAnchorOptions = wedgeAnchorCosts;

  // Eye tops / loop caps costs
  const eyeTopsOptions = eyeTopsCosts;

  // Fence ties costs
  const fenceTiesOptions = fenceTiesCosts;

  // Hog rings costs
  const hogRingsOptions = hogRingsCosts;

  // Rail clamps costs
  const railClampsCosts = {
    "Black": {
      "1 5/8": { "1 3/8": 4.93, "1 5/8": 6.90 },
      "1 7/8": { "1 3/8": 6.45, "1 5/8": 6.84 },
      "2 3/8": { "1 3/8": null, "1 5/8": 7.50 },
      "2 7/8": { "1 3/8": null, "1 5/8": 8.98 },
      "4": { "1 3/8": null, "1 5/8": 10.76 }
    },
    "Galvanized": {
      "1 5/8": { "1 3/8": 3.86, "1 5/8": 3.33 },
      "1 7/8": { "1 3/8": 3.35, "1 5/8": 3.43 },
      "2 3/8": { "1 3/8": null, "1 5/8": 4.78 },
      "2 7/8": { "1 3/8": null, "1 5/8": 6.00 },
      "4": { "1 3/8": null, "1 5/8": 7.02 }
    }
  };

  // Barb arms costs
  const barbArmsCosts = {
    "Black": {
      "1 5/8": { "1 3/8": null, "1 5/8": 10.52 },
      "1 7/8": { "1 3/8": null, "1 5/8": 10.40 },
      "2 3/8": { "1 3/8": null, "1 5/8": 11.07 },
      "2 7/8": { "1 3/8": null, "1 5/8": 20.76 },
      "4": { "1 3/8": null, "1 5/8": 33.65 }
    },
    "Galvanized": {
      "1 5/8": { "1 3/8": null, "1 5/8": 6.99 },
      "1 7/8": { "1 3/8": null, "1 5/8": 5.93 },
      "2 3/8": { "1 3/8": null, "1 5/8": 5.96 },
      "2 7/8": { "1 3/8": null, "1 5/8": 13.96 },
      "4": { "1 3/8": null, "1 5/8": 17.48 }
    }
  };

  // Tension bands costs
  const tensionBandsCosts = {
    "Black": {
      "2 3/8": 0.94,
      "2 7/8": 1.18,
      "4": 1.61
    },
    "Galvanized": {
      "2 3/8": 0.86,
      "2 7/8": 0.98,
      "4": 1.08
    }
  };

  // Tension bars costs
  const tensionBarsCosts = {
    "Black": {
      "4": 4.41,
      "5": 5.45,
      "6": 9.41,
      "7": 15.35,
      "8": 17.58
    },
    "Galvanized": {
      "4": 4.31,
      "5": 3.47,
      "6": 5.70,
      "7": 8.51,
      "8": 9.00
    }
  };

  // Brace bands costs
  const braceBandsCosts = {
    "Black": {
      "1 5/8": 1.67,
      "1 7/8": 1.82,
      "2 3/8": 0.86,
      "2 7/8": 1.47,
      "4": 2.39
    },
    "Galvanized": {
      "1 5/8": 0.69,
      "1 7/8": 1.10,
      "2 3/8": 0.74,
      "2 7/8": 0.84,
      "4": 1.27
    }
  };

  // Barbed wire unit cost
  const BARBED_WIRE_UNIT_COST = 60.06;

  // Fence slats costs per 10 linear feet
  const slatCosts = {
    "4": 59.83,
    "5": 71.15,
    "6": 92.17,
    "7": 73.00,
    "8": 124.51,
    "10": 200.00
  };

  // Nuts and bolts costs (per 100pc)
  const nutsAndBoltsCosts = {
    "Black": 12.74,
    "Galvanized": 7.84
  };

  // Concrete costs
  const CONCRETE_COSTS = {
    "Red": 7.41,    // per bag
    "Yellow": 4.88, // per bag
    "Truck": 170    // per cubic yard
  };

  // Initialize or update pull lengths when number of pulls changes
  useEffect(() => {
    if (numberOfPulls > pullLengths.length) {
      // Add new pulls
      setPullLengths([...pullLengths, ...Array(numberOfPulls - pullLengths.length).fill('')]);
    } else if (numberOfPulls < pullLengths.length) {
      // Remove excess pulls
      setPullLengths(pullLengths.slice(0, numberOfPulls));
    }
  }, [numberOfPulls]);

  // Function to update a specific pull length
  const updatePullLength = (index, value) => {
    const newPullLengths = [...pullLengths];
    newPullLengths[index] = value;
    setPullLengths(newPullLengths);
  };

  // Calculate line posts needed
  const calculateLinePostsNeeded = () => {
    return pullLengths.reduce((total, length) => {
      if (!length) return total;
      return total + Math.ceil(parseFloat(length) / postSpacing);
    }, 0) - numberOfPulls;
  };

  // Use useCallback to memoize the calculateCosts function
  const calculateCosts = useCallback(() => {
    const newCosts = {};
    
    // Terminal post depth adjustment
    const terminalDepthAdjustment = commercialOrResidential === "Commercial" 
      ? (depthOfHoles === 24 || depthOfHoles === 30 ? 2 : 
        depthOfHoles === 36 || depthOfHoles === 42 ? 3 : 
        depthOfHoles === 48 ? 4 : 0)
      : (depthOfHoles === 24 || depthOfHoles === 30 ? 2 : 
        depthOfHoles === 36 || depthOfHoles === 42 ? 3 : 0);
        
    // Line post depth adjustment
    const lineDepthAdjustment = commercialOrResidential === "Commercial" 
      ? (linePostHoleDepth === 24 || linePostHoleDepth === 30 ? 2 : 
        linePostHoleDepth === 36 || linePostHoleDepth === 42 ? 3 : 
        linePostHoleDepth === 48 ? 4 : 0)
      : (depthOfHoles === 24 || depthOfHoles === 30 ? 2 : 
        depthOfHoles === 36 || depthOfHoles === 42 ? 3 : 0);

    // Add 1 for barbed wire
    const barbedWireAdjustment = threeStrandBarbedWire ? 1 : 0;

    // Calculate total number of terminal posts
    const totalTerminalPosts = parseInt(numberOfEndTerminals || 0) + parseInt(numberOfSolitaryPosts || 0);

    // Get the appropriate cost based on material, thickness, and diameter
    const getUnitCost = (diameter, isHighZinc = false) => {
      if (isHighZinc && material === "Galvanized" && defaultPostCosts[material]["High zinc"] && defaultPostCosts[material]["High zinc"][diameter]) {
        return defaultPostCosts[material]["High zinc"][diameter];
      }
      
      if (defaultPostCosts[material] && defaultPostCosts[material][postThickness] && defaultPostCosts[material][postThickness][diameter]) {
        return defaultPostCosts[material][postThickness][diameter];
      }
      
      return 0;
    };

    // Terminal posts
    if (totalTerminalPosts > 0) {
      const unitCost = getUnitCost(terminalPostDiameter);
      const postHeight = parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment;
      const subtotal = totalTerminalPosts * unitCost * postHeight;
      
      newCosts["Terminal posts"] = {
        quantity: totalTerminalPosts,
        unitCost: unitCost,
        postHeight: postHeight,
        subtotal: subtotal
      };
    }

    // Corner posts
    if (numberOfCorners > 0) {
      const unitCost = getUnitCost(cornerPostDiameter);
      const postHeight = parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment;
      const subtotal = numberOfCorners * unitCost * postHeight;
      
      newCosts["Corner posts"] = {
        quantity: numberOfCorners,
        unitCost: unitCost,
        postHeight: postHeight,
        subtotal: subtotal
      };
    }

    // Single gate posts
    if (numberOfSingleGates > 0) {
      const singleGatePostsQty = numberOfSingleGates * 2;
      const unitCost = getUnitCost("2 7/8", true);
      
      // Special height logic for single gate posts
      let singleGatePostHeight = parseInt(heightOfFence);
      
      // Apply depth adjustment
      singleGatePostHeight += terminalDepthAdjustment;
      
      // Add barbed wire adjustment if applicable
      if (threeStrandBarbedWire) {
        singleGatePostHeight += barbedWireAdjustment;
      }
      
      const subtotal = singleGatePostsQty * unitCost * singleGatePostHeight;

      newCosts["Single gate posts"] = {
        quantity: singleGatePostsQty,
        unitCost: unitCost,
        postHeight: singleGatePostHeight,
        subtotal: subtotal
      };
    }

    // Double gate posts
    if (numberOfDoubleGates > 0) {
      const doubleGatePostsQty = numberOfDoubleGates * 2;
      const unitCost = getUnitCost("4", true);
      
      // Special height logic for double gate posts
      let doubleGatePostHeight = parseInt(heightOfFence);
      
      // If double gate hole depth is specified, use that for adjustment
      if (doubleGateHoleDepth) {
        const doubleGateDepthAdjustment = commercialOrResidential === "Commercial" 
          ? (doubleGateHoleDepth === 24 || doubleGateHoleDepth === 30 ? 2 : 
            doubleGateHoleDepth === 36 || doubleGateHoleDepth === 42 ? 3 : 
            doubleGateHoleDepth === 48 ? 4 : 0)
          : (doubleGateHoleDepth === 24 || doubleGateHoleDepth === 30 ? 2 : 
            doubleGateHoleDepth === 36 || doubleGateHoleDepth === 42 ? 3 : 0);
        
        doubleGatePostHeight += doubleGateDepthAdjustment;
      } else {
        // Otherwise use the regular depth adjustment
        doubleGatePostHeight += terminalDepthAdjustment;
      }
      
      // Add barbed wire adjustment if applicable
      if (threeStrandBarbedWire) {
        doubleGatePostHeight += barbedWireAdjustment;
      }
      
      const subtotal = doubleGatePostsQty * unitCost * doubleGatePostHeight;

      newCosts["Double gate posts"] = {
        quantity: doubleGatePostsQty,
        unitCost: unitCost,
        postHeight: doubleGatePostHeight,
        subtotal: subtotal
      };
    }

    // Sliding gate posts
    if (numberOfSlidingGates > 0) {
      const slidingGatePostsQty = numberOfSlidingGates * 2;
      const unitCost = getUnitCost(slidingGatePostDiameter, true);
      
      // Special height logic for sliding gate posts
      let slidingGatePostHeight = parseInt(heightOfFence);
      
      // If sliding gate hole depth is specified, use that for adjustment
      if (slidingGateHoleDepth) {
        const slidingGateDepthAdjustment = commercialOrResidential === "Commercial" 
          ? (slidingGateHoleDepth === 24 || slidingGateHoleDepth === 30 ? 2 : 
            slidingGateHoleDepth === 36 || slidingGateHoleDepth === 42 ? 3 : 
            slidingGateHoleDepth === 48 ? 4 : 0)
          : (slidingGateHoleDepth === 24 || slidingGateHoleDepth === 30 ? 2 : 
            slidingGateHoleDepth === 36 || slidingGateHoleDepth === 42 ? 3 : 0);
        
        slidingGatePostHeight += slidingGateDepthAdjustment;
      } else {
        // Otherwise use the regular depth adjustment
        slidingGatePostHeight += terminalDepthAdjustment;
      }
      
      // Add barbed wire adjustment if applicable
      if (threeStrandBarbedWire) {
        slidingGatePostHeight += barbedWireAdjustment;
      }
      
      const subtotal = slidingGatePostsQty * unitCost * slidingGatePostHeight;

      newCosts["Sliding gate posts"] = {
        quantity: slidingGatePostsQty,
        unitCost: unitCost,
        postHeight: slidingGatePostHeight,
        subtotal: subtotal
      };
    }

    // Duckbill gate stop posts for double gates
    if (hasDuckbillGateStop && numberOfDoubleGates > 0) {
      const duckbillPostsQty = numberOfDoubleGates * 2;
      
      // Get cost for 1 5/8" diameter with specified thickness
      const getDuckbillCost = () => {
        if (defaultPostCosts[material] && defaultPostCosts[material][duckbillPostThickness] && defaultPostCosts[material][duckbillPostThickness]["1 5/8"]) {
          return defaultPostCosts[material][duckbillPostThickness]["1 5/8"];
        }
        return 0;
      };
      
      const unitCost = getDuckbillCost();
      // Duckbill posts are always 3 ft tall
      const postHeight = 3;
      const subtotal = duckbillPostsQty * unitCost * postHeight;

      newCosts["Duckbill gate stop posts"] = {
        quantity: duckbillPostsQty,
        unitCost: unitCost,
        postHeight: postHeight,
        subtotal: subtotal
      };
    }

    // Dome Cap Terminal Post calculation
    if (numberOfEndTerminals > 0) {
      // Get unit cost based on material and terminal post diameter
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter];
        }
        return 0;
      };

      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = numberOfEndTerminals * domeCapUnitCost;

      newCosts["Dome Cap Terminal Post"] = {
        quantity: numberOfEndTerminals,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Dome Cap Corner Post calculation
    if (numberOfCorners > 0) {
      // Get unit cost based on material and corner post diameter
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][cornerPostDiameter]) {
          return domeCapOptions[material][cornerPostDiameter];
        }
        return 0;
      };

      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = numberOfCorners * domeCapUnitCost;

      newCosts["Dome Cap Corner Post"] = {
        quantity: numberOfCorners,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Dome Cap Single Gate Post calculation
    if (numberOfSingleGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for single gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter];
        }
        return 0;
      };

      // Each single gate needs 2 posts
      const singleGatePostQuantity = numberOfSingleGates * 2;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = singleGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Single Gate Post"] = {
        quantity: singleGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Dome Cap Sliding Gate Post calculation
    if (numberOfSlidingGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for sliding gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter];
        }
        return 0;
      };

      // Each sliding gate needs 2 posts
      const slidingGatePostQuantity = numberOfSlidingGates * 2;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = slidingGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Sliding Gate Post"] = {
        quantity: slidingGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Dome Cap Double Gate Post calculation
    if (numberOfDoubleGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for double gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter];
        }
        return 0;
      };

      const doubleGatePostQuantity = numberOfDoubleGates * 2;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = doubleGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Double Gate Post"] = {
        quantity: doubleGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Dome Cap Duckbill Gate Stop Post calculation
    if (hasDuckbillGateStop === true && numberOfDoubleGates > 0) {
      const getDomeCapUnitCost = () => {
        const duckbillDiameter = duckbillPostThickness === "1 5/8 SCH 40" ? "1 5/8" : "2 3/8";
        if (domeCapOptions[material] && domeCapOptions[material][duckbillDiameter]) {
          return domeCapOptions[material][duckbillDiameter];
        }
        return 0;
      };

      const duckbillPostQuantity = numberOfDoubleGates;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = duckbillPostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Duckbill Gate Stop Post"] = {
        quantity: duckbillPostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal
      };
    }

    // Eye Tops / Loop Caps calculation
    if (threeStrandBarbedWire) {
      const linePostsNeeded = calculateLinePostsNeeded();
      
      // Get unit cost based on material, line post diameter, and top rail diameter
      const getEyeTopUnitCost = () => {
        if (eyeTopsOptions[material] && 
            eyeTopsOptions[material][linePostDiameter] && 
            eyeTopsOptions[material][linePostDiameter][topRailDiameter]) {
          return eyeTopsOptions[material][linePostDiameter][topRailDiameter];
        }
        return 0;
      };

      const eyeTopUnitCost = getEyeTopUnitCost();
      const eyeTopSubtotal = linePostsNeeded * eyeTopUnitCost;

      newCosts["Eye Tops / Loop Caps"] = {
        quantity: linePostsNeeded,
        unitCost: eyeTopUnitCost,
        standardLength: null,
        subtotal: eyeTopSubtotal
      };
    }

    // Calculate line posts needed once at the start
    const linePostsNeeded = calculateLinePostsNeeded();

    // Rail Clamps calculation
    if (linePostsNeeded > 0) {
      // Calculate quantity based on extra rail selection
      let railClampMultiplier = 0;
      switch (extraRail) {
        case "both":
          railClampMultiplier = 2;
          break;
        case "top":
        case "bottom":
          railClampMultiplier = 1;
          break;
      }

      const railClampQuantity = Math.ceil(railClampMultiplier * linePostsNeeded);
      let railClampUnitCost = 0;
      
      if (railClampsCosts[material]?.[linePostDiameter]?.[topRailDiameter]) {
        railClampUnitCost = railClampsCosts[material][linePostDiameter][topRailDiameter];
      }

      const railClampSubtotal = railClampQuantity * railClampUnitCost;

      newCosts["Rail Clamps"] = {
        quantity: railClampQuantity,
        unitCost: railClampUnitCost,
        standardLength: null,
        subtotal: railClampSubtotal
      };
    }

    // Barb Arms calculation
    if (threeStrandBarbedWire && linePostsNeeded > 0) {
      // Get unit cost based on material, line post diameter, and top rail diameter
      let barbArmUnitCost = 0;
      if (barbArmsCosts[material]?.[linePostDiameter]?.[topRailDiameter]) {
        barbArmUnitCost = barbArmsCosts[material][linePostDiameter][topRailDiameter];
      }

      const barbArmQuantity = Math.ceil(linePostsNeeded);
      const barbArmSubtotal = barbArmQuantity * barbArmUnitCost;

      newCosts["Barb Arms"] = {
        quantity: barbArmQuantity,
        unitCost: barbArmUnitCost,
        standardLength: null,
        subtotal: barbArmSubtotal
      };
    }

    // Barbed Wire calculation
    if (threeStrandBarbedWire && totalLinearLength > 0) {
      // Calculate quantity: total linear length * 3 strands / 1320 feet per roll
      const barbedWireQuantity = Math.ceil((parseFloat(totalLinearLength) * 3) / 1320);
      const barbedWireSubtotal = barbedWireQuantity * BARBED_WIRE_UNIT_COST;

      newCosts["Barbed Wire"] = {
        quantity: barbedWireQuantity,
        unitCost: BARBED_WIRE_UNIT_COST,
        standardLength: 1320,
        subtotal: barbedWireSubtotal
      };
    }

    // Sliding Gate Post calculation
    if (numberOfSlidingGates > 0) {
      const slidingGatePostQuantity = numberOfSlidingGates * 3;
      let unitCost = 0;
      
      if (defaultPostCosts[material]?.[postThickness]?.[slidingGatePostDiameter]) {
        unitCost = defaultPostCosts[material][postThickness][slidingGatePostDiameter];
      }

      // Calculate height adjustments
      let totalPostHeight = parseFloat(heightOfFence);
      
      // Add depth adjustment
      if (commercialOrResidential === "Commercial") {
        if (slidingGateHoleDepth === 36 || slidingGateHoleDepth === 42) {
          totalPostHeight += 3;
        }
      } else {
        if (depthOfHoles === 36 || depthOfHoles === 42) {
          totalPostHeight += 3;
        }
      }

      // Add height adjustment based on fence height
      if (totalPostHeight === 48) {
        totalPostHeight += 4;
      } else if (totalPostHeight === 36 || totalPostHeight === 42) {
        totalPostHeight += 3;
      } else if (totalPostHeight === 24 || totalPostHeight === 30) {
        totalPostHeight += 2;
      }

      const subtotal = slidingGatePostQuantity * unitCost * totalPostHeight;

      newCosts["Sliding Gate Posts"] = {
        quantity: slidingGatePostQuantity,
        unitCost: unitCost,
        postHeight: totalPostHeight,
        subtotal: subtotal
      };
    }

    // Tension Bands (Terminal Post) calculation
    if (numberOfEndTerminals > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * terminal post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfEndTerminals;

      // Get unit cost based on material and terminal post diameter
      let tensionBandUnitCost = 0;
      if (tensionBandsCosts[material]?.[terminalPostDiameter]) {
        tensionBandUnitCost = tensionBandsCosts[material][terminalPostDiameter];
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Terminal Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal
      };
    }

    // Tension Bands (Corner Post) calculation
    if (numberOfCorners > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * corner post quantity * 2
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfCorners * 2;

      // Get unit cost based on material and corner post diameter
      let tensionBandUnitCost = 0;
      if (tensionBandsCosts[material]?.[cornerPostDiameter]) {
        tensionBandUnitCost = tensionBandsCosts[material][cornerPostDiameter];
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Corner Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal
      };
    }

    // Tension Bands (Single Gate Post) calculation
    if (numberOfSingleGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * single gate post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfSingleGates;

      // Get unit cost based on material and single gate post diameter
      let tensionBandUnitCost = 0;
      if (tensionBandsCosts[material]?.["2 7/8"]) {
        tensionBandUnitCost = tensionBandsCosts[material]["2 7/8"];
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Single Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal
      };
    }

    // Tension Bands (Double Gate Post) calculation
    if (numberOfDoubleGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * double gate post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfDoubleGates;

      // Get unit cost based on material and double gate post diameter
      let tensionBandUnitCost = 0;
      if (tensionBandsCosts[material]?.["4"]) {
        tensionBandUnitCost = tensionBandsCosts[material]["4"];
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Double Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal
      };
    }

    // Tension Bands (Sliding Gate Post) calculation
    if (numberOfSlidingGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * sliding gate post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfSlidingGates;

      // Get unit cost based on material and sliding gate post diameter
      let tensionBandUnitCost = 0;
      if (tensionBandsCosts[material]?.[slidingGatePostDiameter]) {
        tensionBandUnitCost = tensionBandsCosts[material][slidingGatePostDiameter];
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Sliding Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal
      };
    }

    // Brace Bands calculation for terminal posts
    if (numberOfEndTerminals > 0 && hasHBrace) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfEndTerminals * braceBandsPerPost;
      
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.[terminalPostDiameter]) {
        braceBandUnitCost = braceBandsCosts[material][terminalPostDiameter];
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Terminal Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands calculation for corner posts
    if (numberOfCorners > 0 && hasHBrace) {
      const braceBandsPerPost = 4;
      const braceBandsQuantity = numberOfCorners * braceBandsPerPost;
      
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.[cornerPostDiameter]) {
        braceBandUnitCost = braceBandsCosts[material][cornerPostDiameter];
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Corner Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands calculation for single gate posts
    if (numberOfSingleGates > 0 && hasHBrace) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfSingleGates * 2 * braceBandsPerPost; // 2 posts per gate
      
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.["2 7/8"]) {
        braceBandUnitCost = braceBandsCosts[material]["2 7/8"];
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Single Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands calculation for double gate posts
    if (numberOfDoubleGates > 0 && hasHBrace) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfDoubleGates * 2 * braceBandsPerPost; // 2 posts per gate
      
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.["4"]) {
        braceBandUnitCost = braceBandsCosts[material]["4"];
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Double Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands calculation for sliding gate posts
    if (numberOfSlidingGates > 0 && hasHBrace) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfSlidingGates * 3 * braceBandsPerPost; // 3 posts per sliding gate
      
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.[slidingGatePostDiameter]) {
        braceBandUnitCost = braceBandsCosts[material][slidingGatePostDiameter];
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Sliding Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Tension Bars calculation
    if (numberOfPulls > 0) {
      // Calculate quantity: number of pulls * 2 + 1
      const tensionBarQuantity = numberOfPulls * 2 + 1;

      // Get unit cost based on material and fence height in feet
      const tensionBarUnitCost = tensionBarsCosts[material]?.[heightOfFenceInFeet] || 0;
      const tensionBarSubtotal = tensionBarQuantity * tensionBarUnitCost;

      newCosts["Tension Bars"] = {
        quantity: tensionBarQuantity,
        unitCost: tensionBarUnitCost,
        standardLength: null,
        subtotal: tensionBarSubtotal
      };
    }

    // Rail Ends calculation
    let railEndsQuantity = 0;

    // Add quantity from pulls
    if (numberOfPulls > 0) {
      railEndsQuantity += numberOfPulls * 2 + 1;
    }

    // Add quantity for H braces
    if (hasHBrace) {
      railEndsQuantity += (numberOfEndTerminals + numberOfSingleGates) * 2 + numberOfCorners * 4;
    }

    if (railEndsQuantity > 0) {
      // Get unit cost based on material and top rail diameter
      let railEndUnitCost = 0;
      const costs = {
        "Black": { "1 3/8": 2.12, "1 5/8": 1.53 },
        "Galvanized": { "1 3/8": 2.33, "1 5/8": 1.49 }
      };

      if (costs[material]?.[topRailDiameter]) {
        railEndUnitCost = costs[material][topRailDiameter];
      }

      const railEndSubtotal = railEndsQuantity * railEndUnitCost;

      newCosts["Rail Ends"] = {
        quantity: railEndsQuantity,
        unitCost: railEndUnitCost,
        standardLength: null,
        subtotal: railEndSubtotal
      };
    }

    // Nuts and Bolts calculation
    let totalTensionBands = 0;
    let totalBraceBands = 0;

    // Sum up all tension bands quantities
    if (newCosts["Tension Bands (Terminal Post)"]) {
      totalTensionBands += newCosts["Tension Bands (Terminal Post)"].quantity;
    }
    if (newCosts["Tension Bands (Corner Post)"]) {
      totalTensionBands += newCosts["Tension Bands (Corner Post)"].quantity;
    }
    if (newCosts["Tension Bands (Single Gate Post)"]) {
      totalTensionBands += newCosts["Tension Bands (Single Gate Post)"].quantity;
    }
    if (newCosts["Tension Bands (Double Gate Post)"]) {
      totalTensionBands += newCosts["Tension Bands (Double Gate Post)"].quantity;
    }
    if (newCosts["Tension Bands (Sliding Gate Post)"]) {
      totalTensionBands += newCosts["Tension Bands (Sliding Gate Post)"].quantity;
    }

    // Sum up all brace bands quantities
    if (newCosts["Brace Bands"]) {
      totalBraceBands += newCosts["Brace Bands"].quantity;
    }
    if (newCosts["Brace Bands (Single Gate Post)"]) {
      totalBraceBands += newCosts["Brace Bands (Single Gate Post)"].quantity;
    }
    if (newCosts["Brace Bands (Double Gate Post)"]) {
      totalBraceBands += newCosts["Brace Bands (Double Gate Post)"].quantity;
    }
    if (newCosts["Brace Bands (Sliding Gate Post)"]) {
      totalBraceBands += newCosts["Brace Bands (Sliding Gate Post)"].quantity;
    }

    // Calculate total quantity
    let totalBandsWithExtra = (totalTensionBands + totalBraceBands) * 1.05;

    // Add H brace quantity if enabled
    if (hasHBrace) {
      totalBandsWithExtra += (numberOfEndTerminals + numberOfSingleGates) * 2 + numberOfCorners * 4;
    }

    // Round up the final quantity after dividing by 100
    const nutsAndBoltsQuantity = Math.ceil(totalBandsWithExtra / 100);

    if (nutsAndBoltsQuantity > 0) {
      // Get unit cost based on material (price is per 100pc)
      const unitCost = nutsAndBoltsCosts[material] || 0;
      const nutsAndBoltsSubtotal = nutsAndBoltsQuantity * unitCost;

      newCosts["Nuts and Bolts"] = {
        quantity: nutsAndBoltsQuantity,
        unitCost: unitCost,
        standardLength: 100, // per 100pc
        subtotal: nutsAndBoltsSubtotal
      };
    }

    // Hog Rings calculation
    if (totalLinearLength) {
      const hogRingsQuantity = Math.ceil(parseFloat(totalLinearLength) * 0.8 / 125);
      const hogRingsUnitCost = material === "Black" 
        ? (commercialOrResidential === "Commercial" ? 5.53 : 11.72)
        : (commercialOrResidential === "Commercial" ? 3.76 : 3.53);
      
      newCosts["Hog Rings (1lb)"] = {
        quantity: hogRingsQuantity,
        unitCost: hogRingsUnitCost,
        standardLength: null,
        subtotal: hogRingsQuantity * hogRingsUnitCost
      };
    }

    // Chain Link Mesh calculation
    if (totalLinearLength > 0 && heightOfFence > 0) {
      const meshQuantity = Math.ceil(parseFloat(totalLinearLength) / 50);
      const meshUnitCost = meshTypeOptions[meshType] || 0;
      const meshSubtotal = parseFloat(heightOfFence) * 50 * meshQuantity * meshUnitCost;

      newCosts["Chain Link Mesh"] = {
        quantity: meshQuantity,
        unitCost: meshUnitCost,
        standardLength: 50,
        subtotal: meshSubtotal
      };
    }

    // Top/Middle/Bottom Rails
    if (totalLinearLength > 0) {
      // Determine rail multiplier based on extra rail selection
      let railMultiplier = 1; // Default for "none"
      if (extraRail === "both") {
        railMultiplier = 3;
      } else if (extraRail === "top" || extraRail === "bottom" || extraRail === "middle") {
        railMultiplier = 2;
      }

      // Calculate base number of rails needed
      let railsNeeded = (parseFloat(totalLinearLength) / 20) * 1.05 * railMultiplier;

      // Add rails for H braces if applicable
      if (hasHBrace) {
        railsNeeded += numberOfPulls * 2;
      }

      // Get unit cost for the rail based on diameter, material and thickness
      const getRailUnitCost = () => {
        if (defaultPostCosts[material]?.[postThickness]?.[topRailDiameter]) {
          return defaultPostCosts[material][postThickness][topRailDiameter];
        }
        return 0;
      };

      const unitCost = getRailUnitCost();
      // Standard length for rails is 21 feet
      const standardLength = 21;
      const railQuantity = Math.ceil(railsNeeded);
      const subtotal = railQuantity * unitCost * standardLength;
      
      newCosts["Top/Middle/Bottom Rails"] = {
        quantity: railQuantity,
        unitCost: unitCost,
        standardLength: standardLength,
        subtotal: subtotal
      };

      // Fence Sleeve calculation
      if (postThickness === "SCH 40") {
        // Get unit cost for the sleeve based on diameter and material
        const getSleeveUnitCost = () => {
          const sleeveCosts = {
            Black: {
              "1 3/8": 3.2,
              "1 5/8": 3.18
            },
            Galvanized: {
              "1 3/8": 2.25,
              "1 5/8": 2.47
            }
          };
          return sleeveCosts[material]?.[topRailDiameter] || 0;
        };

        const sleeveUnitCost = getSleeveUnitCost();
        // Formula is just unit cost x quantity
        const sleeveSubtotal = railQuantity * sleeveUnitCost;
        
        newCosts["Fence Sleeve"] = {
          quantity: railQuantity,
          unitCost: sleeveUnitCost,
          standardLength: null,
          subtotal: sleeveSubtotal
        };

        // Rail clamps calculation
        const getRailClampUnitCost = () => {
          if (railClampsCosts[material] && 
              railClampsCosts[material][linePostDiameter] && 
              railClampsCosts[material][linePostDiameter][topRailDiameter]) {
            return railClampsCosts[material][linePostDiameter][topRailDiameter];
          }
          return 0;
        };

        const railClampUnitCost = getRailClampUnitCost();
        const railClampSubtotal = railQuantity * railClampUnitCost;

        newCosts["Rail Clamps"] = {
          quantity: railQuantity,
          unitCost: railClampUnitCost,
          standardLength: null,
          subtotal: railClampSubtotal
        };
      }
    }

    // Fence Slats calculation
    if (hasFenceSlats === "Yes" && totalLinearLength > 0) {
      // Calculate quantity: (total linear length / 10) * 1.1, rounded up
      const slatQuantity = Math.ceil((parseFloat(totalLinearLength) / 10) * 1.1);
      
      // Get unit cost based on fence height
      const getUnitCost = () => {
        const height = Math.floor(parseFloat(heightOfFence)).toString();
        return slatCosts[height] || 0;
      };

      const slatUnitCost = getUnitCost();
      const slatSubtotal = slatQuantity * slatUnitCost;

      newCosts["Fence Slats"] = {
        quantity: slatQuantity,
        unitCost: slatUnitCost,
        standardLength: 10,
        subtotal: slatSubtotal
      };
    }

    // Slick Line calculation
    if (totalLinearLength > 0) {
      const slickLineQuantity = Math.ceil(
        (extraRail === "Bottom" || extraRail === "Both") 
        ? 0 
        : (totalLinearLength * 1.2) / 1320
      );
      
      const slickLineUnitCost = 112.7;
      const slickLineSubtotal = slickLineQuantity * slickLineUnitCost;

      newCosts["Slick Line"] = {
        quantity: slickLineQuantity,
        unitCost: slickLineUnitCost,
        standardLength: null,
        subtotal: slickLineSubtotal
      };
    }

    // Line posts
    if (linePostsNeeded > 0) {
      const unitCost = getUnitCost(linePostDiameter);
      const postHeight = parseInt(heightOfFence) + lineDepthAdjustment + barbedWireAdjustment;
      const subtotal = linePostsNeeded * unitCost * postHeight;

      newCosts["Line posts"] = {
        quantity: linePostsNeeded,
        unitCost: unitCost,
        postHeight: postHeight,
        subtotal: subtotal
      };
    }

    // Wedge Anchor calculation
    if (numberOfFlangedPosts > 0 || numberOfFlangedPostsOffCentered > 0) {
      // Calculate quantity: ROUNDUP((Flanged posts centered + Flanged posts off centered) * 4 / 25, 0)
      const wedgeAnchorQuantity = Math.ceil((parseInt(numberOfFlangedPosts || 0) + parseInt(numberOfFlangedPostsOffCentered || 0)) * 4 / 25);
      const wedgeAnchorUnitCost = wedgeAnchorOptions[material] || 0.94;
      const wedgeAnchorSubtotal = wedgeAnchorQuantity * wedgeAnchorUnitCost;

      newCosts["Wedge Anchors (1/2\" x 3 3/4\")"] = {
        quantity: wedgeAnchorQuantity,
        unitCost: wedgeAnchorUnitCost,
        standardLength: null,
        subtotal: wedgeAnchorSubtotal
      };
    }

    // Fence Ties calculation
    if (totalLinearLength) {
      // Calculate quantity: total linear length divided by 100
      const fenceTiesQuantity = Math.ceil(parseFloat(totalLinearLength) / 100);
      
      // Set unit cost based on material
      const fenceTiesUnitCost = fenceTiesOptions[material] || 0;
      
      const fenceTiesSubtotal = fenceTiesQuantity * fenceTiesUnitCost;

      newCosts["Fence Ties (100 pc)"] = {
        quantity: fenceTiesQuantity,
        unitCost: fenceTiesUnitCost,
        standardLength: null,
        subtotal: fenceTiesSubtotal
      };
    }

    // Truss Rods calculation
    if (hasTrussRods === "Yes" && numberOfPulls > 0) {
      const trussRodsQuantity = numberOfPulls * 2;
      const trussRodsUnitCost = 14.09;
      const trussRodsSubtotal = trussRodsQuantity * trussRodsUnitCost;

      newCosts["Truss Rods"] = {
        quantity: trussRodsQuantity,
        unitCost: trussRodsUnitCost,
        standardLength: null,
        subtotal: trussRodsSubtotal
      };
    }

    // Cantilever/sliding gate rollers calculation
    if (numberOfSlidingGates > 0) {
      const rollersQuantity = numberOfSlidingGates * 4;
      const rollersUnitCost = rollerPrice;
      const rollersSubtotal = rollersQuantity * rollersUnitCost;

      newCosts["Cantilever/Sliding Gate Rollers"] = {
        quantity: rollersQuantity,
        unitCost: rollersUnitCost,
        standardLength: null,
        subtotal: rollersSubtotal
      };
    }

    // Cantilever/sliding gate latch calculation
    if (numberOfSlidingGates > 0) {
      const latchQuantity = numberOfSlidingGates;
      const latchUnitCost = 22.68;
      const latchSubtotal = latchQuantity * latchUnitCost;

      newCosts["Cantilever/Sliding Gate Latch"] = {
        quantity: latchQuantity,
        unitCost: latchUnitCost,
        standardLength: null,
        subtotal: latchSubtotal
      };
    }

    // Gate hardware calculation
    const calculateGateHardwareCost = () => {
      let totalCost = 0;
      const coating = material.toLowerCase() === 'black' ? 'black' : 'galvanized';

      // Helper to get matching female size based on male size position
      const getMatchingFemaleSize = (maleSize) => {
        const maleSizes = Object.keys(hingePrices.residential.male[coating]).filter(size => 
          hingePrices.residential.male[coating][size] !== null
        );
        const femaleSizes = Object.keys(hingePrices.residential.female[coating]).filter(size => 
          hingePrices.residential.female[coating][size] !== null
        );
        const maleIndex = maleSizes.indexOf(maleSize);
        return femaleSizes[maleIndex] || femaleSizes[0]; // Fallback to first size if no match
      };

      // Single gates
      if (numberOfSingleGates > 0) {
        const hingePrice = singleGateHingeType === 'residential'
          ? (hingePrices.residential.male[coating][singleGatePostDiameter] + 
             hingePrices.residential.female[coating][getMatchingFemaleSize(singleGatePostDiameter)]) * 2 // 2 sets per gate
          : hingePrices[singleGateHingeType][coating][singleGatePostDiameter] * 2; // 2 hinges per gate
        totalCost += hingePrice * numberOfSingleGates;
      }

      // Double gates
      if (numberOfDoubleGates > 0) {
        const hingePrice = doubleGateHingeType === 'residential'
          ? (hingePrices.residential.male[coating][doubleGatePostDiameter] + 
             hingePrices.residential.female[coating][getMatchingFemaleSize(doubleGatePostDiameter)]) * 4 // 4 sets per gate
          : hingePrices[doubleGateHingeType][coating][doubleGatePostDiameter] * 4; // 4 hinges per gate
        totalCost += hingePrice * numberOfDoubleGates;
      }

      // Sliding gates
      if (numberOfSlidingGates > 0) {
        totalCost += rollerPrice * 4 * numberOfSlidingGates;
      }

      return totalCost;
    };

    const gateHardwareSubtotal = calculateGateHardwareCost();

    newCosts["Gate Hardware"] = {
      quantity: 1,
      unitCost: gateHardwareSubtotal,
      standardLength: null,
      subtotal: gateHardwareSubtotal,
      details: 'Includes hinges, latches, and rollers'
    };

    // Single gate calculation
    if (numberOfSingleGates > 0) {
      const singleGateRate = 150.0; // $150.00 per gate
      const singleGateSubtotal = numberOfSingleGates * singleGateRate;

      newCosts["Single Gate"] = {
        quantity: numberOfSingleGates,
        unitCost: singleGateRate,
        subtotal: singleGateSubtotal
      };
    }

    // Double gate calculation
    if (numberOfDoubleGates > 0) {
      const doubleGateRate = 300.0; // $300.00 per gate
      const doubleGateSubtotal = numberOfDoubleGates * doubleGateRate;

      newCosts["Double Gate"] = {
        quantity: numberOfDoubleGates,
        unitCost: doubleGateRate,
        subtotal: doubleGateSubtotal
      };
    }

    // Line clearing calculation
    let outsideLabor = 0;
    if (needsLineClearing && lineClearingFootage > 0) {
      const lineClearingRate = 2.5; // $2.50 per foot
      const lineClearingSubtotal = lineClearingFootage * lineClearingRate;
      outsideLabor += lineClearingSubtotal;

      newCosts["Line clearing"] = {
        quantity: lineClearingFootage,
        unitCost: lineClearingRate,
        subtotal: lineClearingSubtotal
      };
    }

    // Tear out calculation
    if (needsTearOut && tearOutFootage > 0) {
      const tearOutRate = 3.0; // $3.00 per foot
      const tearOutSubtotal = tearOutFootage * tearOutRate;
      outsideLabor += tearOutSubtotal;

      newCosts["Tear out"] = {
        quantity: tearOutFootage,
        unitCost: tearOutRate,
        subtotal: tearOutSubtotal
      };
    }

    // Traveling cost calculation
    if (estimatedDays > 0) {
      const dailyRate = 50; // $50 per day
      const travelingCostSubtotal = estimatedDays * dailyRate;
      outsideLabor += travelingCostSubtotal;

      newCosts["Traveling Cost"] = {
        quantity: estimatedDays,
        unitCost: dailyRate,
        subtotal: travelingCostSubtotal
      };
    }

    // Update outside labor total
    setOutsideLaborTotal(outsideLabor);

    // Calculate concrete costs
    const concreteCalculation = calculateConcreteNeeded();
    if (concreteCalculation && typeOfConcrete) {
      if (typeOfConcrete === "Truck") {
        newCosts["Concrete (Truck)"] = {
          quantity: concreteCalculation.cubicYardsNeeded,
          unitCost: CONCRETE_COSTS.Truck,
          standardLength: null,
          subtotal: concreteCalculation.totalCost
        };
      } else {
        newCosts[`Concrete (${typeOfConcrete})`] = {
          quantity: concreteCalculation.bagsNeeded,
          unitCost: CONCRETE_COSTS[typeOfConcrete],
          standardLength: null,
          subtotal: concreteCalculation.totalCost
        };
      }
    }

    // Calculate total
    let totalCost = 0;
    for (const key in newCosts) {
      if (newCosts[key].subtotal) {
        totalCost += newCosts[key].subtotal;
      }
    }
    newCosts["Total"] = totalCost;
    newCosts["Grand Total"] = totalCost * 1.0825; // Adding 8.25% tax

    setCosts(newCosts);
  }, [heightOfFence, totalLinearLength, numberOfEndTerminals, numberOfSolitaryPosts, numberOfCorners, 
      numberOfSingleGates, numberOfDoubleGates, numberOfSlidingGates, numberOfFlangedPosts, numberOfFlangedPostsOffCentered, 
      extraRail, hasHBrace, topRailDiameter, material, depthOfHoles, linePostHoleDepth,
      commercialOrResidential, threeStrandBarbedWire, doubleGateHoleDepth, slidingGatePostDiameter, slidingGateHoleDepth,
      hasDuckbillGateStop, duckbillPostThickness, numberOfPulls, pullLengths, postSpacing, 
      linePostDiameter, terminalPostDiameter, cornerPostDiameter, meshType, hasFenceSlats, hasTrussRods,
      needsLineClearing, lineClearingFootage, estimatedDays, typeOfConcrete]);

  // Calculate costs when inputs change
  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

  // Calculate the total price
  const calculateTotalPrice = () => {
    if (!heightOfFenceInFeet || !totalLinearLength) {
      return {
        minPrice: 0,
        targetPrice: 0,
        maxPrice: 0
      };
    }

    let effectiveHeight = parseFloat(heightOfFenceInFeet);
    if (threeStrandBarbedWire) {
      effectiveHeight += 1;
    }

    const materialCost = Object.values(costs || {}).reduce((total, item) => total + (item?.subtotal || 0), 0);
    const laborCost = outsideLaborTotal || 0;
    
    // Calculate different price points
    const baseCost = materialCost + laborCost;
    const markup = commercialOrResidential === "Commercial" ? 0.3 : 0.25; // 30% markup for commercial, 25% for residential
    
    // Calculate different price points
    const minPrice = baseCost * (1 + markup);
    const targetPrice = baseCost * (1 + markup + 0.1); // Additional 10% for target
    const maxPrice = maxPriceFromBreakdown || 0; // Use max price from TotalCostBreakdown with fallback
    
    return {
      minPrice,
      targetPrice,
      maxPrice
    };
  };

  const pricePoints = calculateTotalPrice();

  const renderHeightOfFenceSection = () => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Height of Fence (ft)
        </label>
        <input
          type="number"
          value={heightOfFence}
          onChange={(e) => setHeightOfFence(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        />
      </div>
    );
  };

  const renderTotalLinearLengthSection = () => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
          Total Linear Length (ft)
        </label>
        <input
          type="number"
          value={totalLinearLength}
          onChange={(e) => setTotalLinearLength(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            width: '100%'
          }}
        />
      </div>
    );
  };

  const [openProposalDialog, setOpenProposalDialog] = useState(false);

  const handleGenerateProposal = () => {
    setOpenProposalDialog(true);
  };

  // Calculate concrete needed for holes
  const calculateConcreteNeeded = () => {
    if (!heightOfFence) return null;

    let totalBagsNeeded = 0;
    let totalVolume = 0;

    // Helper to calculate single hole volume in cubic inches
    const calculateHoleVolume = (width, depth) => {
      if (!width || !depth) return 0;
      const radius = width / 2;
      return Math.PI * radius * radius * depth;
    };

    // Terminal/Corner posts holes
    const terminalCornerHoleVolume = calculateHoleVolume(widthOfHoles, depthOfHoles);
    const terminalCornerPosts = (parseInt(numberOfEndTerminals) || 0) + (parseInt(numberOfCorners) || 0);
    totalVolume += terminalCornerHoleVolume * terminalCornerPosts;

    // Line post holes
    const linePostHoleVolume = calculateHoleVolume(linePostHoleWidth, linePostHoleDepth);
    const linePostsNeeded = calculateLinePostsNeeded();
    totalVolume += linePostHoleVolume * linePostsNeeded;

    // Single gate post holes
    const singleGatePostsQuantity = (parseInt(numberOfSingleGates) || 0) * 2;
    const singleGatePostHoleVolume = calculateHoleVolume(singleGatePostHoleWidth, singleGatePostHoleDepth || depthOfHoles);
    totalVolume += singleGatePostHoleVolume * singleGatePostsQuantity;

    // Double gate post holes
    const doubleGateHoleVolume = calculateHoleVolume(doubleGateHoleWidth, doubleGateHoleDepth || depthOfHoles);
    const doubleGatePostsQuantity = (parseInt(numberOfDoubleGates) || 0) * 2;
    totalVolume += doubleGateHoleVolume * doubleGatePostsQuantity;

    // Sliding gate post holes
    const slidingGateHoleVolume = calculateHoleVolume(slidingGateHoleWidth, slidingGateHoleDepth || depthOfHoles);
    const slidingGatePostsQuantity = (parseInt(numberOfSlidingGates) || 0) * 3; // 3 posts per sliding gate
    totalVolume += slidingGateHoleVolume * slidingGatePostsQuantity;

    // Convert cubic inches to bags (multiply by 2.22 and divide by 1728 to convert from cubic inches)
    const bagsNeeded = Math.ceil((totalVolume / 1728) * 2.22);

    // Calculate costs based on concrete type
    let concreteCost = 0;
    if (typeOfConcrete === "Red") {
      concreteCost = bagsNeeded * CONCRETE_COSTS.Red;
    } else if (typeOfConcrete === "Yellow") {
      concreteCost = bagsNeeded * CONCRETE_COSTS.Yellow;
    } else if (typeOfConcrete === "Truck") {
      const cubicYardsNeeded = Math.ceil(bagsNeeded / 59);
      concreteCost = cubicYardsNeeded * CONCRETE_COSTS.Truck;
    }

    return {
      bagsNeeded,
      cubicYardsNeeded: typeOfConcrete === "Truck" ? Math.ceil(bagsNeeded / 59) : null,
      totalCost: concreteCost
    };
  };

  // Helper function to get available sizes based on hinge type
  const getAvailableSizes = (hingeType, coating) => {
    if (hingeType === 'residential') {
      // For residential, we show male sizes since we'll use matching female sizes
      return Object.keys(hingePrices.residential.male[coating]).filter(size => 
        hingePrices.residential.male[coating][size] !== null
      );
    } else {
      return Object.keys(hingePrices[hingeType][coating]);
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '2rem auto', 
      padding: '1.5rem', 
      backgroundColor: 'white', 
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ color: '#6d2f2c', fontWeight: 'bold' }}>
          Chain Link Fence Calculator
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Basic Information Section */}
        <Accordion defaultExpanded TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="basic-info-content"
            id="basic-info-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Basic Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Total Linear Length */}
              {renderTotalLinearLengthSection()}
              
              {/* Fence Height */}
              {renderHeightOfFenceSection()}
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Commercial or Residential
                </label>
                <select
                  value={commercialOrResidential}
                  onChange={(e) => setCommercialOrResidential(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Type of Coating
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="Black">Black</option>
                  <option value="Galvanized">Galvanized</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Gauge of Mesh
                </label>
                <select
                  value={meshType}
                  onChange={(e) => setMeshType(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="8F">8F</option>
                  <option value="9F">9F</option>
                  <option value="9G">9G</option>
                  <option value="11G">11G</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Type of Mesh Fold
                </label>
                <select
                  value={meshFold}
                  onChange={(e) => setMeshFold(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="kk">Knuckle/Knuckle</option>
                  <option value="kt">Knuckle/Twist</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Type of concrete
                </label>
                <select
                  value={typeOfConcrete}
                  onChange={(e) => setTypeOfConcrete(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="">Select...</option>
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Gates Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gates-content"
            id="gates-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Gates</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of Single Swing Gates
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfSingleGates}
                  onChange={(e) => setNumberOfSingleGates(parseInt(e.target.value) || 0)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of Double Swing Gates
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfDoubleGates}
                  onChange={(e) => setNumberOfDoubleGates(parseInt(e.target.value) || 0)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>

              {numberOfDoubleGates > 0 && (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasDuckbillGateStop}
                        onChange={(e) => setHasDuckbillGateStop(e.target.checked)}
                      />
                    }
                    label="Duckbill gate stop for double gate?"
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of Sliding Gates/Cantilevers
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfSlidingGates}
                  onChange={(e) => setNumberOfSlidingGates(parseInt(e.target.value) || 0)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>

              {numberOfSingleGates > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Single Gate Details
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Gate Size</InputLabel>
                      <Select value={singleGateSize} onChange={(e) => setSingleGateSize(e.target.value)}>
                        <MenuItem value="3">3'</MenuItem>
                        <MenuItem value="4">4'</MenuItem>
                        <MenuItem value="5">5'</MenuItem>
                        <MenuItem value="6">6'</MenuItem>
                        <MenuItem value="8">8'</MenuItem>
                        <MenuItem value="10">10'</MenuItem>
                        <MenuItem value="12">12'</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Hinge Type</InputLabel>
                      <Select value={singleGateHingeType} onChange={(e) => setSingleGateHingeType(e.target.value)}>
                        <MenuItem value="residential">Residential</MenuItem>
                        <MenuItem value="bulldog">Bulldog</MenuItem>
                        <MenuItem value="180degree">180 Degree</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Latch Type</InputLabel>
                      <Select value={singleGateLatchType} onChange={(e) => setSingleGateLatchType(e.target.value)}>
                        <MenuItem value="fork">Fork Latch</MenuItem>
                        <MenuItem value="lockable">Lockable Latch</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}

              {numberOfDoubleGates > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Double Gate Details
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Gate Size</InputLabel>
                      <Select value={doubleGateSize} onChange={(e) => setDoubleGateSize(e.target.value)}>
                        <MenuItem value="6">6'</MenuItem>
                        <MenuItem value="8">8'</MenuItem>
                        <MenuItem value="10">10'</MenuItem>
                        <MenuItem value="12">12'</MenuItem>
                        <MenuItem value="14">14'</MenuItem>
                        <MenuItem value="16">16'</MenuItem>
                        <MenuItem value="20">20'</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Hinge Type</InputLabel>
                      <Select value={doubleGateHingeType} onChange={(e) => setDoubleGateHingeType(e.target.value)}>
                        <MenuItem value="residential">Residential</MenuItem>
                        <MenuItem value="bulldog">Bulldog</MenuItem>
                        <MenuItem value="180degree">180 Degree</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Latch Type</InputLabel>
                      <Select value={doubleGateLatchType} onChange={(e) => setDoubleGateLatchType(e.target.value)}>
                        <MenuItem value="fork">Fork Latch</MenuItem>
                        <MenuItem value="lockable">Lockable Latch</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}

              {numberOfSlidingGates > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Sliding Gate Details
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <FormControl fullWidth={isMobile}>
                      <InputLabel>Gate Size</InputLabel>
                      <Select value={slidingGateSize} onChange={(e) => setSlidingGateSize(e.target.value)}>
                        <MenuItem value="6">6'</MenuItem>
                        <MenuItem value="8">8'</MenuItem>
                        <MenuItem value="10">10'</MenuItem>
                        <MenuItem value="12">12'</MenuItem>
                        <MenuItem value="14">14'</MenuItem>
                        <MenuItem value="16">16'</MenuItem>
                        <MenuItem value="20">20'</MenuItem>
                        <MenuItem value="24">24'</MenuItem>
                        <MenuItem value="30">30'</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Pull Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="pull-section-content"
            id="pull-section-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Pull Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of Pulls
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={numberOfPulls}
                  onChange={(e) => {
                    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                    setNumberOfPulls(newValue);
                    // Reset pull lengths array when number of pulls changes
                    setPullLengths(new Array(newValue).fill(0));
                  }}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>

              {/* Pull Length Inputs */}
              {numberOfPulls > 0 && pullLengths.map((length, index) => (
                <div key={index}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Pull {index + 1} Length (ft)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => {
                      const newPullLengths = [...pullLengths];
                      newPullLengths[index] = parseFloat(e.target.value) || 0;
                      setPullLengths(newPullLengths);
                    }}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      padding: '0.5rem',
                      width: '100%'
                    }}
                  />
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Post Options Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="post-options-content"
            id="post-options-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Post Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Terminal Posts */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Terminal Posts
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Number of Terminal Posts
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={numberOfEndTerminals}
                      onChange={(e) => setNumberOfEndTerminals(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Terminal Post Diameter
                    </label>
                    <select
                      value={terminalPostDiameter}
                      onChange={(e) => setTerminalPostDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="2 3/8">2 3/8"</option>
                      <option value="2 7/8">2 7/8"</option>
                      <option value="4">4"</option>
                      <option value="6 5/8">6 5/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Terminal Post Thickness
                    </label>
                    <select
                      value={terminalPostThickness}
                      onChange={(e) => setTerminalPostThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Depth (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={depthOfHoles}
                      onChange={(e) => setDepthOfHoles(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Width (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={widthOfHoles}
                      onChange={(e) => setWidthOfHoles(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Corner Posts */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Corner Posts
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Number of Corner Posts
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={numberOfCorners}
                      onChange={(e) => setNumberOfCorners(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Corner Post Diameter
                    </label>
                    <select
                      value={cornerPostDiameter}
                      onChange={(e) => setCornerPostDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="2 3/8">2 3/8"</option>
                      <option value="2 7/8">2 7/8"</option>
                      <option value="3 1/2">3 1/2"</option>
                      <option value="4">4"</option>
                      <option value="6 5/8">6 5/8"</option>
                      <option value="8 5/8">8 5/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Corner Post Thickness
                    </label>
                    <select
                      value={cornerPostThickness}
                      onChange={(e) => setCornerPostThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Depth (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={depthOfHoles}
                      onChange={(e) => setDepthOfHoles(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Width (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={widthOfHoles}
                      onChange={(e) => setWidthOfHoles(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Flanged Posts Centered */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Flanged Posts Centered
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Number of Flanged Posts Centered
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={numberOfFlangedPosts}
                      onChange={(e) => setNumberOfFlangedPosts(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Post Diameter
                    </label>
                    <select
                      value={flangedPostDiameter}
                      onChange={(e) => setFlangedPostDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="2 3/8">2 3/8"</option>
                      <option value="2 7/8">2 7/8"</option>
                      <option value="3 1/2">3 1/2"</option>
                      <option value="4">4"</option>
                      <option value="6 5/8">6 5/8"</option>
                      <option value="8 5/8">8 5/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Post Thickness
                    </label>
                    <select
                      value={flangedPostThickness}
                      onChange={(e) => setFlangedPostThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Depth (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={flangedPostHoleDepth}
                      onChange={(e) => setFlangedPostHoleDepth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Width (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={flangedPostHoleWidth}
                      onChange={(e) => setFlangedPostHoleWidth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Flanged Posts Off Centered */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Flanged Posts Off Centered
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Number of Flanged Posts Off Centered
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={numberOfFlangedPostsOffCentered}
                      onChange={(e) => setNumberOfFlangedPostsOffCentered(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Post Diameter
                    </label>
                    <select
                      value={flangedPostOffCenteredDiameter}
                      onChange={(e) => setFlangedPostOffCenteredDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="2 3/8">2 3/8"</option>
                      <option value="2 7/8">2 7/8"</option>
                      <option value="3 1/2">3 1/2"</option>
                      <option value="4">4"</option>
                      <option value="6 5/8">6 5/8"</option>
                      <option value="8 5/8">8 5/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Post Thickness
                    </label>
                    <select
                      value={flangedPostOffCenteredThickness}
                      onChange={(e) => setFlangedPostOffCenteredThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Depth (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={flangedPostOffCenteredHoleDepth}
                      onChange={(e) => setFlangedPostOffCenteredHoleDepth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Width (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={flangedPostOffCenteredHoleWidth}
                      onChange={(e) => setFlangedPostOffCenteredHoleWidth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Line Posts */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Line Posts
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Line Post Diameter
                    </label>
                    <select
                      value={linePostDiameter}
                      onChange={(e) => setLinePostDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="1 5/8">1 5/8"</option>
                      <option value="1 7/8">1 7/8"</option>
                      <option value="2 3/8">2 3/8"</option>
                      <option value="2 7/8">2 7/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Line Post Thickness
                    </label>
                    <select
                      value={linePostThickness}
                      onChange={(e) => setLinePostThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Depth (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={linePostHoleDepth}
                      onChange={(e) => setLinePostHoleDepth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Hole Width (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={linePostHoleWidth}
                      onChange={(e) => setLinePostHoleWidth(parseInt(e.target.value) || 0)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Top Rail */}
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Top Rail
                </Typography>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Top Rail Diameter
                    </label>
                    <select
                      value={topRailDiameter}
                      onChange={(e) => setTopRailDiameter(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="1 3/8">1 3/8"</option>
                      <option value="1 5/8">1 5/8"</option>
                      <option value="1 7/8">1 7/8"</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                      Top Rail Thickness
                    </label>
                    <select
                      value={topRailThickness}
                      onChange={(e) => setTopRailThickness(e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        padding: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <option value="SCH 40">SCH 40</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Single Gate Posts - Only show if there are single gates */}
              {numberOfSingleGates > 0 && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Single Gate Posts
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Single Gate Post Diameter
                      </label>
                      <select
                        value={singleGatePostDiameter}
                        onChange={(e) => setSingleGatePostDiameter(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      >
                        <option value="2 3/8">2 3/8"</option>
                        <option value="2 7/8">2 7/8"</option>
                        <option value="4">4"</option>
                        <option value="6 5/8">6 5/8"</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Single Gate Post Thickness
                      </label>
                      <select
                        value={singleGatePostThickness}
                        onChange={(e) => setSingleGatePostThickness(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%',
                          marginBottom: isMobile ? '1rem' : '0',
                        }}
                      >
                        <option value="SCH 40">SCH 40</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Hole Depth (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={singleGatePostHoleDepth}
                        onChange={(e) => setSingleGatePostHoleDepth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Hole Width (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={singleGatePostHoleWidth}
                        onChange={(e) => setSingleGatePostHoleWidth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Double Gate Posts - Only show if there are double gates */}
              {numberOfDoubleGates > 0 && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Double Gate Posts
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Double Gate Post Diameter
                      </label>
                      <select
                        value={doubleGatePostDiameter}
                        onChange={(e) => setDoubleGatePostDiameter(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      >
                        <option value="2 3/8">2 3/8"</option>
                        <option value="2 7/8">2 7/8"</option>
                        <option value="4">4"</option>
                        <option value="6 5/8">6 5/8"</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Double Gate Post Thickness
                      </label>
                      <select
                        value={doubleGatePostThickness}
                        onChange={(e) => setDoubleGatePostThickness(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%',
                          marginBottom: isMobile ? '1rem' : '0',
                        }}
                      >
                        <option value="SCH 40">SCH 40</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Hole Depth (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={doubleGateHoleDepth}
                        onChange={(e) => setDoubleGateHoleDepth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Hole Width (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={doubleGateHoleWidth}
                        onChange={(e) => setDoubleGateHoleWidth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sliding Gate Posts - Only show if there are sliding gates */}
              {numberOfSlidingGates > 0 && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Sliding Gate Posts
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Sliding Gate Post Diameter
                      </label>
                      <select
                        value={slidingGatePostDiameter}
                        onChange={(e) => setSlidingGatePostDiameter(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      >
                        <option value="2 3/8">2 3/8"</option>
                        <option value="2 7/8">2 7/8"</option>
                        <option value="4">4"</option>
                        <option value="6 5/8">6 5/8"</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Sliding Gate Post Thickness
                      </label>
                      <select
                        value={slidingGatePostThickness}
                        onChange={(e) => setSlidingGatePostThickness(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%',
                          marginBottom: isMobile ? '1rem' : '0',
                        }}
                      >
                        <option value="SCH 40">SCH 40</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: isMobile ? 'stretch' : 'center', marginTop: '1rem' }}>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Sliding Gate Post Hole Depth (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={slidingGateHoleDepth}
                        onChange={(e) => setSlidingGateHoleDepth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, marginBottom: isMobile ? '1rem' : 0 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Sliding Gate Post Hole Width (inches)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={slidingGateHoleWidth}
                        onChange={(e) => setSlidingGateHoleWidth(parseInt(e.target.value) || 0)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Extra Work Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="extra-work-content"
            id="extra-work-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Extra Work</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={needsTearOut}
                      onChange={(e) => setNeedsTearOut(e.target.checked)}
                    />
                  }
                  label="Tear out needed?"
                />
              </div>

              {needsTearOut && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Number of Feet of Tear Out
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tearOutFootage}
                    onChange={(e) => setTearOutFootage(parseInt(e.target.value) || 0)}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      padding: '0.5rem',
                      width: '100%'
                    }}
                  />
                </div>
              )}

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={needsLineClearing}
                      onChange={(e) => setNeedsLineClearing(e.target.checked)}
                    />
                  }
                  label="Line clearing needed?"
                />
              </div>

              {needsLineClearing && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Number of Feet of Line Clearing
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={lineClearingFootage}
                    onChange={(e) => setLineClearingFootage(parseInt(e.target.value) || 0)}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      padding: '0.5rem',
                      width: '100%'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Estimated Work Days
                </label>
                <input
                  type="number"
                  min="0"
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(parseInt(e.target.value) || 0)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Additional Information Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="additional-info-content"
            id="additional-info-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Additional Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Spacing of Posts
                </label>
                <input
                  type="number"
                  min="0"
                  value={postSpacing}
                  onChange={(e) => setPostSpacing(parseInt(e.target.value) || 0)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Have extra rail?
                </label>
                <select
                  value={extraRail}
                  onChange={(e) => setExtraRail(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="none">None</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                  <option value="both">Both (Middle and Bottom)</option>
                </select>
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasHBrace}
                      onChange={(e) => setHasHBrace(e.target.checked)}
                    />
                  }
                  label="With H braces?"
                />
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasTrussRods === "Yes"}
                      onChange={(e) => setHasTrussRods(e.target.checked ? "Yes" : "No")}
                    />
                  }
                  label="With truss rods?"
                />
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={threeStrandBarbedWire}
                      onChange={(e) => setThreeStrandBarbedWire(e.target.checked)}
                    />
                  }
                  label="3 strand barbed wire?"
                />
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasFenceSlats === "Yes"}
                      onChange={(e) => setHasFenceSlats(e.target.checked ? "Yes" : "No")}
                    />
                  }
                  label="Fence slats?"
                />
              </div>

              {hasFenceSlats === "Yes" && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Slat Color
                  </label>
                  <select
                    value={fenceSlatsColor}
                    onChange={(e) => setFenceSlatsColor(e.target.value)}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      padding: '0.5rem',
                      width: '100%'
                    }}
                  >
                    <option value="Black">Black</option>
                    <option value="Green">Green</option>
                    <option value="Tan">Tan</option>
                  </select>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Material Cost Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="material-cost-content"
            id="material-cost-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Material Cost</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Item</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(costs || {}).map(([key, value]) => (
                    key !== 'Total' && key !== 'Grand Total' ? (
                      <tr key={key}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{key}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>${value?.subtotal?.toFixed(2) || '0.00'}</td>
                      </tr>
                    ) : null
                  ))}
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Total Material Cost</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                      ${Object.entries(costs || {}).reduce((total, [key, value]) => {
                        if (key !== 'Total' && key !== 'Grand Total') {
                          return total + (value?.subtotal || 0);
                        }
                        return total;
                      }, 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Outside Labor Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="outside-labor-content"
            id="outside-labor-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Outside Labor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Item</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {needsLineClearing && (
                    <tr>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Line Clearing ({lineClearingFootage} ft)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                        ${(lineClearingFootage * 2.5).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {needsTearOut && (
                    <tr>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tear Out ({tearOutFootage} ft)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                        ${(tearOutFootage * 3).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {estimatedDays > 0 && (
                    <tr>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Traveling Cost ({estimatedDays} days)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                        ${(estimatedDays * 50).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Total Outside Labor Cost</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                      ${outsideLaborTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Total Cost Breakdown Section */}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="total-cost-breakdown-content"
            id="total-cost-breakdown-header"
            sx={{
              backgroundColor: '#f8f8f8',
              '&.Mui-expanded': {
                backgroundColor: '#f0f0f0',
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Total Cost Breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TotalCostBreakdown 
              materialsCost={Object.values(costs || {}).reduce((total, item) => total + (item?.subtotal || 0), 0)} 
              outsideLaborCost={outsideLaborTotal || 0}
              isCommercial={commercialOrResidential === "Commercial"}
              onMaxPriceCalculated={handleMaxPriceCalculated}
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleGenerateProposal}
            size="large"
            sx={{ 
              backgroundColor: '#6d2f2c', 
              color: 'white', 
              padding: '0.75rem 2rem', 
              fontSize: '1.1rem', 
              borderRadius: '0.375rem', 
              '&:hover': {
                backgroundColor: '#7c3a3d'
              }
            }}
          >
            Generate Proposal
          </Button>
        </Box>

        <Dialog 
          open={openProposalDialog} 
          onClose={() => setOpenProposalDialog(false)}
          maxWidth="lg"
        >
          <DialogTitle>Proposal</DialogTitle>
          <DialogContent>
            <Proposal 
              customerName={customerData?.customerName || ''}
              customerAddress={customerData?.billingAddress || ''}
              customerCity={''}
              customerState={''}
              customerZip={customerData?.zipCode || ''}
              customerPhone={customerData?.phoneNumber || ''}
              customerEmail={customerData?.email || ''}
              customerJobSiteAddress={customerData?.siteAddress || ''}
              salesRep={`${customerData?.salesRep || ''} ${customerData?.salesRepTel ? `(${customerData.salesRepTel})` : ''}`}
              materialsCost={Object.values(costs || {}).reduce((total, item) => total + (item?.subtotal || 0), 0)}
              outsideLaborCost={outsideLaborTotal || 0}
              isCommercial={commercialOrResidential === "Commercial"}
              costs={costs}
              totalLinearLength={totalLinearLength}
              heightOfFence={heightOfFenceInFeet}
              numberOfPulls={numberOfPulls}
              commercialOrResidential={commercialOrResidential}
              blackOrGalvanized={material}
              gaugeOfMesh={meshType}
              typeOfMeshFold={meshFold}
              withHBraces={hasHBrace}
              withTrussRods={hasTrussRods === "Yes"}
              barbedWire={threeStrandBarbedWire}
              spacingOfPosts={postSpacing}
              depthOfHoles={depthOfHoles}
              numberOfSingleGates={numberOfSingleGates}
              numberOfDoubleGates={numberOfDoubleGates}
              numberOfSlidingGates={numberOfSlidingGates}
              terminalPostDiameter={terminalPostDiameter}
              doubleGatePostDiameter={doubleGatePostDiameter}
              slidingGatePostDiameter={slidingGatePostDiameter}
              linePostDiameter={linePostDiameter}
              topRailDiameter={topRailDiameter}
              gateFrameDiameter={gatePipeDiameter}
              terminalPostThickness={terminalPostThickness}
              doubleGatePostThickness={doubleGatePostThickness}
              slidingGatePostThickness={slidingGatePostThickness}
              linePostThickness={linePostThickness}
              topRailThickness={topRailThickness}
              numberOfFlangedPostsCentered={numberOfFlangedPosts}
              numberOfFlangedPostsOffCentered={numberOfFlangedPostsOffCentered}
              maxPrice={pricePoints.maxPrice}
              typeOfConcrete={typeOfConcrete}
              singleGatePostHoleDepth={singleGatePostHoleDepth}
              singleGatePostHoleWidth={singleGatePostHoleWidth}
              singleGateSize={singleGateSize}
              singleGateHingeType={singleGateHingeType}
              singleGateLatchType={singleGateLatchType}
              doubleGateSize={doubleGateSize}
              doubleGateHingeType={doubleGateHingeType}
              doubleGateLatchType={doubleGateLatchType}
              slidingGateSize={slidingGateSize}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenProposalDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default FenceCalculator;