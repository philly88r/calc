/**
 * Material Formulas Adapter
 * 
 * This module adapts the material formulas to work with Supabase.
 * It fetches formulas from the database and provides them in the same format
 * as the original materialFormulas.js file.
 */

import { createClient } from '@supabase/supabase-js';
import { findPostProduct, findMeshProduct, findProduct } from './supabase-product-lookup';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all material formulas from Supabase
 * @returns {Promise<Object>} - Object containing all material formulas
 */
export async function fetchMaterialFormulas() {
  try {
    const { data: formulas, error } = await supabase
      .from('material_formulas')
      .select('*');
    
    if (error) {
      console.error('Error fetching material formulas:', error);
      return {};
    }
    
    // Convert array of formulas to object with formula ID as key
    const formulasObject = {};
    
    for (const formula of formulas) {
      // Parse the calculation_details JSON
      const calculationDetails = formula.calculation_details || {};
      
      // Create a formula object in the same format as materialFormulas.js
      formulasObject[formula.id] = {
        id: formula.id,
        questionnaire_trigger: formula.questionnaire_trigger || '',
        formula: formula.formula || '',
        description: formula.description || '',
        price_calculation: {
          steps: calculationDetails.steps || [],
          code: createCalculationFunction(formula.id, calculationDetails.code_string)
        },
        total_cost_formula: calculationDetails.total_cost_formula || '',
        price_lookup: calculationDetails.price_lookup || '',
        additional_info: formula.additional_info || '',
        available_options: calculationDetails.available_options || {}
      };
    }
    
    return {
      gateFormulas: extractFormulasByCategory(formulasObject, 'gates'),
      postFormulas: extractFormulasByCategory(formulasObject, 'posts'),
      // Add other formula categories as needed
    };
  } catch (error) {
    console.error('Error in fetchMaterialFormulas:', error);
    return {};
  }
}

/**
 * Extract formulas by category
 * @param {Object} formulas - All formulas
 * @param {string} category - Category to extract
 * @returns {Object} - Object containing formulas of the specified category
 */
function extractFormulasByCategory(formulas, category) {
  const result = {};
  
  Object.entries(formulas).forEach(([id, formula]) => {
    if (id.includes(category) || formula.category === category) {
      result[id] = formula;
    }
  });
  
  return result;
}

/**
 * Create a calculation function from a code string
 * @param {string} formulaId - The formula ID
 * @param {string} codeString - The code string from the database
 * @returns {Function} - The calculation function
 */
function createCalculationFunction(formulaId, codeString) {
  if (!codeString) {
    return (params, costs) => 0;
  }
  
  try {
    // Create a function that takes params and costs as arguments
    // and uses the product lookup functions from supabase-product-lookup.js
    return new Function('params', 'costs', `
      const findPostProduct = ${findPostProduct.toString()};
      const findMeshProduct = ${findMeshProduct.toString()};
      const findProduct = ${findProduct.toString()};
      
      ${codeString}
    `);
  } catch (error) {
    console.error(`Error creating calculation function for formula ${formulaId}:`, error);
    return (params, costs) => 0;
  }
}

/**
 * Get a specific formula by ID
 * @param {string} formulaId - The formula ID
 * @returns {Promise<Object>} - The formula object
 */
export async function getFormulaById(formulaId) {
  try {
    const { data, error } = await supabase
      .from('material_formulas')
      .select('*')
      .eq('id', formulaId)
      .limit(1);
    
    if (error || !data || data.length === 0) {
      console.error(`Error fetching formula ${formulaId}:`, error);
      return null;
    }
    
    const formula = data[0];
    const calculationDetails = formula.calculation_details || {};
    
    return {
      id: formula.id,
      questionnaire_trigger: formula.questionnaire_trigger || '',
      formula: formula.formula || '',
      description: formula.description || '',
      price_calculation: {
        steps: calculationDetails.steps || [],
        code: createCalculationFunction(formula.id, calculationDetails.code_string)
      },
      total_cost_formula: calculationDetails.total_cost_formula || '',
      price_lookup: calculationDetails.price_lookup || '',
      additional_info: formula.additional_info || '',
      available_options: calculationDetails.available_options || {}
    };
  } catch (error) {
    console.error(`Error in getFormulaById for formula ${formulaId}:`, error);
    return null;
  }
}

export default {
  fetchMaterialFormulas,
  getFormulaById
};
