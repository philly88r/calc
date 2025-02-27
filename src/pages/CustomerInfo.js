import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import CustomerInfoForm from '../components/CustomerInfoForm';

const CustomerInfo = () => {
  const handleCustomerInfoChange = (formData) => {
    console.log('Customer Info:', formData);
    // Here we can handle the form data, like saving to state or sending to a server
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
          <CustomerInfoForm onFormChange={handleCustomerInfoChange} />
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerInfo;
