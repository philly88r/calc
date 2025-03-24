import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FeedbackForm = ({ sectionName, onSave }) => {
  const [notes, setNotes] = useState('');
  
  const handleChange = (e) => {
    setNotes(e.target.value);
  };
  
  const handleSave = () => {
    onSave(sectionName, notes);
  };
  
  // Special placeholder text for Material Costs section
  const getPlaceholderText = () => {
    if (sectionName === "Material Costs") {
      return "Add your notes about material costs here. Consider:\n" +
        "- Are the prices accurate for each material?\n" +
        "- Are gate costs displaying correctly?\n" +
        "- Are there any materials missing from the cost calculation?\n" +
        "- Should any costs be adjusted or presented differently?";
    }
    
    if (sectionName === "Missing Formulas") {
      return "Add your notes about missing calculations or formulas here. Consider:\n" +
        "- Are there any calculations that should be added?\n" +
        "- Are there any formulas that need to be adjusted?\n" +
        "- Are there any special cases that aren't being handled correctly?\n" +
        "- Are there any industry-standard calculations that should be included?";
    }
    
    return `Add your notes about the ${sectionName.toLowerCase()} section here...`;
  };
  
  // Special styling for Material Costs section
  const getSectionStyle = () => {
    if (sectionName === "Material Costs") {
      return { 
        bgcolor: "#fff8e1", // Light amber background for material costs section
        border: "1px solid #ffd54f" // Amber border
      };
    }
    
    if (sectionName === "Missing Formulas") {
      return { 
        bgcolor: "#e8f5e9", // Light green background for missing formulas section
        border: "1px solid #81c784" // Green border
      };
    }
    
    return { bgcolor: "#f0f7ff" }; // Default light blue background
  };
  
  return (
    <Box mt={3} p={2} borderRadius={1} {...getSectionStyle()}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Feedback Notes - {sectionName}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={sectionName === "Material Costs" ? 6 : 4}
        variant="outlined"
        placeholder={getPlaceholderText()}
        value={notes}
        onChange={handleChange}
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Notes
        </Button>
      </Box>
    </Box>
  );
};

const FeedbackContainer = ({ sections = [], customerData = {} }) => {
  const [feedbackData, setFeedbackData] = useState({});
  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['Material Costs', 'Missing Formulas']); // Default expanded sections
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    success: false,
    error: null,
    feedbackId: null
  });
  
  const handleSaveSection = (section, notes) => {
    setFeedbackData(prev => ({
      ...prev,
      [section]: notes
    }));
    setSaveSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSaveSnackbarOpen(false);
  };
  
  const handleSaveAll = async () => {
    setSaveStatus({
      loading: true,
      success: false,
      error: null,
      feedbackId: null
    });
    
    try {
      // Create data object to send to the server
      const dataToSave = {
        customerName: customerData.customerName || 'Unknown Customer',
        feedbackData: feedbackData,
        calculatorState: {
          // Add relevant calculator state here
          timestamp: new Date().toISOString()
        }
      };
      
      // Send data to the server
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSaveStatus({
          loading: false,
          success: true,
          error: null,
          feedbackId: result.id
        });
        setSaveSnackbarOpen(true);
      } else {
        throw new Error(result.error || 'Failed to save feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      setSaveStatus({
        loading: false,
        success: false,
        error: error.message,
        feedbackId: null
      });
      setSaveSnackbarOpen(true);
    }
  };
  
  // Fallback to file download if server is not available
  const saveToFile = () => {
    // Create a JSON file with all feedback
    const jsonData = JSON.stringify({
      timestamp: new Date().toISOString(),
      customerName: customerData.customerName || 'Unknown Customer',
      feedback: feedbackData
    }, null, 2);
    
    // Create a Blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fence_calculator_feedback_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSaveSnackbarOpen(true);
  };
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSections(prev => {
      if (isExpanded) {
        return [...prev, panel];
      } else {
        return prev.filter(item => item !== panel);
      }
    });
  };
  
  // Get special styling for section headers
  const getSectionHeaderStyle = (section) => {
    if (section === "Material Costs") {
      return { 
        fontWeight: 'bold',
        color: '#b28704' // Amber text for material costs
      };
    }
    
    if (section === "Missing Formulas") {
      return { 
        fontWeight: 'bold',
        color: '#2e7d32' // Green text for missing formulas
      };
    }
    
    return {};
  };
  
  // Get special styling for accordion
  const getAccordionStyle = (section) => {
    if (section === "Material Costs") {
      return { 
        border: '1px solid #ffd54f',
        mb: 2,
        '&:before': {
          display: 'none',
        },
      };
    }
    
    if (section === "Missing Formulas") {
      return { 
        border: '1px solid #81c784',
        mb: 2,
        '&:before': {
          display: 'none',
        },
      };
    }
    
    return {};
  };
  
  // Get special styling for accordion summary
  const getAccordionSummaryStyle = (section) => {
    if (section === "Material Costs") {
      return { backgroundColor: '#fff8e1' };
    }
    
    if (section === "Missing Formulas") {
      return { backgroundColor: '#e8f5e9' };
    }
    
    return {};
  };
  
  // Get label suffix for new sections
  const getSectionLabelSuffix = (section) => {
    if (section === "Material Costs" || section === "Missing Formulas") {
      return " (New)";
    }
    return "";
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#2c3e50', marginTop: 20 }}>
        Fence Calculator Feedback Form
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" style={{ marginBottom: 20 }}>
        Please add notes to any section you'd like to provide feedback on, then click Save All Feedback at the bottom.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={saveStatus.loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
          onClick={handleSaveAll}
          disabled={saveStatus.loading}
          fullWidth
        >
          {saveStatus.loading ? 'Saving...' : 'Save Feedback to Database'}
        </Button>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          startIcon={<SaveIcon />}
          onClick={saveToFile}
          fullWidth
        >
          Download as File (Backup)
        </Button>
      </Box>
      
      {saveStatus.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Feedback saved successfully to database! ID: {saveStatus.feedbackId}
        </Alert>
      )}
      
      {saveStatus.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error saving to database: {saveStatus.error}. Try using the download option instead.
        </Alert>
      )}
      
      {sections.map((section, index) => (
        <Accordion 
          key={index} 
          expanded={expandedSections.includes(section)}
          onChange={handleAccordionChange(section)}
          sx={getAccordionStyle(section)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.toLowerCase()}-content`}
            id={`${section.toLowerCase()}-header`}
            sx={getAccordionSummaryStyle(section)}
          >
            <Typography 
              variant="h6"
              sx={getSectionHeaderStyle(section)}
            >
              {section}
              {getSectionLabelSuffix(section)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FeedbackForm 
              sectionName={section} 
              onSave={handleSaveSection}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      
      <Box mt={4} mb={2} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={saveStatus.loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
          onClick={handleSaveAll}
          disabled={saveStatus.loading}
        >
          {saveStatus.loading ? 'Saving...' : 'Save All Feedback to Database'}
        </Button>
      </Box>
      
      <Snackbar 
        open={saveSnackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={saveStatus.error ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {saveStatus.error 
            ? `Error: ${saveStatus.error}` 
            : saveStatus.success 
              ? `Feedback saved to database successfully! ID: ${saveStatus.feedbackId}`
              : "Feedback saved successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackContainer;
