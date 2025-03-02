import React, { useState } from 'react';
import completePricebook from '../data/complete-pricebook.json';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Custom hook for mobile detection
const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

const ChainlinkPriceTest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedPriceBook, setSelectedPriceBook] = useState('Standard');
  const isMobile = useIsMobile();
  
  // Group products by category
  const categories = {
    'Fence Materials': ['post', 'pipe', 'mesh', 'fabric', 'chain link', 'roll'],
    'Hardware & Accessories': ['cap', 'clamp', 'hinge', 'latch', 'tie', 'band', 'bolt', 'nut'],
    'Gates & Components': ['gate', 'operator', 'motor', 'wheel', 'track'],
    'Tools & Equipment': ['tool', 'machine', 'equipment', 'digger'],
    'Other': []
  };

  // Categorize products
  const categorizedProducts = completePricebook.reduce((acc, product) => {
    const searchText = (product.name + ' ' + product.description).toLowerCase();
    let matched = false;

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => searchText.includes(keyword))) {
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        matched = true;
        break;
      }
    }

    if (!matched) {
      if (!acc['Other']) acc['Other'] = [];
      acc['Other'].push(product);
    }

    return acc;
  }, {});

  // Filter products based on search term
  const filterProducts = (products) => {
    if (!searchTerm) return products;
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle variant selection
  const handleVariantChange = (productId, attribute, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [attribute]: value
      }
    }));
  };

  // Get current price based on selected variants and price book
  const getCurrentPrice = (product) => {
    if (!product) return '-';

    // Check if there's a specific price for the selected price book
    const priceBookPrice = product.prices?.[selectedPriceBook]?.price;
    if (priceBookPrice) return Number(priceBookPrice);

    // If there are variations, find the matching variant price
    if (product.hasVariants && product.variations?.length > 0) {
      const currentSelection = selectedVariants[product.id] || {};
      const matchingVariant = product.variations.find(variant => 
        Object.entries(currentSelection).every(([key, value]) => 
          variant[key] === value
        )
      );
      if (matchingVariant?.price) return Number(matchingVariant.price);
    }

    // Fall back to base price
    return product.basePrice ? Number(product.basePrice) : '-';
  };

  const tabNames = Object.keys(categories);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Complete Price List
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: isMobile ? 'column' : 'row' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, SKU, or description..."
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Price Book</InputLabel>
            <Select
              value={selectedPriceBook}
              onChange={(e) => setSelectedPriceBook(e.target.value)}
              label="Price Book"
            >
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Wholesale">Wholesale</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={currentTab} 
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabNames.map((name, index) => (
            <Tab key={index} label={name} />
          ))}
        </Tabs>
      </Box>

      {categorizedProducts[tabNames[currentTab]] && (
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {tabNames[currentTab]} ({filterProducts(categorizedProducts[tabNames[currentTab]]).length} items)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>SKU</TableCell>
                    {!isMobile && <TableCell>Description</TableCell>}
                    <TableCell>Variations</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterProducts(categorizedProducts[tabNames[currentTab]]).map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Typography variant="body2">
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      {!isMobile && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell>
                        {product.hasVariants && product.variations && (
                          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                            {Object.keys(product.variations[0] || {}).filter(key => key !== 'sku' && key !== 'price').map(attribute => (
                              <FormControl key={attribute} size="small" fullWidth>
                                <InputLabel>{attribute}</InputLabel>
                                <Select
                                  value={selectedVariants[product.id]?.[attribute] || ''}
                                  onChange={(e) => handleVariantChange(product.id, attribute, e.target.value)}
                                  label={attribute}
                                >
                                  {Array.from(new Set(product.variations.map(v => v[attribute]))).map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            ))}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {typeof getCurrentPrice(product) === 'number' 
                          ? getCurrentPrice(product).toFixed(2)
                          : getCurrentPrice(product)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default ChainlinkPriceTest;
