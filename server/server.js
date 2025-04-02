const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = 5000;
const API_KEY = process.env.LIGHTSPEED_API_KEY;
const BASE_URL = 'https://southtexasfencesupply.retail.lightspeed.app';
const STFD_PRICE_BOOK_ID = '33715856-9b7f-fe2f-9f74-5c78f432b98d';

console.log('Starting server with API key:', API_KEY ? `${API_KEY.substring(0, 5)}...` : 'Not found');

// Enable CORS for your React app
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Fence Calculator API Server',
    endpoints: [
      { path: '/api/products', description: 'Get products from the STFD price book' },
      { path: '/api/chainlink-prices', description: 'Get chainlink prices from the STFD price book' },
      { path: '/api/test-calculator', description: 'Test the fence calculator' },
      { path: '/api/questionnaire', description: 'Get questionnaire items' }
    ],
    status: 'running'
  });
});

// Helper function for authenticated fetch requests
const fetchWithAuth = async (url, options = {}) => {
  console.log(`Making request to: ${url}`);
  
  if (!API_KEY) {
    throw new Error('API key is missing. Please check your .env file.');
  }
  
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  try {
    console.log('Request headers:', JSON.stringify(headers, null, 2).replace(API_KEY, '***API_KEY***'));
    
    const response = await fetch(url, {
      headers,
      ...options,
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
      } catch (e) {
        errorText = 'Could not read error response';
        console.error(`API error: ${response.status} - Could not read error response`);
      }
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`Response data received (sample): ${JSON.stringify(data).substring(0, 100)}...`);
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error.message);
    throw error;
  }
};

// Route to get products from the STFD price book
app.get('/api/products', async (req, res) => {
  try {
    // First, get the price book to understand its structure
    const priceBookUrl = `${BASE_URL}/api/2.0/price_books/${STFD_PRICE_BOOK_ID}`;
    console.log('Fetching price book details from:', priceBookUrl);
    const priceBookData = await fetchWithAuth(priceBookUrl);
    console.log('Price book structure:', Object.keys(priceBookData));
    
    // Now fetch the actual products from the price book
    const url = `${BASE_URL}/api/2.0/price_books/${STFD_PRICE_BOOK_ID}/products`;
    console.log('Fetching STFD products from:', url);
    const data = await fetchWithAuth(url);
    
    // Log the structure of the response
    console.log('Response structure:', Object.keys(data));
    console.log('STFD products data received, count:', data.data ? data.data.length : 0);
    
    // Check if we have a product in the data to examine its structure
    if (data.data && data.data.length > 0) {
      console.log('Sample product structure:', Object.keys(data.data[0]));
      console.log('Sample product data:', JSON.stringify(data.data[0]).substring(0, 500));
      
      // Check for nested product data
      if (data.data[0].product) {
        console.log('Found nested product data!');
        console.log('Nested product structure:', Object.keys(data.data[0].product));
        console.log('Nested product sample:', JSON.stringify(data.data[0].product).substring(0, 500));
      }
    }
    
    // Let's try a different approach - fetch all products directly
    const allProductsUrl = `${BASE_URL}/api/2.0/products`;
    console.log('Fetching all products from:', allProductsUrl);
    const allProductsData = await fetchWithAuth(allProductsUrl);
    console.log('All products response structure:', Object.keys(allProductsData));
    console.log('All products count:', allProductsData.data ? allProductsData.data.length : 0);
    
    // Check if we have products in the direct API call
    if (allProductsData.data && allProductsData.data.length > 0) {
      console.log('Sample direct product structure:', Object.keys(allProductsData.data[0]));
      console.log('Sample direct product:', JSON.stringify(allProductsData.data[0]).substring(0, 500));
    }
    
    // Process the data from the direct products API call
    let processedData = [];
    
    if (allProductsData.data && Array.isArray(allProductsData.data)) {
      processedData = allProductsData.data.map(item => {
        // Extract size, material, and other attributes from description or SKU
        const description = item.description || '';
        const sku = item.sku || '';
        
        // Try to extract size information using regex patterns
        let size = '';
        let length = '';
        let coating = '';
        let material = '';
        
        // Common size patterns like 1/4", 3/8", 1/2", etc.
        const sizeMatch = description.match(/(\d+\/\d+)"|(\d+\.\d+)"|(\d+)"/);
        if (sizeMatch) {
          size = sizeMatch[0];
        }
        
        // Length patterns
        const lengthMatch = description.match(/(\d+(\s*\d+\/\d+)?)\s*ft|(\d+(\s*\d+\/\d+)?)\s*foot|(\d+(\s*\d+\/\d+)?)\s*feet/i);
        if (lengthMatch) {
          length = lengthMatch[0];
        }
        
        // Coating patterns
        const coatingPatterns = [
          /zinc/i, /galvanized/i, /galvanised/i, /hdg/i, /hot dip/i, 
          /stainless/i, /ss/i, /black oxide/i, /powder coated/i
        ];
        
        for (const pattern of coatingPatterns) {
          if (pattern.test(description)) {
            coating = description.match(pattern)[0];
            break;
          }
        }
        
        // Material patterns
        const materialPatterns = [
          /steel/i, /aluminum/i, /aluminium/i, /wood/i, /plastic/i, 
          /nylon/i, /brass/i, /copper/i, /iron/i
        ];
        
        for (const pattern of materialPatterns) {
          if (pattern.test(description)) {
            material = description.match(pattern)[0];
            break;
          }
        }
        
        return {
          id: item.id || '',
          sku: sku,
          description: description,
          size: size,
          length: length,
          coating: coating,
          material: material,
          price: parseFloat(item.retail_price || item.price || 0)
        };
      });
      
      console.log(`Processed ${processedData.length} products`);
      if (processedData.length > 0) {
        console.log('Sample processed product:', JSON.stringify(processedData[0]));
      }
    }
    
    // Send the processed data to the client
    res.json({ data: processedData });
  } catch (error) {
    console.error('Error fetching STFD products:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to get chainlink prices from the STFD price book
app.get('/api/chainlink-prices', async (req, res) => {
  try {
    // Fetch products from the STFD price book
    const url = `${BASE_URL}/api/2.0/price_books/${STFD_PRICE_BOOK_ID}/products`;
    console.log('Fetching STFD products from:', url);
    const data = await fetchWithAuth(url);
    
    // Log the raw API response for debugging
    console.log('Raw API response structure:', Object.keys(data));
    
    if (data && data.data && Array.isArray(data.data)) {
      console.log(`Found ${data.data.length} products in data.data`);
      
      // Log a sample product for debugging
      if (data.data.length > 0) {
        console.log('Sample raw product:', JSON.stringify(data.data[0]).substring(0, 500));
      }
    } else {
      console.error('Unexpected API response structure:', data);
    }
    
    // Send the raw data directly to the client without any processing
    res.json(data);
  } catch (error) {
    console.error('Error fetching chainlink prices:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to test the fence calculator
app.post('/api/test-calculator', async (req, res) => {
  try {
    const { Client } = require('pg');
    
    // PostgreSQL connection string
    const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';
    
    // Connect to PostgreSQL
    const client = new Client({ connectionString });
    await client.connect();
    
    // Get parameters from request body
    const params = req.body;
    
    // Calculate derived values
    const derived = { ...params };
    
    // Map parameter names to match formula expectations
    derived.fenceLength = derived.totalLinearLength;
    
    // Calculate number of terminal posts
    derived.numberOfTerminalPosts = derived.numberOfEndTerminals;
    
    // Calculate total number of posts
    derived.totalPosts = derived.numberOfTerminalPosts + derived.numberOfCorners + 
                        (derived.numberOfSingleGates * 2) + (derived.numberOfDoubleGates * 2) + 
                        (derived.numberOfSlidingGates * 2) + derived.numberOfSolitaryPosts +
                        derived.numberOfFlangedPosts + derived.numberOfFlangedPostsOffCentered;
    
    // Calculate line posts
    derived.linePostsCount = Math.ceil(derived.totalLinearLength / derived.postSpacing) - 
                            derived.numberOfTerminalPosts - derived.numberOfCorners - 
                            (derived.numberOfSingleGates * 2) - (derived.numberOfDoubleGates * 2) - 
                            (derived.numberOfSlidingGates * 2) - derived.numberOfSolitaryPosts -
                            derived.numberOfFlangedPosts - derived.numberOfFlangedPostsOffCentered;
    
    // Add line posts to total posts
    derived.totalPosts += derived.linePostsCount;
    
    // Calculate number of gates
    derived.numberOfGates = derived.numberOfSingleGates + derived.numberOfDoubleGates + derived.numberOfSlidingGates;
    
    // Set standard lengths
    derived.railLength = 21; // Standard rail length in feet
    derived.rollLength = 50; // Standard mesh roll length in feet
    
    // Set hole depth in feet
    derived.holeDepth = derived.depthOfHoles / 12;
    derived.holeWidth = derived.widthOfHoles;
    
    // Set flags
    derived.isCommercial = derived.commercialOrResidential === 'Commercial';
    derived.hasBarbed = derived.hasThreeStrandBarbedWire;
    
    // Set fence height in feet
    derived.fenceHeight = derived.heightOfFence;
    
    // Get all formulas from the database
    const formulasResult = await client.query(`
      SELECT id, name, calculation_details, questionnaire_trigger
      FROM material_formulas
      ORDER BY id;
    `);
    
    const quantities = {};
    const errors = [];
    
    for (const row of formulasResult.rows) {
      const formulaId = row.id;
      const details = row.calculation_details;
      const trigger = row.questionnaire_trigger;
      
      // Check if formula is triggered by questionnaire responses
      if (trigger) {
        try {
          // Create a function from the trigger expression
          const triggerFunc = new Function(
            'params',
            `
            const { 
              totalLinearLength, heightOfFence, numberOfPulls, numberOfEndTerminals, 
              numberOfCorners, numberOfSingleGates, numberOfDoubleGates, hasDuckbillGateStop,
              numberOfSlidingGates, numberOfSolitaryPosts, numberOfFlangedPosts, 
              numberOfFlangedPostsOffCentered, commercialOrResidential, material, 
              meshGauge, meshFold, depthOfHoles, widthOfHoles, concreteType, 
              postSpacing, extraRail, hasHBrace, hasTrussRods, hasThreeStrandBarbedWire,
              hasFenceSlats, fenceSlatsColor, terminalPostDiameter, cornerPostDiameter,
              doubleGatePostDiameter, slidingGatePostDiameter, linePostDiameter,
              topRailDiameter, gatePipeDiameter, terminalPostThickness, cornerPostThickness,
              doubleGatePostThickness, slidingGatePostThickness, linePostThickness,
              topRailThickness, numberOfTerminalPosts, totalPosts, linePostsCount,
              numberOfGates, railLength, rollLength, holeDepth, holeWidth, isCommercial, 
              hasBarbed, fenceHeight, fenceLength, customItem1Quantity, customItem2Quantity,
              customItem3Quantity, customItem4Quantity, customItem5Quantity,
              singleGateSize, doubleGateSize, slidingGateSize
            } = params;
            
            return ${trigger};
            `
          );
          
          const isTriggered = triggerFunc(derived);
          
          if (!isTriggered) {
            quantities[formulaId] = {
              name: row.name,
              quantity: 0,
              triggered: false
            };
            continue;
          }
        } catch (error) {
          errors.push({
            formulaId,
            name: row.name,
            error: `Trigger error: ${error.message}`
          });
          quantities[formulaId] = {
            name: row.name,
            quantity: 0,
            triggered: false
          };
          continue;
        }
      }
      
      if (details && details.formula) {
        try {
          // Create a function from the formula string
          const formula = new Function(
            'params',
            `
            const { 
              totalLinearLength, heightOfFence, numberOfPulls, numberOfEndTerminals, 
              numberOfCorners, numberOfSingleGates, numberOfDoubleGates, hasDuckbillGateStop,
              numberOfSlidingGates, numberOfSolitaryPosts, numberOfFlangedPosts, 
              numberOfFlangedPostsOffCentered, commercialOrResidential, material, 
              meshGauge, meshFold, depthOfHoles, widthOfHoles, concreteType, 
              postSpacing, extraRail, hasHBrace, hasTrussRods, hasThreeStrandBarbedWire,
              hasFenceSlats, fenceSlatsColor, terminalPostDiameter, cornerPostDiameter,
              doubleGatePostDiameter, slidingGatePostDiameter, linePostDiameter,
              topRailDiameter, gatePipeDiameter, terminalPostThickness, cornerPostThickness,
              doubleGatePostThickness, slidingGatePostThickness, linePostThickness,
              topRailThickness, numberOfTerminalPosts, totalPosts, linePostsCount,
              numberOfGates, railLength, rollLength, holeDepth, holeWidth, isCommercial, 
              hasBarbed, fenceHeight, fenceLength, customItem1Quantity, customItem2Quantity,
              customItem3Quantity, customItem4Quantity, customItem5Quantity,
              singleGateSize, doubleGateSize, slidingGateSize
            } = params;
            
            return ${details.formula};
            `
          );
          
          // Calculate the quantity
          const quantity = formula(derived);
          quantities[formulaId] = {
            name: row.name,
            quantity: quantity,
            triggered: true
          };
        } catch (error) {
          errors.push({
            formulaId,
            name: row.name,
            error: `Calculation error: ${error.message}`
          });
          quantities[formulaId] = {
            name: row.name,
            quantity: 0,
            triggered: true
          };
        }
      }
    }
    
    // Group by category
    const categories = {
      'Posts': ['terminal_posts', 'corner_posts', 'line_posts', 'single_gate_posts', 'double_gate_posts', 'sliding_gate_posts', 'duckbill_posts', 'flanged_posts_centered', 'flanged_posts_off_centered'],
      'Gates': ['single_gates', 'double_gates', 'sliding_gates'],
      'Concrete': ['concrete'],
      'Mesh': ['mesh'],
      'Rails': ['top_rail', 'fence_sleeve'],
      'Dome Caps': ['dome_cap_terminal', 'dome_cap_corner', 'dome_cap_single_gate', 'dome_cap_double_gate', 'dome_cap_sliding_gate', 'dome_cap_duckbill'],
      'Bands': ['tension_bands_terminal', 'tension_bands_corner', 'tension_bands_single_gate', 'tension_bands_double_gate', 'tension_bands_sliding_gate', 'brace_bands_terminal', 'brace_bands_corner', 'brace_bands_single_gate', 'brace_bands_double_gate', 'brace_bands_sliding_gate', 'brace_bands_line'],
      'Hardware': ['rail_ends', 'rail_clamps', 'fence_ties', 'tension_bars', 'hog_rings', 'eye_tops', 'nuts_and_bolts', 'wedge_anchors', 'truss_rods', 'slick_line'],
      'Gate Hardware': ['bulldog_hinges_single', 'bulldog_hinges_double', 'industrial_hinges_single', 'industrial_hinges_double', 'female_residential_hinge_single', 'female_residential_hinge_double', 'male_residential_hinge_single', 'male_residential_hinge_double', 'fork_latch_single', 'fork_latch_double', 'industrial_drop_latch', 'industrial_drop_latch_guides', 'cantilever_latch', 'cantilever_rollers', 'cane_bolts', 'gate_nut_bolt', 'collars', 'duckbill_gate_stop'],
      'Barbed Wire': ['barbed_wire', 'barb_arms'],
      'Privacy': ['fence_slats'],
      'Custom': ['custom_item_1', 'custom_item_2', 'custom_item_3', 'custom_item_4', 'custom_item_5']
    };
    
    // Organize quantities by category
    const organizedQuantities = {};
    
    for (const [category, formulaIds] of Object.entries(categories)) {
      const categoryItems = {};
      
      for (const formulaId of formulaIds) {
        const item = quantities[formulaId];
        if (item && item.quantity > 0) {
          categoryItems[formulaId] = {
            name: item.name,
            quantity: item.quantity
          };
        }
      }
      
      if (Object.keys(categoryItems).length > 0) {
        organizedQuantities[category] = categoryItems;
      }
    }
    
    // Close the PostgreSQL connection
    await client.end();
    
    // Return the results
    res.json({
      parameters: derived,
      quantities: organizedQuantities,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (error) {
    console.error('Error testing fence calculator:', error);
    res.status(500).json({
      error: 'Error testing fence calculator',
      message: error.message
    });
  }
});

// Route to get questionnaire items
app.get('/api/questionnaire', async (req, res) => {
  try {
    const { Client } = require('pg');
    
    // PostgreSQL connection string
    const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';
    
    // Connect to PostgreSQL
    const client = new Client({ connectionString });
    await client.connect();
    
    // Get all questionnaire items
    const result = await client.query(`
      SELECT * FROM questionnaire_items
      ORDER BY section, "order";
    `);
    
    // Close the PostgreSQL connection
    await client.end();
    
    // Return the results
    res.json(result.rows);
    
  } catch (error) {
    console.error('Error getting questionnaire items:', error);
    res.status(500).json({
      error: 'Error getting questionnaire items',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key available: ${API_KEY ? 'Yes' : 'No'}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});
