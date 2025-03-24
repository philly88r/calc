import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import ProductDescription from './ProductDescription';
import ProductVariantPricing from './ProductVariantPricing';

const carriageBoltHtml = `
<p>Fasteners</p>
<p><span>Carriage bolt usually used in wood applications. It is ideal for fastening wood to metal which can also be used to fasten two pieces of wood together.</span></p>
<p><span>-heavy duty applications</span></p>
<p><span>-Long-lasting</span></p>
<p> </p>
<p> </p>
<p><span>Comes to 4 coatings, 6 sizes and 15 lengths:</span></p>
<p><span>Coating: Zinc (internal use), Hot dip galvanised, Black Oxide, Stainless Steel</span></p>
<p><span>Sizes: 1/4", 5/16", 3/8", 1/2", 5/8", 3/4"</span></p>
<p><span>Length: 1", 1 1/4", 1 1/2", 1 3/4", 2", 2 1/2", 3", 3 1/2", 4", 5", 6", 8", 10", 12", 14"</span></p>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <colgroup>
    <col style="width: 49.938042%;" />
    <col style="width: 49.938042%;" />
  </colgroup>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Fasteners</td>
    </tr>
    <tr>
      <td><span>Sizes</span></td>
      <td><span>1/4", 5/16", 3/8", 1/2", 5/8", 3/4"</span></td>
    </tr>
    <tr>
      <td><span>Length</span></td>
      <td><span>1", 1 1/4", 1 1/2", 1 3/4", 2", 2 1/2", 3", 3 1/2", 4", 5", 6", 8", 10", 12", 14"</span></td>
    </tr>
    <tr>
      <td><span>Coating</span></td>
      <td><span>Zinc (internal use), Hot dip galvanised, Black Oxide, Stainless Steel</span></td>
    </tr>
  </tbody>
</table>
`;

// Example product object with structured data
const carriageBoltProduct = {
  type: 'Fasteners',
  description: 'Carriage bolt usually used in wood applications. It is ideal for fastening wood to metal which can also be used to fasten two pieces of wood together. Heavy duty applications. Long-lasting.',
  sizes: '1/4", 5/16", 3/8", 1/2", 5/8", 3/4"',
  lengths: '1", 1 1/4", 1 1/2", 1 3/4", 2", 2 1/2", 3", 3 1/2", 4", 5", 6", 8", 10", 12", 14"',
  coating: 'Zinc (internal use), Hot dip galvanised, Black Oxide, Stainless Steel'
};

// Example product variants with SKUs and pricing
const productVariants = [
  { 
    id: '1', 
    sku: 'CB-14-1-Z', 
    size: '1/4"', 
    length: '1"', 
    coating: 'Zinc', 
    price: 0.45,
    stock: 250
  },
  { 
    id: '2', 
    sku: 'CB-14-2-Z', 
    size: '1/4"', 
    length: '2"', 
    coating: 'Zinc', 
    price: 0.55,
    stock: 175
  },
  { 
    id: '3', 
    sku: 'CB-38-2-HDG', 
    size: '3/8"', 
    length: '2"', 
    coating: 'Hot dip galvanised', 
    price: 1.25,
    stock: 120
  },
  { 
    id: '4', 
    sku: 'CB-38-3-HDG', 
    size: '3/8"', 
    length: '3"', 
    coating: 'Hot dip galvanised', 
    price: 1.45,
    stock: 85
  },
  { 
    id: '5', 
    sku: 'CB-12-4-SS', 
    size: '1/2"', 
    length: '4"', 
    coating: 'Stainless Steel', 
    price: 3.75,
    stock: 60
  },
  { 
    id: '6', 
    sku: 'CB-58-6-BO', 
    size: '5/8"', 
    length: '6"', 
    coating: 'Black Oxide', 
    price: 2.95,
    stock: 45
  },
  { 
    id: '7', 
    sku: 'CB-34-8-SS', 
    size: '3/4"', 
    length: '8"', 
    coating: 'Stainless Steel', 
    price: 6.50,
    stock: 30
  }
];

const ProductDetailExample = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Detail Examples
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Example 1: Using Raw HTML
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This renders the product description using the raw HTML content.
        </Typography>
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <ProductDescription html={carriageBoltHtml} />
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Example 2: Using Structured Data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This renders the product description using structured data in a cleaner format.
        </Typography>
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <ProductDescription product={carriageBoltProduct} />
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Example 3: Product Variants with SKUs and Pricing
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This shows detailed SKU and pricing information for each product variant.
        </Typography>
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Typography variant="h5" gutterBottom>
            Carriage Bolts
          </Typography>
          <Typography paragraph>
            {carriageBoltProduct.description}
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>SKU</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Coating</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                  <TableCell align="right">Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productVariants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell><strong>{variant.sku}</strong></TableCell>
                    <TableCell>{variant.size}</TableCell>
                    <TableCell>{variant.length}</TableCell>
                    <TableCell>{variant.coating}</TableCell>
                    <TableCell align="right">${variant.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{variant.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Example 4: Live Lightspeed API Integration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This fetches real-time product data from Lightspeed API, including SKUs and pricing.
        </Typography>
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <ProductVariantPricing 
            product={carriageBoltProduct} 
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailExample;
