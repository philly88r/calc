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

async function checkFeedback() {
  try {
    // Check if the feedback table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'feedback'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    console.log('Feedback table exists:', tableExists);
    
    if (tableExists) {
      // Get all feedback entries
      const result = await pool.query('SELECT * FROM feedback ORDER BY timestamp DESC');
      
      if (result.rows.length === 0) {
        console.log('No feedback entries found in the database.');
      } else {
        console.log(`Found ${result.rows.length} feedback entries:`);
        
        // Display each entry
        result.rows.forEach((row, index) => {
          console.log(`\n========== Feedback Entry #${index + 1} ==========`);
          console.log(`ID: ${row.id}`);
          console.log(`Customer: ${row.customer_name || 'Unknown Customer'}`);
          console.log(`Timestamp: ${new Date(row.timestamp).toLocaleString()}`);
          
          console.log('\n--- Feedback Data ---');
          if (row.feedback_data) {
            const feedbackData = typeof row.feedback_data === 'string' 
              ? JSON.parse(row.feedback_data) 
              : row.feedback_data;
              
            // Display each section's feedback
            Object.entries(feedbackData).forEach(([section, notes]) => {
              if (notes && notes.trim() !== '') {
                console.log(`\n${section.toUpperCase()}:`);
                console.log(notes);
              }
            });
          } else {
            console.log('No feedback data available');
          }
          
          console.log('\n--- Calculator State ---');
          if (row.calculator_state) {
            const calculatorState = typeof row.calculator_state === 'string'
              ? JSON.parse(row.calculator_state)
              : row.calculator_state;
            
            console.log(JSON.stringify(calculatorState, null, 2));
          } else {
            console.log('No calculator state available');
          }
          
          console.log('\n===========================================');
        });
      }
    }
  } catch (error) {
    console.error('Error checking feedback:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the function
checkFeedback();
