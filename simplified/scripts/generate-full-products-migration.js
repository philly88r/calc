/**
 * Generate Full Products Migration
 * 
 * This script generates SQL statements to insert all products from costs.js
 * into the chainlink_products table in Supabase.
 */

const fs = require('fs');
const path = require('path');

// Function to escape single quotes in SQL strings
function escapeSql(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}

// Function to generate SQL for inserting a product
function generateInsertProductSql(product, productType, material, thickness, diameter, size, length, height) {
  // Skip if product is null or price is missing
  if (!product || product.price === undefined) return '';
  
  // Extract product properties
  const { price, sku } = product;
  
  // Skip if sku is missing
  if (sku === undefined) return '';
  
  return `
-- Insert product: ${sku}
INSERT INTO chainlink_products (
  sku, type, material, thickness, diameter, size, length, height, price
) VALUES (
  '${escapeSql(sku)}',
  '${escapeSql(productType)}',
  ${material ? `'${escapeSql(material)}'` : 'NULL'},
  ${thickness ? `'${escapeSql(thickness)}'` : 'NULL'},
  ${diameter ? `'${escapeSql(diameter)}'` : 'NULL'},
  ${size ? `'${escapeSql(size)}'` : 'NULL'},
  ${length ? `'${escapeSql(length)}'` : 'NULL'},
  ${height ? `'${escapeSql(height)}'` : 'NULL'},
  ${price}
);
  `;
}

// Function to extract all products from costs.js
function extractProductsFromCosts(costsJs) {
  const products = [];
  
  // Extract product types constants
  const productTypesMatch = costsJs.match(/export const PRODUCT_TYPES = ({[\s\S]*?});/);
  const materialTypesMatch = costsJs.match(/export const MATERIAL_TYPES = ({[\s\S]*?});/);
  const thicknessTypesMatch = costsJs.match(/export const THICKNESS_TYPES = ({[\s\S]*?});/);
  
  if (!productTypesMatch || !materialTypesMatch || !thicknessTypesMatch) {
    console.error('Failed to extract constants from costs.js');
    return products;
  }
  
  // Evaluate the constants
  const PRODUCT_TYPES = eval(`(${productTypesMatch[1]})`);
  const MATERIAL_TYPES = eval(`(${materialTypesMatch[1]})`);
  const THICKNESS_TYPES = eval(`(${thicknessTypesMatch[1]})`);
  
  // Extract post costs
  const postCostsMatch = costsJs.match(/export const postCosts = ({[\s\S]*?});/);
  if (postCostsMatch) {
    try {
      const postCosts = eval(`(${postCostsMatch[1]})`);
      
      // Iterate through the nested structure
      Object.entries(postCosts).forEach(([material, thicknessObj]) => {
        Object.entries(thicknessObj).forEach(([thickness, diameterObj]) => {
          Object.entries(diameterObj).forEach(([diameter, lengthObj]) => {
            Object.entries(lengthObj).forEach(([length, product]) => {
              if (product && product.price !== undefined && product.sku !== undefined) {
                products.push({
                  product,
                  productType: PRODUCT_TYPES.POST,
                  material,
                  thickness,
                  diameter,
                  size: null,
                  length,
                  height: null
                });
              }
            });
          });
        });
      });
    } catch (error) {
      console.error('Error parsing postCosts:', error);
    }
  }
  
  // Extract mesh costs
  const meshCostsMatch = costsJs.match(/export const meshCosts = ({[\s\S]*?});/);
  if (meshCostsMatch) {
    try {
      const meshCosts = eval(`(${meshCostsMatch[1]})`);
      
      // Iterate through the nested structure
      Object.entries(meshCosts).forEach(([material, gaugeObj]) => {
        Object.entries(gaugeObj).forEach(([gauge, heightObj]) => {
          Object.entries(heightObj).forEach(([height, product]) => {
            if (product && product.price !== undefined && product.sku !== undefined) {
              products.push({
                product,
                productType: PRODUCT_TYPES.MESH,
                material,
                thickness: null,
                diameter: null,
                size: gauge,
                length: null,
                height
              });
            }
          });
        });
      });
    } catch (error) {
      console.error('Error parsing meshCosts:', error);
    }
  }
  
  // Extract other product costs
  const productCostPatterns = [
    { name: 'domeCap', type: PRODUCT_TYPES.DOME_CAP },
    { name: 'railEnd', type: PRODUCT_TYPES.RAIL_END },
    { name: 'tensionBand', type: PRODUCT_TYPES.TENSION_BAND },
    { name: 'braceBand', type: PRODUCT_TYPES.BRACE_BAND },
    { name: 'barbArms', type: PRODUCT_TYPES.BARB_ARM },
    { name: 'fenceTie', type: PRODUCT_TYPES.FENCE_TIE },
    { name: 'hogRings', type: PRODUCT_TYPES.HOG_RING },
    { name: 'sleeve', type: PRODUCT_TYPES.SLEEVE },
    { name: 'railClamps', type: PRODUCT_TYPES.RAIL_CLAMP },
    { name: 'gateCollar', type: PRODUCT_TYPES.GATE_COLLAR },
    { name: 'caneBolt', type: PRODUCT_TYPES.CANE_BOLT }
  ];
  
  productCostPatterns.forEach(({ name, type }) => {
    const regex = new RegExp(`export const ${name}Costs = ({[\\s\\S]*?});`);
    const match = costsJs.match(regex);
    
    if (match) {
      try {
        const costs = eval(`(${match[1]})`);
        
        // Handle different nesting structures
        if (typeof costs === 'object') {
          extractNestedProducts(costs, type, products);
        }
      } catch (error) {
        console.error(`Error parsing ${name}Costs:`, error);
      }
    }
  });
  
  return products;
}

// Helper function to extract products from nested objects with varying structures
function extractNestedProducts(obj, productType, products, material = null, thickness = null, diameter = null, size = null, length = null, height = null) {
  if (!obj) return;
  
  // Check if this object is a product (has price and sku)
  if (obj.price !== undefined && obj.sku !== undefined) {
    products.push({
      product: obj,
      productType,
      material,
      thickness,
      diameter,
      size,
      length,
      height
    });
    return;
  }
  
  // Recursively process nested objects
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Determine which property this level represents
      if (key === 'Black' || key === 'Galvanized' || key === 'Galv') {
        extractNestedProducts(value, productType, products, key, thickness, diameter, size, length, height);
      } else if (key === '0.065' || key === 'SCH 20' || key === 'SCH 40') {
        extractNestedProducts(value, productType, products, material, key, diameter, size, length, height);
      } else if (key.includes('3/8') || key.includes('5/8') || key.includes('7/8') || key === '2' || key === '3' || key === '4') {
        extractNestedProducts(value, productType, products, material, thickness, key, size, length, height);
      } else if (key.includes('ft') || key.includes('foot')) {
        extractNestedProducts(value, productType, products, material, thickness, diameter, size, key, height);
      } else if (key.includes('"') || key.includes('inch')) {
        extractNestedProducts(value, productType, products, material, thickness, diameter, size, length, key);
      } else {
        extractNestedProducts(value, productType, products, material, thickness, diameter, key, length, height);
      }
    }
  });
}

// Main function to generate the SQL migration
function generateProductsMigration() {
  try {
    // Read the costs.js file
    const costsFilePath = path.join(__dirname, '..', 'data', 'costs.js');
    const costsContent = fs.readFileSync(costsFilePath, 'utf8');
    
    // Extract products from costs.js
    const products = extractProductsFromCosts(costsContent);
    console.log(`Extracted ${products.length} products from costs.js`);
    
    // Generate the SQL migration
    let sql = `-- Full migration of products from costs.js\n`;
    
    // Add product inserts
    products.forEach(({ product, productType, material, thickness, diameter, size, length, height }) => {
      sql += generateInsertProductSql(product, productType, material, thickness, diameter, size, length, height);
    });
    
    // Write the SQL to a file
    const sqlFilePath = path.join(__dirname, '..', 'full-products-migration.sql');
    fs.writeFileSync(sqlFilePath, sql);
    
    console.log(`Generated full products migration SQL file: ${sqlFilePath}`);
    console.log('You can now execute this SQL in the Supabase SQL editor');
    
  } catch (error) {
    console.error('Error generating products migration:', error);
  }
}

// Run the function
generateProductsMigration();
