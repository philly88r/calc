import React, { useState } from 'react';
import './App.css';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, AppBar, Toolbar, Button } from '@mui/material';
import CustomerInfo from './pages/CustomerInfo';
import FenceCalculator from './FenceCalculator';
import FeedbackCalculatorPage from './pages/FeedbackCalculatorPage';
import ChainlinkPriceTest from './components/ChainlinkPriceTest';
import ProductDetailExample from './components/ProductDetailExample';
import logo from './assets/Logo (6).png';
import { ResponsiveProvider } from './context/ResponsiveContext';

function App() {
  const [currentPage, setCurrentPage] = useState('customer-info');
  const [customerData, setCustomerData] = useState({
    customerName: '',
    siteAddress: '',
    zipCode: '',
    billingAddress: '',
    phoneNumber: '',
    email: '',
    salesRep: '',
    salesRepTel: '',
    salesRepEmail: ''
  });

  const handleCustomerInfoSubmit = (formData) => {
    setCustomerData(formData);
    setCurrentPage('calculator');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6d2f2c',
        light: '#8c403d',
        dark: '#4d211f',
      },
      secondary: {
        main: '#D2B48C',
        light: '#DEC5A7',
        dark: '#BC9F7D',
      },
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#6d2f2c',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#6d2f2c',
            color: '#FFFFFF',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(109, 47, 44, 0.1)',
          },
        },
      },
    },
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'customer-info':
        return <CustomerInfo onSubmit={handleCustomerInfoSubmit} initialData={customerData} />;
      case 'calculator':
        return <FenceCalculator customerData={customerData} />;
      case 'feedback-calculator':
        return <FeedbackCalculatorPage customerData={customerData} />;
      case 'pricing':
        return <ChainlinkPriceTest />;
      case 'product-detail':
        return <ProductDetailExample />;
      default:
        return <CustomerInfo onSubmit={handleCustomerInfoSubmit} initialData={customerData} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveProvider>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
              <Box sx={{ 
                height: { xs: '80px', sm: '100px' }, 
                display: 'flex', 
                alignItems: 'center',
                '& img': {
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  maxWidth: 'none'
                }
              }}>
                <img 
                  src={logo}
                  alt="South Texas Fence & Deck Logo" 
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  onClick={() => setCurrentPage('customer-info')}
                  color="inherit"
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: currentPage === 'customer-info' ? '#4d211f' : 'transparent',
                    '&:hover': { backgroundColor: '#4d211f' }
                  }}
                >
                  Customer Info
                </Button>
                <Button
                  onClick={() => setCurrentPage('calculator')}
                  color="inherit"
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: currentPage === 'calculator' ? '#4d211f' : 'transparent',
                    '&:hover': { backgroundColor: '#4d211f' }
                  }}
                >
                  Calculator
                </Button>
                <Button
                  onClick={() => setCurrentPage('feedback-calculator')}
                  color="inherit"
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: currentPage === 'feedback-calculator' ? '#4d211f' : 'transparent',
                    '&:hover': { backgroundColor: '#4d211f' }
                  }}
                >
                  Feedback Calculator
                </Button>
                <Button
                  onClick={() => setCurrentPage('pricing')}
                  color="inherit"
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: currentPage === 'pricing' ? '#4d211f' : 'transparent',
                    '&:hover': { backgroundColor: '#4d211f' }
                  }}
                >
                  Pricing
                </Button>
                <Button
                  onClick={() => setCurrentPage('product-detail')}
                  color="inherit"
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: currentPage === 'product-detail' ? '#4d211f' : 'transparent',
                    '&:hover': { backgroundColor: '#4d211f' }
                  }}
                >
                  Product Details
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {renderCurrentPage()}
          </Container>
        </Box>
      </ResponsiveProvider>
    </ThemeProvider>
  );
}

export default App;
