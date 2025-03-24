/**
 * Fetches chainlink prices from the server
 * @returns {Promise<Array>} Array of product objects with pricing information
 */
export const getChainlinkPrices = async () => {
  try {
    console.log('Fetching chainlink prices from server...');
    const response = await fetch('/api/chainlink-prices');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    // Log the response structure for debugging
    console.log('API Response structure:', Object.keys(responseData));
    console.log('Product count:', responseData.data ? responseData.data.length : 0);
    
    if (responseData.data && responseData.data.length > 0) {
      console.log('Sample product structure:', Object.keys(responseData.data[0]));
      console.log('Sample product data:', responseData.data[0]);
    }
    
    // Return the raw data without any filtering
    return responseData.data || [];
  } catch (error) {
    console.error('Error fetching chainlink prices:', error);
    return [];
  }
};
