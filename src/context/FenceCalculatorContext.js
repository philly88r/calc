import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import {
  DEFAULT_BARBED_WIRE_GAUGE, DEFAULT_BARBED_WIRE_POINT,
  postCosts, meshCosts, domeCapCosts, fenceTiesCosts, hogRingsCosts,
  wedgeAnchorCosts, eyeTopsCosts, bulldogHingeCosts, femaleGateHingeCosts, maleGateHingeCosts, 
  industrialHingeCosts, rollerPrice, barbedWireCosts, braceBandsCosts, cantileverLatchCosts,
  tensionBandCosts, tensionBarsCosts, slatCosts, nutsAndBoltsCosts, concreteCosts,
  railClampsCosts, barbArmsCosts, MATERIAL_TYPES, THICKNESS_TYPES, DIAMETER_SIZES, PRODUCT_TYPES
} from '../data/costs.js';
import gateData, { findMatchingGate, getAvailableGateHeights, getAvailableGateWidths } from '../GateData.js';
import { calculateLinePostsNeeded, findPostSize, calculateConcreteNeeded, categorizeCosts } from '../utils/costCalculations';
import { findPostProduct, findMeshProduct, findDomeCapProduct } from '../utils/productLookup';
import { gateFormulas, postFormulas } from '../data/materialFormulas';
import questionnaireService from '../services/QuestionnaireService';

const FenceCalculatorContext = createContext();

export const useFenceCalculator = () => useContext(FenceCalculatorContext);

export const FenceCalculatorProvider = ({ children, customerData = {} }) => {
  // General inputs
  const [heightOfFence, setHeightOfFence] = useState('');
  const [heightOfFenceInFeet, setHeightOfFenceInFeet] = useState('8');
  const [totalLinearLength, setTotalLinearLength] = useState('');
  const [numberOfEndTerminals, setNumberOfEndTerminals] = useState('');
  const [numberOfSolitaryPosts, setNumberOfSolitaryPosts] = useState('');
  const [numberOfCorners, setNumberOfCorners] = useState('');
  const [numberOfSingleGates, setNumberOfSingleGates] = useState('');
  const [numberOfDoubleGates, setNumberOfDoubleGates] = useState('');
  const [numberOfSlidingGates, setNumberOfSlidingGates] = useState('');
  const [numberOfFlangedPosts, setNumberOfFlangedPosts] = useState('');
  const [numberOfFlangedPostsOffCentered, setNumberOfFlangedPostsOffCentered] = useState('');
  const [extraRail, setExtraRail] = useState('none');
  const [hasHBrace, setHasHBrace] = useState(false);
  const [material, setMaterial] = useState("Galvanized");
  const [postThickness, setPostThickness] = useState("Industrial SCH 40");
  const [duckbillPostThickness, setDuckbillPostThickness] = useState("Industrial SCH 40");
  const [hasDuckbillGateStop, setHasDuckbillGateStop] = useState(false);
  const [depthOfHoles, setDepthOfHoles] = useState(36);
  const [widthOfHoles, setWidthOfHoles] = useState(8);
  const [linePostHoleDepth, setLinePostHoleDepth] = useState(36);
  const [linePostHoleWidth, setLinePostHoleWidth] = useState(12);
  const [doubleGateHoleDepth, setDoubleGateHoleDepth] = useState(36);
  const [doubleGateHoleWidth, setDoubleGateHoleWidth] = useState(12);
  const [slidingGateHoleDepth, setSlidingGateHoleDepth] = useState(36);
  const [slidingGateHoleWidth, setSlidingGateHoleWidth] = useState(12);
  const [singleGatePostHoleDepth, setSingleGatePostHoleDepth] = useState(36);
  const [singleGatePostHoleWidth, setSingleGatePostHoleWidth] = useState(12);
  const [singleGateHoleDepth, setSingleGateHoleDepth] = useState(36);
  const [singleGateHoleWidth, setSingleGateHoleWidth] = useState(12);
  const [concreteType, setConcreteType] = useState("truck");
  const [commercialOrResidential, setCommercialOrResidential] = useState("Commercial");
  const [hasThreeStrandBarbedWire, setHasThreeStrandBarbedWire] = useState(false);
  const [hasFenceSlats, setHasFenceSlats] = useState(false);
  const [fenceSlatsColor, setFenceSlatsColor] = useState("Black");
  const [hasTrussRods, setHasTrussRods] = useState(false);
  const [numberOfPulls, setNumberOfPulls] = useState('0');

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
  const [flangedPostHoleDepth, setFlangedPostHoleDepth] = useState(36);
  const [flangedPostHoleWidth, setFlangedPostHoleWidth] = useState(12);
  const [flangedPostOffCenteredDiameter, setFlangedPostOffCenteredDiameter] = useState("");
  const [flangedPostOffCenteredThickness, setFlangedPostOffCenteredThickness] = useState("");
  const [flangedPostOffCenteredHoleDepth, setFlangedPostOffCenteredHoleDepth] = useState(36);
  const [flangedPostOffCenteredHoleWidth, setFlangedPostOffCenteredHoleWidth] = useState(12);

  // Pull Section
  const [hasPullSection, setHasPullSection] = useState(false);
  const [numberOfPullSections, setNumberOfPullSections] = useState(1);
  const [pullPostSize, setPullPostSize] = useState('2-3/8');
  const [pullPostGauge, setPullPostGauge] = useState('16');
  const [hasPullBracing, setHasPullBracing] = useState(false);
  const [pullBracingType, setPullBracingType] = useState('Horizontal');
  const [pullLengths, setPullLengths] = useState(['0']);

  // Cost calculation state
  const [costs, setCosts] = useState({});
  const [materialCosts, setMaterialCosts] = useState(0);
  const [laborCosts, setLaborCosts] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Custom items
  const [customItems, setCustomItems] = useState({
    "Custom item 1": { quantity: 0, description: '', unitCost: 0, subtotal: 0, sku: 'CUSTOM-1' },
    "Custom item 2": { quantity: 0, description: '', unitCost: 0, subtotal: 0, sku: 'CUSTOM-2' },
    "Custom item 3": { quantity: 0, description: '', unitCost: 0, subtotal: 0, sku: 'CUSTOM-3' },
    "Custom item 4": { quantity: 0, description: '', unitCost: 0, subtotal: 0, sku: 'CUSTOM-4' },
    "Custom item 5": { quantity: 0, description: '', unitCost: 0, subtotal: 0, sku: 'CUSTOM-5' }
  });
  
  // Categorized cost breakdowns
  const [postCostsTotal, setPostCostsTotal] = useState(0);
  const [gateCostsTotal, setGateCostsTotal] = useState(0);
  const [meshCostsTotal, setMeshCostsTotal] = useState(0);
  const [concreteCostsTotal, setConcreteCostsTotal] = useState(0);
  const [additionalCostsTotal, setAdditionalCostsTotal] = useState(0);
  
  // Labor breakdown
  const [laborBreakdown, setLaborBreakdown] = useState({});
  const [outsideLaborTotal, setOutsideLaborTotal] = useState(0);
  const [maxPriceFromBreakdown, setMaxPriceFromBreakdown] = useState(0);
  const [postSpacing, setPostSpacing] = useState(10);
  const [meshType, setMeshType] = useState('9G');
  const [meshGauge, setMeshGauge] = useState('9');
  const [meshFold, setMeshFold] = useState('kk');
  const [needsTearOut, setNeedsTearOut] = useState(false);
  const [tearOutFootage, setTearOutFootage] = useState('');
  const [needsLineClearing, setNeedsLineClearing] = useState(false);
  const [lineClearingFootage, setLineClearingFootage] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
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
  const [doubleGateLatchType, setDoubleGateLatchType] = useState('fork');
  const [slidingGateSize, setSlidingGateSize] = useState("6'x10");

  // Mesh costs
  const meshTypeOptions = meshCosts;

  // Dome cap costs
  const domeCapOptions = domeCapCosts;
  
  // Questionnaire state
  const [questionnaire, setQuestionnaire] = useState({ sections: [], questionsBySectionId: {} });
  const [questionnaireLoading, setQuestionnaireLoading] = useState(true);
  const [questionnaireError, setQuestionnaireError] = useState(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  
  // Load questionnaire data from Supabase
  useEffect(() => {
    const loadQuestionnaire = async () => {
      setQuestionnaireLoading(true);
      try {
        const data = await questionnaireService.getCompleteQuestionnaire();
        setQuestionnaire(data);
        console.log('Questionnaire loaded:', data);
      } catch (error) {
        console.error('Error loading questionnaire:', error);
        setQuestionnaireError('Failed to load questionnaire data');
      } finally {
        setQuestionnaireLoading(false);
      }
    };
    
    loadQuestionnaire();
  }, []);
  
  // Handle questionnaire answer changes
  const handleQuestionnaireAnswer = (questionId, answer) => {
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Update corresponding fence calculator state based on the question
    // This would need to be expanded based on your actual questionnaire structure
    // For now, this is just a placeholder implementation
  };

  // Handle max price calculation from TotalCostBreakdown
  const handleMaxPriceCalculated = useCallback((price) => {
    setMaxPriceFromBreakdown(price);
  }, []);

  // Helper function to get mesh price based on type, height, and gauge
  const getMeshPrice = (meshType, heightInFeet, gauge) => {
    // Default prices if not found in meshCosts
    const defaultPrices = {
      'Galvanized': {
        '4': 3.99,
        '5': 4.99,
        '6': 5.99,
        '7': 6.99,
        '8': 7.99
      },
      'Vinyl Coated': {
        '4': 4.99,
        '5': 5.99,
        '6': 6.99,
        '7': 7.99,
        '8': 8.99
      }
    };
    
    // Extract gauge from meshType if it's in format like "9G"
    let actualGauge = gauge;
    if (!actualGauge && meshType) {
      const gaugeMatch = meshType.match(/(\d+\.?\d*)G/);
      if (gaugeMatch) {
        actualGauge = gaugeMatch[1];
      }
    }
    
    // Determine coating type based on material state
    const coatingType = material.includes('Vinyl') ? 'Vinyl Coated' : 'Galvanized';
    
    // Adjust price based on gauge (9 gauge is standard, 11 gauge is cheaper, 6 gauge is more expensive)
    const gaugeMultiplier = actualGauge === '11' || actualGauge === '11.5' ? 0.8 : 
                           (actualGauge === '12.5' ? 0.7 : 
                           (actualGauge === '6' ? 1.3 : 1.0));
    
    try {
      // Try to get price from meshCosts
      if (meshCosts && 
          meshCosts[coatingType] && 
          meshCosts[coatingType][heightInFeet]) {
        return meshCosts[coatingType][heightInFeet].price * gaugeMultiplier;
      }
      
      // Fallback to default prices
      return (defaultPrices[coatingType][heightInFeet] || 5.99) * gaugeMultiplier;
    } catch (error) {
      console.error("Error calculating mesh price:", error);
      return 5.99 * gaugeMultiplier; // Default fallback price
    }
  };

  // Helper function to get post price based on type, height, and material
  const getPostPrice = useCallback(async (postType, heightInFeet, material) => {
    console.log(`Calculating price for ${postType} post with height ${heightInFeet}ft and material ${material}`);
    
    // Normalize material for lookup
    let lookupMaterial = material.toLowerCase();
    if (lookupMaterial.includes('vinyl') || lookupMaterial.includes('coated')) {
      lookupMaterial = 'black';
    } else if (lookupMaterial.includes('galv')) {
      lookupMaterial = 'galvanized';
    }
    
    // Get the questionnaire inputs
    const questionnaireInputs = {
      fenceHeight: heightInFeet,
      material: lookupMaterial,
      postType: postType,
      hasThreeStrandBarbedWire: hasThreeStrandBarbedWire,
      commercialOrResidential: commercialOrResidential
    };
    
    try {
      // Use AI to determine post specifications if available
      let postSpecs;
      try {
        postSpecs = await determinePostSpecifications(questionnaireInputs);
        console.log('AI determined post specifications:', postSpecs);
      } catch (error) {
        console.error('Error using AI for post specifications:', error);
        // Fall back to manual calculation if AI fails
        postSpecs = null;
      }
      
      // Calculate actual height needed for post
      // Post needs to be taller than fence height to account for installation depth
      let actualHeightNeeded;
      let postDiameter;
      let postThickness;
      
      if (postSpecs && postSpecs[postType]) {
        // Use AI-determined specifications
        actualHeightNeeded = postSpecs[postType].height;
        postDiameter = postSpecs[postType].diameter;
        console.log(`Using AI-determined post specs: height=${actualHeightNeeded}ft, diameter=${postDiameter}`);
      } else {
        // Manual calculation as fallback
        // Calculate installation depth (1/3 of post height, minimum 2ft)
        const installationDepth = Math.max(2, Math.ceil(heightInFeet / 3));
        
        // Calculate actual height needed
        actualHeightNeeded = heightInFeet + installationDepth;
        
        // Add height for barbed wire if needed
        if (hasThreeStrandBarbedWire) {
          actualHeightNeeded += 1; // Add 1 foot for barbed wire
        }
        
        // Define standard post heights available - these are the only heights we should use
        const standardHeights = [6, 7, 8, 10, 12];
        
        // Find the next standard height up from what we need
        // This ensures we always go to the next standard height (e.g., if we need 11 ft, we go to 12 ft)
        let standardHeight = standardHeights.find(h => h >= actualHeightNeeded);
        
        // If we couldn't find a standard height that's greater or equal, use the largest available
        if (!standardHeight) {
          standardHeight = Math.max(...standardHeights);
          console.log(`Warning: Required height ${actualHeightNeeded.toFixed(2)}ft exceeds all standard heights, using maximum: ${standardHeight}ft`);
        }
        
        actualHeightNeeded = standardHeight;
        
        // Determine post diameter based on post type and commercial/residential setting
        const isCommercial = commercialOrResidential === 'Commercial';
        
        if (postType === 'line') {
          postDiameter = isCommercial ? '2"' : '1 5/8"';
          postThickness = isCommercial ? 'Sch 40' : '0.065';
        } else if (postType === 'terminal' || postType === 'corner') {
          postDiameter = isCommercial ? '2 7/8"' : '2 3/8"';
          postThickness = 'Sch 40';
        } else if (postType === 'single_gate') {
          postDiameter = '2 7/8"';
          postThickness = 'Sch 40';
        } else if (postType === 'double_gate') {
          postDiameter = '3"';
          postThickness = 'Sch 40';
        } else if (postType === 'sliding_gate') {
          postDiameter = '4"';
          postThickness = 'Sch 40';
        }
      }
      
      console.log(`Post calculation: ${postType} post with ${lookupMaterial} coating`);
      console.log(`  - Fence height: ${heightInFeet}ft`);
      console.log(`  - Actual height needed: ${actualHeightNeeded.toFixed(2)}ft (including depth and adjustments)`);
      console.log(`  - Post diameter: ${postDiameter}`);
      console.log(`  - Post thickness: ${postThickness || 'Standard'}`);
      
      // Get price from database
      const result = await findPostProduct(postType, actualHeightNeeded, lookupMaterial, postDiameter);
      
      if (result && result.price) {
        console.log(`Found price for ${postType} post: $${result.price} (SKU: ${result.sku || 'Unknown'})`);
        return result.price;
      } else {
        console.warn(`No price found for ${postType} post with height ${actualHeightNeeded}ft and material ${lookupMaterial}`);
        
        // Fallback to default prices if database lookup fails
        let defaultPrice = 0;
        if (postType === 'line') {
          defaultPrice = lookupMaterial === 'galvanized' ? 25 : 30;
        } else if (postType === 'terminal' || postType === 'corner') {
          defaultPrice = lookupMaterial === 'galvanized' ? 35 : 40;
        } else if (postType.includes('gate')) {
          defaultPrice = lookupMaterial === 'galvanized' ? 45 : 50;
        }
        
        console.log(`Using fallback price: $${defaultPrice}`);
        return defaultPrice;
      }
    } catch (error) {
      console.error('Error calculating post price:', error);
      return 0;
    }
  }, [hasThreeStrandBarbedWire, commercialOrResidential]);

  // Database and pricing state
  const [pricesLastUpdated, setPricesLastUpdated] = useState(null);
  const [pricesLoaded, setPricesLoaded] = useState(true); // Set to true since we're using local costs.js
  const [pricesLoading, setPricesLoading] = useState(false);
  
  // Add aliases for backward compatibility
  const dbPricesLoaded = pricesLoaded;
  const refreshingPrices = pricesLoading;

  // Load prices from costs.js (replacing database loading)
  const loadPrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      // We're using costs.js directly, so we don't need to preload from database
      setPricesLoaded(true);
      setPricesLastUpdated(new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error loading prices:', error);
      return false;
    } finally {
      setPricesLoading(false);
    }
  }, []);

  // Refresh prices (for UI consistency, but using costs.js)
  const refreshPrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      // We're using costs.js directly, so we don't need to reset cache or preload
      setPricesLoaded(true);
      setPricesLastUpdated(new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error refreshing prices:', error);
      return false;
    } finally {
      setPricesLoading(false);
    }
  }, []);

  // Calculation functions
  const calculateTotalPosts = useCallback(() => {
    const linePostsNeeded = calculateLinePostsNeeded(totalLinearLength, postSpacing);
    return {
      linePostsNeeded,
      totalPosts: linePostsNeeded + 
                  parseInt(numberOfEndTerminals || 0) + 
                  parseInt(numberOfCorners || 0) + 
                  parseInt(numberOfSingleGates || 0) * 2 + 
                  parseInt(numberOfDoubleGates || 0) * 2 + 
                  parseInt(numberOfSlidingGates || 0) * 3
    };
  }, [totalLinearLength, postSpacing, numberOfEndTerminals, numberOfCorners, 
      numberOfSingleGates, numberOfDoubleGates, numberOfSlidingGates]);

  const calculateCosts = useCallback(async () => {
    setPricesLoading(true);
    try {
      // Initialize costs object
      const calculatedCosts = {
        materials: {},
        labor: {},
        total: 0
      };
      
      // Get the material type (Black or Galvanized)
      const materialType = material || MATERIAL_TYPES.GALVANIZED;
      
      // Calculate terminal post costs
      if (numberOfEndTerminals > 0) {
        // Calculate required post height
        const extraHeightForBarbedWire = hasThreeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(heightOfFenceInFeet) + extraHeightForBarbedWire;
        const postHoleDepthInFeet = (depthOfHoles || 24) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHoleDepthInFeet);
        
        // Find the terminal post product
        const terminalPostProduct = findPostProduct(
          postCosts,
          terminalPostDiameter || DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS,
          terminalPostThickness || THICKNESS_TYPES.COMMERCIAL_SCH_40,
          materialType,
          requiredHeight
        );
        
        const terminalPostCost = terminalPostProduct?.price * numberOfEndTerminals || 0;
        calculatedCosts.materials.terminalPosts = {
          description: 'Terminal Posts',
          cost: terminalPostCost,
          quantity: numberOfEndTerminals,
          unitPrice: terminalPostProduct?.price || 0
        };
      }
      
      // Calculate corner post costs
      if (numberOfCorners > 0) {
        // Calculate required post height
        const extraHeightForBarbedWire = hasThreeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(heightOfFenceInFeet) + extraHeightForBarbedWire;
        const postHoleDepthInFeet = (depthOfHoles || 24) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHoleDepthInFeet);
        
        // Find the corner post product
        const cornerPostProduct = findPostProduct(
          postCosts,
          cornerPostDiameter || DIAMETER_SIZES.TWO_AND_THREE_EIGHTHS,
          cornerPostThickness || THICKNESS_TYPES.COMMERCIAL_SCH_40,
          materialType,
          requiredHeight
        );
        
        const cornerPostCost = cornerPostProduct?.price * numberOfCorners || 0;
        calculatedCosts.materials.cornerPosts = {
          description: 'Corner Posts',
          cost: cornerPostCost,
          quantity: numberOfCorners,
          unitPrice: cornerPostProduct?.price || 0
        };
      }
      
      // Calculate line post costs
      const linePostsNeeded = calculateTotalPosts().linePostsNeeded;
      if (linePostsNeeded > 0) {
        // Calculate required post height
        const extraHeightForBarbedWire = hasThreeStrandBarbedWire ? 1 : 0;
        const postHeightAboveGround = parseFloat(heightOfFenceInFeet) + extraHeightForBarbedWire;
        const postHoleDepthInFeet = (linePostHoleDepth || 24) / 12; // Convert inches to feet
        const requiredHeight = Math.ceil(postHeightAboveGround + postHoleDepthInFeet);
        
        // Find the line post product
        const linePostProduct = findPostProduct(
          postCosts,
          linePostDiameter || DIAMETER_SIZES.ONE_AND_FIVE_EIGHTHS,
          linePostThickness || THICKNESS_TYPES.LIGHT,
          materialType,
          requiredHeight
        );
        
        const linePostCost = linePostProduct?.price * linePostsNeeded || 0;
        calculatedCosts.materials.linePosts = {
          description: 'Line Posts',
          cost: linePostCost,
          quantity: linePostsNeeded,
          unitPrice: linePostProduct?.price || 0
        };
      }
      
      // Calculate single gate costs
      if (numberOfSingleGates > 0) {
        // Use the gateFormulas from materialFormulas.js to calculate gate count
        const gateCount = gateFormulas.single_gates.price_calculation.code({ singleGatesCount: numberOfSingleGates }, costs);
        
        // Look up gate posts costs using the findPostProduct function
        const postProduct = findPostProduct(
          postCosts,
          terminalPostDiameter,
          terminalPostThickness,
          materialType.toLowerCase().includes('black') ? 'Black' : 'Galvanized',
          heightOfFenceInFeet
        );
        
        // Gate cost is based on post cost and height
        const unitCost = postProduct?.price || 0;
        const gateCost = gateCount * unitCost * 1.5; // Gate costs approximately 1.5x the post cost
        
        calculatedCosts.materials.singleGates = {
          description: 'Single Gates',
          cost: gateCost,
          quantity: numberOfSingleGates,
          unitPrice: unitCost * 1.5
        };
      }
      
      // Calculate total cost
      let totalMaterialCost = 0;
      Object.values(calculatedCosts.materials).forEach(item => {
        totalMaterialCost += item.cost || 0;
      });
      
      let totalLaborCost = 0;
      Object.values(calculatedCosts.labor).forEach(item => {
        totalLaborCost += item.cost || 0;
      });
      
      calculatedCosts.total = totalMaterialCost + totalLaborCost;
      
      // Update state with calculated costs
      setCosts(calculatedCosts);
      return calculatedCosts;
    } catch (error) {
      console.error('Error calculating costs:', error);
      return null;
    } finally {
      setPricesLoading(false);
    }
  }, [
    numberOfEndTerminals,
    numberOfCorners,
    numberOfSingleGates,
    heightOfFenceInFeet,
    material,
    terminalPostDiameter,
    terminalPostThickness,
    cornerPostDiameter,
    cornerPostThickness,
    linePostDiameter,
    linePostThickness,
    hasThreeStrandBarbedWire,
    depthOfHoles,
    linePostHoleDepth,
    calculateTotalPosts
  ]);

  // Update the useEffect that calls calculateCosts to handle the async function
  useEffect(() => {
    const updateCosts = async () => {
      if (heightOfFence && totalLinearLength) {
        await calculateCosts();
      }
    };
    
    updateCosts();
  }, [heightOfFence, totalLinearLength, numberOfEndTerminals, numberOfCorners, 
      numberOfSingleGates, numberOfDoubleGates, numberOfSlidingGates, 
      material, extraRail, hasThreeStrandBarbedWire, commercialOrResidential, 
      depthOfHoles, linePostHoleDepth, postSpacing, calculateCosts]);

  // Update gate arrays when counts change
  useEffect(() => {
    // Update single gates array
    if (singleGates.length < numberOfSingleGates) {
      const newGates = [...singleGates];
      for (let i = singleGates.length; i < numberOfSingleGates; i++) {
        newGates.push({
          width: '4',
          height: '6',
          hingeType: 'Industrial',
          latchType: 'Fork'
        });
      }
      setSingleGates(newGates);
    } else if (singleGates.length > numberOfSingleGates) {
      setSingleGates(singleGates.slice(0, numberOfSingleGates));
    }
    
    // Update double gates array
    if (doubleGates.length < numberOfDoubleGates) {
      const newGates = [...doubleGates];
      for (let i = doubleGates.length; i < numberOfDoubleGates; i++) {
        newGates.push({
          width: '12',
          height: '6',
          hingeType: 'Industrial',
          latchType: 'Drop Rod'
        });
      }
      setDoubleGates(newGates);
    } else if (doubleGates.length > numberOfDoubleGates) {
      setDoubleGates(doubleGates.slice(0, numberOfDoubleGates));
    }
    
    // Update sliding gates array
    if (slidingGates.length < numberOfSlidingGates) {
      const newGates = [...slidingGates];
      for (let i = slidingGates.length; i < numberOfSlidingGates; i++) {
        newGates.push({
          width: '12',
          height: '6',
          frameDiameter: '1 5/8'
        });
      }
      setSlidingGates(newGates);
    } else if (slidingGates.length > numberOfSlidingGates) {
      setSlidingGates(slidingGates.slice(0, numberOfSlidingGates));
    }
  }, [numberOfSingleGates, numberOfDoubleGates, numberOfSlidingGates, singleGates, doubleGates, slidingGates]);

  // Helper functions for gate arrays
  const updateSingleGate = (index, updatedGate) => {
    const updatedGates = [...singleGates];
    updatedGates[index] = updatedGate;
    setSingleGates(updatedGates);
  };
  
  const updateDoubleGate = (index, updatedGate) => {
    const updatedGates = [...doubleGates];
    updatedGates[index] = updatedGate;
    setDoubleGates(updatedGates);
  };
  
  const updateSlidingGate = (index, updatedGate) => {
    const updatedGates = [...slidingGates];
    updatedGates[index] = updatedGate;
    setSlidingGates(updatedGates);
  };

  const value = {
    // General inputs
    heightOfFence, setHeightOfFence,
    heightOfFenceInFeet, setHeightOfFenceInFeet,
    totalLinearLength, setTotalLinearLength,
    numberOfEndTerminals, setNumberOfEndTerminals,
    numberOfSolitaryPosts, setNumberOfSolitaryPosts,
    numberOfCorners, setNumberOfCorners,
    numberOfSingleGates, setNumberOfSingleGates,
    numberOfDoubleGates, setNumberOfDoubleGates,
    numberOfSlidingGates, setNumberOfSlidingGates,
    numberOfFlangedPosts, setNumberOfFlangedPosts,
    numberOfFlangedPostsOffCentered, setNumberOfFlangedPostsOffCentered,
    extraRail, setExtraRail,
    hasHBrace, setHasHBrace,
    material, setMaterial,
    postThickness, setPostThickness,
    duckbillPostThickness, setDuckbillPostThickness,
    hasDuckbillGateStop, setHasDuckbillGateStop,
    depthOfHoles, setDepthOfHoles,
    widthOfHoles, setWidthOfHoles,
    linePostHoleDepth, setLinePostHoleDepth,
    linePostHoleWidth, setLinePostHoleWidth,
    doubleGateHoleDepth, setDoubleGateHoleDepth,
    doubleGateHoleWidth, setDoubleGateHoleWidth,
    singleGatePostHoleDepth, setSingleGatePostHoleDepth,
    singleGatePostHoleWidth, setSingleGatePostHoleWidth,
    singleGateHoleDepth, setSingleGateHoleDepth,
    singleGateHoleWidth, setSingleGateHoleWidth,
    concreteType, setConcreteType,
    commercialOrResidential, setCommercialOrResidential,
    hasThreeStrandBarbedWire, setHasThreeStrandBarbedWire,
    hasFenceSlats, setHasFenceSlats,
    fenceSlatsColor, setFenceSlatsColor,
    hasTrussRods, setHasTrussRods,
    numberOfPulls, setNumberOfPulls,

    // Post dimensions
    terminalPostDiameter, setTerminalPostDiameter,
    terminalPostThickness, setTerminalPostThickness,
    cornerPostDiameter, setCornerPostDiameter,
    cornerPostThickness, setCornerPostThickness,
    linePostDiameter, setLinePostDiameter,
    linePostThickness, setLinePostThickness,
    singleGatePostDiameter, setSingleGatePostDiameter,
    singleGatePostThickness, setSingleGatePostThickness,
    doubleGatePostDiameter, setDoubleGatePostDiameter,
    doubleGatePostThickness, setDoubleGatePostThickness,
    slidingGatePostDiameter, setSlidingGatePostDiameter,
    slidingGatePostThickness, setSlidingGatePostThickness,
    topRailDiameter, setTopRailDiameter,
    topRailThickness, setTopRailThickness,
    gatePipeDiameter, setGatePipeDiameter,
    flangedPostDiameter, setFlangedPostDiameter,
    flangedPostThickness, setFlangedPostThickness,
    flangedPostHoleDepth, setFlangedPostHoleDepth,
    flangedPostHoleWidth, setFlangedPostHoleWidth,
    flangedPostOffCenteredDiameter, setFlangedPostOffCenteredDiameter,
    flangedPostOffCenteredThickness, setFlangedPostOffCenteredThickness,
    flangedPostOffCenteredHoleDepth, setFlangedPostOffCenteredHoleDepth,
    flangedPostOffCenteredHoleWidth, setFlangedPostOffCenteredHoleWidth,

    // Pull Section
    hasPullSection, setHasPullSection,
    numberOfPullSections, setNumberOfPullSections,
    pullPostSize, setPullPostSize,
    pullPostGauge, setPullPostGauge,
    hasPullBracing, setHasPullBracing,
    pullBracingType, setPullBracingType,
    pullLengths, setPullLengths,

    // Other state
    outsideLaborTotal, setOutsideLaborTotal,
    maxPriceFromBreakdown, setMaxPriceFromBreakdown,
    postSpacing, setPostSpacing,
    costs, setCosts,
    meshType, setMeshType,
    meshGauge, setMeshGauge,
    meshFold, setMeshFold,
    needsTearOut, setNeedsTearOut,
    tearOutFootage, setTearOutFootage,
    needsLineClearing, setNeedsLineClearing,
    lineClearingFootage, setLineClearingFootage,
    estimatedDays, setEstimatedDays,
    singleGates, setSingleGates,
    doubleGates, setDoubleGates,
    slidingGates, setSlidingGates,

    // Gate details
    gateType, setGateType,
    gateCommercialResidential, setGateCommercialResidential,
    gateBarbed, setGateBarbed,
    gateFinish, setGateFinish,
    gateFrameDiameter, setGateFrameDiameter,
    singleGateSize, setSingleGateSize,
    singleGateHingeType, setSingleGateHingeType,
    singleGateLatchType, setSingleGateLatchType,
    doubleGateSize, setDoubleGateSize,
    doubleGateHingeType, setDoubleGateHingeType,
    doubleGateLatchType, setDoubleGateLatchType,
    slidingGateSize, setSlidingGateSize,

    // Options
    meshTypeOptions,
    domeCapOptions,

    // Custom items
    customItems, setCustomItems,

    // Questionnaire state
    questionnaire,
    questionnaireLoading,
    questionnaireError,
    questionnaireAnswers,
    handleQuestionnaireAnswer,

    // Functions
    handleMaxPriceCalculated,
    calculateTotalPosts,
    calculateCosts,
    refreshPrices,
    pricesLoading,
    pricesLastUpdated, setPricesLastUpdated,
    pricesLoaded,
    dbPricesLoaded,
    refreshingPrices,
    updateSingleGate,
    updateDoubleGate,
    updateSlidingGate
  };

  return (
    <FenceCalculatorContext.Provider value={value}>
      {children}
    </FenceCalculatorContext.Provider>
  );
};

export default FenceCalculatorContext;
