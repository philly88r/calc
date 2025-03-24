import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import FenceCalculator from '../FenceCalculator';
import FeedbackContainer from '../components/FeedbackForm';

const FeedbackCalculatorPage = ({ customerData = {} }) => {
  // Define all the sections that need feedback
  const feedbackSections = [
    "General Information",
    "Fence Specifications",
    "Gate Specifications",
    "Single Gates",
    "Double Gates",
    "Sliding Gates",
    "Posts",
    "Top Rail",
    "Mesh",
    "Hardware",
    "Slats",
    "Barbed Wire",
    "Material Costs",
    "Missing Formulas",
    "Labor",
    "Pricing",
    "Proposal"
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#2c3e50' }}>
        Fence Calculator - Feedback Version
      </Typography>
      <Typography variant="body1" paragraph align="center">
        This version of the calculator allows you to provide feedback on each section.
        Please review the calculator below and add your notes to any section you'd like to provide feedback on.
      </Typography>
      
      <Divider style={{ margin: '20px 0' }} />
      
      {/* Feedback Form */}
      <FeedbackContainer sections={feedbackSections} customerData={customerData} />
      
      <Divider style={{ margin: '20px 0' }} />
      
      {/* Original Calculator */}
      <FenceCalculator customerData={customerData} />
    </Box>
  );
};

export default FeedbackCalculatorPage;
