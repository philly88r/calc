import React, { useState, useEffect } from 'react';
import { getChainlinkPrices } from '../services/chainlinkPrices';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Custom hook for mobile detection
const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

const ChainlinkPriceTest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  
  // Fetch products from Lightspeed API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getChainlinkPrices();
      console.log('Products data received:', data ? data.length : 0, 'products');
      
      if (data && data.length > 0) {
        console.log('Sample product:', data[0]);
      }
      
      setProducts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load product data from Lightspeed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Filter products based on search term (only if user enters a search)
  const filteredProducts = searchTerm
    ? products.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        // Search in any field that might be a string
        return Object.values(product).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchLower)
        );
      })
    : products;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading pricing data from Lightspeed...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={fetchProducts}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Get all unique keys from all products to create table headers
  const allKeys = new Set();
  products.forEach(product => {
    Object.keys(product).forEach(key => allKeys.add(key));
  });
  
  // Convert to array and prioritize important keys first
  const priorityKeys = ['id', 'sku', 'description', 'price', 'retail_price'];
  const tableHeaders = [...priorityKeys.filter(key => allKeys.has(key)), 
                        ...[...allKeys].filter(key => !priorityKeys.includes(key))];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Lightspeed Raw Product Data
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={fetchProducts}
        >
          Refresh Data
        </Button>
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search in any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Typography variant="body2" sx={{ mb: 1 }}>
        Showing {filteredProducts.length} of {products.length} products
      </Typography>
      
      <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        <Table size={isMobile ? "small" : "medium"} stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (
                <TableCell key={header}>
                  <strong>{header}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={product.id || index}>
                  {tableHeaders.map(header => (
                    <TableCell key={`${product.id || index}-${header}`}>
                      {typeof product[header] === 'object' 
                        ? JSON.stringify(product[header]) 
                        : product[header] !== undefined 
                          ? String(product[header]) 
                          : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  {searchTerm ? 'No products match your search criteria' : 'No products available'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChainlinkPriceTest;
