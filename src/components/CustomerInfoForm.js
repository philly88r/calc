import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';

const CustomerInfoForm = ({ initialData, onFormChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    siteAddress: '',
    zipCode: '',
    billingAddress: '',
    phoneNumber: '',
    secondaryNumber: '',
    email: '',
    typeOfJob: 'Chain link',
    salesRep: '',
    salesRepTel: '',
    salesRepEmail: '',
    crewLead: '',
    contractorName: ''
  });

  // Initialize form with initialData if provided
  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData
      }));
    }
  }, [initialData]);

  const salesReps = [
    {
      name: 'Jeff Yates',
      phone: '',
      email: ''
    },
    {
      name: 'Paul Vincent',
      phone: '361-648-6768',
      email: 'paul@southtexasfad.com'
    }
  ];

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'salesRep') {
        const salesRep = salesReps.find(rep => rep.name === value);
        if (salesRep) {
          newData.salesRepTel = salesRep.phone;
          newData.salesRepEmail = salesRep.email;
        }
      }
      
      if (onFormChange) onFormChange(newData);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="customerInfoForm">
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb: 1, mb: 3 }}>
          Customer Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Name"
              value={formData.customerName}
              onChange={handleChange('customerName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Site Address"
              value={formData.siteAddress}
              onChange={handleChange('siteAddress')}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              value={formData.zipCode}
              onChange={handleChange('zipCode')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Billing Address"
              value={formData.billingAddress}
              onChange={handleChange('billingAddress')}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Secondary Number"
              value={formData.secondaryNumber}
              onChange={handleChange('secondaryNumber')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type of Job"
              value={formData.typeOfJob}
              onChange={handleChange('typeOfJob')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sales Rep</InputLabel>
              <Select
                value={formData.salesRep}
                label="Sales Rep"
                onChange={handleChange('salesRep')}
              >
                {salesReps.map((rep) => (
                  <MenuItem key={rep.name} value={rep.name}>
                    {rep.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sales Rep Tel"
              value={formData.salesRepTel}
              InputProps={{ 
                readOnly: true,
                sx: { backgroundColor: 'secondary.light', opacity: 0.8 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sales Rep Email"
              value={formData.salesRepEmail}
              InputProps={{ 
                readOnly: true,
                sx: { backgroundColor: 'secondary.light', opacity: 0.8 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Crew Lead"
              value={formData.crewLead}
              onChange={handleChange('crewLead')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contractor Name"
              value={formData.contractorName}
              onChange={handleChange('contractorName')}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default CustomerInfoForm;
