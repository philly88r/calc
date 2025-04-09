import React, { useState, useEffect, useCallback } from 'react';
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
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { supabase } from '../supabaseClient';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component for Catalogue Builder
const SortableItem = ({ id, product, removeItem, view }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };
  
  // Render different views based on the catalogue view mode
  if (view === 'compact') {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        sx={{
          p: 1,
          mb: 1,
          border: '1px solid #e2e8f0',
          borderRadius: 1,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': { backgroundColor: '#f8fafc' },
        }}
        {...attributes}
        {...listeners}
      >
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {product.sku} - {product.type} {product.material ? `(${product.material})` : ''}
        </Typography>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            ${parseFloat(product.price || 0).toFixed(2)}
          </Typography>
          <Button 
            size="small" 
            color="error" 
            onClick={() => removeItem(id)}
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            ×
          </Button>
        </Box>
      </Box>
    );
  }
  
  if (view === 'list') {
    return (
      <Paper
        ref={setNodeRef}
        style={style}
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': { backgroundColor: '#f8fafc' },
        }}
        {...attributes}
        {...listeners}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Box
            component="img"
            src={product.type ? (
              product.type.toLowerCase().includes('post') ? placeholderImages.post :
              product.type.toLowerCase().includes('gate') ? placeholderImages.gate :
              product.type.toLowerCase().includes('mesh') ? placeholderImages.mesh :
              placeholderImages.default
            ) : placeholderImages.default}
            alt={product.type}
            sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {product.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SKU: {product.sku} | {product.material || ''} {product.diameter || product.size || ''}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            ${parseFloat(product.price || 0).toFixed(2)}
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            color="error" 
            onClick={() => removeItem(id)}
          >
            Remove
          </Button>
        </Box>
      </Paper>
    );
  }
  
  // Default: Grid view
  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
      {...attributes}
      {...listeners}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.type ? (
          product.type.toLowerCase().includes('post') ? placeholderImages.post :
          product.type.toLowerCase().includes('gate') ? placeholderImages.gate :
          product.type.toLowerCase().includes('mesh') ? placeholderImages.mesh :
          placeholderImages.default
        ) : placeholderImages.default}
        alt={product.type}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          SKU: {product.sku}
        </Typography>
        {product.material && (
          <Typography variant="body2" color="text.secondary">
            Material: {product.material}
          </Typography>
        )}
        {(product.diameter || product.size) && (
          <Typography variant="body2" color="text.secondary">
            Size: {product.diameter || product.size || ''}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ${parseFloat(product.price || 0).toFixed(2)}
        </Typography>
        <Button size="small" color="error" onClick={() => removeItem(id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('category'); // 'category', 'list', 'grid', 'catalogue'
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Catalogue builder state
  const [catalogueItems, setCatalogueItems] = useState([]);
  const [catalogueView, setCatalogueView] = useState('grid'); // 'grid', 'list', 'compact'
  const [catalogueName, setCatalogueName] = useState('My Custom Catalogue');
  const [savedCatalogues, setSavedCatalogues] = useState(() => {
    const saved = localStorage.getItem('savedCatalogues');
    return saved ? JSON.parse(saved) : [];
  });

  // Placeholder image URLs for different product types with better images
  const placeholderImages = {
    'post': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=400&auto=format&fit=crop',
    'gate': 'https://images.unsplash.com/photo-1573648952759-5861fb3a5969?q=80&w=400&auto=format&fit=crop',
    'mesh': 'https://images.unsplash.com/photo-1587471384749-52d38605b699?q=80&w=400&auto=format&fit=crop',
    'fabric': 'https://images.unsplash.com/photo-1533247772055-d3c1d7a5ca71?q=80&w=400&auto=format&fit=crop',
    'accessory': 'https://images.unsplash.com/photo-1586864387789-628af9feed72?q=80&w=400&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400&auto=format&fit=crop'
  };

  // Function to fetch products from Supabase
  const fetchProducts = async () => {
    try {
      // Clear any existing products first
      setProducts([]);
      setFilteredProducts([]);
      setLoading(true);
      
      console.log('Fetching products from Supabase...', new Date().toISOString());
      
      // Log the table we're querying
      console.log('Querying table: fence_products');
      
      // Add a timestamp parameter to prevent caching
      const timestamp = new Date().getTime();
      console.log('Using timestamp to prevent caching:', timestamp);
      
      const { data, error } = await supabase
        .from('fence_products')
        .select('*')
        .order('id', { ascending: true });
      
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

  // Load product data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Handle refresh button click
  const handleRefresh = () => {
    fetchProducts();
  };

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

  // Generate PDF of the product catalog
  const generatePDF = () => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text('Chain Link Fence Product Catalog', 14, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Filter products based on current filter
      const productsToInclude = filteredProducts;
      
      // Group products by category
      const groupedData = {};
      productsToInclude.forEach(product => {
        const category = getCategoryFromProduct(product);
        if (!groupedData[category]) {
          groupedData[category] = [];
        }
        groupedData[category].push(product);
      });
      
      let yPosition = 40;
      
      // Loop through each category
      Object.entries(groupedData).forEach(([category, products]) => {
        // Add category header
        doc.setFontSize(14);
        doc.setTextColor(33, 58, 138); // Primary blue color
        doc.text(category, 14, yPosition);
        yPosition += 10;
        
        // Create table data
        const tableData = products.map(product => [
          product.sku,
          product.type,
          product.material || '-',
          product.diameter || product.thickness || product.size || '-',
          product.length || product.height || '-',
          `$${parseFloat(product.price || 0).toFixed(2)}`
        ]);
        
        // Add table using the imported autoTable function
        autoTable(doc, {
          startY: yPosition,
          head: [['SKU', 'Type', 'Material', 'Dimensions', 'Length/Height', 'Price']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [33, 58, 138], textColor: [255, 255, 255] },
          margin: { top: 10 },
        });
        
        // Update Y position for next category
        yPosition = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : yPosition + 20;
        
        // Add page if needed
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      // Save the PDF
      doc.save('chainlink-product-catalog.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again later.');
    }
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
    // If switching to catalogue mode and no items, add some sample items
    if (mode === 'catalogue' && catalogueItems.length === 0) {
      // Add first 5 products as sample items if available
      setCatalogueItems(filteredProducts.slice(0, 5).map(product => ({
        id: `item-${product.id}`,
        product
      })));
    }
  };
  
  // Handle accordion expansion
  const handleAccordionChange = (category) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? category : null);
  };
  
  // Handle catalogue view change
  const handleCatalogueViewChange = (view) => {
    setCatalogueView(view);
  };
  
  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle DnD end event
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setCatalogueItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);
  
  // Add product to catalogue
  const addToCatalogue = (product) => {
    const newItem = {
      id: `item-${product.id}-${Date.now()}`,
      product
    };
    setCatalogueItems(prev => [...prev, newItem]);
  };
  
  // Remove product from catalogue
  const removeFromCatalogue = (itemId) => {
    setCatalogueItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Save current catalogue
  const saveCatalogue = () => {
    const newCatalogue = {
      id: Date.now().toString(),
      name: catalogueName,
      items: catalogueItems,
      createdAt: new Date().toISOString(),
      view: catalogueView
    };
    
    const updatedCatalogues = [...savedCatalogues, newCatalogue];
    setSavedCatalogues(updatedCatalogues);
    localStorage.setItem('savedCatalogues', JSON.stringify(updatedCatalogues));
    alert(`Catalogue "${catalogueName}" saved successfully!`);
  };
  
  // Load a saved catalogue
  const loadCatalogue = (catalogueId) => {
    const catalogue = savedCatalogues.find(cat => cat.id === catalogueId);
    if (catalogue) {
      setCatalogueItems(catalogue.items);
      setCatalogueName(catalogue.name);
      setCatalogueView(catalogue.view || 'grid');
      setViewMode('catalogue');
    }
  };
  
  // Delete a saved catalogue
  const deleteCatalogue = (catalogueId) => {
    const updatedCatalogues = savedCatalogues.filter(cat => cat.id !== catalogueId);
    setSavedCatalogues(updatedCatalogues);
    localStorage.setItem('savedCatalogues', JSON.stringify(updatedCatalogues));
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
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleRefresh}
            sx={{ 
              minWidth: 120,
              fontWeight: 'bold',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
              },
            }}
          >
            Refresh Data
          </Button>
          
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
      </Box>
      
      {/* View mode selection */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexWrap: { xs: 'wrap', md: 'nowrap' },
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
            flex: { xs: '1 0 45%', md: 1 },
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
            flex: { xs: '1 0 45%', md: 1 },
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
            flex: { xs: '1 0 45%', md: 1 },
            borderRadius: 1.5,
            fontWeight: viewMode === 'grid' ? 'bold' : 'normal',
          }}
        >
          Grid View
        </Button>
        <Button 
          variant={viewMode === 'catalogue' ? 'contained' : 'outlined'} 
          color="primary"
          onClick={() => handleViewModeChange('catalogue')}
          sx={{ 
            flex: { xs: '1 0 45%', md: 1 },
            borderRadius: 1.5,
            fontWeight: viewMode === 'catalogue' ? 'bold' : 'normal',
          }}
        >
          Catalogue Builder
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
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 0,
                      }}
                    >
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
      
      {/* Catalogue Builder View */}
      {viewMode === 'catalogue' && (
        <Box>
          {/* Catalogue Builder Controls */}
          <Box sx={{ 
            mb: 4, 
            p: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
              Catalogue Builder
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Catalogue Name"
                  variant="outlined"
                  fullWidth
                  value={catalogueName}
                  onChange={(e) => setCatalogueName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={saveCatalogue}
                    disabled={catalogueItems.length === 0}
                  >
                    Save Catalogue
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => setCatalogueItems([])}
                    disabled={catalogueItems.length === 0}
                  >
                    Clear Items
                  </Button>
                </Box>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  View Mode:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button 
                    variant={catalogueView === 'grid' ? 'contained' : 'outlined'} 
                    color="primary"
                    onClick={() => handleCatalogueViewChange('grid')}
                    size="small"
                  >
                    Grid
                  </Button>
                  <Button 
                    variant={catalogueView === 'list' ? 'contained' : 'outlined'} 
                    color="primary"
                    onClick={() => handleCatalogueViewChange('list')}
                    size="small"
                  >
                    List
                  </Button>
                  <Button 
                    variant={catalogueView === 'compact' ? 'contained' : 'outlined'} 
                    color="primary"
                    onClick={() => handleCatalogueViewChange('compact')}
                    size="small"
                  >
                    Compact
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Saved Catalogues:
                </Typography>
                
                {savedCatalogues.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No saved catalogues yet. Create and save your first catalogue!
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: '200px', overflowY: 'auto', pr: 1 }}>
                    {savedCatalogues.map((catalogue) => (
                      <Box 
                        key={catalogue.id}
                        sx={{ 
                          p: 2, 
                          mb: 1, 
                          border: '1px solid #e2e8f0',
                          borderRadius: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:hover': { backgroundColor: '#f8fafc' },
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {catalogue.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(catalogue.createdAt).toLocaleDateString()} • {catalogue.items.length} items
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="primary"
                            onClick={() => loadCatalogue(catalogue.id)}
                          >
                            Load
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => deleteCatalogue(catalogue.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          
          {/* Drag and Drop Area */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}>
            {/* Product Selection */}
            <Box sx={{ 
              width: { xs: '100%', md: '40%' },
              backgroundColor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              maxHeight: '600px',
              overflowY: 'auto',
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Available Products
              </Typography>
              
              <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 2 }}
                size="small"
              />
              
              <FormControl variant="outlined" fullWidth sx={{ mb: 3 }} size="small">
                <InputLabel id="catalogue-category-select-label">Category</InputLabel>
                <Select
                  labelId="catalogue-category-select-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                Click on a product to add it to your catalogue
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              {filteredProducts.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No products found matching your criteria.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {filteredProducts.map((product) => (
                    <Paper 
                      key={product.id}
                      sx={{ 
                        p: 1.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f8fafc' },
                        transition: 'background-color 0.2s',
                      }}
                      onClick={() => addToCatalogue(product)}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {product.type} {product.material ? `(${product.material})` : ''}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          SKU: {product.sku} {product.diameter ? `• ${product.diameter}` : ''}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        ${parseFloat(product.price || 0).toFixed(2)}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
            
            {/* Catalogue Preview */}
            <Box sx={{ 
              width: { xs: '100%', md: '60%' },
              backgroundColor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              maxHeight: '600px',
              overflowY: 'auto',
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {catalogueName} Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {catalogueItems.length} {catalogueItems.length === 1 ? 'item' : 'items'}
                </Typography>
              </Box>
              
              {catalogueItems.length === 0 ? (
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  border: '2px dashed #e2e8f0',
                  borderRadius: 2,
                }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Your catalogue is empty.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add products from the left panel to build your catalogue.
                  </Typography>
                </Box>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={catalogueItems.map(item => item.id)}
                    strategy={catalogueView === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}
                  >
                    {catalogueView === 'grid' ? (
                      <Grid container spacing={2}>
                        {catalogueItems.map((item) => (
                          <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <SortableItem 
                              id={item.id} 
                              product={item.product} 
                              removeItem={removeFromCatalogue}
                              view={catalogueView}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Box>
                        {catalogueItems.map((item) => (
                          <SortableItem 
                            key={item.id}
                            id={item.id} 
                            product={item.product} 
                            removeItem={removeFromCatalogue}
                            view={catalogueView}
                          />
                        ))}
                      </Box>
                    )}
                  </SortableContext>
                </DndContext>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCatalog;
