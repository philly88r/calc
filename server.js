// Express server to fetch products from PostgreSQL and Lightspeed API
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

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
    
    // Fetch products with a reasonable limit
    // Lightspeed API might not support proper pagination
    const response = await axios.get(`${LIGHTSPEED_BASE_URL}/products`, {
      headers,
      params: {
        limit: 2500  // Set a high limit but not infinite
      }
    });
    
    // Extract products from the response
    let products = [];
    
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      products = response.data.data;
      console.log(`Fetched ${products.length} products from Lightspeed API v2.0`);
      
      // Log product IDs to check for duplicates (just first 5)
      if (products.length > 0) {
        const sampleIds = products.slice(0, 5).map(p => p.id);
        console.log('Sample product IDs:', sampleIds);
      }
    } else {
      console.log('Unexpected API response format');
      products = [];
    }
    
    // Log a sample product to see its structure
    if (products.length > 0) {
      console.log('Sample product:', JSON.stringify(products[0], null, 2).substring(0, 200) + '...');
    }
    
    // Send the products to the client
    console.log(`Sending ${products.length} products to client`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Lightspeed:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
