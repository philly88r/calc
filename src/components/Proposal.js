import React, { useRef, useState } from 'react';
import { Button, Typography, Box, Paper, Grid, Divider, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';

const Proposal = ({ 
  customerName,
  customerAddress,
  customerCity,
  customerState,
  customerZip,
  customerPhone,
  customerEmail,
  customerJobSiteAddress,
  salesRep,
  materialsCost,
  outsideLaborCost,
  isCommercial,
  costs,
  totalLinearLength,
  heightOfFence,
  numberOfPulls,
  commercialOrResidential,
  blackOrGalvanized,
  gaugeOfMesh,
  typeOfMeshFold,
  withHBraces,
  withTrussRods,
  barbedWire,
  spacingOfPosts,
  depthOfHoles,
  numberOfSingleGates,
  numberOfDoubleGates,
  numberOfSlidingGates,
  terminalPostDiameter,
  doubleGatePostDiameter,
  slidingGatePostDiameter,
  linePostDiameter,
  topRailDiameter,
  gateFrameDiameter,
  terminalPostThickness,
  doubleGatePostThickness,
  slidingGatePostThickness,
  linePostThickness,
  topRailThickness,
  numberOfFlangedPostsCentered,
  numberOfFlangedPostsOffCentered,
  maxPrice,
  typeOfConcrete
}) => {
  const signatureRef = useRef();
  const [signatureDataURL, setSignatureDataURL] = useState(null);
  const [showSignature, setShowSignature] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate total cost (materials + labor)
  const totalMaterialCost = materialsCost || 0;
  const totalLaborCost = outsideLaborCost || 0;
  const totalCost = totalMaterialCost + totalLaborCost;
  
  // Editable state for proposal fields
  const [editableFields, setEditableFields] = useState({
    customerName: customerName || '',
    customerAddress: customerAddress || '',
    customerCity: customerCity || '',
    customerState: customerState || '',
    customerZip: customerZip || '',
    customerPhone: customerPhone || '',
    customerEmail: customerEmail || '',
    customerJobSiteAddress: customerJobSiteAddress || '',
    salesRep: salesRep || 'Paul Vincent (361-648-6768)',
    companyName: 'South Texas Fence & Deck, LLC',
    companyAddress: 'PO Box 4767',
    companyCityStateZip: 'Victoria, TX 77903',
    companyPhone: '361-935-2137',
    companyEmail: 'sunny@southtexasfad.com',
    projectDescription: 'Installation of a new fence system as specified in the materials list below. All work will be completed in a workmanlike manner according to standard practices.',
    paymentTerms: 'A 50% deposit is required to begin work, with the remaining balance due upon completion.',
    price: maxPrice ? maxPrice.toFixed(2) : totalCost.toFixed(2)
  });
  
  const handleFieldChange = (field) => (event) => {
    setEditableFields({
      ...editableFields,
      [field]: event.target.value
    });
  };
  
  const clearSignature = () => {
    signatureRef.current.clear();
    setSignatureDataURL(null);
  };
  
  const saveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert("Please provide a signature first");
      return;
    }
    setSignatureDataURL(signatureRef.current.getTrimmedCanvas().toDataURL('image/png'));
    setShowSignature(true);
  };
  
  const generatePDF = () => {
    // Temporarily disable editing for PDF generation
    const currentEditingState = isEditing;
    setIsEditing(false);
    
    setTimeout(() => {
      const proposalElement = document.getElementById('proposal');
      
      html2canvas(proposalElement, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${editableFields.customerName || 'Customer'}_Fence_Proposal.pdf`);
        
        // Restore editing state
        setIsEditing(currentEditingState);
      });
    }, 100);
  };
  
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          onClick={generatePDF}
          sx={{ 
            backgroundColor: '#6d2f2c', 
            color: 'white', 
            '&:hover': { backgroundColor: '#7c3a3d' } 
          }}
        >
          Download as PDF
        </Button>
        <Button 
          variant="contained" 
          onClick={toggleEditing}
          sx={{ 
            backgroundColor: isEditing ? '#4caf50' : '#2196f3', 
            color: 'white', 
            '&:hover': { backgroundColor: isEditing ? '#45a049' : '#1976d2' } 
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Proposal'}
        </Button>
      </Box>
      
      <Paper 
        id="proposal" 
        elevation={3} 
        sx={{ 
          p: 4, 
          backgroundColor: '#fff',
          minHeight: '842px', // A4 height in pixels
          width: '100%',
          maxWidth: '595px', // A4 width in pixels
          margin: '0 auto'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#6d2f2c', fontWeight: 'bold' }}>
            FENCE PROPOSAL
          </Typography>
          <Typography variant="subtitle1">
            Date: {formattedDate}
          </Typography>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 1 }}>Customer Information:</Typography>
            {isEditing ? (
              <>
                <TextField 
                  fullWidth 
                  label="Name" 
                  value={editableFields.customerName} 
                  onChange={handleFieldChange('customerName')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Address" 
                  value={editableFields.customerAddress} 
                  onChange={handleFieldChange('customerAddress')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="City" 
                  value={editableFields.customerCity} 
                  onChange={handleFieldChange('customerCity')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="State" 
                  value={editableFields.customerState} 
                  onChange={handleFieldChange('customerState')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Zip" 
                  value={editableFields.customerZip} 
                  onChange={handleFieldChange('customerZip')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Phone" 
                  value={editableFields.customerPhone} 
                  onChange={handleFieldChange('customerPhone')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  value={editableFields.customerEmail} 
                  onChange={handleFieldChange('customerEmail')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Job Site Address" 
                  value={editableFields.customerJobSiteAddress} 
                  onChange={handleFieldChange('customerJobSiteAddress')} 
                  margin="dense" 
                  size="small" 
                />
              </>
            ) : (
              <>
                <Typography><strong>Name:</strong> {editableFields.customerName}</Typography>
                <Typography><strong>Address:</strong> {editableFields.customerAddress}</Typography>
                <Typography><strong>City, State, Zip:</strong> {editableFields.customerCity}, {editableFields.customerState} {editableFields.customerZip}</Typography>
                <Typography><strong>Phone:</strong> {editableFields.customerPhone}</Typography>
                <Typography><strong>Email:</strong> {editableFields.customerEmail}</Typography>
                {editableFields.customerJobSiteAddress && (
                  <Typography><strong>Job Site Address:</strong> {editableFields.customerJobSiteAddress}</Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 1 }}>Company Information:</Typography>
            {isEditing ? (
              <>
                <TextField 
                  fullWidth 
                  label="Company Name" 
                  value={editableFields.companyName} 
                  onChange={handleFieldChange('companyName')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Address" 
                  value={editableFields.companyAddress} 
                  onChange={handleFieldChange('companyAddress')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="City, State, Zip" 
                  value={editableFields.companyCityStateZip} 
                  onChange={handleFieldChange('companyCityStateZip')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Phone" 
                  value={editableFields.companyPhone} 
                  onChange={handleFieldChange('companyPhone')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  value={editableFields.companyEmail} 
                  onChange={handleFieldChange('companyEmail')} 
                  margin="dense" 
                  size="small" 
                />
                <TextField 
                  fullWidth 
                  label="Sales Representative" 
                  value={editableFields.salesRep} 
                  onChange={handleFieldChange('salesRep')} 
                  margin="dense" 
                  size="small" 
                />
              </>
            ) : (
              <>
                <Typography><strong>Company Name:</strong> {editableFields.companyName}</Typography>
                <Typography><strong>Address:</strong> {editableFields.companyAddress}</Typography>
                <Typography><strong>City, State, Zip:</strong> {editableFields.companyCityStateZip}</Typography>
                <Typography><strong>Phone:</strong> {editableFields.companyPhone}</Typography>
                <Typography><strong>Email:</strong> {editableFields.companyEmail}</Typography>
                <Typography><strong>Sales Representative:</strong> {editableFields.salesRep}</Typography>
              </>
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Project Description:</Typography>
          {isEditing ? (
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              value={editableFields.projectDescription} 
              onChange={handleFieldChange('projectDescription')} 
              margin="dense" 
            />
          ) : (
            <Typography paragraph>
              {editableFields.projectDescription}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Fence Details:</Typography>
          {totalLinearLength ? (
            <>
              <Typography paragraph>
                Total Linear Length (feet): {totalLinearLength}
              </Typography>
              <Typography paragraph>
                Height of fence (feet): {heightOfFence}
              </Typography>
              <Typography paragraph>
                Number of pulls: {numberOfPulls}
              </Typography>
              <Typography paragraph>
                Commercial or Residential: {commercialOrResidential}
              </Typography>
              <Typography paragraph>
                Black or Galvanized: {blackOrGalvanized}
              </Typography>
              <Typography paragraph>
                Gauge of mesh: {gaugeOfMesh}
              </Typography>
              <Typography paragraph>
                Type of mesh fold: {typeOfMeshFold}
              </Typography>
              <Typography paragraph>
                With H braces?: {withHBraces ? 'Yes' : 'No'}
              </Typography>
              <Typography paragraph>
                With truss rods?: {withTrussRods ? 'Yes' : 'No'}
              </Typography>
              <Typography paragraph>
                3 strand barbwire?: {barbedWire ? 'Yes' : 'No'}
              </Typography>
              <Typography paragraph>
                Spacing of posts: {spacingOfPosts}
              </Typography>
              <Typography paragraph>
                Number of single gates: {numberOfSingleGates}
              </Typography>
              <Typography paragraph>
                Number of double gates: {numberOfDoubleGates}
              </Typography>
              <Typography paragraph>
                Number of sliding gates: {numberOfSlidingGates}
              </Typography>
              <Typography paragraph>
                No. of flanged posts centered: {numberOfFlangedPostsCentered}
              </Typography>
              <Typography paragraph>
                No. of flanged posts off centered: {numberOfFlangedPostsOffCentered}
              </Typography>
              <Typography paragraph>
                Type of concrete: {typeOfConcrete}
              </Typography>
            </>
          ) : (
            <Typography paragraph>
              Chain link fence installation as per the specifications discussed.
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Materials List:</Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            {costs && Object.entries(costs).length > 0 ? (
              Object.entries(costs).map(([item, details]) => (
                <Typography key={item}>• {item}: {details?.quantity || 0} {details?.unit || 'units'}</Typography>
              ))
            ) : (
              <Typography>• All posts, rails, and hardware needed for installation</Typography>
            )}
          </Paper>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Pricing:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              label="Total Price ($)"
              type="number"
              value={editableFields.price}
              onChange={handleFieldChange('price')}
              InputProps={{
                startAdornment: '$',
              }}
              margin="dense"
            />
          ) : (
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Total Price: ${parseFloat(editableFields.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Payment Terms:</Typography>
          {isEditing ? (
            <TextField 
              fullWidth 
              multiline 
              rows={2} 
              value={editableFields.paymentTerms} 
              onChange={handleFieldChange('paymentTerms')} 
              margin="dense" 
            />
          ) : (
            <Typography paragraph>
              {editableFields.paymentTerms}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Terms and Conditions:</Typography>
          <Typography paragraph variant="body2">
            1. This proposal is valid for 30 days from the date above.
          </Typography>
          <Typography paragraph variant="body2">
            2. Any alteration or deviation from the above specifications involving extra costs will be executed only upon written orders and will become an extra charge over and above the estimate.
          </Typography>
          <Typography paragraph variant="body2">
            3. All agreements are contingent upon strikes, accidents, or delays beyond our control.
          </Typography>
          <Typography paragraph variant="body2">
            4. Our workers are fully covered by Worker's Compensation Insurance.
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#6d2f2c', mb: 2 }}>Acceptance:</Typography>
          <Typography paragraph>
            The above prices, specifications, and conditions are satisfactory and are hereby accepted. You are authorized to do the work as specified. Payment will be made as outlined above.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Customer Signature:</Typography>
              {!showSignature ? (
                <Box sx={{ border: '1px solid #ccc', p: 1, mb: 1 }}>
                  <SignatureCanvas 
                    ref={signatureRef}
                    canvasProps={{
                      width: 300,
                      height: 150,
                      className: 'signature-canvas'
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ border: '1px solid #ccc', p: 1, mb: 1 }}>
                  <img src={signatureDataURL} alt="Customer Signature" style={{ maxWidth: '100%' }} />
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!showSignature ? (
                  <>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={clearSignature}
                      sx={{ borderColor: '#6d2f2c', color: '#6d2f2c' }}
                    >
                      Clear
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={saveSignature}
                      sx={{ backgroundColor: '#6d2f2c', color: 'white', '&:hover': { backgroundColor: '#7c3a3d' } }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => setShowSignature(false)}
                    sx={{ borderColor: '#6d2f2c', color: '#6d2f2c' }}
                  >
                    Edit Signature
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Date:</Typography>
              <Typography>{formattedDate}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Proposal;
