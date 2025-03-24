import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getChainlinkPrices } from '../services/chainlinkPrices';

/**
 * Component to display product variants with SKUs and pricing from Lightspeed API
 * @param {Object} props
 * @param {Object} props.product - Base product information
 * @param {Array} props.variants - Array of product variants (optional, will use Lightspeed data if not provided)
 */
const ProductVariantPricing = ({ product, variants: initialVariants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [variants, setVariants] = useState(initialVariants || []);
  const [loading, setLoading] = useState(!initialVariants);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    size: '',
    coating: '',
    material: ''
  });
  
  // Collect unique filter options
  const uniqueSizes = [...new Set(variants.filter(v => v.size).map(v => v.size))];
  const uniqueCoatings = [...new Set(variants.filter(v => v.coating).map(v => v.coating))];
  const uniqueMaterials = [...new Set(variants.filter(v => v.material).map(v => v.material))];
  
  // Fetch product variants from Lightspeed API if not provided
  useEffect(() => {
    if (!initialVariants) {
      fetchProductVariants();
    }
  }, [initialVariants]);
  
  // Function to fetch product variants from Lightspeed API
  const fetchProductVariants = async () => {
    try {
      setLoading(true);
      const data = await getChainlinkPrices();
      console.log('Product data received:', data ? data.length : 0, 'products');
      
      // Filter products based on product type or category if needed
      let filteredProducts = data || [];
      
      // If we have a product type/category, filter by it
      if (product && product.type) {
        filteredProducts = filteredProducts.filter(item => 
          (item.description || '').toLowerCase().includes(product.type.toLowerCase())
        );
        console.log(`Filtered to ${filteredProducts.length} ${product.type} products`);
      }
      
      setVariants(filteredProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching product variants:', err);
      setError('Failed to load product data from Lightspeed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      size: '',
      coating: '',
      material: ''
    });
    setSearchTerm('');
  };
  
  // Apply filters to variants
  const filteredVariants = variants.filter(variant => {
    // Apply search term filter
    const matchesSearch = !searchTerm || 
      (variant.sku || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (variant.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply dropdown filters
    const matchesSize = !filters.size || variant.size === filters.size;
    const matchesCoating = !filters.coating || variant.coating === filters.coating;
    const matchesMaterial = !filters.material || variant.material === filters.material;
    
    return matchesSearch && matchesSize && matchesCoating && matchesMaterial;
  });
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading product variants from Lightspeed...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={fetchProductVariants}
        >
          Retry
        </Button>
      </Box>
    );
  }
  
  return (
    <Box>
      {product && (
        <>
          <Typography variant="h5" gutterBottom>
            {product.type || 'Product'} Variants
          </Typography>
          <Typography paragraph>
            {product.description}
          </Typography>
        </>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by SKU or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={fetchProductVariants}
                disabled={loading}
                startIcon={<RefreshIcon />}
                sx={{ mr: 1 }}
              >
                Refresh Prices
              </Button>
              <Button
                variant="outlined"
                onClick={resetFilters}
                disabled={!searchTerm && !filters.size && !filters.coating && !filters.material}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FilterListIcon sx={{ mr: 1 }} /> Filter Options
          </Typography>
          <Grid container spacing={2}>
            {uniqueSizes.length > 0 && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={filters.size}
                    label="Size"
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                  >
                    <MenuItem value="">All Sizes</MenuItem>
                    {uniqueSizes.map(size => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            
            {uniqueCoatings.length > 0 && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Coating</InputLabel>
                  <Select
                    value={filters.coating}
                    label="Coating"
                    onChange={(e) => handleFilterChange('coating', e.target.value)}
                  >
                    <MenuItem value="">All Coatings</MenuItem>
                    {uniqueCoatings.map(coating => (
                      <MenuItem key={coating} value={coating}>{coating}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            
            {uniqueMaterials.length > 0 && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Material</InputLabel>
                  <Select
                    value={filters.material}
                    label="Material"
                    onChange={(e) => handleFilterChange('material', e.target.value)}
                  >
                    <MenuItem value="">All Materials</MenuItem>
                    {uniqueMaterials.map(material => (
                      <MenuItem key={material} value={material}>{material}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2">
            {filteredVariants.length} variants found
          </Typography>
        </Box>
      </Box>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>SKU</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Coating</TableCell>
              <TableCell>Material</TableCell>
              <TableCell align="right">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVariants.length > 0 ? (
              filteredVariants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell><strong>{variant.sku || '-'}</strong></TableCell>
                  <TableCell>{variant.description || '-'}</TableCell>
                  <TableCell>
                    {variant.size ? (
                      <Chip size="small" label={variant.size} color="primary" variant="outlined" />
                    ) : '-'}
                  </TableCell>
                  <TableCell>{variant.length || '-'}</TableCell>
                  <TableCell>
                    {variant.coating ? (
                      <Chip size="small" label={variant.coating} color="secondary" variant="outlined" />
                    ) : '-'}
                  </TableCell>
                  <TableCell>{variant.material || '-'}</TableCell>
                  <TableCell align="right">
                    {variant.price ? (
                      <Typography fontWeight="bold" color="primary">
                        ${Number(variant.price).toFixed(2)}
                      </Typography>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {searchTerm || filters.size || filters.coating || filters.material ? 
                    'No variants match your search criteria.' : 
                    'No variants available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductVariantPricing;
