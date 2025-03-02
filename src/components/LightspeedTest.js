import React, { useEffect, useState } from 'react';
import { getPriceBooks } from '../services/lightspeedApi';
import { Box, Typography, Button } from '@mui/material';

const LightspeedTest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    try {
      setError(null);
      const result = await getPriceBooks();
      setData(result);
      console.log('API Response:', result);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lightspeed API Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testConnection}
        sx={{ mb: 2 }}
      >
        Test Connection
      </Button>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {data && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Response Data:
          </Typography>
          <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
};

export default LightspeedTest;
