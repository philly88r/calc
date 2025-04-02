/**
 * Supabase Product Lookup
 * 
 * This module provides functions to look up products in the Supabase database.
 * It replaces the product lookup functionality that was previously using costs.js.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Find a post product based on material, thickness, diameter, and length
 * @param {string} material - The material (e.g., 'Black', 'Galvanized')
 * @param {string} thickness - The thickness (e.g., '0.065', 'SCH 40')
 * @param {string} diameter - The diameter (e.g., '1 3/8', '2 3/8')
 * @param {string} length - The length (e.g., '20ft', '21ft')
 * @returns {Promise<Object>} - The product object with price and sku
 */
export async function findPostProduct(material, thickness, diameter, length) {
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', 'post')
    .eq('material', material)
    .eq('thickness', thickness)
    .eq('diameter', diameter)
    .eq('length', length)
    .limit(1);
  
  if (error) {
    console.error('Error finding post product:', error);
    return null;
  }
  
  if (data && data.length > 0) {
    return {
      price: data[0].price,
      sku: data[0].sku
    };
  }
  
  // If exact match not found, try to find the next size up
  return findNextSizeUpPost(material, thickness, diameter, length);
}

/**
 * Find the next size up post when an exact match isn't available
 * @param {string} material - The material
 * @param {string} thickness - The thickness
 * @param {string} diameter - The diameter
 * @param {string} length - The length
 * @returns {Promise<Object>} - The product object with price and sku
 */
async function findNextSizeUpPost(material, thickness, diameter, length) {
  // Extract the numeric part of the length
  const numericLength = parseFloat(length.replace(/[^0-9.]/g, ''));
  
  // Get all posts with the same material, thickness, and diameter
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', 'post')
    .eq('material', material)
    .eq('thickness', thickness)
    .eq('diameter', diameter);
  
  if (error) {
    console.error('Error finding next size up post:', error);
    return null;
  }
  
  if (!data || data.length === 0) {
    return null;
  }
  
  // Find the next size up
  let nextSize = null;
  let nextSizeValue = Infinity;
  
  for (const product of data) {
    const productLength = parseFloat(product.length.replace(/[^0-9.]/g, ''));
    
    if (productLength > numericLength && productLength < nextSizeValue) {
      nextSize = product;
      nextSizeValue = productLength;
    }
  }
  
  if (nextSize) {
    return {
      price: nextSize.price,
      sku: nextSize.sku
    };
  }
  
  return null;
}

/**
 * Find a mesh product based on material, gauge, and height
 * @param {string} material - The material (e.g., 'Black', 'Galvanized')
 * @param {string} gauge - The gauge (e.g., '11 gauge', '9 gauge')
 * @param {string} height - The height (e.g., '36"', '48"')
 * @returns {Promise<Object>} - The product object with price and sku
 */
export async function findMeshProduct(material, gauge, height) {
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', 'mesh')
    .eq('material', material)
    .eq('size', gauge)
    .eq('height', height)
    .limit(1);
  
  if (error) {
    console.error('Error finding mesh product:', error);
    return null;
  }
  
  if (data && data.length > 0) {
    return {
      price: data[0].price,
      sku: data[0].sku
    };
  }
  
  // If exact match not found, try to find the next size up
  return findNextSizeUpMesh(material, gauge, height);
}

/**
 * Find the next size up mesh when an exact match isn't available
 * @param {string} material - The material
 * @param {string} gauge - The gauge
 * @param {string} height - The height
 * @returns {Promise<Object>} - The product object with price and sku
 */
async function findNextSizeUpMesh(material, gauge, height) {
  // Extract the numeric part of the height
  const numericHeight = parseFloat(height.replace(/[^0-9.]/g, ''));
  
  // Get all mesh with the same material and gauge
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', 'mesh')
    .eq('material', material)
    .eq('size', gauge);
  
  if (error) {
    console.error('Error finding next size up mesh:', error);
    return null;
  }
  
  if (!data || data.length === 0) {
    return null;
  }
  
  // Find the next size up
  let nextSize = null;
  let nextSizeValue = Infinity;
  
  for (const product of data) {
    const productHeight = parseFloat(product.height.replace(/[^0-9.]/g, ''));
    
    if (productHeight > numericHeight && productHeight < nextSizeValue) {
      nextSize = product;
      nextSizeValue = productHeight;
    }
  }
  
  if (nextSize) {
    return {
      price: nextSize.price,
      sku: nextSize.sku
    };
  }
  
  return null;
}

/**
 * Find a general product based on type, material, and size
 * @param {string} type - The product type (e.g., 'dome_cap', 'tension_band')
 * @param {string} material - The material (e.g., 'Black', 'Galvanized')
 * @param {string} size - The size (e.g., '1 3/8', '2 3/8')
 * @returns {Promise<Object>} - The product object with price and sku
 */
export async function findProduct(type, material, size) {
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', type)
    .eq('material', material);
  
  if (error) {
    console.error(`Error finding ${type} product:`, error);
    return null;
  }
  
  // If size is provided, filter by size
  if (size && data && data.length > 0) {
    const sizeMatch = data.find(product => 
      product.size === size || 
      product.diameter === size
    );
    
    if (sizeMatch) {
      return {
        price: sizeMatch.price,
        sku: sizeMatch.sku
      };
    }
  } else if (data && data.length > 0) {
    // If no size provided or no size match, return the first product
    return {
      price: data[0].price,
      sku: data[0].sku
    };
  }
  
  return null;
}

/**
 * Get all products of a specific type
 * @param {string} type - The product type (e.g., 'post', 'mesh')
 * @returns {Promise<Array>} - Array of products
 */
export async function getProductsByType(type) {
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('*')
    .eq('type', type);
  
  if (error) {
    console.error(`Error getting products of type ${type}:`, error);
    return [];
  }
  
  return data || [];
}

/**
 * Get all product types available in the database
 * @returns {Promise<Array>} - Array of unique product types
 */
export async function getAllProductTypes() {
  const { data, error } = await supabase
    .from('chainlink_products')
    .select('type');
  
  if (error) {
    console.error('Error getting product types:', error);
    return [];
  }
  
  // Extract unique types
  const types = [...new Set(data.map(item => item.type))];
  return types;
}

/**
 * Get the formula-product relationships for a specific formula
 * @param {string} formulaId - The formula ID
 * @returns {Promise<Array>} - Array of product types used by the formula
 */
export async function getFormulaProductTypes(formulaId) {
  const { data, error } = await supabase
    .from('formula_products')
    .select('product_type')
    .eq('formula_id', formulaId);
  
  if (error) {
    console.error(`Error getting product types for formula ${formulaId}:`, error);
    return [];
  }
  
  return data.map(item => item.product_type) || [];
}

export default {
  findPostProduct,
  findMeshProduct,
  findProduct,
  getProductsByType,
  getAllProductTypes,
  getFormulaProductTypes
};
