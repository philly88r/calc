import React from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper,
  Box
} from '@mui/material';

/**
 * Component to display formatted product descriptions
 * @param {Object} props
 * @param {string} props.html - HTML content to render (if provided)
 * @param {Object} props.product - Product object with description fields
 */
const ProductDescription = ({ html, product }) => {
  // If HTML content is provided, render it in a sanitized way
  if (html) {
    return (
      <Box className="product-description">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Box>
    );
  }

  // If no HTML is provided but we have a product object
  if (product) {
    const { type, sizes, lengths, coating, description } = product;
    
    return (
      <Box className="product-description" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {type || 'Fasteners'}
        </Typography>
        
        <Typography paragraph>
          {description || 'Product description not available'}
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableBody>
              {type && (
                <TableRow>
                  <TableCell component="th" scope="row">Type</TableCell>
                  <TableCell>{type}</TableCell>
                </TableRow>
              )}
              {sizes && (
                <TableRow>
                  <TableCell component="th" scope="row">Sizes</TableCell>
                  <TableCell>{sizes}</TableCell>
                </TableRow>
              )}
              {lengths && (
                <TableRow>
                  <TableCell component="th" scope="row">Length</TableCell>
                  <TableCell>{lengths}</TableCell>
                </TableRow>
              )}
              {coating && (
                <TableRow>
                  <TableCell component="th" scope="row">Coating</TableCell>
                  <TableCell>{coating}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  
  // Default case if no data is provided
  return (
    <Typography variant="body1" color="text.secondary">
      No product description available
    </Typography>
  );
};

export default ProductDescription;
