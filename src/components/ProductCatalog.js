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
import { supabase } from '../supabaseClient';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Placeholder images for products by category
const placeholderImages = {
  'Gates': 'https://images.unsplash.com/photo-1573997953524-c5fb9ea5b174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2F0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'Posts': 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmVuY2UlMjBwb3N0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  'Mesh': 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaW4lMjBsaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  'Accessories': 'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFyZHdhcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'default': 'https://images.unsplash.com/photo-1595514535415-dae8580c5bc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
};

// Sortable Item Component for Catalogue Builder
const SortableItem = ({ id, product, removeItem, view, onResize, initialSize }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const [size, setSize] = useState(initialSize || { width: 1, height: 1 });
  const [isResizing, setIsResizing] = useState(false);
  
  // Handle resize start
  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };
  
  // Handle resize move
  const handleResizeMove = (e) => {
    if (!isResizing) return;
    
    // Calculate new size based on mouse movement
    const newWidth = Math.max(1, Math.min(4, size.width + e.movementX / 50));
    const newHeight = Math.max(1, Math.min(4, size.height + e.movementY / 50));
    
    setSize({ width: newWidth, height: newHeight });
    
    if (onResize) {
      onResize(id, { width: newWidth, height: newHeight });
    }
  };
  
  // Handle resize end
  const handleResizeEnd = () => {
    setIsResizing(false);
  };
  
  // Add event listeners for resize
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, size]);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isResizing ? 'none' : transition,
    cursor: isResizing ? 'nwse-resize' : 'grab',
    width: view === 'print' ? `${size.width * 25}%` : undefined,
    height: view === 'print' ? `${size.height * 100}px` : undefined,
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
          {typeof product.sku === 'string' ? product.sku : String(product.sku || '')} - 
          {typeof product.type === 'string' ? product.type : String(product.type || '')} 
          {product.material ? `(${typeof product.material === 'string' ? product.material : String(product.material)})` : ''}
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
              {typeof product.type === 'string' ? product.type : String(product.type || '')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SKU: {typeof product.sku === 'string' ? product.sku : String(product.sku || '')} | 
              {typeof product.material === 'string' ? product.material : String(product.material || '')} 
              {typeof product.diameter === 'string' ? product.diameter : 
                typeof product.size === 'string' ? product.size : 
                String(product.diameter || product.size || '')}
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
  
  // Print view with resize functionality
  if (view === 'print' || view === 'page') {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        sx={{
          position: 'relative',
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
        {/* Resize handle */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '20px',
            height: '20px',
            cursor: 'nwse-resize',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '4px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }
          }}
          onMouseDown={handleResizeStart}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ fontSize: '10px', color: '#fff' }}>⤡</span>
        </Box>
        <CardMedia
          component="img"
          height="100"
          image={product.imageUrl || (product.type ? (
            product.type.toLowerCase().includes('post') ? placeholderImages.Posts :
            product.type.toLowerCase().includes('gate') ? placeholderImages.Gates :
            product.type.toLowerCase().includes('mesh') ? placeholderImages.Mesh :
            placeholderImages.default
          ) : placeholderImages.default)}
          alt={product.name || product.type}
        />
        <CardContent sx={{ flexGrow: 1, p: 1 }}>
          <Typography gutterBottom variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name || product.type}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            SKU: {product.sku}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: 'primary.main', fontWeight: 'bold' }}>
            ${parseFloat(product.price || 0).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
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
        {product.specifications && (
          <Typography variant="body2" color="text.secondary">
            Description: {product.specifications}
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
  const [catalogueView, setCatalogueView] = useState('grid'); // 'grid', 'list', 'compact', 'print', 'page'
  const [catalogueName, setCatalogueName] = useState('My Custom Catalogue');
  const [itemSizes, setItemSizes] = useState({});
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

  // Function to fetch products from Lightspeed API via our proxy server
  const fetchLightspeedProducts = async () => {
    try {
      console.log('Fetching products from Lightspeed API via proxy server...', new Date().toISOString());
      
      // Always use localhost:3001 when in development mode
      const apiBaseUrl = 'http://localhost:3001';
      
      // Fetch products from our proxy server
      const url = `${apiBaseUrl}/api/lightspeed/products`;
      console.log('Fetching from proxy URL:', url);
      
      console.log('Sending request to:', url);
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Received response:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      // Get raw products directly from the API via our proxy server
      const rawData = await response.json();
      console.log('Raw API response:', typeof rawData, rawData ? Object.keys(rawData) : 'null');
      
      // Handle different response structures
      let products = [];
      if (rawData && Array.isArray(rawData)) {
        // If the response is already an array of products
        products = rawData;
      } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
        // If the response has a data property containing an array of products
        products = rawData.data;
      } else {
        console.error('Unexpected API response structure:', rawData);
        return [];
      }
      
      if (products.length === 0) {
        console.error('No products found in Lightspeed API response');
        return [];
      }
      
      // Log some sample products to understand the structure
      console.log('Sample products from API:', products.slice(0, 3));
      
      console.log('Products fetched successfully:', products.length);
      
      // Log sample product and available properties
      if (products.length > 0) {
        console.log('Sample product:', products[0]);
        console.log('Available columns:', Object.keys(products[0]));
        console.log('First few raw products:', products.slice(0, 3));
      }
      
      return products;
    } catch (error) {
      console.error('Error fetching products from Lightspeed API:', error.message || 'Unknown error');
      console.error('Error details:', error);
      console.error('Error stack:', error.stack);
      return [];
    }
  };
  
  // Helper function to extract material from description
  const extractMaterialFromDescription = (description) => {
    if (!description) return '';
    
    // Common materials to look for
    const materials = ['Steel', 'Wood', 'Aluminum', 'Vinyl', 'PVC', 'Iron', 'Galvanized', 'Black'];
    for (const material of materials) {
      if (description.includes(material)) {
        return material;
      }
    }
    
    return '';
  };
  
  // Helper function to extract size from description
  const extractSizeFromDescription = (description) => {
    if (!description) return '';
    
    // Look for common size patterns like "2x4", "1.5 inch", etc.
    const sizeMatch = description.match(/\d+(\.\d+)?\s*(x\s*\d+(\.\d+)?)?\s*(inch|in|ft|foot|feet|mm|cm|m)?/i);
    if (sizeMatch) {
      return sizeMatch[0].trim();
    }
    
    return '';
  };
  

  
  // Function to fetch products from Lightspeed API only
  const fetchProducts = async () => {
    try {
      // Clear any existing products first
      setProducts([]);
      setFilteredProducts([]);
      setLoading(true);
      
      console.log('Fetching products from Lightspeed API...', new Date().toISOString());
      
      // Get data directly from Lightspeed API
      const data = await fetchLightspeedProducts();
      
      if (!data || data.length === 0) {
        console.log('No products found from Lightspeed API');
        setLoading(false);
        return;
      }
      
      console.log(`Successfully fetched ${data.length} products`);
      console.log('Sample product:', data[0]);
      
      console.log('Products fetched successfully:', data.length);
      console.log('Sample product:', data[0]);
      
      // Get all column names from the first product to see what we're working with
      const columnNames = Object.keys(data[0]);
      console.log('Available columns:', columnNames);
      
      // Log raw data to see what we're working with
      console.log('First few raw products:', data.slice(0, 3));
      
      // Function to extract material from description
      const extractMaterial = (description) => {
        if (!description) return '';
        
        // Look for material in a table format
        const materialMatch = description.match(/<td[^>]*>Material<\/td>\s*<td[^>]*>([^<]+)<\/td>/i);
        if (materialMatch && materialMatch[1]) {
          return materialMatch[1].trim();
        }
        
        // Common materials to look for
        const materials = ['Steel', 'Wood', 'Aluminum', 'Vinyl', 'PVC', 'Iron', 'Galvanized'];
        for (const material of materials) {
          if (description.includes(material)) {
            return material;
          }
        }
        
        return '';
      };
      
      // Map the data to a consistent format regardless of source
      const mappedProducts = data.map((item, index) => {
        // Log every 100th product to avoid console flooding
        if (index % 100 === 0) {
          console.log(`Mapping product ${index}:`, item);
        }
        
        // Extract material from description
        const material = extractMaterial(item.description || '');
        
        // Get price information - ensure we're getting the correct price field
        let price = 0;
        if (item.price_standard && item.price_standard.tax_exclusive) {
          price = parseFloat(item.price_standard.tax_exclusive) || 0;
        } else if (item.price) {
          price = parseFloat(item.price) || 0;
        } else if (item.default_display_price) {
          price = parseFloat(item.default_display_price) || 0;
        }
        
        // Get image URL
        let imageUrl = '';
        if (item.images && item.images.length > 0 && item.images[0].sizes && item.images[0].sizes.original) {
          imageUrl = item.images[0].sizes.original;
        } else if (item.image_url) {
          imageUrl = item.image_url;
        } else {
          // Use placeholder images defined at the top of the file
          imageUrl = placeholderImages.default; // Use default image if none available
        }
        
        // Determine product type - try to extract from name or description
        let productType = 'Other';
        const nameLower = (item.name || '').toLowerCase();
        
        if (nameLower.includes('post') || nameLower.includes('pole')) {
          productType = 'Posts';
        } else if (nameLower.includes('gate')) {
          productType = 'Gates';
        } else if (nameLower.includes('mesh') || nameLower.includes('fence') || nameLower.includes('fabric')) {
          productType = 'Fencing';
        } else if (nameLower.includes('rail') || nameLower.includes('clamp') || nameLower.includes('cap') || 
                  nameLower.includes('bolt') || nameLower.includes('nut') || nameLower.includes('screw')) {
          productType = 'Accessories';
        } else if (item.product_type_id) {
          productType = 'Fence Product';
        }
        
        // Log mapping for the first few products
        if (index < 3) {
          console.log(`Mapped product ${index}:`, { id: item.id, name: item.name });
          console.log(`  - Material extracted: "${material}"`);
          console.log(`  - Image URL: ${imageUrl}`);
          console.log(`  - Price: ${price}`);
        }
        
        // Use description as specifications
        let specifications = '';
        if (item.description) {
          // Extract text content from HTML description
          specifications = item.description.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim();
          
          // Limit the length for display purposes
          if (specifications.length > 100) {
            specifications = specifications.substring(0, 97) + '...';
          }
        }
        
        // Extract attributes from the product
        let attributes = {};
        if (item.attributes && typeof item.attributes === 'object') {
          attributes = item.attributes;
        }
        
        // Extract category information
        let category = productType;
        if (item.category_name) {
          category = String(item.category_name);
        } else if (item.product_category) {
          category = String(item.product_category);
        }
        
        // Create a standardized product object with fallbacks for all properties
        const mappedProduct = {
          // Essential properties with fallbacks - convert all to primitive types
          id: item.id ? String(item.id) : `product-${index}`,
          sku: item.sku_number ? String(item.sku_number) : (item.sku ? String(item.sku) : ''),
          type: productType,
          name: item.name ? String(item.name) : '',
          description: item.description ? String(item.description) : '',
          price: price,
          material: material || '',
          specifications: specifications || '',
          supplyPrice: 0,
          // Image URL
          imageUrl: imageUrl,
          // Category information
          category: category,
          // Tracks inventory
          inventory: item.tracks_inventory ? 'Yes' : 'No',
          // Add attributes from Lightspeed
          attributes: attributes,
          // Add other needed fields as primitive types
          deleted_at: item.deleted_at ? String(item.deleted_at) : '',
          version: item.version ? String(item.version) : '',
          // Store a reference to the original item ID for lookup purposes
          originalId: item.id ? String(item.id) : ''
        };
        
        // Log the first few mapped products for debugging
        if (data.indexOf(item) < 3) {
          console.log(`Mapped product ${data.indexOf(item)}:`, mappedProduct);
          console.log(`  - Material extracted: "${material}"`);
        }
        
        return mappedProduct;
      });
      
      console.log('Total mapped products:', mappedProducts.length);
      
      // Use all products - we know they exist in the database
      const validProducts = mappedProducts;
      
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
      // Extract product name and type
      const productName = typeof product.name === 'string' ? product.name.toLowerCase() : '';
      const productType = typeof product.type === 'string' ? product.type : String(product.type || '');
      
      // Extract color from product name
      let color = '';
      if (productName.includes('black')) color = 'Black';
      else if (productName.includes('galv')) color = 'Galvanized';
      else if (productName.includes('white')) color = 'White';
      else if (productName.includes('green')) color = 'Green';
      else if (productName.includes('brown')) color = 'Brown';
      
      // For posts - group by material, color, and diameter
      if (productType.toLowerCase().includes('post') || productName.includes('post')) {
        // Extract diameter from product name or specifications
        let diameter = '';
        if (product.diameter) {
          diameter = product.diameter;
        } else if (productName.includes('2-3/8')) {
          diameter = '2-3/8"';
        } else if (productName.includes('2-7/8')) {
          diameter = '2-7/8"';
        } else if (productName.includes('4"')) {
          diameter = '4"';
        } else if (productName.match(/\d+(\.\d+)?("|in|inch)/)) {
          diameter = productName.match(/\d+(\.\d+)?("|in|inch)/)[0];
        }
        
        const key = `${color} ${productType} - ${diameter}`.trim();
        const groupKey = key !== ' - ' ? key : 'Other Posts';
        
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        
        grouped[groupKey].push(product);
      } 
      // For gates - group by type (residential/commercial), color, and style
      else if (productType.toLowerCase().includes('gate') || productName.includes('gate')) {
        let gateType = 'Standard';
        if (productName.includes('residential')) gateType = 'Residential';
        else if (productName.includes('commercial')) gateType = 'Commercial';
        
        let style = '';
        if (productName.includes('single')) style = 'Single';
        else if (productName.includes('double')) style = 'Double';
        
        const key = `${color} ${gateType} ${style} Gates`.trim().replace(/\s+/g, ' ');
        const groupKey = key !== 'Gates' ? key : 'Other Gates';
        
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        
        grouped[groupKey].push(product);
      }
      // For fence fabric/mesh - group by gauge, height, and color
      else if (productType.toLowerCase().includes('mesh') || 
               productType.toLowerCase().includes('fabric') || 
               productName.includes('mesh') || 
               productName.includes('fabric') || 
               productName.includes('chain link')) {
        let gauge = '';
        if (productName.match(/\d+\s*ga/)) {
          gauge = productName.match(/\d+\s*ga/)[0];
        }
        
        let height = '';
        if (product.height) {
          height = product.height;
        } else if (productName.match(/\d+('|ft|foot)/)) {
          height = productName.match(/\d+('|ft|foot)/)[0];
        }
        
        const key = `${color} Chain Link Fabric - ${gauge} ${height}`.trim().replace(/\s+/g, ' ');
        const groupKey = key !== 'Chain Link Fabric -' ? key : 'Other Chain Link';
        
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        
        grouped[groupKey].push(product);
      }
      // For other products
      else {
        const key = `${productType}`;
        
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
        
        // Add table using the autoTable plugin
        doc.autoTable({
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
  
  // Handle item resize in catalogue
  const handleItemResize = (id, newSize) => {
    setItemSizes(prev => ({
      ...prev,
      [id]: newSize
    }));
  };
  
  // Helper function to get product image
  const getProductImage = (product) => {
    // Check for direct image URL first
    if (product.imageUrl) {
      return product.imageUrl;
    }
    
    if (!product.type) return placeholderImages.default;
    
    // Ensure type is a string before using toLowerCase
    const typeStr = typeof product.type === 'string' ? product.type : String(product.type || '');
    const lowerType = typeStr.toLowerCase();
    
    if (lowerType.includes('post')) return placeholderImages.Posts;
    if (lowerType.includes('gate')) return placeholderImages.Gates;
    if (lowerType.includes('fence') || lowerType.includes('mesh')) return placeholderImages.Mesh;
    if (lowerType.includes('fabric')) return placeholderImages.default;
    if (lowerType.includes('accessory') || lowerType.includes('accessories')) return placeholderImages.default;
    
    return placeholderImages.default;
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
      view: catalogueView,
      itemSizes: itemSizes // Save the item sizes for layout preservation
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
      
      // Restore item sizes if available
      if (catalogue.itemSizes) {
        setItemSizes(catalogue.itemSizes);
      }
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
    
    // Ensure category is a string before using toLowerCase
    const categoryStr = typeof category === 'string' ? category : String(category || '');
    const lowerCategory = categoryStr.toLowerCase();
    
    if (lowerCategory.includes('post')) return placeholderImages.post;
    if (lowerCategory.includes('gate')) return placeholderImages.gate;
    if (lowerCategory.includes('mesh')) return placeholderImages.mesh;
    if (lowerCategory.includes('fabric')) return placeholderImages.fabric;
    if (lowerCategory.includes('accessory')) return placeholderImages.accessory;
    
    return placeholderImages.default;
  };

  const getCategoryFromProduct = (product) => {
    // Accept any product structure and extract a category
    
    // Try different fields that might contain category information
    const possibleFields = [
      'product_category',
      'type',
      'product_type',
      'category',
      'categoryName',
      'name',
      'description'
    ];
    
    // Check each field
    for (const field of possibleFields) {
      if (product[field] && typeof product[field] === 'string' && product[field].trim() !== '') {
        // Standardize common categories
        const lowerValue = product[field].toLowerCase();
        
        // Map to standard categories
        if (lowerValue.includes('post')) return 'Posts';
        if (lowerValue.includes('gate')) return 'Gates';
        if (lowerValue.includes('mesh') || lowerValue.includes('fence')) return 'Fencing';
        if (lowerValue.includes('accessory') || lowerValue.includes('accessories')) return 'Accessories';
        
        // If it's a type field, use it directly but ensure it's a string
        if (field === 'type' || field === 'product_type' || field === 'product_category') {
          return typeof product[field] === 'string' ? product[field] : String(product[field]);
        }
      } else if (product[field] && product[field] !== null) {
        // If the field exists but isn't a string, convert it to a string and check
        const fieldStr = String(product[field]);
        if (fieldStr.trim() !== '') {
          const lowerValue = fieldStr.toLowerCase();
          
          // Map to standard categories
          if (lowerValue.includes('post')) return 'Posts';
          if (lowerValue.includes('gate')) return 'Gates';
          if (lowerValue.includes('mesh') || lowerValue.includes('fence')) return 'Fencing';
          if (lowerValue.includes('accessory') || lowerValue.includes('accessories')) return 'Accessories';
          
          // If it's a type field, use the string version
          if (field === 'type' || field === 'product_type' || field === 'product_category') {
            return fieldStr;
          }
        }
      }
    }
    
    // Default fallback
    return 'Other';
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
  
  // Render empty state when no products are found
  if (products.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center', p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <Typography variant="h4" color="error" gutterBottom>
          No Products Found
        </Typography>
        <Typography variant="body1" paragraph>
          The fence_products table appears to be empty in the connected Supabase database.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleRefresh}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 5
              }
            }}
          >
            Retry Loading Products
          </Button>
        </Box>
        
        <Accordion sx={{ mb: 2, boxShadow: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="primary">
              Troubleshooting Steps
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              1. Verify Supabase Connection
            </Typography>
            <Typography variant="body2" paragraph>
              • Check that your Supabase URL and API key are correct in the environment variables
            </Typography>
            <Typography variant="body2" paragraph>
              • URL: {supabase.supabaseUrl ? supabase.supabaseUrl.substring(0, 20) + '...' : 'Not available'}
            </Typography>
            
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              2. Check Table Structure
            </Typography>
            <Typography variant="body2" paragraph>
              • Verify that the fence_products table has the correct structure
            </Typography>
            <Typography variant="body2" paragraph>
              • The component expects fields like: id, sku, product_category, retail_price, etc.
            </Typography>
            
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              3. Check Console Logs
            </Typography>
            <Typography variant="body2" paragraph>
              • Open your browser's developer console (F12) to view detailed error messages
            </Typography>
            <Typography variant="body2" paragraph>
              • Look for specific errors related to data fetching or field mapping
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="outlined" 
            color="info" 
            onClick={() => window.location.reload()}
            sx={{ mr: 2 }}
          >
            Reload Page
          </Button>
        </Box>
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
                              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Specifications</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>Attributes</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {groupProducts.map((product) => (
                              <TableRow 
                                key={typeof product.id === 'string' ? product.id : String(product.id || '')}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: '#f1f5f9',
                                  },
                                }}
                              >
                                <TableCell>
                                  <img 
                                    src={product.imageUrl || placeholderImages.default} 
                                    alt={product.name} 
                                    style={{ 
                                      width: 60, 
                                      height: 60, 
                                      objectFit: 'cover', 
                                      borderRadius: '4px' 
                                    }} 
                                  />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{typeof product.sku === 'string' ? product.sku : String(product.sku || '')}</TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{typeof product.name === 'string' ? product.name : String(product.name || '')}</TableCell>
                                <TableCell>{typeof product.type === 'string' ? product.type : String(product.type || '')}</TableCell>
                                <TableCell>
                                  {product.specifications && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Description:</strong> {typeof product.specifications === 'string' ? product.specifications : String(product.specifications || '')}
                                    </Typography>
                                  )}
                                  {product.diameter && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Diameter:</strong> {typeof product.diameter === 'string' ? product.diameter : String(product.diameter)}
                                    </Typography>
                                  )}
                                  {product.thickness && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Thickness:</strong> {typeof product.thickness === 'string' ? product.thickness : String(product.thickness)}
                                    </Typography>
                                  )}
                                  {product.size && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Size:</strong> {typeof product.size === 'string' ? product.size : String(product.size)}
                                    </Typography>
                                  )}
                                  {product.length && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Length:</strong> {typeof product.length === 'string' ? product.length : String(product.length)}
                                    </Typography>
                                  )}
                                  {product.height && (
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>Height:</strong> {typeof product.height === 'string' ? product.height : String(product.height)}
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
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Material</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Description</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={typeof product.id === 'string' ? product.id : String(product.id || '')}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' },
                    '&:hover': { backgroundColor: '#e0f2fe' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>{typeof product.sku === 'string' ? product.sku : String(product.sku || '')}</TableCell>
                  <TableCell>{typeof product.name === 'string' ? product.name : String(product.name || '')}</TableCell>
                  <TableCell>{typeof product.type === 'string' ? product.type : String(product.type || '')}</TableCell>
                  <TableCell>{product.category || getCategoryFromProduct(product)}</TableCell>
                  <TableCell>{typeof product.material === 'string' ? product.material : String(product.material || '-')}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {product.diameter && (
                        <Chip 
                          size="small" 
                          label={`Diameter: ${typeof product.diameter === 'string' ? product.diameter : String(product.diameter || '')}`} 
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
                          label={`Thickness: ${typeof product.thickness === 'string' ? product.thickness : String(product.thickness || '')}`} 
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
                          label={`Size: ${typeof product.size === 'string' ? product.size : String(product.size || '')}`} 
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
                          label={`Length: ${typeof product.length === 'string' ? product.length : String(product.length || '')}`} 
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
                          label={`Height: ${typeof product.height === 'string' ? product.height : String(product.height || '')}`} 
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
                      {typeof product.name === 'string' ? product.name : String(product.name || '')}
                    </Typography>
                    <Chip 
                      label={product.category || getCategoryFromProduct(product)} 
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
                      mb: 1,
                      fontSize: '0.8rem',
                      opacity: 0.8,
                    }}
                  >
                    <strong>SKU:</strong> {typeof product.sku === 'string' ? product.sku : String(product.sku || '')}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: '0.8rem',
                      opacity: 0.8,
                    }}
                  >
                    <strong>Type:</strong> {typeof product.type === 'string' ? product.type : String(product.type || '')}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ mt: 2 }}>
                    {product.specifications && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Description:</span>
                        <span>
                          {typeof product.specifications === 'string' 
                            ? (product.specifications.length > 50 
                                ? `${product.specifications.substring(0, 50)}...` 
                                : product.specifications) 
                            : String(product.specifications || '')}
                        </span>
                      </Typography>
                    )}
                    
                    {/* Display variant options */}
                    {product.variant1Name && product.variant1Value && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>{typeof product.variant1Name === 'string' ? product.variant1Name : String(product.variant1Name || '')}:</span>
                        <span>{typeof product.variant1Value === 'string' ? product.variant1Value : String(product.variant1Value || '')}</span>
                      </Typography>
                    )}
                    {product.variant2Name && product.variant2Value && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>{typeof product.variant2Name === 'string' ? product.variant2Name : String(product.variant2Name || '')}:</span>
                        <span>{typeof product.variant2Value === 'string' ? product.variant2Value : String(product.variant2Value || '')}</span>
                      </Typography>
                    )}
                    
                    {/* Standard dimensions */}
                    {product.diameter && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Diameter:</span>
                        <span>{typeof product.diameter === 'string' ? product.diameter : String(product.diameter || '')}</span>
                      </Typography>
                    )}
                    {product.thickness && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Thickness:</span>
                        <span>{typeof product.thickness === 'string' ? product.thickness : String(product.thickness || '')}</span>
                      </Typography>
                    )}
                    {product.size && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Size:</span>
                        <span>{typeof product.size === 'string' ? product.size : String(product.size || '')}</span>
                      </Typography>
                    )}
                    {product.length && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Length:</span>
                        <span>{typeof product.length === 'string' ? product.length : String(product.length || '')}</span>
                      </Typography>
                    )}
                    {product.height && (
                      <Typography variant="body2" sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569' }}>Height:</span>
                        <span>{typeof product.height === 'string' ? product.height : String(product.height || '')}</span>
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
              Catalogue Builder <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b' }}>(Drag, drop and resize items)</span>
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
                  <Button 
                    variant={catalogueView === 'print' ? 'contained' : 'outlined'} 
                    color="primary"
                    onClick={() => handleCatalogueViewChange('print')}
                    size="small"
                    sx={{ fontWeight: catalogueView === 'print' ? 'bold' : 'normal' }}
                  >
                    Print Catalog
                  </Button>
                  <Button 
                    variant={catalogueView === 'page' ? 'contained' : 'outlined'} 
                    color="primary"
                    onClick={() => handleCatalogueViewChange('page')}
                    size="small"
                    sx={{ fontWeight: catalogueView === 'page' ? 'bold' : 'normal' }}
                  >
                    Page Layout
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
                    ) : catalogueView === 'print' ? (
                      // Print Catalog View - Group by type and material
                      <Box sx={{ width: '100%' }}>
                        {/* Group products by type and material */}
                        {(() => {
                          // Create groups by type and material
                          const groups = {};
                          
                          catalogueItems.forEach(item => {
                            const product = item.product;
                            const type = product.type || 'Other';
                            const material = product.material || 'Other';
                            const key = `${type}-${material}`.toLowerCase();
                            
                            if (!groups[key]) {
                              groups[key] = {
                                type,
                                material,
                                displayName: `${type} ${material ? `- ${material}` : ''}`,
                                products: [],
                                image: getProductImage(product)
                              };
                            }
                            
                            groups[key].products.push(product);
                          });
                          
                          // Sort products within each group by size
                          Object.keys(groups).forEach(key => {
                            groups[key].products.sort((a, b) => {
                              // Try to sort by size if available
                              if (a.size && b.size) {
                                const sizeA = parseFloat(a.size.replace(/[^0-9.]/g, '')) || 0;
                                const sizeB = parseFloat(b.size.replace(/[^0-9.]/g, '')) || 0;
                                return sizeA - sizeB;
                              }
                              // Fall back to sorting by name
                              return (a.name || '').localeCompare(b.name || '');
                            });
                          });
                          
                          return Object.entries(groups).map(([key, group]) => (
                            <Paper 
                              key={key}
                              sx={{ 
                                mb: 3, 
                                p: 2, 
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              <Grid container spacing={2}>
                                {/* Group header */}
                                <Grid item xs={12}>
                                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {group.displayName}
                                  </Typography>
                                  <Divider />
                                </Grid>
                                
                                {/* Group image */}
                                <Grid item xs={12} sm={3}>
                                  <Box 
                                    component="img"
                                    src={group.image}
                                    alt={group.displayName}
                                    sx={{ 
                                      width: '100%', 
                                      height: 'auto',
                                      maxHeight: '200px',
                                      objectFit: 'contain',
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 1
                                    }}
                                  />
                                </Grid>
                                
                                {/* Product sizes table */}
                                <Grid item xs={12} sm={9}>
                                  <TableContainer>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {group.products.map(product => (
                                          <TableRow key={typeof product.id === 'string' ? product.id : String(product.id || product.sku || '')}>
                                            <TableCell>{typeof product.sku === 'string' ? product.sku : String(product.sku || '')}</TableCell>
                                            <TableCell>{typeof product.name === 'string' ? product.name : String(product.name || '')}</TableCell>
                                            <TableCell>{typeof product.size === 'string' ? product.size : String(product.size || '-')}</TableCell>
                                            <TableCell>
                                              {product.specifications ? (
                                                <Typography variant="body2">
                                                  {product.specifications.length > 50 ? `${product.specifications.substring(0, 50)}...` : product.specifications}
                                                </Typography>
                                              ) : '-'}
                                              {product.variant1Name && product.variant1Value && (
                                                <Typography variant="caption" display="block">
                                                  {typeof product.variant1Name === 'string' ? product.variant1Name : String(product.variant1Name || '')}: 
                                                  {typeof product.variant1Value === 'string' ? product.variant1Value : String(product.variant1Value || '')}
                                                </Typography>
                                              )}
                                            </TableCell>
                                            <TableCell>{product.category || '-'}</TableCell>
                                            <TableCell align="right">${parseFloat(product.price || 0).toFixed(2)}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </Paper>
                          ));
                        })()}
                      </Box>
                    ) : catalogueView === 'page' ? (
                      <Box sx={{ 
                        position: 'relative',
                        height: '800px',
                        border: '1px solid #e0e0e0',
                        backgroundColor: '#f9f9f9',
                        p: 2,
                        overflow: 'hidden'
                      }}>
                        {catalogueItems.map((item) => {
                          const itemSize = itemSizes[item.id] || { width: 1, height: 1 };
                          return (
                            <Box 
                              key={item.id}
                              sx={{
                                position: 'absolute',
                                width: `${itemSize.width * 25}%`,
                                height: `${itemSize.height * 100}px`,
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <SortableItem 
                                id={item.id} 
                                product={item.product} 
                                removeItem={removeFromCatalogue}
                                view={catalogueView}
                                onResize={(id, size) => handleItemResize(id, size)}
                                initialSize={itemSize}
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    ) : (
                      <Box>
                        {catalogueItems.map((item) => (
                          <SortableItem 
                            key={item.id}
                            id={item.id} 
                            product={item.product} 
                            removeItem={removeFromCatalogue}
                            view={catalogueView}
                            onResize={(id, size) => handleItemResize(id, size)}
                            initialSize={itemSizes[item.id] || { width: 1, height: 1 }}
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
