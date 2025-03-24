const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase, saveFeedback, getAllFeedback, getFeedbackById } = require('./src/services/dbService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database on server start
initializeDatabase()
  .then(success => {
    if (success) {
      console.log('Database initialized successfully');
    } else {
      console.error('Failed to initialize database');
    }
  });

// API Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const { customerName, feedbackData, calculatorState } = req.body;
    
    if (!feedbackData) {
      return res.status(400).json({ success: false, error: 'Feedback data is required' });
    }
    
    const result = await saveFeedback(customerName, feedbackData, calculatorState || {});
    
    if (result.success) {
      return res.status(201).json({ success: true, id: result.id });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error saving feedback:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const result = await getAllFeedback();
    
    if (result.success) {
      return res.json({ success: true, data: result.data });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/feedback/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getFeedbackById(id);
    
    if (result.success) {
      return res.json({ success: true, data: result.data });
    } else {
      return res.status(404).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
