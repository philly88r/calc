import React from 'react';
import { Container, Box, Paper, Button } from '@mui/material';
import CustomerInfoForm from '../components/CustomerInfoForm';

const CustomerInfo = ({ initialData, onSubmit }) => {
  const handleCustomerInfoChange = (formData) => {
    // We can still log the data for debugging
    console.log('Customer Info:', formData);
  };

  const handleSubmit = (formData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Paper 
          elevation={2}
          sx={{ 
            p: 4,
            borderRadius: 2,
            backgroundColor: '#ffffff'
          }}
        >
          <CustomerInfoForm 
            initialData={initialData} 
            onFormChange={handleCustomerInfoChange} 
            onSubmit={handleSubmit}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => {
                if (onSubmit) {
                  // Get the current form data from the form component
                  const formElement = document.querySelector('form');
                  if (formElement) {
                    const formData = new FormData(formElement);
                    const data = Object.fromEntries(formData.entries());
                    onSubmit(data);
                  }
                }
              }}
            >
              Continue to Calculator
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerInfo;
