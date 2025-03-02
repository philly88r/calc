import axios from 'axios';

const BASE_URL = 'https://southtexasfencesupply.retail.lightspeed.app';
const API_KEY = process.env.REACT_APP_LIGHTSPEED_API_KEY;

const lightspeedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
});

export const getPriceBooks = async () => {
  try {
    const response = await lightspeedApi.get('/api/3.0/price_books');
    return response.data;
  } catch (error) {
    console.error('Error fetching price books:', error);
    throw error;
  }
};

export default lightspeedApi;
