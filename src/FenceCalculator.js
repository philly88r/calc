import React, { useState, useEffect, useCallback } from 'react';
import {
  DEFAULT_BARBED_WIRE_GAUGE, DEFAULT_BARBED_WIRE_POINT,
  postCosts, topRailCosts, meshCosts, domeCapCosts, fenceTiesCosts, hogRingsCosts,
  wedgeAnchorCosts, eyeTopsCosts, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts, 
  industrialHingeCosts, rollerPrice, barbedWireCosts, braceBandsCosts, cantileverLatchCosts,
  tensionBandCosts, tensionBarsCosts, slatCosts, nutsAndBoltsCosts, concreteCosts,
  railClampsCosts, barbArmsCosts
} from './data/costs.js';
import gateData, { findMatchingGate, getAvailableGateHeights, getAvailableGateWidths } from './GateData.js';
import OutsideLabor from './components/OutsideLabor.js';
import TotalCostBreakdown from './components/TotalCostBreakdown.js';
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
  useMediaQuery,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';
// Import the findPostSize function from our calculator directory
import { findPostSize as findPostSizeExtracted } from './calculator/postCalculations.js';

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
  const [numberOfFlangedPosts, setNumberOfFlangedPosts] = useState('');
  const [numberOfFlangedPostsOffCentered, setNumberOfFlangedPostsOffCentered] = useState('');
  const [extraRail, setExtraRail] = useState('none');
  const [hasHBrace, setHasHBrace] = useState(false);
  const [material, setMaterial] = useState("Galvanized");
  const [postThickness, setPostThickness] = useState("Industrial SCH 40");
  const [duckbillPostThickness, setDuckbillPostThickness] = useState("Industrial SCH 40");
  const [hasDuckbillGateStop, setHasDuckbillGateStop] = useState(false);
  const [duckbillThickness, setDuckbillThickness] = useState("SCH 20");
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
  const [typeOfConcrete, setTypeOfConcrete] = useState("Yellow");
  const [commercialOrResidential, setCommercialOrResidential] = useState("Commercial");
  const [threeStrandBarbedWire, setThreeStrandBarbedWire] = useState(false);
  const [barbedWireGauge, setBarbedWireGauge] = useState(DEFAULT_BARBED_WIRE_GAUGE);
  const [numberOfPulls, setNumberOfPulls] = useState('');
  const [postSpacing, setPostSpacing] = useState('');

  // Post dimensions
  const [terminalPostDiameter, setTerminalPostDiameter] = useState("2 7/8");
  const [terminalPostThickness, setTerminalPostThickness] = useState("Industrial SCH 40");
  const [cornerPostDiameter, setCornerPostDiameter] = useState("2 7/8");
  const [cornerPostThickness, setCornerPostThickness] = useState("Industrial SCH 40");
  const [linePostDiameter, setLinePostDiameter] = useState("1 7/8");
  const [linePostThickness, setLinePostThickness] = useState("Industrial SCH 40");
  const [singleGatePostDiameter, setSingleGatePostDiameter] = useState("2 7/8");
  const [singleGatePostThickness, setSingleGatePostThickness] = useState("Industrial SCH 40");
  const [doubleGatePostDiameter, setDoubleGatePostDiameter] = useState("4");
  const [doubleGatePostThickness, setDoubleGatePostThickness] = useState("Industrial SCH 40");
  const [slidingGatePostDiameter, setSlidingGatePostDiameter] = useState("4");
  const [slidingGatePostThickness, setSlidingGatePostThickness] = useState("Industrial SCH 40");
  const [topRailDiameter, setTopRailDiameter] = useState("1 5/8");
  const [topRailThickness, setTopRailThickness] = useState("SCH 40"); 
  const [gatePipeDiameter, setGatePipeDiameter] = useState("1 3/8");
  const [flangedPostDiameter, setFlangedPostDiameter] = useState("");
  const [flangedPostThickness, setFlangedPostThickness] = useState("");
  const [flangedPostHoleDepth, setFlangedPostHoleDepth] = useState('');
  const [flangedPostHoleWidth, setFlangedPostHoleWidth] = useState('');
  const [flangedPostOffCenteredDiameter, setFlangedPostOffCenteredDiameter] = useState("");
  const [flangedPostOffCenteredThickness, setFlangedPostOffCenteredThickness] = useState("");
  const [flangedPostOffCenteredHoleDepth, setFlangedPostOffCenteredHoleDepth] = useState('');
  const [flangedPostOffCenteredHoleWidth, setFlangedPostOffCenteredHoleWidth] = useState('');

  const [outsideLaborTotal, setOutsideLaborTotal] = useState(0);
  const [inHouseLaborTotal, setInHouseLaborTotal] = useState(0);
  const [preferredLaborType, setPreferredLaborType] = useState('inHouse'); // 'inHouse' or 'outside'
  const [maxPriceFromBreakdown, setMaxPriceFromBreakdown] = useState('');
  const [pullLengths, setPullLengths] = useState([]);
  const [costs, setCosts] = useState({});
  const [meshType, setMeshType] = useState('9G');
  const [meshFold, setMeshFold] = useState('kk');
  const [hasFenceSlats, setHasFenceSlats] = useState('No');
  const [hasTrussRods, setHasTrussRods] = useState("No");
  const [needsTearOut, setNeedsTearOut] = useState(false);
  const [tearOutFootage, setTearOutFootage] = useState('');
  const [needsLineClearing, setNeedsLineClearing] = useState(false);
  const [lineClearingFootage, setLineClearingFootage] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [fenceSlatsColor, setFenceSlatsColor] = useState("Black");
  const [singleGates, setSingleGates] = useState([]);
  const [doubleGates, setDoubleGates] = useState([]);
  const [slidingGates, setSlidingGates] = useState([]);

  // Gate details
  const [gateType, setGateType] = useState('single'); // single, double, sliding
  const [gateCommercialResidential, setGateCommercialResidential] = useState('commercial');
  const [gateBarbed, setGateBarbed] = useState(false);
  const [gateFinish, setGateFinish] = useState('galvanized');
  const [gateFrameDiameter, setGateFrameDiameter] = useState('1 5/8');
  const [singleGateSize, setSingleGateSize] = useState("6'x4");
  const [singleGateHingeType, setSingleGateHingeType] = useState('residential');
  const [singleGateLatchType, setSingleGateLatchType] = useState('fork');
  const [doubleGateSize, setDoubleGateSize] = useState("6'x12");
  const [doubleGateHingeType, setDoubleGateHingeType] = useState('residential');
  const [doubleGateLatchType, setDoubleGateLatchType] = useState('Std. Resid.');
  const [slidingGateSize, setSlidingGateSize] = useState("6'x10");
  const [singleGateWidthFeet, setSingleGateWidthFeet] = useState(4);
  const [singleGateWidthInches, setSingleGateWidthInches] = useState(0);
  const [doubleGateWidthFeet, setDoubleGateWidthFeet] = useState(10);
  const [doubleGateWidthInches, setDoubleGateWidthInches] = useState(0);
  const [slidingGateWidthFeet, setSlidingGateWidthFeet] = useState(10);
  const [slidingGateWidthInches, setSlidingGateWidthInches] = useState(0);
  const [materialDescriptions, setMaterialDescriptions] = useState({});
  const [editingDescription, setEditingDescription] = useState(null);
  const [openProposalDialog, setOpenProposalDialog] = useState(false);

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
  const railClampsCost = railClampsCosts;

  // Barb arms costs
  // Using barbArmsCosts directly from import

  // Tension bands costs
  const tensionBandsCost = tensionBandCosts;

  // Tension bars costs
  const tensionBarsCost = tensionBarsCosts;

  // Brace bands costs
  const braceBandsCost = braceBandsCosts;

  // Barbed wire costs
  const barbedWireCost = barbedWireCosts;

  // Fence slats costs per 10 linear feet
  const slatCost = slatCosts;

  // Nuts and bolts costs (per 100pc)
  const nutsAndBoltsCost = nutsAndBoltsCosts;

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

  // Use the extracted findPostSize function
  const findPostSize = findPostSizeExtracted;

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

    // Terminal posts
    if (totalTerminalPosts > 0) {
      const { size, cost, sku } = findPostSize(material, postThickness, terminalPostDiameter, parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment);
      const postHeight = size ? parseFloat(size.replace('ft', '')) : 0;
      const costPerPost = cost;
      const subtotal = totalTerminalPosts * costPerPost;

      newCosts["Terminal posts"] = {
        quantity: totalTerminalPosts,
        unitCost: costPerPost,
        postHeight: postHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Corner posts
    if (numberOfCorners > 0) {
      const { size, cost, sku } = findPostSize(material, postThickness, cornerPostDiameter, parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment);
      const postHeight = size ? parseFloat(size.replace('ft', '')) : 0;
      const costPerPost = cost;
      const subtotal = numberOfCorners * costPerPost;

      newCosts["Corner posts"] = {
        quantity: numberOfCorners,
        unitCost: costPerPost,
        postHeight: postHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Single gate posts
    if (numberOfSingleGates && numberOfSingleGates > 0) {
      const singleGatePostsQty = numberOfSingleGates * 2;
      const { size, cost, sku } = findPostSize(material, postThickness, "2 7/8", parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment);
      
      // Special height logic for single gate posts
      let singleGatePostHeight = parseFloat(heightOfFence);
      
      // Apply depth adjustment
      singleGatePostHeight += terminalDepthAdjustment;
      
      // Add barbed wire adjustment if applicable
      if (threeStrandBarbedWire) {
        singleGatePostHeight += barbedWireAdjustment;
      }
      
      const costPerPost = cost;
      const subtotal = singleGatePostsQty * costPerPost;

      newCosts["Single gate posts"] = {
        quantity: singleGatePostsQty,
        unitCost: costPerPost,
        postHeight: singleGatePostHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Double gate posts
    if (numberOfDoubleGates && numberOfDoubleGates > 0) {
      const doubleGatePostsQty = numberOfDoubleGates * 2;
      const { size, cost, sku } = findPostSize(material, postThickness, "4", parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment);
      
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
      
      const costPerPost = cost;
      const subtotal = doubleGatePostsQty * costPerPost;

      newCosts["Double gate posts"] = {
        quantity: doubleGatePostsQty,
        unitCost: costPerPost,
        postHeight: doubleGatePostHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Sliding Gate Posts
    if (numberOfSlidingGates && numberOfSlidingGates > 0) {
      const slidingGatePostQuantity = numberOfSlidingGates * 3;
      const { size, cost, sku } = findPostSize(material, postThickness, slidingGatePostDiameter, parseInt(heightOfFence) + terminalDepthAdjustment + barbedWireAdjustment);
      
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

      // Calculate the total cost per post (unit cost * height)
      const costPerPost = cost;
      const subtotal = slidingGatePostQuantity * costPerPost;

      newCosts["Sliding Gate Posts"] = {
        quantity: slidingGatePostQuantity,
        unitCost: costPerPost,
        postHeight: totalPostHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Duckbill gate stop posts for double gates
    if (hasDuckbillGateStop && numberOfDoubleGates && numberOfDoubleGates > 0) {
      const duckbillPostsQty = numberOfDoubleGates * 2;
      
      // Get cost for 1 5/8" diameter with specified thickness
      const { size, cost, sku } = findPostSize(material, duckbillThickness, "1 5/8", 3);
      
      // Duckbill posts are always 3 ft tall
      const postHeight = 3;
      const costPerPost = cost;
      const subtotal = duckbillPostsQty * costPerPost;

      newCosts["Duckbill gate stop posts"] = {
        quantity: duckbillPostsQty,
        unitCost: costPerPost,
        postHeight: postHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Dome Cap Terminal Post calculation
    if (numberOfEndTerminals > 0) {
      // Get unit cost based on material and terminal post diameter
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter].price;
        }
        return 0;
      };

      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter] 
        ? domeCapOptions[material][terminalPostDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = numberOfEndTerminals * domeCapUnitCost;

      newCosts["Dome Cap Terminal Post"] = {
        quantity: numberOfEndTerminals,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Dome Cap Corner Post calculation
    if (numberOfCorners > 0) {
      // Get unit cost based on material and corner post diameter
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][cornerPostDiameter]) {
          return domeCapOptions[material][cornerPostDiameter].price;
        }
        return 0;
      };

      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][cornerPostDiameter] 
        ? domeCapOptions[material][cornerPostDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = numberOfCorners * domeCapUnitCost;

      newCosts["Dome Cap Corner Post"] = {
        quantity: numberOfCorners,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Dome Cap Single Gate Post calculation
    if (numberOfSingleGates && numberOfSingleGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for single gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter].price;
        }
        return 0;
      };

      // Each single gate needs 2 posts
      const singleGatePostQuantity = numberOfSingleGates * 2;
      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter] 
        ? domeCapOptions[material][terminalPostDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = singleGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Single Gate Post"] = {
        quantity: singleGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Dome Cap Sliding Gate Post calculation
    if (numberOfSlidingGates && numberOfSlidingGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for sliding gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter].price;
        }
        return 0;
      };

      // Each sliding gate needs 2 posts
      const slidingGatePostQuantity = numberOfSlidingGates * 2;
      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter] 
        ? domeCapOptions[material][terminalPostDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = slidingGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Sliding Gate Post"] = {
        quantity: slidingGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Dome Cap Double Gate Post calculation
    if (numberOfDoubleGates && numberOfDoubleGates > 0) {
      // Get unit cost based on material and terminal post diameter (used for double gates)
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter]) {
          return domeCapOptions[material][terminalPostDiameter].price;
        }
        return 0;
      };

      const doubleGatePostQuantity = numberOfDoubleGates * 2;
      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][terminalPostDiameter] 
        ? domeCapOptions[material][terminalPostDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = doubleGatePostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Double Gate Post"] = {
        quantity: doubleGatePostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Dome Cap Duckbill Gate Stop Post calculation
    if (hasDuckbillGateStop && numberOfDoubleGates && numberOfDoubleGates > 0) {
      const duckbillDiameter = duckbillThickness === "1 5/8 SCH 40" ? "1 5/8" : "2 3/8";
      const getDomeCapUnitCost = () => {
        if (domeCapOptions[material] && domeCapOptions[material][duckbillDiameter]) {
          return domeCapOptions[material][duckbillDiameter].price;
        }
        return 0;
      };

      const duckbillPostQuantity = numberOfDoubleGates * 2; // 2 dome caps per double gate
      const domeCapSku = domeCapOptions[material] && domeCapOptions[material][duckbillDiameter] 
        ? domeCapOptions[material][duckbillDiameter].sku 
        : null;
      const domeCapUnitCost = getDomeCapUnitCost();
      const domeCapSubtotal = duckbillPostQuantity * domeCapUnitCost;

      newCosts["Dome Cap Duckbill Gate Stop Post"] = {
        quantity: duckbillPostQuantity,
        unitCost: domeCapUnitCost,
        standardLength: null,
        subtotal: domeCapSubtotal,
        sku: domeCapSku
      };
    }

    // Eye Tops / Loop Caps calculation
    const linePostsNeeded = calculateLinePostsNeeded();
    if (topRailDiameter && linePostDiameter && material && linePostsNeeded > 0) {
      // Get unit cost based on material, line post diameter, and top rail diameter
      const getEyeTopUnitCost = () => {
        if (eyeTopsOptions[material] && 
            eyeTopsOptions[material][linePostDiameter] && 
            eyeTopsOptions[material][linePostDiameter][topRailDiameter]) {
          return eyeTopsOptions[material][linePostDiameter][topRailDiameter].price;
        }
        return 0;
      };

      // Get SKU based on material, line post diameter, and top rail diameter
      const getEyeTopSku = () => {
        if (eyeTopsOptions[material] && 
            eyeTopsOptions[material][linePostDiameter] && 
            eyeTopsOptions[material][linePostDiameter][topRailDiameter]) {
          return eyeTopsOptions[material][linePostDiameter][topRailDiameter].sku;
        }
        return null;
      };

      const eyeTopUnitCost = getEyeTopUnitCost();
      const eyeTopSku = getEyeTopSku();
      const eyeTopSubtotal = linePostsNeeded * eyeTopUnitCost;

      newCosts["Eye Tops / Loop Caps"] = {
        quantity: linePostsNeeded,
        unitCost: eyeTopUnitCost,
        standardLength: null,
        subtotal: eyeTopSubtotal,
        sku: eyeTopSku
      };
    }

    // Rail Clamps calculation
    if (linePostsNeeded > 0 && extraRail !== 'none') {
      // Calculate quantity based on extra rail selection
      let railClampMultiplier = 0;
      switch (extraRail) {
        case "both":
          railClampMultiplier = 2;
          break;
        case "top":
        case "bottom":
        case "middle":
          railClampMultiplier = 1;
          break;
      }

      const railClampQuantity = Math.ceil(railClampMultiplier * linePostsNeeded);
      let railClampUnitCost = 0;
      
      if (railClampsCost[material]?.[linePostDiameter]?.[topRailDiameter]) {
        railClampUnitCost = railClampsCost[material][linePostDiameter][topRailDiameter];
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
        barbArmUnitCost = barbArmsCosts[material][linePostDiameter][topRailDiameter].price;
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
    if (threeStrandBarbedWire && totalLinearLength) {
      // Calculate number of rolls needed (1 roll = 1320 feet)
      const FEET_PER_ROLL = 1320;
      const barbedWireLength = parseFloat(totalLinearLength);
      // Need 3 strands, so multiply total length by 3
      const totalBarbedWireNeeded = barbedWireLength * 3;
      // Calculate how many rolls we need, rounding up
      const rollsNeeded = Math.ceil(totalBarbedWireNeeded / FEET_PER_ROLL);
      const barbedWireUnitCost = barbedWireCost[DEFAULT_BARBED_WIRE_GAUGE][DEFAULT_BARBED_WIRE_POINT].price;
      const barbedWireSubtotal = rollsNeeded * barbedWireUnitCost;

      newCosts["Barbed Wire"] = {
        quantity: rollsNeeded,
        unitCost: barbedWireUnitCost,
        standardLength: FEET_PER_ROLL,
        subtotal: barbedWireSubtotal
      };
    }

    // Tension Bands (Terminal Post) calculation
    if (numberOfEndTerminals > 0 && heightOfFence > 0) {
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfEndTerminals;

      // Get unit cost based on material and terminal post diameter
      let tensionBandUnitCost = 0;
      let tensionBandSku = null;
      if (tensionBandsCost[material]?.[terminalPostDiameter]) {
        tensionBandUnitCost = tensionBandsCost[material][terminalPostDiameter].price;
        tensionBandSku = tensionBandsCost[material][terminalPostDiameter].sku;
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Terminal Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal,
        sku: tensionBandSku
      };
    }

    // Tension Bands (Corner Post) calculation
    if (numberOfCorners > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * corner post quantity * 2
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfCorners * 2;

      // Get unit cost based on material and corner post diameter
      let tensionBandUnitCost = 0;
      let tensionBandSku = null;
      if (tensionBandsCost[material]?.[cornerPostDiameter]) {
        tensionBandUnitCost = tensionBandsCost[material][cornerPostDiameter].price;
        tensionBandSku = tensionBandsCost[material][cornerPostDiameter].sku;
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Corner Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal,
        sku: tensionBandSku
      };
    }

    // Tension Bands (Single Gate Post) calculation
    if (numberOfSingleGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * single gate post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfSingleGates;

      // Get unit cost based on material and 2 7/8" diameter (standard for single gate posts)
      let tensionBandUnitCost = 0;
      let tensionBandSku = null;
      if (tensionBandsCost[material]?.["2 7/8"]) {
        tensionBandUnitCost = tensionBandsCost[material]["2 7/8"].price;
        tensionBandSku = tensionBandsCost[material]["2 7/8"].sku;
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Single Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal,
        sku: tensionBandSku
      };
    }

    // Tension Bands (Double Gate Post) calculation
    if (numberOfDoubleGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * number of gate posts (2 posts per double gate)
      const doubleGatePostQuantity = numberOfDoubleGates * 2;
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * doubleGatePostQuantity;

      // Get unit cost based on material and 4" diameter (standard for double gate posts)
      let tensionBandUnitCost = 0;
      let tensionBandSku = null;
      if (tensionBandsCost[material]?.["4"]) {
        tensionBandUnitCost = tensionBandsCost[material]["4"].price;
        tensionBandSku = tensionBandsCost[material]["4"].sku;
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Double Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal,
        sku: tensionBandSku
      };
    }

    // Tension Bands (Sliding Gate Post) calculation
    if (numberOfSlidingGates > 0 && heightOfFence > 0) {
      // Calculate quantity: (height of fence - 1) * sliding gate post quantity
      const tensionBandQuantity = (parseFloat(heightOfFence) - 1) * numberOfSlidingGates;

      // Get unit cost based on material and sliding gate post diameter
      let tensionBandUnitCost = 0;
      let tensionBandSku = null;
      if (tensionBandsCost[material]?.[slidingGatePostDiameter]) {
        tensionBandUnitCost = tensionBandsCost[material][slidingGatePostDiameter].price;
        tensionBandSku = tensionBandsCost[material][slidingGatePostDiameter].sku;
      }

      const tensionBandSubtotal = tensionBandQuantity * tensionBandUnitCost;

      newCosts["Tension Bands (Sliding Gate Post)"] = {
        quantity: tensionBandQuantity,
        unitCost: tensionBandUnitCost,
        standardLength: null,
        subtotal: tensionBandSubtotal,
        sku: tensionBandSku
      };
    }

    // Brace Bands calculation for terminal posts
    if (numberOfEndTerminals > 0) {
      // Base: 2 per post
      let braceBandsPerPost = 2;
      
      // Add 1 if has middle or both extra rails
      if (extraRail === "middle" || extraRail === "both") {
        braceBandsPerPost += 1;
      }
      
      // Add 3 if has barbed wire
      if (threeStrandBarbedWire) {
        braceBandsPerPost += 3;
      }
      
      const braceBandsQuantity = numberOfEndTerminals * braceBandsPerPost;
      
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.[terminalPostDiameter]) {
        braceBandUnitCost = braceBandsCost[material][terminalPostDiameter].price;
        braceBandSku = braceBandsCost[material][terminalPostDiameter].sku;
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Terminal Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
    }

    // Brace Bands calculation for corner posts
    if (numberOfCorners > 0) {
      // Base: 4 per post (double the terminal posts)
      let braceBandsPerPost = 4;
      
      // Add 2 if has middle or both extra rails (double the terminal posts)
      if (extraRail === "middle" || extraRail === "both") {
        braceBandsPerPost += 2;
      }
      
      // Add 6 if has barbed wire (double the terminal posts)
      if (threeStrandBarbedWire) {
        braceBandsPerPost += 6;
      }
      
      const braceBandsQuantity = numberOfCorners * braceBandsPerPost;
      
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.[cornerPostDiameter]) {
        braceBandUnitCost = braceBandsCost[material][cornerPostDiameter].price;
        braceBandSku = braceBandsCost[material][cornerPostDiameter].sku;
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Corner Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
    }

    // Brace Bands calculation for single gate posts
    if (numberOfSingleGates > 0) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfSingleGates * 2 * braceBandsPerPost; // 2 posts per gate
      
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.["2 7/8"]) {
        braceBandUnitCost = braceBandsCost[material]["2 7/8"].price;
        braceBandSku = braceBandsCost[material]["2 7/8"].sku;
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Single Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
    }

    // Brace Bands calculation for double gate posts
    if (numberOfDoubleGates > 0) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfDoubleGates * 2 * braceBandsPerPost; // 2 posts per gate
      
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.["4"]) {
        braceBandUnitCost = braceBandsCost[material]["4"].price;
        braceBandSku = braceBandsCost[material]["4"].sku;
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Double Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
    }

    // Brace Bands calculation for sliding gate posts
    if (numberOfSlidingGates > 0) {
      const braceBandsPerPost = 2;
      const braceBandsQuantity = numberOfSlidingGates * 3 * braceBandsPerPost; // 3 posts per sliding gate
      
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.[slidingGatePostDiameter]) {
        braceBandUnitCost = braceBandsCost[material][slidingGatePostDiameter].price;
        braceBandSku = braceBandsCost[material][slidingGatePostDiameter].sku;
      }

      const braceBandSubtotal = braceBandsQuantity * braceBandUnitCost;

      newCosts["Brace Bands (Sliding Gate Post)"] = {
        quantity: braceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
    }

    // Extra Brace Bands for H braces
    if (hasHBrace) {
      // Calculate total posts except line posts
      const totalNonLinePosts = 
        parseInt(numberOfEndTerminals) + 
        parseInt(numberOfCorners) + 
        (parseInt(numberOfSingleGates) * 2) + // 2 posts per single gate
        (parseInt(numberOfDoubleGates) * 2) + // 2 posts per double gate
        (parseInt(numberOfSlidingGates) * 3); // 3 posts per sliding gate
      
      const extraBraceBandsQuantity = 
        (parseInt(numberOfEndTerminals) * 1) + // 1 extra per terminal post
        (parseInt(numberOfCorners) * 2) +      // 2 extra per corner post
        (parseInt(numberOfSingleGates) * 2 * 1) + // 1 extra per single gate post (2 posts)
        (parseInt(numberOfDoubleGates) * 2 * 1) + // 1 extra per double gate post (2 posts)
        (parseInt(numberOfSlidingGates) * 3 * 1); // 1 extra per sliding gate post (3 posts)
      
      // Get unit cost based on material and post diameter (using terminal post diameter as default)
      let braceBandUnitCost = 0;
      let braceBandSku = null;
      if (braceBandsCost[material]?.[terminalPostDiameter]) {
        braceBandUnitCost = braceBandsCost[material][terminalPostDiameter].price;
        braceBandSku = braceBandsCost[material][terminalPostDiameter].sku;
      }

      const braceBandSubtotal = extraBraceBandsQuantity * braceBandUnitCost;

      newCosts["Extra Brace Bands for H Braces"] = {
        quantity: extraBraceBandsQuantity,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: braceBandSubtotal,
        sku: braceBandSku
      };
      
      // Brace bands for line posts for H braces
      newCosts["Brace Bands (Line Posts for H Braces)"] = {
        quantity: totalNonLinePosts,
        unitCost: braceBandUnitCost,
        standardLength: null,
        subtotal: totalNonLinePosts * braceBandUnitCost,
        sku: braceBandSku
      };
    }

    // Tension Bars calculation
    if (numberOfPulls > 0) {
      // Calculate quantity: number of pulls * 2 + 1
      const tensionBarQuantity = numberOfPulls * 2 + 1;

      // Get unit cost based on material and fence height in feet
      const heightKey = `${heightOfFenceInFeet}'`;
      const tensionBarUnitCost = tensionBarsCost[material]?.[heightKey]?.price || 0;
      const tensionBarSku = tensionBarsCost[material]?.[heightKey]?.sku || null;
      const tensionBarSubtotal = tensionBarQuantity * tensionBarUnitCost;

      newCosts["Tension Bars"] = {
        quantity: tensionBarQuantity,
        unitCost: tensionBarUnitCost,
        standardLength: null,
        subtotal: tensionBarSubtotal,
        sku: tensionBarSku
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

    // Part 1: Calculate total bands with 5% extra
    let totalBandsWithExtra = Math.ceil((totalTensionBands + totalBraceBands) * 1.05);
    
    // Part 2: Add H brace nuts and bolts if enabled
    let hBraceNutsAndBolts = 0;
    if (hasHBrace) {
      // 2 nuts and bolts per terminal and single gate post
      hBraceNutsAndBolts += (parseInt(numberOfEndTerminals) || 0) * 2;
      hBraceNutsAndBolts += (parseInt(numberOfSingleGates) || 0) * 2;
      // 4 nuts and bolts per corner post
      hBraceNutsAndBolts += (parseInt(numberOfCorners) || 0) * 4;
    }
    
    // Total nuts and bolts needed
    const totalNutsAndBolts = totalBandsWithExtra + hBraceNutsAndBolts;

    // Round up the final quantity after dividing by 100 (boxes of 100)
    const nutsAndBoltsQuantity = Math.ceil(totalNutsAndBolts / 100);

    if (nutsAndBoltsQuantity > 0) {
      // Get unit cost based on material (price is per 100pc)
      const unitCost = nutsAndBoltsCost[material]?.price || 0;
      const nutsAndBoltsSku = nutsAndBoltsCost[material]?.sku || null;
      const nutsAndBoltsSubtotal = nutsAndBoltsQuantity * unitCost;

      newCosts["Nuts and Bolts"] = {
        quantity: nutsAndBoltsQuantity,
        unitCost: unitCost,
        standardLength: 100, // per 100pc
        subtotal: nutsAndBoltsSubtotal,
        sku: nutsAndBoltsSku
      };
    }

    // Hog Rings calculation
    if (totalLinearLength) {
      const hogRingsQuantity = Math.ceil(
        (extraRail === "Bottom" || extraRail === "Both") 
        ? 0 
        : (totalLinearLength * 0.8) / 125
      );
      
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
      
      // Map UI mesh type values to the structure in costs.js
      let meshMaterial = material;
      let meshGaugeType;
      
      if (meshType === "8F") {
        meshGaugeType = "Commercial 8 gauge";
        meshMaterial = "Black";
      } else if (meshType === "9F") {
        meshGaugeType = "Residential 9 gauge";
        meshMaterial = "Black";
      } else if (meshType === "9G") {
        meshGaugeType = "Commercial 9 gauge";
        meshMaterial = "Galvanized";
      } else if (meshType === "11G") {
        meshGaugeType = "Residential 11.5 gauge";
        meshMaterial = "Galvanized";
      }
      
      // Get the height key
      const heightKey = `${heightOfFenceInFeet}'`;
      
      // Get unit cost and SKU
      const meshUnitCost = meshTypeOptions[meshMaterial]?.[meshGaugeType]?.[heightKey]?.price || 0;
      const meshSku = meshTypeOptions[meshMaterial]?.[meshGaugeType]?.[heightKey]?.sku || null;
      
      const meshSubtotal = meshQuantity * meshUnitCost;

      newCosts["Chain Link Mesh"] = {
        quantity: meshQuantity,
        unitCost: meshUnitCost,
        standardLength: 50,
        subtotal: meshSubtotal,
        sku: meshSku
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
        // Rails are typically 21ft length
        const railLength = "21ft";
        
        if (postCosts[material]?.[postThickness]?.[topRailDiameter]?.[railLength]) {
          return postCosts[material][postThickness][topRailDiameter][railLength];
        }
        
        // Fallback to 20ft if 21ft is not available
        if (postCosts[material]?.[postThickness]?.[topRailDiameter]?.["20ft"]) {
          return postCosts[material][postThickness][topRailDiameter]["20ft"];
        }
        
        return { price: 0, sku: "" };
      };

      const railCost = getRailUnitCost();
      // Standard length for rails is 21 feet
      const standardLength = 21;
      const railQuantity = Math.ceil(railsNeeded);
      const subtotal = railQuantity * railCost.price;
      
      newCosts["Top/Middle/Bottom Rails"] = {
        quantity: railQuantity,
        unitCost: railCost.price,
        standardLength: standardLength,
        subtotal: subtotal,
        sku: railCost.sku
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
        // Formula: number of sleeves = number of top rails
        const sleeveQuantity = railQuantity;
        const sleeveSubtotal = sleeveQuantity * sleeveUnitCost;
        
        newCosts["Fence Sleeve"] = {
          quantity: sleeveQuantity,
          unitCost: sleeveUnitCost,
          standardLength: null,
          subtotal: sleeveSubtotal
        };

        // Rail clamps calculation
        const getRailClampUnitCost = () => {
          if (railClampsCost[material] && 
              railClampsCost[material][linePostDiameter] && 
              railClampsCost[material][linePostDiameter][topRailDiameter]) {
            return railClampsCost[material][linePostDiameter][topRailDiameter];
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
        return slatCost[height] || 0;
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
      const { size, cost, sku } = findPostSize(material, postThickness, linePostDiameter, parseInt(heightOfFence) + lineDepthAdjustment + barbedWireAdjustment);
      const postHeight = size ? parseFloat(size.replace('ft', '')) : 0;
      const costPerPost = cost;
      const subtotal = linePostsNeeded * costPerPost;

      newCosts["Line posts"] = {
        quantity: linePostsNeeded,
        unitCost: costPerPost,
        postHeight: postHeight,
        subtotal: subtotal,
        sku: sku
      };
    }

    // Wedge Anchor calculation
    if (numberOfFlangedPosts > 0 || numberOfFlangedPostsOffCentered > 0) {
      // Flanged posts centered
      if (numberOfFlangedPosts > 0) {
        const { size, cost, sku } = findPostSize(material, flangedPostThickness, flangedPostDiameter, parseInt(heightOfFence) + barbedWireAdjustment);
        const postHeight = size ? parseFloat(size.replace('ft', '')) : 0;
        const costPerPost = cost;
        const subtotal = numberOfFlangedPosts * costPerPost;

        newCosts["Flanged posts (centered)"] = {
          quantity: numberOfFlangedPosts,
          unitCost: costPerPost,
          postHeight: postHeight,
          subtotal: subtotal,
          sku: sku
        };
      }

      // Flanged posts off-centered
      if (numberOfFlangedPostsOffCentered > 0) {
        const { size, cost, sku } = findPostSize(material, flangedPostOffCenteredThickness, flangedPostOffCenteredDiameter, parseInt(heightOfFence) + barbedWireAdjustment);
        const postHeight = size ? parseFloat(size.replace('ft', '')) : 0;
        const costPerPost = cost;
        const subtotal = numberOfFlangedPostsOffCentered * costPerPost;

        newCosts["Flanged posts (off-centered)"] = {
          quantity: numberOfFlangedPostsOffCentered,
          unitCost: costPerPost,
          postHeight: postHeight,
          subtotal: subtotal,
          sku: sku
        };
      }

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
      
      // Get the appropriate fence tie size based on post diameter
      const tieSize = linePostDiameter === "1 3/8" || linePostDiameter === "1 5/8" ? "6 1/2" : "8 1/4";
      
      // Set unit cost and SKU based on material and size
      const fenceTiesUnitCost = fenceTiesOptions[material]?.[tieSize]?.price || 0;
      const fenceTiesSku = fenceTiesOptions[material]?.[tieSize]?.sku || null;
      
      const fenceTiesSubtotal = fenceTiesQuantity * fenceTiesUnitCost;

      newCosts["Fence Ties (100 pc)"] = {
        quantity: fenceTiesQuantity,
        unitCost: fenceTiesUnitCost,
        standardLength: 100, // per 100pc
        subtotal: fenceTiesSubtotal,
        sku: fenceTiesSku
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
    if (numberOfSlidingGates && numberOfSlidingGates > 0) {
      const rollersQuantity = numberOfSlidingGates * 4;
      const rollersUnitCost = rollerPrice.price;
      const rollersSubtotal = rollersQuantity * rollersUnitCost;

      newCosts["Cantilever/Sliding Gate Rollers"] = {
        quantity: rollersQuantity,
        unitCost: rollersUnitCost,
        standardLength: null,
        subtotal: rollersSubtotal
      };
    }

    // Cantilever/sliding gate latch calculation
    const cantileverLatchCosts = {
      "2 7/8": { price: 18.50, sku: "10041" },
      "4": { price: 23.14, sku: "10042" }
    };
    if (numberOfSlidingGates && numberOfSlidingGates > 0) {
      const latchQuantity = numberOfSlidingGates;
      const latchUnitCost = cantileverLatchCosts[slidingGatePostDiameter]?.price || cantileverLatchCosts["4"].price; // Default to 4" latch if specific size not available
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
      // We'll return an object with separate costs for male and female hinges
      let costs = {
        maleHinges: { quantity: 0, cost: 0, details: [] },
        femaleHinges: { quantity: 0, cost: 0, details: [] }
      };
      
      const coating = material.toLowerCase() === 'black' ? 'black' : 'galvanized';

      // Single gates
      if (numberOfSingleGates && numberOfSingleGates > 0) {
        // Check if the selected post diameter exists in the hinge costs
        if (maleGateHingeCosts[coating] && maleGateHingeCosts[coating][singleGatePostDiameter]) {
          // Male hinges - 2 per single gate
          const maleHingePrice = maleGateHingeCosts[coating][singleGatePostDiameter].price || 0;
          const maleSku = maleGateHingeCosts[coating][singleGatePostDiameter].sku || '';
          const maleQuantity = numberOfSingleGates * 2; // 2 per gate
          
          costs.maleHinges.quantity += maleQuantity;
          costs.maleHinges.cost += maleHingePrice * maleQuantity;
          costs.maleHinges.details.push({
            type: 'Single Gate',
            size: singleGatePostDiameter,
            sku: maleSku,
            price: maleHingePrice,
            quantity: maleQuantity
          });
          
          // Female hinges - 2 per single gate
          // Find the closest matching female hinge size
          const femaleSizes = Object.keys(femaleGateHingeCosts[coating] || {}).filter(size => 
            femaleGateHingeCosts[coating][size] !== null
          );
          const femaleSize = femaleSizes.length > 0 ? femaleSizes[0] : null;
          
          if (femaleSize) {
            const femaleHingePrice = femaleGateHingeCosts[coating][femaleSize].price || 0;
            const femaleSku = femaleGateHingeCosts[coating][femaleSize].sku || '';
            const femaleQuantity = numberOfSingleGates * 2; // 2 per gate
            
            costs.femaleHinges.quantity += femaleQuantity;
            costs.femaleHinges.cost += femaleHingePrice * femaleQuantity;
            costs.femaleHinges.details.push({
              type: 'Single Gate',
              size: femaleSize,
              sku: femaleSku,
              price: femaleHingePrice,
              quantity: femaleQuantity
            });
          }
        }
      }

      // Double gates
      if (numberOfDoubleGates && numberOfDoubleGates > 0) {
        // Check if the selected post diameter exists in the hinge costs
        if (maleGateHingeCosts[coating] && maleGateHingeCosts[coating][doubleGatePostDiameter]) {
          // Male hinges - 4 per double gate (2 per leaf)
          const maleHingePrice = maleGateHingeCosts[coating][doubleGatePostDiameter].price || 0;
          const maleSku = maleGateHingeCosts[coating][doubleGatePostDiameter].sku || '';
          const maleQuantity = numberOfDoubleGates * 4; // 4 per double gate
          
          costs.maleHinges.quantity += maleQuantity;
          costs.maleHinges.cost += maleHingePrice * maleQuantity;
          costs.maleHinges.details.push({
            type: 'Double Gate',
            size: doubleGatePostDiameter,
            sku: maleSku,
            price: maleHingePrice,
            quantity: maleQuantity
          });
          
          // Female hinges - 4 per double gate (2 per leaf)
          // Find the closest matching female hinge size
          const femaleSizes = Object.keys(femaleGateHingeCosts[coating] || {}).filter(size => 
            femaleGateHingeCosts[coating][size] !== null
          );
          const femaleSize = femaleSizes.length > 0 ? femaleSizes[0] : null;
          
          if (femaleSize) {
            const femaleHingePrice = femaleGateHingeCosts[coating][femaleSize].price || 0;
            const femaleSku = femaleGateHingeCosts[coating][femaleSize].sku || '';
            const femaleQuantity = numberOfDoubleGates * 4; // 4 per double gate
            
            costs.femaleHinges.quantity += femaleQuantity;
            costs.femaleHinges.cost += femaleHingePrice * femaleQuantity;
            costs.femaleHinges.details.push({
              type: 'Double Gate',
              size: femaleSize,
              sku: femaleSku,
              price: femaleHingePrice,
              quantity: femaleQuantity
            });
          }
        }
      }

      return costs;
    };

      // Only add gate hardware if there are non-sliding gates
if ((numberOfSingleGates && numberOfSingleGates > 0) || (numberOfDoubleGates && numberOfDoubleGates > 0)) {
  const gateHardwareCosts = calculateGateHardwareCost();
  
  if (gateHardwareCosts.maleHinges.quantity > 0) {
    newCosts["Male Gate Hinges"] = {
      quantity: gateHardwareCosts.maleHinges.quantity,
      unitCost: gateHardwareCosts.maleHinges.cost / gateHardwareCosts.maleHinges.quantity,
      standardLength: null,
      subtotal: gateHardwareCosts.maleHinges.cost,
      details: gateHardwareCosts.maleHinges.details
    };
  }
  
  if (gateHardwareCosts.femaleHinges.quantity > 0) {
    newCosts["Female Gate Hinges"] = {
      quantity: gateHardwareCosts.femaleHinges.quantity,
      unitCost: gateHardwareCosts.femaleHinges.cost / gateHardwareCosts.femaleHinges.quantity,
      standardLength: null,
      subtotal: gateHardwareCosts.femaleHinges.cost,
      details: gateHardwareCosts.femaleHinges.details
    };
  }
}

// Single gate calculation
// DEPRECATED: Using dynamic gate pricing below
/*
if (numberOfSingleGates && numberOfSingleGates > 0) {
  const singleGateRate = 150.0; // $150.00 per gate
  const singleGateSubtotal = numberOfSingleGates * singleGateRate;

  newCosts["Single Gate"] = {
    quantity: numberOfSingleGates,
    unitCost: singleGateRate,
    subtotal: singleGateSubtotal
  };
}

// Double gate calculation
if (numberOfDoubleGates && numberOfDoubleGates > 0) {
  const doubleGateRate = 300.0; // $300.00 per gate
  const doubleGateSubtotal = numberOfDoubleGates * doubleGateRate;

  newCosts["Double Gate"] = {
    quantity: numberOfDoubleGates,
    unitCost: doubleGateRate,
    subtotal: doubleGateSubtotal
  };
}
*/

// Calculate dynamic gate costs using the findMatchingGate function
const hasGates = numberOfSingleGates > 0 || numberOfDoubleGates > 0 || numberOfSlidingGates > 0;
if (hasGates) {
  const dynamicGateCosts = calculateGateCosts();
  
  // Add each gate cost to the newCosts object
  Object.keys(dynamicGateCosts).forEach(gateType => {
    newCosts[gateType] = dynamicGateCosts[gateType];
  });
}

// Line clearing calculation
let outsideLabor = 0;
if (needsLineClearing && lineClearingFootage && lineClearingFootage > 0) {
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
if (needsTearOut && tearOutFootage && tearOutFootage > 0) {
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
}

// Update outside labor total
setOutsideLaborTotal(outsideLabor);

// Calculate concrete costs
const calculateConcreteNeeded = () => {
  if (!heightOfFence) return null;

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

  // Duckbill gate stop post holes (9" diameter and 18" deep)
  if (hasDuckbillGateStop && numberOfDoubleGates && numberOfDoubleGates > 0) {
    const duckbillHoleVolume = calculateHoleVolume(9, 18);
    const duckbillPostsQuantity = numberOfDoubleGates * 2; // 2 duckbill posts per double gate
    totalVolume += duckbillHoleVolume * duckbillPostsQuantity;
  }

  // Convert cubic inches to bags (multiply by 2.22 and divide by 1728 to convert from cubic inches)
  const bagsNeeded = Math.ceil((totalVolume / 1728) * 2.22);
  const cubicYardsNeeded = typeOfConcrete === "Truck" ? Math.ceil(bagsNeeded / 59) : null;

  return {
    bagsNeeded,
    cubicYardsNeeded
  };
};

// Calculate concrete costs
const concreteCalculation = calculateConcreteNeeded();
if (concreteCalculation && typeOfConcrete) {
  if (typeOfConcrete === "Truck") {
    const cubicYardsNeeded = concreteCalculation.cubicYardsNeeded;
    const unitCost = 170; // Truck price per cubic yard
    const subtotal = cubicYardsNeeded * unitCost;
    
    newCosts["Concrete (Truck)"] = {
      quantity: cubicYardsNeeded,
      unitCost: unitCost,
      standardLength: null,
      subtotal: subtotal,
      sku: "10423" // Truck SKU
    };
  } else if (typeOfConcrete === "Red") {
    const bagsNeeded = concreteCalculation.bagsNeeded;
    const unitCost = 8.76; // Red 50 pound price
    const subtotal = bagsNeeded * unitCost;
    
    newCosts[`Concrete (Red 50 pound)`] = {
      quantity: bagsNeeded,
      unitCost: unitCost,
      standardLength: null,
      subtotal: subtotal,
      sku: "30001" // Red 50 pound SKU
    };
  } else if (typeOfConcrete === "Yellow") {
    const bagsNeeded = concreteCalculation.bagsNeeded;
    const unitCost = 6.09; // Yellow 60 pound price
    const subtotal = bagsNeeded * unitCost;
    
    newCosts[`Concrete (Yellow 60 pound)`] = {
      quantity: bagsNeeded,
      unitCost: unitCost,
      standardLength: null,
      subtotal: subtotal,
      sku: "30004" // Yellow 60 pound SKU
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
// Remove Total and Grand Total entries - they're not needed as we calculate the total in the table
// newCosts["Total"] = totalCost;
// newCosts["Grand Total"] = totalCost * 1.0825; // Adding 8.25% tax

setCosts(newCosts);
}, [heightOfFence, totalLinearLength, numberOfEndTerminals, numberOfSolitaryPosts, numberOfCorners, 
    numberOfSingleGates, numberOfDoubleGates, numberOfSlidingGates, numberOfFlangedPosts, numberOfFlangedPostsOffCentered, 
    extraRail, hasHBrace, topRailDiameter, material, depthOfHoles, linePostHoleDepth,
    commercialOrResidential, threeStrandBarbedWire, doubleGateHoleDepth, slidingGatePostDiameter, slidingGateHoleDepth,
    hasDuckbillGateStop, duckbillThickness, numberOfPulls, pullLengths, postSpacing, 
    linePostDiameter, terminalPostDiameter, cornerPostDiameter, meshType, hasFenceSlats, hasTrussRods,
    needsLineClearing, lineClearingFootage, estimatedDays, typeOfConcrete]);

// Update labor totals when relevant values change
useEffect(() => {
  setInHouseLaborTotal(calculateInHouseLaborTotal());
  setOutsideLaborTotal(calculateOutsideLaborTotal());
}, [
  totalLinearLength, 
  heightOfFenceInFeet, 
  numberOfSingleGates, 
  numberOfDoubleGates, 
  numberOfSlidingGates, 
  slidingGates, 
  needsLineClearing, 
  lineClearingFootage, 
  needsTearOut, 
  tearOutFootage, 
  estimatedDays
]);

// Calculate costs when inputs change
useEffect(() => {
  calculateCosts();
}, [calculateCosts]);

// Auto-calculate total linear length from pull lengths
useEffect(() => {
  if (pullLengths.length > 0) {
    const totalLength = pullLengths.reduce((sum, length) => sum + (parseFloat(length) || 0), 0);
    setTotalLinearLength(totalLength.toString());
  } else {
    setTotalLinearLength('0');
  }
}, [pullLengths]);

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

// Function to check if coating and mesh type mismatch
const checkCoatingMeshMismatch = () => {
  // Check if Black coating is selected with Galvanized mesh
  if (material === 'Black' && (meshType === '9G' || meshType === '11G')) {
    return true;
  }
  // Check if Galvanized coating is selected with Black mesh
  if (material === 'Galvanized' && (meshType === '8F' || meshType === '9F')) {
    return true;
  }
  return false;
};

// Function to get material description based on key and value
const getMaterialDescription = (key, value) => {
  // Default description is the value itself
  if (!key || !value) return value;

  // For custom materials, return their descriptions
  if (key.startsWith('custom-material')) {
    const baseKey = key.replace('-quantity', '').replace('-unitCost', '');
    const description = materialDescriptions[`${baseKey}-description`];
    return description || value;
  }

  // For standard materials, return formatted descriptions
  const materialMap = {
    'line-posts': 'Line Posts',
    'terminal-posts': 'Terminal Posts',
    'corner-posts': 'Corner Posts',
    'top-rail': 'Top Rail',
    'tension-wire': 'Tension Wire',
    'mesh': 'Chain Link Mesh',
    'tie-wire': 'Tie Wire',
    'tension-bar': 'Tension Bar',
    'dome-caps': 'Dome Caps',
    'rail-ends': 'Rail Ends',
    'tension-bands': 'Tension Bands',
    'rail-bands': 'Rail Bands',
    'bolts': 'Bolts',
    'nuts': 'Nuts',
    'concrete': 'Concrete'
  };

  // Return mapped description or the original value
  return materialMap[key] || value;
};

// Calculate the total outside labor cost
const calculateSubLaborTotal = () => {
  let total = 0;
  
  // Calculate labor cost for fence installation
  if (totalLinearLength && heightOfFence) {
    const linearFeet = Number(totalLinearLength) || 0;
    const laborRate = 12; // $12 per linear foot (example rate)
    total += linearFeet * laborRate;
  }
  
  // Add labor costs for gates
  if (numberOfSingleGates && numberOfSingleGates > 0) {
    total += numberOfSingleGates * 150; // $150 labor per single gate (example rate)
  }
  
  if (numberOfDoubleGates && numberOfDoubleGates > 0) {
    total += numberOfDoubleGates * 250; // $250 labor per double gate (example rate)
  }
  
  if (numberOfSlidingGates && numberOfSlidingGates > 0) {
    total += numberOfSlidingGates * 350; // $350 labor per sliding gate (example rate)
  }
  
  // Update the outside labor total state
  setOutsideLaborTotal(total);
  
  return total;
};

// Render the total linear length section
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

// Render the height of fence section
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

// Calculate total material cost
const calculateTotalMaterialCost = () => {
  let total = 0;
  
  // Sum up all subtotals from the costs object
  if (costs) {
    Object.entries(costs).forEach(([item, details]) => {
      if (details && details.subtotal !== undefined && details.subtotal !== null) {
        total += Number(details.subtotal) || 0;
      }
    });
  }
  
  return total;
};

// Function to calculate total material cost including custom materials
const calculateTotalMaterialCostWithCustom = () => {
  let total = calculateTotalMaterialCost() || 0;

  // Add custom material costs
  for (let i = 0; i < 5; i++) {
    const customKey = `custom-material-${i}`;
    const quantity = Number(materialDescriptions[`${customKey}-quantity`]) || 0;
    const unitCost = Number(materialDescriptions[`${customKey}-unitCost`]) || 0;

    if (quantity > 0 && unitCost > 0) {
      total += quantity * unitCost;
    }
  }

  return total;
};

// Calculate costs for gates based on specifications
const calculateGateCosts = () => {
  let gateCosts = {};
  
  // Process single gates
  if (numberOfSingleGates && numberOfSingleGates > 0) {
    // Create specs object for single gate
    const singleGateSpecs = {
      type: 'single',
      commercial: gateCommercialResidential,
      barbWire: gateBarbed,
      material: `${gateFinish} ${gateFrameDiameter}`,
      height: singleGateSize.split('x')[0].trim(),
      width: singleGateWidthFeet ? `${singleGateWidthFeet}'${singleGateWidthInches ? ` ${singleGateWidthInches}"` : ''}` : '4'
    };
    
    // Find the matching gate or the next larger size using the imported function
    const singleGateMatch = findMatchingGate(singleGateSpecs);
    
    if (singleGateMatch) {
      gateCosts["Single Gate"] = {
        quantity: numberOfSingleGates,
        unitCost: singleGateMatch.price,
        subtotal: numberOfSingleGates * singleGateMatch.price,
        sku: singleGateMatch.itemNumber || 'CUSTOM-SINGLE',
        details: `${singleGateSpecs.height} x ${singleGateSpecs.width}`,
        name: singleGateMatch.name
      };
    } else {
      // Fallback if no match found
      const fallbackPrice = 150.0;
      gateCosts["Single Gate"] = {
        quantity: numberOfSingleGates,
        unitCost: fallbackPrice,
        subtotal: numberOfSingleGates * fallbackPrice,
        sku: 'CUSTOM-SINGLE',
        details: `${singleGateSpecs.height} x ${singleGateSpecs.width} (Custom)`,
        name: `Custom Single Gate - ${gateFinish} ${gateFrameDiameter}`
      };
    }
  }
  
  // Process double gates
  if (numberOfDoubleGates && numberOfDoubleGates > 0) {
    // Create specs object for double gate
    const doubleGateSpecs = {
      type: 'double',
      commercial: gateCommercialResidential,
      barbWire: gateBarbed,
      material: `${gateFinish} ${gateFrameDiameter}`,
      height: doubleGateSize.split('x')[0].trim(),
      width: doubleGateWidthFeet ? `${doubleGateWidthFeet}'${doubleGateWidthInches ? ` ${doubleGateWidthInches}"` : ''}` : '10'
    };
    
    // Find the matching gate or the next larger size using the imported function
    const doubleGateMatch = findMatchingGate(doubleGateSpecs);
    
    if (doubleGateMatch) {
      gateCosts["Double Gate"] = {
        quantity: numberOfDoubleGates,
        unitCost: doubleGateMatch.price,
        subtotal: numberOfDoubleGates * doubleGateMatch.price,
        sku: doubleGateMatch.itemNumber || 'CUSTOM-DOUBLE',
        details: `${doubleGateSpecs.height} x ${doubleGateSpecs.width}`,
        name: doubleGateMatch.name
      };
    } else {
      // Fallback if no match found
      const fallbackPrice = 300.0;
      gateCosts["Double Gate"] = {
        quantity: numberOfDoubleGates,
        unitCost: fallbackPrice,
        subtotal: numberOfDoubleGates * fallbackPrice,
        sku: 'CUSTOM-DOUBLE',
        details: `${doubleGateSpecs.height} x ${doubleGateSpecs.width} (Custom)`,
        name: `Custom Double Gate - ${gateFinish} ${gateFrameDiameter}`
      };
    }
  }
  
  // Process sliding gates
  if (numberOfSlidingGates && numberOfSlidingGates > 0 && slidingGates) {
    // Process each sliding gate individually
    slidingGates.forEach((gate, index) => {
      if (gate) {
        // Create specs object for sliding gate
        const slidingGateSpecs = {
          type: 'sliding',
          commercial: gateCommercialResidential,
          barbWire: gateBarbed,
          material: `${gateFinish} ${gateFrameDiameter}`,
          height: slidingGateSize.split('x')[0].trim(),
          width: gate.widthFeet ? `${gate.widthFeet}'${gate.widthInches ? ` ${gate.widthInches}"` : ''}` : '10'
        };
        
        // Find the matching gate or the next larger size using the imported function
        const slidingGateMatch = findMatchingGate(slidingGateSpecs);
        
        if (slidingGateMatch) {
          gateCosts[`Sliding Gate ${index + 1}`] = {
            quantity: 1,
            unitCost: slidingGateMatch.price,
            subtotal: slidingGateMatch.price,
            sku: slidingGateMatch.itemNumber || `CUSTOM-SLIDING-${index + 1}`,
            details: `${slidingGateSpecs.height} x ${slidingGateSpecs.width}`,
            name: slidingGateMatch.name
          };
        } else {
          // Fallback if no match found
          const fallbackPrice = 450.0;
          gateCosts[`Sliding Gate ${index + 1}`] = {
            quantity: 1,
            unitCost: fallbackPrice,
            subtotal: fallbackPrice,
            sku: `CUSTOM-SLIDING-${index + 1}`,
            details: `${slidingGateSpecs.height} x ${slidingGateSpecs.width} (Custom)`,
            name: `Custom Sliding Gate - ${gateFinish} ${gateFrameDiameter}`
          };
        }
      }
    });
  }
  
  return gateCosts;
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
            {/* Pull Lengths Section - Moved from Pull Section */}
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
                  setPullLengths(new Array(newValue).fill(''));
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

            {/* Total Linear Length */}
            {renderTotalLinearLengthSection()}
            
            {/* Fence Height */}
            {renderHeightOfFenceSection()}
            
            {/* Spacing of Posts */}
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
                  border: `1px solid ${checkCoatingMeshMismatch() ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  width: '100%'
                }}
              >
                <option value="8F">8F (Black)</option>
                <option value="9F">9F (Black)</option>
                <option value="9G">9G (Galv)</option>
                <option value="11G">11G (Galv)</option>
              </select>
              {checkCoatingMeshMismatch() && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Error: Coating type and mesh type do not match. Black coating should be used with Black mesh (8F, 9F) and Galvanized coating should be used with Galvanized mesh (9G, 11G).
                </div>
              )}
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
                onChange={(e) => setNumberOfSingleGates(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  width: '100%'
                }}
              />
              
              {/* Single Gate Details - Moved directly under input and simplified */}
              {numberOfSingleGates && numberOfSingleGates > 0 && (
                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                  {Array.from({ length: parseInt(numberOfSingleGates) }).map((_, index) => (
                    <div key={`single-gate-${index}`} style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row', 
                      gap: '0.5rem', 
                      alignItems: isMobile ? 'stretch' : 'center',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.375rem'
                    }}>
                      <Typography variant="body2" sx={{ minWidth: '80px' }}>Gate {index + 1}:</Typography>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                          Width
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Feet
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={singleGateWidthFeet}
                              onChange={(e) => {
                                const newFeet = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setSingleGateWidthFeet(newFeet);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = newFeet + (singleGateWidthInches > 0 ? 1 : 0);
                                const height = singleGateSize.split('x')[0].trim();
                                setSingleGateSize(`${height}x${totalWidth}`);
                              }}
                              style={{
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                padding: '0.5rem',
                                width: '100%'
                              }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Inches
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={singleGateWidthInches}
                              onChange={(e) => {
                                const newInches = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setSingleGateWidthInches(newInches);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = singleGateWidthFeet + (newInches > 0 ? 1 : 0);
                                const height = singleGateSize.split('x')[0].trim();
                                setSingleGateSize(`${height}x${totalWidth}`);
                              }}
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
                      <FormControl fullWidth={isMobile} sx={{ flex: 1 }}>
                        <InputLabel>Hinge Type</InputLabel>
                        <Select
                          value={singleGateHingeType}
                          onChange={(e) => setSingleGateHingeType(e.target.value)}
                        >
                          <MenuItem value="residential">Residential</MenuItem>
                          <MenuItem value="bulldog">Bulldog</MenuItem>
                          <MenuItem value="180degree">180 Degree</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                Number of Double Swing Gates
              </label>
              <input
                type="number"
                min="0"
                value={numberOfDoubleGates}
                onChange={(e) => setNumberOfDoubleGates(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  width: '100%'
                }}
              />
              
              {/* Duckbill gate stop option */}
              {numberOfDoubleGates && numberOfDoubleGates > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasDuckbillGateStop}
                        onChange={(e) => setHasDuckbillGateStop(e.target.checked)}
                      />
                    }
                    label="Add duckbill gate stop?"
                  />
                  {hasDuckbillGateStop && (
                    <div style={{ marginTop: '0.5rem', marginLeft: '2rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                        Duckbill Thickness
                      </label>
                      <select
                        value={duckbillThickness}
                        onChange={(e) => setDuckbillThickness(e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          width: '100%',
                          maxWidth: '300px'
                        }}
                      >
                        <option value="SCH 20">SCH 20</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
              
              {/* Double Gate Details - Moved directly under input and simplified */}
              {numberOfDoubleGates && numberOfDoubleGates > 0 && (
                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                  {Array.from({ length: parseInt(numberOfDoubleGates) }).map((_, index) => (
                    <div key={`double-gate-${index}`} style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row', 
                      gap: '0.5rem', 
                      alignItems: isMobile ? 'stretch' : 'center',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.375rem'
                    }}>
                      <Typography variant="body2" sx={{ minWidth: '80px' }}>Gate {index + 1}:</Typography>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                          Width
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Feet
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={doubleGateWidthFeet}
                              onChange={(e) => {
                                const newFeet = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setDoubleGateWidthFeet(newFeet);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = newFeet + (doubleGateWidthInches > 0 ? 1 : 0);
                                const height = doubleGateSize.split('x')[0].trim();
                                setDoubleGateSize(`${height}x${totalWidth}`);
                              }}
                              style={{
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                padding: '0.5rem',
                                width: '100%'
                              }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Inches
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={doubleGateWidthInches}
                              onChange={(e) => {
                                const newInches = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setDoubleGateWidthInches(newInches);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = doubleGateWidthFeet + (newInches > 0 ? 1 : 0);
                                const height = doubleGateSize.split('x')[0].trim();
                                setDoubleGateSize(`${height}x${totalWidth}`);
                              }}
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
                      <FormControl fullWidth={isMobile} sx={{ flex: 1 }}>
                        <InputLabel>Hinge Type</InputLabel>
                        <Select
                          value={doubleGateHingeType}
                          onChange={(e) => setDoubleGateHingeType(e.target.value)}
                        >
                          <MenuItem value="residential">Residential</MenuItem>
                          <MenuItem value="bulldog">Bulldog</MenuItem>
                          <MenuItem value="180degree">180 Degree</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sliding Gate */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                Number of Sliding Gates
              </label>
              <input
                type="number"
                min="0"
                value={numberOfSlidingGates}
                onChange={(e) => setNumberOfSlidingGates(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  width: '100%'
                }}
              />
              
              {/* Sliding Gate Details - Moved directly under input and simplified */}
              {numberOfSlidingGates && numberOfSlidingGates > 0 && (
                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                  {Array.from({ length: parseInt(numberOfSlidingGates) }).map((_, index) => (
                    <div key={`sliding-gate-${index}`} style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row', 
                      gap: '0.5rem', 
                      alignItems: isMobile ? 'stretch' : 'center',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.375rem'
                    }}>
                      <Typography variant="body2" sx={{ minWidth: '80px' }}>Gate {index + 1}:</Typography>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                          Width
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Feet
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={slidingGateWidthFeet}
                              onChange={(e) => {
                                const newFeet = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setSlidingGateWidthFeet(newFeet);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = newFeet + (slidingGateWidthInches > 0 ? 1 : 0);
                                const height = slidingGateSize.split('x')[0].trim();
                                setSlidingGateSize(`${height}x${totalWidth}`);
                              }}
                              style={{
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                padding: '0.5rem',
                                width: '100%'
                              }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                              Inches
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={slidingGateWidthInches}
                              onChange={(e) => {
                                const newInches = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setSlidingGateWidthInches(newInches);
                                // For pricing calculations, round up to the nearest foot
                                const totalWidth = slidingGateWidthFeet + (newInches > 0 ? 1 : 0);
                                const height = slidingGateSize.split('x')[0].trim();
                                setSlidingGateSize(`${height}x${totalWidth}`);
                              }}
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Additional Information Section */}
      <Accordion TransitionProps={{ unmountOnExit: true }}>
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
              {threeStrandBarbedWire && (
                <div style={{ marginTop: '0.5rem', marginLeft: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                    Barbed Wire Gauge
                  </label>
                  <select
                    value={barbedWireGauge}
                    onChange={(e) => setBarbedWireGauge(e.target.value)}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      padding: '0.5rem',
                      width: '100%',
                      maxWidth: '300px'
                    }}
                  >
                    <option value="15.5 gauge (high tensile)">15.5 gauge (high tensile)</option>
                    <option value="12.5 gauge (low tensile)">12.5 gauge (low tensile)</option>
                  </select>
                </div>
              )}
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
                  onChange={(e) => setTearOutFootage(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
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
                  onChange={(e) => setLineClearingFootage(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
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
            {/* Single material costs table that includes everything */}
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Material</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Unit Cost</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Regular materials - Reordered according to client's specification */}
                  {Object.entries(costs)
                    .sort((a, b) => {
                      // Define the order of materials
                      const order = [
                        "Terminal posts",
                        "Corner posts",
                        "Line posts",
                        "Single gate posts",
                        "Double gate posts",
                        "Sliding Gate Posts",
                        "Duckbill gate stop posts",
                        "Top/Middle/Bottom Rails",
                        "Fence Mesh",
                        "Dome Cap",
                        "Tension Bands",
                        "Brace Bands",
                        "Eye Tops",
                        "Loop Caps",
                        "Rail Clamps",
                        "Barb Arms",
                        "Tension Bars",
                        "Rail Ends",
                        "Nuts and Bolts",
                        "Tie Wire",
                        "Barbed Wire",
                        "3 Strand Barbed Wire",
                        "Concrete (Red)",
                        "Concrete (Yellow)",
                        "Concrete (Truck)",
                        "Fence Slats",
                        "Line clearing",
                        "Tear out"
                      ];
                      
                      // Find index of each item in the order array
                      const indexA = order.findIndex(item => a[0].includes(item));
                      const indexB = order.findIndex(item => b[0].includes(item));
                      
                      // If both items are in the order array, sort by their position
                      if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB;
                      }
                      
                      // If only one item is in the order array, prioritize it
                      if (indexA !== -1) return -1;
                      if (indexB !== -1) return 1;
                      
                      // If neither item is in the order array, maintain original order
                      return 0;
                    })
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell align="right">
                          {value && value.quantity !== undefined ? value.quantity : '-'}
                          {value && value.standardLength ? ` (${value.standardLength}' lengths)` : ''}
                        </TableCell>
                        <TableCell>
                          {editingDescription === key ? (
                            <input
                              type="text"
                              value={materialDescriptions[key] || getMaterialDescription(key, value)}
                              onChange={(e) => handleDescriptionChange(key, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(key)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {getMaterialDescription(key, value)}
                              <span style={{ marginLeft: '4px', color: '#6b7280', fontSize: '0.75rem' }}>
                                (click to edit)
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          ${value && value.unitCost !== undefined ? Number(value.unitCost).toFixed(2) : '0.00'}
                        </TableCell>
                        <TableCell align="right">
                          ${value && value.subtotal !== undefined ? Number(value.subtotal).toFixed(2) : '0.00'}
                        </TableCell>
                      </TableRow>
                    ))}
                    
                  {/* Custom material rows - Add 5 empty rows for custom materials */}
                  {[...Array(5)].map((_, index) => {
                    const customKey = `custom-material-${index}`;
                    return (
                      <TableRow key={customKey}>
                        <TableCell>
                          {editingDescription === `${customKey}-name` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`${customKey}-name`] || ''}
                              onChange={(e) => handleDescriptionChange(`${customKey}-name`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              placeholder="Custom material name"
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`${customKey}-name`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`${customKey}-name`] || 'Custom material (click to edit)'}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {editingDescription === `${customKey}-quantity` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`${customKey}-quantity`] || ''}
                              onChange={(e) => handleDescriptionChange(`${customKey}-quantity`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`${customKey}-quantity`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`${customKey}-quantity`] || '-'}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingDescription === `${customKey}-description` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`${customKey}-description`] || ''}
                              onChange={(e) => handleDescriptionChange(`${customKey}-description`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              placeholder="Description"
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`${customKey}-description`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`${customKey}-description`] || 'Click to add description'}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {editingDescription === `${customKey}-unitCost` ? (
                            <input
                              type="number"
                              value={materialDescriptions[`${customKey}-unitCost`] || ''}
                              onChange={(e) => handleDescriptionChange(`${customKey}-unitCost`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`${customKey}-unitCost`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              ${materialDescriptions[`${customKey}-unitCost`] ? Number(materialDescriptions[`${customKey}-unitCost`]).toFixed(2) : '0.00'}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          ${(materialDescriptions[`${customKey}-quantity`] && materialDescriptions[`${customKey}-unitCost`]) 
                            ? (Number(materialDescriptions[`${customKey}-quantity`]) * Number(materialDescriptions[`${customKey}-unitCost`])).toFixed(2) 
                            : '0.00'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Single Gate Hardware */}
                  {numberOfSingleGates && numberOfSingleGates > 0 && singleGates.map((gate, index) => (
                    gate.size && (
                      <TableRow key={`single-gate-${index}`}>
                        <TableCell component="th" scope="row">
                          Single Gate Hardware (Gate {index + 1}, {gate.size}")
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell>
                          {editingDescription === `single-gate-${index}` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`single-gate-${index}`] || 
                                `${gate.hingeType === 'residential' ? 
                                  `Residential hinges for ${gate.size}" gate` 
                                  : `${gate.hingeType} hinges for ${gate.size}" gate`}
                                ${gate.latchType ? ` with ${gate.latchType} latch` : ''}`
                              }
                              onChange={(e) => handleDescriptionChange(`single-gate-${index}`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`single-gate-${index}`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`single-gate-${index}`] || 
                                `${gate.hingeType === 'residential' ? 
                                  `Residential hinges for ${gate.size}" gate` 
                                  : `${gate.hingeType} hinges for ${gate.size}" gate`}
                                ${gate.latchType ? ` with ${gate.latchType} latch` : ''}`
                              }
                              <span style={{ marginLeft: '4px', color: '#6b7280', fontSize: '0.75rem' }}>
                                (click to edit)
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateSingleGateHardwareCost(gate)}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateSingleGateHardwareCost(gate)}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                  
                  {/* Double Gate Hardware */}
                  {numberOfDoubleGates && numberOfDoubleGates > 0 && doubleGates.map((gate, index) => (
                    gate.size && (
                      <TableRow key={`double-gate-${index}`}>
                        <TableCell component="th" scope="row">
                          Double Gate Hardware (Gate {index + 1}, {gate.size})
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell>
                          {editingDescription === `double-gate-${index}` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`double-gate-${index}`] || 
                                `${gate.hingeType === 'residential' ? 
                                  `Residential hinges for ${gate.size}" gate` 
                                  : `${gate.hingeType} hinges for ${gate.size}" gate`}
                                ${gate.latchType ? ` with ${gate.latchType} latch` : ''}
                                ${hasDuckbillGateStop ? ' with duckbill gate stop' : ''}`
                              }
                              onChange={(e) => handleDescriptionChange(`double-gate-${index}`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`double-gate-${index}`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`double-gate-${index}`] || 
                                `${gate.hingeType === 'residential' ? 
                                  `Residential hinges for ${gate.size}" gate` 
                                  : `${gate.hingeType} hinges for ${gate.size}" gate`}
                                ${gate.latchType ? ` with ${gate.latchType} latch` : ''}
                                ${hasDuckbillGateStop ? ' with duckbill gate stop' : ''}`
                              }
                              <span style={{ marginLeft: '4px', color: '#6b7280', fontSize: '0.75rem' }}>
                                (click to edit)
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateDoubleGateHardwareCost(gate)}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateDoubleGateHardwareCost(gate)}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                  
                  {/* Sliding Gate Hardware */}
                  {numberOfSlidingGates && numberOfSlidingGates > 0 && slidingGates.map((gate, index) => (
                    gate.size && (
                      <TableRow key={`sliding-gate-${index}`}>
                        <TableCell component="th" scope="row">
                          Sliding Gate Hardware (Gate {index + 1}, {gate.size})
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell>
                          {editingDescription === `sliding-gate-${index}` ? (
                            <input
                              type="text"
                              value={materialDescriptions[`sliding-gate-${index}`] || 
                                `Sliding gate hardware for ${gate.size}" gate (rollers, track, and latch)`
                              }
                              onChange={(e) => handleDescriptionChange(`sliding-gate-${index}`, e.target.value)}
                              onBlur={() => setEditingDescription(null)}
                              autoFocus
                              style={{
                                width: '100%',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div 
                              onClick={() => setEditingDescription(`sliding-gate-${index}`)}
                              style={{ cursor: 'pointer', padding: '4px' }}
                            >
                              {materialDescriptions[`sliding-gate-${index}`] || 
                                `Sliding gate hardware for ${gate.size}" gate (rollers, track, and latch)`
                              }
                              <span style={{ marginLeft: '4px', color: '#6b7280', fontSize: '0.75rem' }}>
                                (click to edit)
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateSlidingGateHardwareCost(gate)}
                        </TableCell>
                        <TableCell align="right">
                          ${calculateSlidingGateHardwareCost(gate)}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                  
                  {/* Total Material Cost */}
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell colSpan={4} align="right"><strong>Total Material Cost:</strong></TableCell>
                    <TableCell align="right"><strong>${calculateTotalMaterialCostWithCustom() ? Number(calculateTotalMaterialCostWithCustom()).toFixed(2) : '0.00'}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Material Cost - In-House Labor Section */}
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="in-house-labor-content"
          id="in-house-labor-header"
          sx={{
            backgroundColor: '#f8f8f8',
            '&.Mui-expanded': {
              backgroundColor: '#f0f0f0',
            }
          }}
        >
          <Typography variant="h6" sx={{ color: '#6d2f2c' }}>In-House Labor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Single material costs table that includes everything */}
            {totalLinearLength <= 300 ? (
              <>
                <Typography variant="body1" gutterBottom>
                  In-house labor costs for {totalLinearLength} linear feet of fencing:
                </Typography>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f3f4f6' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Item</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Quantity</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Unit Price</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalLinearLength <= 150 && (
                      <>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Lead Worker (1 day)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>1</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$400.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$400.00</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Crew Worker (1 day)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>1</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$230.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$230.00</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <td colSpan={3} style={{ padding: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>Total In-House Labor Cost:</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>$630.00</td>
                        </tr>
                      </>
                    )}
                    {totalLinearLength > 150 && totalLinearLength <= 250 && (
                      <>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Lead Worker (1 day)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>1</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$400.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$400.00</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Crew Worker (1 day)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>2</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$230.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$460.00</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <td colSpan={3} style={{ padding: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>Total In-House Labor Cost:</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>$860.00</td>
                        </tr>
                      </>
                    )}
                    {totalLinearLength > 250 && totalLinearLength <= 300 && (
                      <>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Lead Worker (2 days)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>2</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$400.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$800.00</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Crew Worker (2 days)</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>2</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$230.00</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$460.00</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <td colSpan={3} style={{ padding: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>Total In-House Labor Cost:</td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>$1,260.00</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '1rem' }}>
                  Note: In-house labor is recommended for projects under 300 linear feet.
                </Typography>
              </>
            ) : (
              <Typography variant="body1">
                In-house labor is not recommended for projects over 300 linear feet. Please refer to the Outside Labor section for subcontractor pricing.
              </Typography>
            )}
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
          <Typography variant="h6" sx={{ color: '#6d2f2c' }}>Outside Labor (Subcontractor)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Item</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Quantity</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Unit Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* Fence Installation */}
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                    Fence Installation ({totalLinearLength} ft, {heightOfFenceInFeet}' height)
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                    {totalLinearLength}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                    ${heightOfFenceInFeet <= 5 ? '5.00' : '7.00'}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                    ${(totalLinearLength * (heightOfFenceInFeet <= 5 ? 5 : 7)).toFixed(2)}
                  </td>
                </tr>

                {/* Single Gates */}
                {numberOfSingleGates > 0 && (
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Single Gate Installation</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{numberOfSingleGates}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$75.00</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                      ${(numberOfSingleGates * 75).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Double Gates */}
                {numberOfDoubleGates > 0 && (
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Double Gate Installation</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{numberOfDoubleGates}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$150.00</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                      ${(numberOfDoubleGates * 150).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Sliding Gates */}
                {numberOfSlidingGates && numberOfSlidingGates > 0 && slidingGates.map((gate, index) => {
                  if (!gate || !gate.widthFeet) return null;
                  const gateWidth = parseInt(gate.widthFeet) || 0;
                  const installCost = gateWidth * 20;
                  return (
                    <tr key={`sliding-gate-labor-${index}`}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                        Sliding Gate Installation (Gate {index + 1}, {gateWidth}' width)
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>1</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                        ${(gateWidth * 20).toFixed(2)}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                        ${installCost.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

                {/* Line Clearing */}
                {needsLineClearing && lineClearingFootage && (
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Line Clearing</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{lineClearingFootage} ft</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$2.50</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                      ${(lineClearingFootage * 2.5).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Tear Out */}
                {needsTearOut && tearOutFootage && (
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tear Out</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{tearOutFootage} ft</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$3.00</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                      ${(tearOutFootage * 3).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Traveling Cost */}
                {estimatedDays > 0 && (
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Traveling Cost</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{estimatedDays} days</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>$50.00</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                      ${(estimatedDays * 50).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Total */}
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <td colSpan={3} style={{ padding: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>Total Outside Labor Cost:</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                    ${calculateSubLaborTotal().toFixed(2)}
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
            materialsCost={calculateTotalMaterialCostWithCustom()} 
            outsideLaborCost={outsideLaborTotal || 0}
            inHouseLaborCost={inHouseLaborTotal || 0}
            isCommercial={commercialOrResidential === "Commercial"}
            onMaxPriceCalculated={handleMaxPriceCalculated}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  </div>
);
};

export default FenceCalculator;