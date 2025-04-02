/**
 * Generate Costs Migration SQL
 * 
 * This script generates SQL statements to create the product costs tables
 * and insert the cost data from costs.js into Supabase.
 */

const fs = require('fs');
const path = require('path');

// Function to escape single quotes in SQL strings
function escapeSql(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}

// Function to convert JavaScript object to SQL-safe JSON string
function objectToSqlJson(obj) {
  if (!obj) return 'NULL';
  return `'${escapeSql(JSON.stringify(obj))}'`;
}

// Function to generate SQL for creating the products table
function generateCreateProductsTableSql() {
  return `
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku TEXT UNIQUE,
  product_type TEXT NOT NULL,
  material TEXT,
  thickness TEXT,
  diameter TEXT,
  size TEXT,
  length TEXT,
  height TEXT,
  price DECIMAL(10, 2) NOT NULL,
  additional_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on product_type for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_product_type ON products(product_type);

-- Create index on sku for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
  `;
}

// Function to generate SQL for inserting a product
function generateInsertProductSql(product, productType, material, thickness, diameter, size) {
  // Skip if product is null
  if (!product) return '';
  
  // Extract product properties
  const { price, sku, length, height, ...additionalInfo } = product;
  
  // Skip if price or sku is missing
  if (price === undefined || sku === undefined) return '';
  
  return `
-- Insert product: ${sku}
INSERT INTO products (
  sku, product_type, material, thickness, diameter, size, length, height, price, additional_info
) VALUES (
  '${escapeSql(sku)}',
  '${escapeSql(productType)}',
  ${material ? `'${escapeSql(material)}'` : 'NULL'},
  ${thickness ? `'${escapeSql(thickness)}'` : 'NULL'},
  ${diameter ? `'${escapeSql(diameter)}'` : 'NULL'},
  ${size ? `'${escapeSql(size)}'` : 'NULL'},
  ${product.length ? `'${escapeSql(product.length)}'` : 'NULL'},
  ${product.height ? `'${escapeSql(product.height)}'` : 'NULL'},
  ${price},
  ${objectToSqlJson(Object.keys(additionalInfo).length > 0 ? additionalInfo : null)}
) ON CONFLICT (sku) DO UPDATE SET
  product_type = EXCLUDED.product_type,
  material = EXCLUDED.material,
  thickness = EXCLUDED.thickness,
  diameter = EXCLUDED.diameter,
  size = EXCLUDED.size,
  length = EXCLUDED.length,
  height = EXCLUDED.height,
  price = EXCLUDED.price,
  additional_info = EXCLUDED.additional_info,
  updated_at = now();
  `;
}

// Function to generate SQL for creating the formula_products table
function generateCreateFormulaProductsTableSql() {
  return `
-- Create formula_products table to link formulas with products
CREATE TABLE IF NOT EXISTS formula_products (
  id SERIAL PRIMARY KEY,
  formula_id TEXT NOT NULL REFERENCES material_formulas(id),
  product_type TEXT NOT NULL,
  lookup_criteria JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (formula_id, product_type)
);

-- Create index on formula_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_formula_products_formula_id ON formula_products(formula_id);
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
                  length
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
function extractNestedProducts(obj, productType, products, material = null, thickness = null, diameter = null, size = null) {
  if (!obj) return;
  
  // Check if this object is a product (has price and sku)
  if (obj.price !== undefined && obj.sku !== undefined) {
    products.push({
      product: obj,
      productType,
      material,
      thickness,
      diameter,
      size
    });
    return;
  }
  
  // Recursively process nested objects
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Determine which property this level represents
      if (key === 'Black' || key === 'Galvanized' || key === 'Galv') {
        extractNestedProducts(value, productType, products, key, thickness, diameter, size);
      } else if (key === '0.065' || key === 'SCH 20' || key === 'SCH 40') {
        extractNestedProducts(value, productType, products, material, key, diameter, size);
      } else if (key.includes('3/8') || key.includes('5/8') || key.includes('7/8') || key === '2' || key === '3' || key === '4') {
        extractNestedProducts(value, productType, products, material, thickness, key, size);
      } else {
        extractNestedProducts(value, productType, products, material, thickness, diameter, key);
      }
    }
  });
}

// Function to generate SQL for inserting formula product relationships
function generateFormulaProductRelationships(materialFormulasJs) {
  let sql = '';
  
  // Extract gate formulas and post formulas using regex
  const gateFormulasMatch = materialFormulasJs.match(/export const gateFormulas = ({[\s\S]*?});/);
  const postFormulasMatch = materialFormulasJs.match(/export const postFormulas = ({[\s\S]*?});/);
  
  if (!gateFormulasMatch || !postFormulasMatch) {
    console.error('Failed to extract formulas from materialFormulas.js');
    return sql;
  }
  
  // Create a temporary JavaScript file to evaluate the formulas
  const tempJs = `
    // Constants
    const PRODUCT_TYPES = {
      POST: "post",
      MESH: "mesh",
      EYE_TOP: "eye_top",
      DOME_CAP: "dome_cap",
      RAIL_END: "rail_end",
      TENSION_BAND: "tension_band",
      BRACE_BAND: "brace_band",
      BARB_ARM: "barb_arm",
      FENCE_TIE: "fence_tie",
      HOG_RINGS: "hog_rings",
      SLEEVE: "sleeve",
      RAIL_CLAMP: "rail_clamp",
      GATE_COLLAR: "gate_collar",
      CANE_BOLT: "cane_bolt",
      DROP_ROD: "drop_rod",
      FORK_LATCH: "fork_latch",
      TENSION_BAR: "tension_bar",
      TENSION_WIRE: "tension_wire",
      TOP_RAIL: "top_rail",
      BOTTOM_RAIL: "bottom_rail",
      BARBED_WIRE: "barbed_wire",
      CONCRETE: "concrete",
      GATE_FRAME: "gate_frame",
      GATE_HARDWARE: "gate_hardware"
    };
    
    const MATERIAL_TYPES = {
      BLACK: "Black",
      GALVANIZED: "Galvanized"
    };
    
    const THICKNESS_TYPES = {
      LIGHT: "0.065",
      SCH_20: "SCH 20",
      SCH_40: "SCH 40"
    };
    
    // Formulas
    const gateFormulas = ${gateFormulasMatch[1]};
    const postFormulas = ${postFormulasMatch[1]};
    
    // Return the formulas
    return { gateFormulas, postFormulas };
  `;
  
  try {
    // Evaluate the temporary JavaScript to get the formulas
    const formulas = eval(`(function() { ${tempJs} })()`);
    
    // Process gate formulas
    Object.entries(formulas.gateFormulas).forEach(([id, formula]) => {
      // Extract product types from the formula
      const productTypes = extractProductTypesFromFormula(formula);
      
      productTypes.forEach(productType => {
        sql += `
-- Insert formula product relationship for ${id} and ${productType}
INSERT INTO formula_products (
  formula_id, product_type, lookup_criteria
) VALUES (
  '${escapeSql(id)}',
  '${escapeSql(productType)}',
  ${objectToSqlJson({ formula_id: id, product_type: productType })}
) ON CONFLICT (formula_id, product_type) DO UPDATE SET
  lookup_criteria = EXCLUDED.lookup_criteria,
  updated_at = now();
        `;
      });
    });
    
    // Process post formulas
    Object.entries(formulas.postFormulas).forEach(([id, formula]) => {
      // Extract product types from the formula
      const productTypes = extractProductTypesFromFormula(formula);
      
      productTypes.forEach(productType => {
        sql += `
-- Insert formula product relationship for ${id} and ${productType}
INSERT INTO formula_products (
  formula_id, product_type, lookup_criteria
) VALUES (
  '${escapeSql(id)}',
  '${escapeSql(productType)}',
  ${objectToSqlJson({ formula_id: id, product_type: productType })}
) ON CONFLICT (formula_id, product_type) DO UPDATE SET
  lookup_criteria = EXCLUDED.lookup_criteria,
  updated_at = now();
        `;
      });
    });
  } catch (error) {
    console.error('Error generating formula product relationships:', error);
  }
  
  return sql;
}

// Helper function to extract product types from a formula
function extractProductTypesFromFormula(formula) {
  const productTypes = new Set();
  
  // Check if the formula code contains references to product types
  const codeString = formula.price_calculation.code.toString();
  
  // Common product types used in formulas
  const commonProductTypes = [
    'post', 'mesh', 'dome_cap', 'rail_end', 'tension_band', 'brace_band',
    'barb_arm', 'fence_tie', 'hog_rings', 'sleeve', 'rail_clamp',
    'gate_collar', 'cane_bolt', 'top_rail', 'concrete'
  ];
  
  // Check for each product type in the code
  commonProductTypes.forEach(productType => {
    if (codeString.includes(productType)) {
      productTypes.add(productType);
    }
  });
  
  // If no product types were found, add a default based on the formula category
  if (productTypes.size === 0) {
    if (formula.category === 'gates') {
      productTypes.add('post');
      productTypes.add('gate_frame');
    } else if (formula.category === 'posts') {
      productTypes.add('post');
    }
  }
  
  return Array.from(productTypes);
}

// Main function to generate the SQL migration
function generateCostsMigration() {
  try {
    // Read the costs.js file
    const costsFilePath = path.join(__dirname, '..', 'data', 'costs.js');
    const costsContent = fs.readFileSync(costsFilePath, 'utf8');
    
    // Read the materialFormulas.js file
    const formulasFilePath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
    const formulasContent = fs.readFileSync(formulasFilePath, 'utf8');
    
    // Extract products from costs.js
    const products = extractProductsFromCosts(costsContent);
    console.log(`Extracted ${products.length} products from costs.js`);
    
    // Generate the SQL migration
    let sql = generateCreateProductsTableSql();
    
    // Add product inserts
    products.forEach(({ product, productType, material, thickness, diameter, size }) => {
      sql += generateInsertProductSql(product, productType, material, thickness, diameter, size);
    });
    
    // Add formula products table and relationships
    sql += generateCreateFormulaProductsTableSql();
    sql += generateFormulaProductRelationships(formulasContent);
    
    // Write the SQL to a file
    const sqlFilePath = path.join(__dirname, '..', 'costs-migration.sql');
    fs.writeFileSync(sqlFilePath, sql);
    
    console.log(`Generated costs migration SQL file: ${sqlFilePath}`);
    console.log('You can now execute this SQL in the Supabase SQL editor');
    
  } catch (error) {
    console.error('Error generating costs migration:', error);
  }
}

// Run the function
generateCostsMigration();
