import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
  Divider,
  CircularProgress,
  Chip,
  CardActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { supabase } from '../supabaseClient';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('category'); // 'category', 'list', 'grid'
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Placeholder image URLs for different product types with better images
  const placeholderImages = {
    'post': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=400&auto=format&fit=crop',
    'gate': 'https://images.unsplash.com/photo-1573648952759-5861fb3a5969?q=80&w=400&auto=format&fit=crop',
    'mesh': 'https://images.unsplash.com/photo-1519750465415-ea30db9a5ca71?q=80&w=400&auto=format&fit=crop',
    'fabric': 'https://images.unsplash.com/photo-1533247772055-d3c1d7a5ca71?q=80&w=400&auto=format&fit=crop',
    'accessory': 'https://images.unsplash.com/photo-1586864387789-628af9feed72?q=80&w=400&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400&auto=format&fit=crop'
  };

  // Load product data from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from Supabase...');
        
        // Log the table we're querying
        console.log('Querying table: chainlink_products');
        
        const { data, error } = await supabase
          .from('chainlink_products')
          .select('*');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('No products found in the database');
          setLoading(false);
          return;
        }
        
        console.log('Products fetched successfully:', data.length);
        console.log('Sample product with all fields:', data[0]);
        
        // Get all column names from the first product to see what we're working with
        const columnNames = Object.keys(data[0]);
        console.log('Available columns:', columnNames);
        
        // Process the data using the actual column names from the database
        const validProducts = data.filter(product => 
          product.type && product.type.trim() !== ''
        );
        
        console.log('Valid products:', validProducts.length);
        setProducts(validProducts);
        setFilteredProducts(validProducts);
        
        // Extract unique categories using the type field
        const uniqueCategories = [...new Set(validProducts
          .map(product => product.type)
          .filter(category => category && category.trim() !== '')
        )];
        
        console.log('Found categories:', uniqueCategories);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        (product.type && product.type.toLowerCase().includes(term)) ||
        (product.material && product.material.toLowerCase().includes(term)) ||
        (product.sku && product.sku.toString().includes(term))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.type === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Group products by category
  const groupedProducts = () => {
    const grouped = {};
    
    filteredProducts.forEach(product => {
      const category = product.type || 'Uncategorized';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      
      grouped[category].push(product);
    });
    
    return grouped;
  };

  // Group products by parent-child relationships
  const groupProductsByAttributes = (products) => {
    const grouped = {};
    
    products.forEach(product => {
      // Create a key based on product attributes
      if (product.type && product.material) {
        // For posts
        if (product.type.toLowerCase() === 'post') {
          const diameter = product.diameter || '';
          const material = product.material || '';
          
          const key = `${material} ${product.type} - ${diameter}`;
          
          if (!grouped[key]) {
            grouped[key] = [];
          }
          
          grouped[key].push(product);
        } 
        // For gates
        else if (product.type.toLowerCase().includes('gate')) {
          const material = product.material || '';
          const height = product.height || '';
          
          const key = `${product.type} - ${material}`;
          
          if (!grouped[key]) {
            grouped[key] = [];
          }
          
          grouped[key].push(product);
        }
        // For other products
        else {
          const key = `${product.material} ${product.type}`;
          
          if (!grouped[key]) {
            grouped[key] = [];
          }
          
          grouped[key].push(product);
        }
      } else {
        // Fallback for products without type or material
        const key = product.type || 'Other';
        
        if (!grouped[key]) {
          grouped[key] = [];
        }
        
        grouped[key].push(product);
      }
    });
    
    return grouped;
  };

  // Generate PDF catalog
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Chain Link Fence Product Catalog', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
    
    let yPosition = 40;
    const grouped = groupedProducts();
    
    // Add each category
    Object.keys(grouped).forEach(category => {
      // Add category header
      doc.setFontSize(14);
      doc.setTextColor(109, 47, 44); // Primary color
      doc.text(category, 14, yPosition);
      yPosition += 10;
      
      // Add products table
      const tableData = grouped[category].map(product => [
        product.sku || '',
        product.type || '',
        product.material || '',
        product.diameter ? `Diameter: ${product.diameter}` : '',
        product.length ? `Length: ${product.length}` : '',
        `$${parseFloat(product.price || 0).toFixed(2)}`
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['SKU', 'Type', 'Material', 'Diameter', 'Length', 'Price']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [109, 47, 44], textColor: [255, 255, 255] },
        margin: { top: 10 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 40 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
          5: { cellWidth: 25 }
        }
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
      
      // Add new page if needed
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    // Save the PDF
    doc.save('chain-link-product-catalog.pdf');
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  // Handle accordion expansion
  const handleAccordionChange = (category) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? category : null);
  };
  
  // Get image URL for a category
  const getCategoryImage = (category) => {
    if (!category) return placeholderImages.default;
    
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes('post')) return placeholderImages.post;
    if (lowerCategory.includes('gate')) return placeholderImages.gate;
    if (lowerCategory.includes('mesh')) return placeholderImages.mesh;
    if (lowerCategory.includes('fabric')) return placeholderImages.fabric;
    if (lowerCategory.includes('accessory')) return placeholderImages.accessory;
    
    return placeholderImages.default;
  };

  const getProductImage = (product) => {
    if (!product.type) return placeholderImages.default;
    
    const lowerType = product.type.toLowerCase();
    
    if (lowerType.includes('post')) return placeholderImages.post;
    if (lowerType.includes('gate')) return placeholderImages.gate;
    if (lowerType.includes('mesh')) return placeholderImages.mesh;
    if (lowerType.includes('fabric')) return placeholderImages.fabric;
    if (lowerType.includes('accessory')) return placeholderImages.accessory;
    
    return placeholderImages.default;
  };

  const getCategoryFromProduct = (product) => {
    if (!product.type) return 'Uncategorized';
    
    return product.type;
  };

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading product catalog...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Search and filter controls */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2,
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon color="primary" sx={{ mr: 1 }} />,
          }}
          sx={{ 
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            startAdornment={<FilterListIcon color="primary" sx={{ mr: 1 }} />}
            sx={{ 
              borderRadius: 1.5,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<DownloadIcon />}
          onClick={generatePDF}
          sx={{ 
            minWidth: 180,
            fontWeight: 'bold',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Download PDF
        </Button>
      </Box>
      
      {/* View mode selection */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        gap: 2,
        backgroundColor: 'white',
        p: 2,
        borderRadius: 2,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <Button 
          variant={viewMode === 'category' ? 'contained' : 'outlined'} 
          color="primary"
          onClick={() => handleViewModeChange('category')}
          sx={{ 
            flex: 1,
            borderRadius: 1.5,
            fontWeight: viewMode === 'category' ? 'bold' : 'normal',
          }}
        >
          Category View
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'contained' : 'outlined'} 
          color="primary"
          onClick={() => handleViewModeChange('list')}
          sx={{ 
            flex: 1,
            borderRadius: 1.5,
            fontWeight: viewMode === 'list' ? 'bold' : 'normal',
          }}
        >
          List View
        </Button>
        <Button 
          variant={viewMode === 'grid' ? 'contained' : 'outlined'} 
          color="primary"
          onClick={() => handleViewModeChange('grid')}
          sx={{ 
            flex: 1,
            borderRadius: 1.5,
            fontWeight: viewMode === 'grid' ? 'bold' : 'normal',
          }}
        >
          Grid View
        </Button>
      </Box>
      
      {/* No results message */}
      {filteredProducts.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          No products found matching your criteria.
        </Typography>
      )}
      
      {/* Category View */}
      {viewMode === 'category' && filteredProducts.length > 0 && (
        <Box>
          {Object.entries(groupedProducts()).map(([category, products]) => (
            <Accordion 
              key={category}
              expanded={expandedCategory === category}
              onChange={handleAccordionChange(category)}
              sx={{ 
                mb: 2,
                borderRadius: '8px !important',
                overflow: 'hidden',
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                },
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '&.Mui-expanded': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                    {category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    ({products.length} products)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Box sx={{ 
                  display: 'flex', 
                  mb: 0,
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', sm: 250 }, 
                      height: 180, 
                      objectFit: 'cover',
                      borderRight: '1px solid #e2e8f0',
                    }}
                    image={getCategoryImage(category)}
                    alt={category}
                  />
                  <Box sx={{ p: 3, width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                      {category} Products
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                      {category.toLowerCase().includes('post') ? 
                        'High-quality fence posts in different diameters and materials for sturdy fence installation.' :
                      category.toLowerCase().includes('gate') ?
                        'Our gates are available in various sizes and configurations to meet your security needs.' :
                      category.toLowerCase().includes('mesh') || category.toLowerCase().includes('fabric') ?
                        'Chain link mesh available in different gauges and coatings for various applications.' :
                      category.toLowerCase().includes('accessory') ?
                        'Essential accessories to complete your fence installation with professional results.' :
                        'Quality products for your chain link fence installation.'}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Group products by attributes */}
                <Box sx={{ p: 3 }}>
                  {Object.entries(groupProductsByAttributes(products)).map(([groupName, groupProducts]) => (
                    <Box key={groupName} sx={{ mb: 4 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold', 
                          mb: 2,
                          pb: 1,
                          borderBottom: '2px solid',
                          borderColor: 'primary.light',
                          color: 'text.primary',
                        }}
                      >
                        {groupName}
                      </Typography>
                      
                      <TableContainer 
                        component={Paper} 
                        variant="outlined"
                        sx={{ 
                          borderRadius: 2,
                          overflow: 'hidden',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Specifications</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {groupProducts.map((product) => (
                              <TableRow 
                                key={product.id}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: '#f1f5f9',
                                  },
                                }}
                              >
                                <TableCell sx={{ fontWeight: 'medium' }}>{product.sku}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>
                                  {product.material && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Material:</strong> {product.material}
                                    </Typography>
                                  )}
                                  {product.diameter && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Diameter:</strong> {product.diameter}
                                    </Typography>
                                  )}
                                  {product.thickness && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Thickness:</strong> {product.thickness}
                                    </Typography>
                                  )}
                                  {product.size && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Size:</strong> {product.size}
                                    </Typography>
                                  )}
                                  {product.length && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Length:</strong> {product.length}
                                    </Typography>
                                  )}
                                  {product.height && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Height:</strong> {product.height}
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell 
                                  align="right"
                                  sx={{ 
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                    fontSize: '1.1rem',
                                  }}
                                >
                                  ${parseFloat(product.price || 0).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
      
      {/* List View */}
      {viewMode === 'list' && filteredProducts.length > 0 && (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Material</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Specifications</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={product.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' },
                    '&:hover': { backgroundColor: '#e0f2fe' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>{product.sku}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{getCategoryFromProduct(product)}</TableCell>
                  <TableCell>{product.material || '-'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {product.diameter && (
                        <Chip 
                          size="small" 
                          label={`Diameter: ${product.diameter}`} 
                          sx={{ 
                            backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                            borderRadius: '4px',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }} 
                        />
                      )}
                      {product.thickness && (
                        <Chip 
                          size="small" 
                          label={`Thickness: ${product.thickness}`} 
                          sx={{ 
                            backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                            borderRadius: '4px',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }} 
                        />
                      )}
                      {product.size && (
                        <Chip 
                          size="small" 
                          label={`Size: ${product.size}`} 
                          sx={{ 
                            backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                            borderRadius: '4px',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }} 
                        />
                      )}
                      {product.length && (
                        <Chip 
                          size="small" 
                          label={`Length: ${product.length}`} 
                          sx={{ 
                            backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                            borderRadius: '4px',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }} 
                        />
                      )}
                      {product.height && (
                        <Chip 
                          size="small" 
                          label={`Height: ${product.height}`} 
                          sx={{ 
                            backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                            borderRadius: '4px',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }} 
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      fontSize: '1.1rem',
                    }}
                  >
                    ${parseFloat(product.price || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filteredProducts.length > 0 && (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={getProductImage(product)}
                  alt={product.type}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 0,
                      }}
                    >
                      {product.type}
                    </Typography>
                    <Chip 
                      label={getCategoryFromProduct(product)} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'primary.light',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: '0.8rem',
                      opacity: 0.8,
                    }}
                  >
                    SKU: {product.sku}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ mt: 2 }}>
                    {product.material && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Material:</span>
                        <span>{product.material}</span>
                      </Typography>
                    )}
                    {product.diameter && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Diameter:</span>
                        <span>{product.diameter}</span>
                      </Typography>
                    )}
                    {product.thickness && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Thickness:</span>
                        <span>{product.thickness}</span>
                      </Typography>
                    )}
                    {product.size && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Size:</span>
                        <span>{product.size}</span>
                      </Typography>
                    )}
                    {product.length && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Length:</span>
                        <span>{product.length}</span>
                      </Typography>
                    )}
                    {product.height && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Height:</span>
                        <span>{product.height}</span>
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions 
                  sx={{ 
                    p: 2, 
                    pt: 0,
                    borderTop: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                    }}
                  >
                    ${parseFloat(product.price || 0).toFixed(2)}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductCatalog;
