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
      { path: '/api/chainlink-prices', description: 'Get chainlink prices from the STFD price book' }
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
