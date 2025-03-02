import React from 'react';
import { Typography, Box, TextField, Grid } from '@mui/material';

const CustomerInfo = ({ 
  customerName, 
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  customerCity,
  setCustomerCity,
  customerState,
  setCustomerState,
  customerZip,
  setCustomerZip,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  customerJobSiteAddress,
  setCustomerJobSiteAddress,
  salesRep,
  setSalesRep
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#6d2f2c' }}>Customer Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Customer Name"
            value={customerName || ''}
            onChange={(e) => setCustomerName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={customerPhone || ''}
            onChange={(e) => setCustomerPhone(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={customerEmail || ''}
            onChange={(e) => setCustomerEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address"
            value={customerAddress || ''}
            onChange={(e) => setCustomerAddress(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={customerCity || ''}
            onChange={(e) => setCustomerCity(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={customerState || ''}
            onChange={(e) => setCustomerState(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Zip Code"
            value={customerZip || ''}
            onChange={(e) => setCustomerZip(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Site Address (if different)"
            value={customerJobSiteAddress || ''}
            onChange={(e) => setCustomerJobSiteAddress(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Sales Representative"
            value={salesRep || ''}
            onChange={(e) => setSalesRep(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInfo;
