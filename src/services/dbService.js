const { Pool } = require('pg');
require('dotenv').config();

// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'db.kdhwrlhzevzekoanusbs.supabase.co',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connections
  }
});

// Initialize the database by creating the necessary tables if they don't exist
const initializeDatabase = async () => {
  try {
    // Create feedback table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        feedback_data JSONB,
        calculator_state JSONB
      )
    `);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Save feedback to the database
const saveFeedback = async (customerName, feedbackData, calculatorState) => {
  try {
    const result = await pool.query(
      'INSERT INTO feedback (customer_name, feedback_data, calculator_state) VALUES ($1, $2, $3) RETURNING id',
      [customerName, feedbackData, calculatorState]
    );
    
    return {
      success: true,
      id: result.rows[0].id
    };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all feedback entries
const getAllFeedback = async () => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY timestamp DESC');
    return {
      success: true,
      data: result.rows
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get feedback by ID
const getFeedbackById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM feedback WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return {
        success: false,
        error: 'Feedback not found'
      };
    }
    
    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  initializeDatabase,
  saveFeedback,
  getAllFeedback,
  getFeedbackById
};
