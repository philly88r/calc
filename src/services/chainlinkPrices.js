import axios from 'axios';

const API_KEY = process.env.REACT_APP_LIGHTSPEED_API_KEY;
const BASE_URL = 'https://southtexasfencesupply.retail.lightspeed.app';

const chainlinkApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
});

export const getChainlinkPrices = async () => {
  try {
    const response = await chainlinkApi.get('/api/3.0/products', {
      params: {
        category: 'chainlink'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chainlink prices:', error);
    throw error;
  }
};

export default chainlinkApi;
