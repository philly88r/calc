// Express server to fetch products from PostgreSQL and Lightspeed API
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');

const app = express();
// Use environment port or default to 3001
const port = process.env.PORT || 3001;

// Configure CORS based on environment
const allowedOrigins = [
  'http://localhost:3000',
  'https://philly88r.github.io',    // GitHub Pages domain
  'https://calc.philly88r.com',     // Your custom domain if you have one
  'https://stfadcalc.netlify.app',  // Netlify domain
];

// In development, allow all origins
app.use(cors({
  origin: '*',  // Allow all origins in development
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/postgres'
});

// Load environment variables
require('dotenv').config();

// Lightspeed API configuration
const LIGHTSPEED_API_KEY = process.env.LIGHTSPEED_API_KEY;
const LIGHTSPEED_BASE_URL = 'https://southtexasfencesupply.retail.lightspeed.app/api/2.0';

// Check if API key is available
if (!LIGHTSPEED_API_KEY) {
  console.warn('WARNING: LIGHTSPEED_API_KEY not found in environment variables. Please set it in your .env file.');
}

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Fence Calculator API Server',
    endpoints: [
      { path: '/api/products', description: 'Get all products from the database' },
      { path: '/api/products/category/:category', description: 'Get products by category' },
      { path: '/api/products/search/:term', description: 'Search products' },
      { path: '/api/lightspeed/products', description: 'Get products from Lightspeed API' }
    ],
    status: 'running'
  });
});

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    console.log('Fetching all products from database...');
    const result = await pool.query('SELECT * FROM fence_products ORDER BY id ASC LIMIT 2000');
    console.log(`Fetched ${result.rows.length} products`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const result = await pool.query(
      'SELECT * FROM fence_products WHERE product_category = $1 ORDER BY id ASC',
      [category]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to search products
app.get('/api/products/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const result = await pool.query(
      `SELECT * FROM fence_products 
       WHERE name ILIKE $1 
       OR product_category ILIKE $1 
       OR description ILIKE $1 
       ORDER BY id ASC`,
      [`%${term}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get products from Lightspeed API
app.get('/api/lightspeed/products', async (req, res) => {
  try {
    console.log('Fetching products from Lightspeed API...');
    
    // Set up authentication headers
    const headers = {
      'Authorization': `Bearer ${LIGHTSPEED_API_KEY}`,
      'Content-Type': 'application/json'
    };
    
    // Initialize variables for pagination
    let allProducts = [];
    let page = 1;
    const limit = 1000; // Lightspeed typically limits to 1000 per page
    let hasMorePages = true;
    
    // Fetch all pages of products
    while (hasMorePages) {
      console.log(`Fetching page ${page} of products (${allProducts.length} fetched so far)...`);
      
      const response = await axios.get(`${LIGHTSPEED_BASE_URL}/products`, {
        headers,
        params: {
          limit: limit,
          page: page
        }
      });
      
      // Extract products from the response
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        const pageProducts = response.data.data;
        console.log(`Fetched ${pageProducts.length} products from page ${page}`);
        
        // Add products from this page to our collection
        allProducts = [...allProducts, ...pageProducts];
        
        // Check if we've reached the last page
        if (pageProducts.length < limit) {
          hasMorePages = false;
          console.log('Reached last page of products');
        } else {
          // Move to next page
          page++;
        }
      } else {
        console.log('Unexpected API response format');
        hasMorePages = false;
      }
      
      // Safety check to prevent infinite loops
      if (page > 10) {
        console.log('Reached maximum page limit (10), stopping pagination');
        hasMorePages = false;
      }
    }
    
    console.log(`Fetched a total of ${allProducts.length} products from Lightspeed API v2.0`);
    
    // Log product IDs to check for duplicates (just first 5)
    if (allProducts.length > 0) {
      const sampleIds = allProducts.slice(0, 5).map(p => p.id);
      console.log('Sample product IDs:', sampleIds);
      
      // Log a sample product to see its structure
      console.log('Sample product:', JSON.stringify(allProducts[0], null, 2).substring(0, 200) + '...');
      
      // Log the complete structure of the first product to find price field
      console.log('COMPLETE PRODUCT STRUCTURE:');
      console.log(JSON.stringify(allProducts[0], null, 2));
      
      // Check for price-related fields
      const priceFields = [];
      const checkForPriceFields = (obj, prefix = '') => {
        if (!obj || typeof obj !== 'object') return;
        
        Object.keys(obj).forEach(key => {
          const fullPath = prefix ? `${prefix}.${key}` : key;
          if (key.toLowerCase().includes('price') || key.toLowerCase().includes('cost')) {
            priceFields.push({ path: fullPath, value: obj[key] });
          }
          if (obj[key] && typeof obj[key] === 'object') {
            checkForPriceFields(obj[key], fullPath);
          }
        });
      };
      
      checkForPriceFields(allProducts[0]);
      console.log('PRICE FIELDS FOUND:', priceFields);
    }
    
    // Transform products to ensure price fields are correctly mapped
    const transformedProducts = allProducts.map(product => {
      // Create a copy of the product
      const transformed = { ...product };
      
      // Extract price from the correct field in Lightspeed API response
      if (product.prices && product.prices.retail) {
        transformed.price = product.prices.retail;
      } else if (product.price_excl_tax) {
        transformed.price = product.price_excl_tax;
      } else if (product.price_incl_tax) {
        transformed.price = product.price_incl_tax;
      } else if (product.default_price) {
        transformed.price = product.default_price;
      }
      
      return transformed;
    });
    
    // Send the transformed products to the client
    console.log(`Sending ${transformedProducts.length} transformed products to client`);
    res.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products from Lightspeed:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
