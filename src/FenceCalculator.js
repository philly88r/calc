import React, { useState, useEffect, useCallback } from 'react';
import {
  postCosts as defaultPostCosts,
  meshCosts,
  domeCapCosts,
  fenceTiesCosts,
  hogRingsCosts,
  wedgeAnchorCosts,
  eyeTopsCosts
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
  DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FenceCalculator = ({ customerData = {} }) => {
  const [heightOfFence, setHeightOfFence] = useState('');
  const [heightOfFenceInFeet, setHeightOfFenceInFeet] = useState('8');
  const [totalLinearLength, setTotalLinearLength] = useState('');
  const [numberOfEndTerminals, setNumberOfEndTerminals] = useState('');
  const [numberOfSolitaryPosts, setNumberOfSolitaryPosts] = useState('');
  const [numberOfCorners, setNumberOfCorners] = useState('');
  const [numberOfSingleGates, setNumberOfSingleGates] = useState('');
  const [numberOfDoubleGates, setNumberOfDoubleGates] = useState('');
  const [numberOfSlidingGates, setNumberOfSlidingGates] = useState(0);
  const [numberOfFlangedPosts, setNumberOfFlangedPosts] = useState('');
  const [numberOfFlangedPostsOffCentered, setNumberOfFlangedPostsOffCentered] = useState('');
  const [extraRail, setExtraRail] = useState('none');
  const [hasHBrace, setHasHBrace] = useState(false);
  const [topRailDiameter, setTopRailDiameter] = useState('1 3/8');
  const [material, setMaterial] = useState("Galvanized");
  const [postThickness, setPostThickness] = useState("SCH 40");
  const [duckbillPostThickness, setDuckbillPostThickness] = useState("SCH 40");
  const [hasDuckbillGateStop, setHasDuckbillGateStop] = useState(false);
  const [depthOfHoles, setDepthOfHoles] = useState(36);
  const [linePostHoleDepth, setLinePostHoleDepth] = useState(36);
  const [widthOfHoles, setWidthOfHoles] = useState(0);
  const [typeOfConcrete, setTypeOfConcrete] = useState("");
  const [commercialOrResidential, setCommercialOrResidential] = useState("Commercial");
  const [barbedWire, setBarbedWire] = useState('No');
  const [threeStrandBarbedWire, setThreeStrandBarbedWire] = useState('No');
  const [doubleGateHoleDepth, setDoubleGateHoleDepth] = useState('');
  const [slidingGatePostDiameter, setSlidingGatePostDiameter] = useState('2 3/8');
  const [slidingGateHoleDepth, setSlidingGateHoleDepth] = useState('');

  // Number of pulls for tension calculations
  const [numberOfPulls, setNumberOfPulls] = useState(0);

  const [pullLengths, setPullLengths] = useState([]);
  const [postSpacing, setPostSpacing] = useState(10);
  const [linePostDiameter, setLinePostDiameter] = useState("1 7/8");
  const [terminalPostDiameter, setTerminalPostDiameter] = useState("2 7/8");
  const [cornerPostDiameter, setCornerPostDiameter] = useState("2 7/8");
  const [costs, setCosts] = useState({});
  const [meshType, setMeshType] = useState('9G Galv');
  const [meshFold, setMeshFold] = useState('kk');
  const [hasFenceSlats, setHasFenceSlats] = useState('No');
  const [hasTrussRods, setHasTrussRods] = useState("No");
  const [needsTearOut, setNeedsTearOut] = useState(false);
  const [tearOutFootage, setTearOutFootage] = useState(0);
  const [needsLineClearing, setNeedsLineClearing] = useState(false);
  const [lineClearingFootage, setLineClearingFootage] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [terminalCornerPostDiameter, setTerminalCornerPostDiameter] = useState("2 3/8");
  const [terminalCornerPostThickness, setTerminalCornerPostThickness] = useState("SCH 40");
  const [singleGatePostDiameter, setSingleGatePostDiameter] = useState("2 3/8");
  const [singleGatePostThickness, setSingleGatePostThickness] = useState("SCH 40");
  const [doubleGatePostDiameter, setDoubleGatePostDiameter] = useState("2 3/8");
  const [doubleGatePostThickness, setDoubleGatePostThickness] = useState("SCH 40");
  const [slidingGatePostThickness, setSlidingGatePostThickness] = useState("SCH 40");
  const [linePostThickness, setLinePostThickness] = useState("SCH 40");
  const [topRailThickness, setTopRailThickness] = useState("SCH 40");
  const [gatePipeDiameter, setGatePipeDiameter] = useState("1 3/8");
  const [outsideLaborTotal, setOutsideLaborTotal] = useState(0);
  const [maxPriceFromBreakdown, setMaxPriceFromBreakdown] = useState(0);

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
    const barbedWireAdjustment = barbedWire === "Yes" ? 1 : 0;

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
      if (barbedWire === "Yes") {
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
      if (barbedWire === "Yes") {
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
      if (barbedWire === "Yes") {
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
    if (threeStrandBarbedWire === "Yes") {
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
    if (threeStrandBarbedWire === "Yes" && linePostsNeeded > 0) {
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
    if (threeStrandBarbedWire === "Yes" && totalLinearLength > 0) {
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

    // Brace Bands calculation
    if (numberOfEndTerminals > 0) {
      // Calculate base quantity from extra rail selection
      let baseQuantity = numberOfEndTerminals * 
        (extraRail === "None" || extraRail === "Middle" ? 2 : 1);

      // Add quantity for 3 strand barbed wire
      if (threeStrandBarbedWire === "Yes") {
        baseQuantity += numberOfEndTerminals * 3;
      }

      // Add quantity for H braces if enabled
      if (hasHBrace) {
        baseQuantity += numberOfEndTerminals;  // C53 in the formula appears to be terminal post quantity
      }

      // Get unit cost based on material and terminal post diameter
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.[terminalPostDiameter]) {
        braceBandUnitCost = braceBandsCosts[material][terminalPostDiameter];
      }

      const braceBandSubtotal = baseQuantity * braceBandUnitCost;

      newCosts["Brace Bands"] = {
        quantity: baseQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands (Single Gate Post) calculation
    if (numberOfSingleGates > 0) {
      // Calculate base quantity from extra rail selection
      let baseQuantity = numberOfSingleGates * 
        (extraRail === "None" || extraRail === "Middle" ? 2 : 1);

      // Add quantity for 3 strand barbed wire
      if (threeStrandBarbedWire === "Yes") {
        baseQuantity += numberOfSingleGates * 3;
      }

      // Add quantity for H braces if enabled
      if (hasHBrace) {
        baseQuantity += numberOfSingleGates;
      }

      // Get unit cost based on material and single gate post diameter
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.["2 7/8"]) {  // Single gates use 2 7/8" diameter
        braceBandUnitCost = braceBandsCosts[material]["2 7/8"];
      }

      const braceBandSubtotal = baseQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Single Gate Post)"] = {
        quantity: baseQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands (Double Gate Post) calculation
    if (numberOfDoubleGates > 0) {
      // Calculate base quantity from extra rail selection
      let baseQuantity = numberOfDoubleGates * 
        (extraRail === "None" || extraRail === "Middle" ? 2 : 1);

      // Add quantity for 3 strand barbed wire
      if (threeStrandBarbedWire === "Yes") {
        baseQuantity += numberOfDoubleGates * 3;
      }

      // Add quantity for H braces if enabled
      if (hasHBrace) {
        baseQuantity += numberOfDoubleGates;
      }

      // Get unit cost based on material and double gate post diameter
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.["4"]) {  // Double gates use 4" diameter
        braceBandUnitCost = braceBandsCosts[material]["4"];
      }

      const braceBandSubtotal = baseQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Double Gate Post)"] = {
        quantity: baseQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Brace Bands (Sliding Gate Post) calculation
    if (numberOfSlidingGates > 0) {
      // Calculate base quantity from extra rail selection
      let baseQuantity = numberOfSlidingGates * 
        (extraRail === "None" || extraRail === "Middle" ? 2 : 1);

      // Add quantity for 3 strand barbed wire
      if (threeStrandBarbedWire === "Yes") {
        baseQuantity += numberOfSlidingGates * 3;
      }

      // Add quantity for H braces if enabled
      if (hasHBrace) {
        baseQuantity += numberOfSlidingGates;
      }

      // Get unit cost based on material and sliding gate post diameter
      let braceBandUnitCost = 0;
      if (braceBandsCosts[material]?.[slidingGatePostDiameter]) {
        braceBandUnitCost = braceBandsCosts[material][slidingGatePostDiameter];
      }

      const braceBandSubtotal = baseQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Sliding Gate Post)"] = {
        quantity: baseQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal
      };
    }

    // Top/Middle/Bottom Rails
    if (totalLinearLength > 0) {
      // Determine rail multiplier based on extra rail selection
      let railMultiplier = 1; // Default for "none"
      if (extraRail === "both") {
        railMultiplier = 3;
      } else if (extraRail === "top" || extraRail === "bottom") {
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
      const rollersUnitCost = 83.3;
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

    // Line Clearing calculation
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

    // Tear Out calculation
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

    // Single Gates Labor calculation
    if (numberOfSingleGates > 0) {
      const singleGatesLaborRate = 150.0; // $150.00 per gate
      const singleGatesLaborSubtotal = numberOfSingleGates * singleGatesLaborRate;
      outsideLabor += singleGatesLaborSubtotal;

      newCosts["Single gates labor"] = {
        quantity: numberOfSingleGates,
        unitCost: singleGatesLaborRate,
        subtotal: singleGatesLaborSubtotal
      };
    }

    // Double Gates Labor calculation
    if (numberOfDoubleGates > 0) {
      const doubleGatesLaborRate = 300.0; // $300.00 per gate
      const doubleGatesLaborSubtotal = numberOfDoubleGates * doubleGatesLaborRate;
      outsideLabor += doubleGatesLaborSubtotal;

      newCosts["Double gates labor"] = {
        quantity: numberOfDoubleGates,
        unitCost: doubleGatesLaborRate,
        subtotal: doubleGatesLaborSubtotal
      };
    }

    // Traveling Cost calculation
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
      commercialOrResidential, barbedWire, doubleGateHoleDepth, slidingGatePostDiameter, slidingGateHoleDepth,
      hasDuckbillGateStop, duckbillPostThickness, numberOfPulls, pullLengths, postSpacing, 
      linePostDiameter, terminalPostDiameter, cornerPostDiameter, meshType, hasFenceSlats, threeStrandBarbedWire, hasTrussRods,
      needsLineClearing, lineClearingFootage, needsTearOut, tearOutFootage, estimatedDays]);

  // Calculate costs when inputs change
  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

  // Calculate the total price
  const calculateTotalPrice = () => {
    const materialCost = Object.values(costs || {}).reduce((total, item) => total + (item?.subtotal || 0), 0);
    const laborCost = outsideLaborTotal || 0;
    
    // Calculate different price points
    const baseCost = materialCost + laborCost;
    const markup = commercialOrResidential === "Commercial" ? 0.3 : 0.25; // 30% markup for commercial, 25% for residential
    
    // Calculate different price points
    const minPrice = baseCost * (1 + markup);
    const targetPrice = baseCost * (1 + markup + 0.1); // Additional 10% for target
    const maxPrice = maxPriceFromBreakdown; // Use max price from TotalCostBreakdown
    
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
                  Material Type
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
                  <option value="9G Galv">9 Gauge</option>
                  <option value="11G Galv">11 Gauge</option>
                  <option value="11.5G Galv">11.5 Gauge</option>
                  <option value="6G Galv">6 Gauge</option>
                  <option value="9G Black">9 Gauge Black</option>
                  <option value="11G Black">11 Gauge Black</option>
                  <option value="11.5G Black">11.5 Gauge Black</option>
                  <option value="6G Black">6 Gauge Black</option>
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

              {renderHeightOfFenceSection()}
              {renderTotalLinearLengthSection()}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Tearout Needed?
                </label>
                <select
                  value={needsTearOut ? "Yes" : "No"}
                  onChange={(e) => setNeedsTearOut(e.target.value === "Yes")}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {needsTearOut && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Number of Feet of Tearout Needed
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
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Line Clearing Needed?
                </label>
                <select
                  value={needsLineClearing ? "Yes" : "No"}
                  onChange={(e) => setNeedsLineClearing(e.target.value === "Yes")}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {needsLineClearing && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Number of Feet of Line Clearing Needed
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
                  Estimated Days
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of Sliding Gates/Cantilever
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

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasDuckbillGateStop}
                      onChange={(e) => setHasDuckbillGateStop(e.target.checked)}
                    />
                  }
                  label="Duckbill Gate Stop for Double Gate?"
                />
              </div>
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
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Number of end/terminal posts
                </label>
                <input
                  type="number"
                  value={numberOfEndTerminals}
                  onChange={(e) => setNumberOfEndTerminals(e.target.value)}
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
                  Number of Corners
                </label>
                <input
                  type="number"
                  value={numberOfCorners}
                  onChange={(e) => setNumberOfCorners(e.target.value)}
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
                  Number of Solitary Hinge/Latch Posts
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfSolitaryPosts}
                  onChange={(e) => setNumberOfSolitaryPosts(parseInt(e.target.value) || 0)}
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

              <div>
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of terminal/corner posts
                </label>
                <select
                  value={terminalCornerPostDiameter}
                  onChange={(e) => setTerminalCornerPostDiameter(e.target.value)}
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
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of terminal/corner posts
                </label>
                <select
                  value={terminalCornerPostThickness}
                  onChange={(e) => setTerminalCornerPostThickness(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of single gate post
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
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of single gate post
                </label>
                <select
                  value={singleGatePostThickness}
                  onChange={(e) => setSingleGatePostThickness(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of double gate post
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
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of double gate post
                </label>
                <select
                  value={doubleGatePostThickness}
                  onChange={(e) => setDoubleGatePostThickness(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of sliding gate post
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
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of sliding gate post
                </label>
                <select
                  value={slidingGatePostThickness}
                  onChange={(e) => setSlidingGatePostThickness(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of line posts
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
                  <option value="1 3/8">1 3/8"</option>
                  <option value="1 5/8">1 5/8"</option>
                  <option value="1 7/8">1 7/8"</option>
                  <option value="2 3/8">2 3/8"</option>
                  <option value="2 7/8">2 7/8"</option>
                  <option value="4">4"</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of line post
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
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of top rail
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Thickness of top rail
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
                  <option value="0.065">0.065"</option>
                  <option value="SCH 20">SCH 20</option>
                  <option value="SCH 40">SCH 40</option>
                  {material === "Galvanized" && <option value="High zinc">High Zinc</option>}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Diameter of gate pipe for single/double gate
                </label>
                <select
                  value={gatePipeDiameter}
                  onChange={(e) => setGatePipeDiameter(e.target.value)}
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
                  Width of holes
                </label>
                <input
                  type="number"
                  min="0"
                  value={widthOfHoles || ''}
                  onChange={(e) => setWidthOfHoles(parseInt(e.target.value) || 0)}
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
                  Type of concrete
                </label>
                <select
                  value={typeOfConcrete || ''}
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Spacing of posts
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
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                  <option value="both">Both Top and Bottom</option>
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
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  With truss rods?
                </label>
                <select
                  value={hasTrussRods}
                  onChange={(e) => setHasTrussRods(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  3 strand barbed wire?
                </label>
                <select
                  value={threeStrandBarbedWire}
                  onChange={(e) => setThreeStrandBarbedWire(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Barbed Wire?
                </label>
                <select
                  value={barbedWire}
                  onChange={(e) => setBarbedWire(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                  Fence slats?
                </label>
                <select
                  value={hasFenceSlats}
                  onChange={(e) => setHasFenceSlats(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%'
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
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
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Item</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Quantity</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Unit Cost</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(costs || {}).map(([item, details]) => (
                    <tr key={item}>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>{item}</td>
                      <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                        {details?.quantity || 0}
                      </td>
                      <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                        {details?.unitCost !== undefined ? `$${details.unitCost.toFixed(2)}` : 
                         details?.meshCost !== undefined ? `$${details.meshCost.toFixed(2)}` :
                         details?.fenceTiesCost !== undefined ? `$${details.fenceTiesCost.toFixed(2)}` :
                         details?.hogRingsCost !== undefined ? `$${details.hogRingsCost.toFixed(2)}` :
                         details?.domeCapsCost !== undefined ? `$${details.domeCapsCost.toFixed(2)}` :
                         details?.wedgeAnchorsCost !== undefined ? `$${details.wedgeAnchorsCost.toFixed(2)}` :
                         details?.eyeTopsCost !== undefined ? `$${details.eyeTopsCost.toFixed(2)}` :
                         details?.trussRodsCost !== undefined ? `$${details.trussRodsCost.toFixed(2)}` :
                         details?.tearOutCost !== undefined ? `$${details.tearOutCost.toFixed(2)}` :
                         details?.lineClearingCost !== undefined ? `$${details.lineClearingCost.toFixed(2)}` : '-'}
                      </td>
                      <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                        ${(details?.subtotal || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>Total Material Cost:</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>
                      ${Object.values(costs || {}).reduce((total, item) => total + (item?.subtotal || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
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
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Item</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '2px solid #E5E7EB' }}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Line Clearing</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                      ${((costs && costs["Line clearing"] && costs["Line clearing"].subtotal) || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Tear Out</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                      ${((costs && costs["Tear out"] && costs["Tear out"].subtotal) || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Single Gates Labor</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                      ${((costs && costs["Single gates labor"] && costs["Single gates labor"].subtotal) || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Double Gates Labor</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                      ${((costs && costs["Double gates labor"] && costs["Double gates labor"].subtotal) || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>Traveling Cost</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
                      ${((costs && costs["Traveling Cost"] && costs["Traveling Cost"].subtotal) || 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>Total Outside Labor Cost:</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 'bold' }}>
                      ${(outsideLaborTotal || 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
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
              barbedWire={barbedWire === "Yes"}
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
              terminalPostThickness={terminalCornerPostThickness}
              doubleGatePostThickness={doubleGatePostThickness}
              slidingGatePostThickness={slidingGatePostThickness}
              linePostThickness={postThickness}
              topRailThickness={postThickness}
              numberOfFlangedPostsCentered={numberOfFlangedPosts}
              numberOfFlangedPostsOffCentered={numberOfFlangedPostsOffCentered}
              maxPrice={pricePoints.maxPrice}
              typeOfConcrete={typeOfConcrete}
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
