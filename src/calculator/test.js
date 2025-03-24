// Test file to verify our extracted functions work
import { findPostSize } from './postCalculations';
import { postCosts } from '../data/costs';

// Test the findPostSize function
const testFindPostSize = () => {
  const result = findPostSize(
    postCosts,
    'Galvanized',
    'Industrial SCH 40',
    '2 7/8',
    10
  );
  
  console.log('Test result:', result);
  return result;
};

// Export the test function
export default testFindPostSize;
