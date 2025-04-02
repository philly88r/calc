/**
 * Check Chainlink Products
 * 
 * This script checks the chainlink_products table structure and creates
 * relationships between formulas and products.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Check if chainlink_products table exists
    console.log('Checking if chainlink_products table exists...');
    const tableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'chainlink_products'
      );
    `);
    
    const tableExists = tableCheckResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('chainlink_products table does not exist in the database.');
      return;
    }
    
    // Get column information
    console.log('\nGetting column information for chainlink_products table:');
    const columnsResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'chainlink_products'
      ORDER BY ordinal_position;
    `);
    
    columnsResult.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
    
    // Get sample data
    console.log('\nGetting sample data from chainlink_products table:');
    const sampleResult = await client.query(`
      SELECT *
      FROM chainlink_products
      LIMIT 1;
    `);
    
    if (sampleResult.rows.length === 0) {
      console.log('No data found in the table');
    } else {
      console.log('Sample row from chainlink_products table:');
      const sampleRow = sampleResult.rows[0];
      Object.entries(sampleRow).forEach(([key, value]) => {
        console.log(`- ${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`);
      });
    }
    
    // Count products by type
    console.log('\nCounting products by type:');
    const productTypesResult = await client.query(`
      SELECT type, COUNT(*) as count
      FROM chainlink_products
      GROUP BY type
      ORDER BY count DESC;
    `);
    
    productTypesResult.rows.forEach(row => {
      console.log(`- ${row.type}: ${row.count} products`);
    });
    
    // Check if formula_products table exists
    console.log('\nChecking if formula_products table exists...');
    const formulaProductsTableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'formula_products'
      );
    `);
    
    const formulaProductsTableExists = formulaProductsTableCheckResult.rows[0].exists;
    
    if (!formulaProductsTableExists) {
      console.log('formula_products table does not exist. We need to create it to establish relationships between formulas and products.');
      
      // Create formula_products table
      console.log('\nCreating formula_products table...');
      await client.query(`
        CREATE TABLE formula_products (
          id SERIAL PRIMARY KEY,
          formula_id TEXT NOT NULL REFERENCES material_formulas(id),
          product_type TEXT NOT NULL,
          product_size TEXT,
          product_material TEXT,
          product_thickness TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      console.log('formula_products table created successfully.');
    } else {
      // Get column information for formula_products table
      console.log('\nGetting column information for formula_products table:');
      const formulaProductsColumnsResult = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'formula_products'
        ORDER BY ordinal_position;
      `);
      
      formulaProductsColumnsResult.rows.forEach(row => {
        console.log(`- ${row.column_name} (${row.data_type})`);
      });
      
      // Count existing formula-product relationships
      const relationshipCountResult = await client.query(`
        SELECT COUNT(*) FROM formula_products;
      `);
      
      console.log(`\nFound ${relationshipCountResult.rows[0].count} existing formula-product relationships.`);
      
      // Get sample relationships
      const sampleRelationshipsResult = await client.query(`
        SELECT fp.*, mf.name as formula_name
        FROM formula_products fp
        JOIN material_formulas mf ON fp.formula_id = mf.id
        LIMIT 5;
      `);
      
      if (sampleRelationshipsResult.rows.length > 0) {
        console.log('\nSample formula-product relationships:');
        sampleRelationshipsResult.rows.forEach(row => {
          console.log(`- ${row.formula_name} (${row.formula_id}) -> Product Type: ${row.product_type}, Size: ${row.product_size || 'N/A'}`);
        });
      }
    }
    
    // Create a sample lookup function
    console.log('\nExample of how to lookup products for a formula:');
    console.log(`
// Example lookup function
async function lookupProductsForFormula(formulaId) {
  // 1. Get the formula-product relationship
  const relationshipQuery = \`
    SELECT product_type, product_size, product_material, product_thickness
    FROM formula_products
    WHERE formula_id = $1
  \`;
  
  const relationshipResult = await client.query(relationshipQuery, [formulaId]);
  
  if (relationshipResult.rows.length === 0) {
    return null;
  }
  
  const relationship = relationshipResult.rows[0];
  
  // 2. Build a query to find matching products
  let productQuery = 'SELECT * FROM chainlink_products WHERE 1=1';
  const params = [];
  
  if (relationship.product_type) {
    params.push(relationship.product_type);
    productQuery += \` AND type = $\${params.length}\`;
  }
  
  if (relationship.product_size) {
    params.push(relationship.product_size);
    productQuery += \` AND size = $\${params.length}\`;
  }
  
  if (relationship.product_material) {
    params.push(relationship.product_material);
    productQuery += \` AND material = $\${params.length}\`;
  }
  
  if (relationship.product_thickness) {
    params.push(relationship.product_thickness);
    productQuery += \` AND thickness = $\${params.length}\`;
  }
  
  // 3. Execute the query to find matching products
  const productsResult = await client.query(productQuery, params);
  
  return productsResult.rows;
}
    `);
    
    // Suggest next steps
    console.log('\nNext steps:');
    console.log('1. Create a formula_products relationship for each formula that needs to lookup products');
    console.log('2. Implement a product lookup function that uses the formula_id to find matching products');
    console.log('3. Calculate quantities using the formula calculations');
    console.log('4. Calculate costs by multiplying quantities by product prices');
    
    // Example of creating a formula-product relationship
    console.log('\nExample of creating a formula-product relationship:');
    console.log(`
// Example of creating a formula-product relationship
async function createFormulaProductRelationship(formulaId, productType, productSize, productMaterial, productThickness) {
  const query = \`
    INSERT INTO formula_products 
    (formula_id, product_type, product_size, product_material, product_thickness)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (formula_id) DO UPDATE
    SET 
      product_type = EXCLUDED.product_type,
      product_size = EXCLUDED.product_size,
      product_material = EXCLUDED.product_material,
      product_thickness = EXCLUDED.product_thickness,
      updated_at = NOW()
    RETURNING id
  \`;
  
  const result = await client.query(query, [
    formulaId,
    productType,
    productSize,
    productMaterial,
    productThickness
  ]);
  
  return result.rows[0].id;
}
    `);
    
    // Example of calculating costs
    console.log('\nExample of calculating costs:');
    console.log(`
// Example of calculating costs
async function calculateCosts(params) {
  const results = {};
  
  // Get all formulas
  const formulasResult = await client.query('SELECT id, name, formula, calculation_details FROM material_formulas');
  const formulas = formulasResult.rows;
  
  for (const formula of formulas) {
    try {
      // 1. Calculate quantity using the formula
      const quantity = calculateQuantity(formula, params);
      
      if (quantity <= 0) {
        continue; // Skip if quantity is zero or negative
      }
      
      // 2. Lookup products for the formula
      const products = await lookupProductsForFormula(formula.id);
      
      if (!products || products.length === 0) {
        continue; // Skip if no products found
      }
      
      // 3. Find the best matching product
      const product = findBestMatchingProduct(products, params);
      
      if (!product) {
        continue; // Skip if no matching product found
      }
      
      // 4. Calculate cost
      const cost = quantity * product.price;
      
      // 5. Add to results
      results[formula.id] = {
        name: formula.name,
        quantity,
        unit_price: product.price,
        total_cost: cost,
        product_sku: product.sku
      };
    } catch (error) {
      console.error(\`Error calculating costs for formula \${formula.id}:\`, error);
    }
  }
  
  return results;
}
    `);
    
  } catch (error) {
    console.error('Error checking chainlink products:', error);
  } finally {
    // Close the PostgreSQL connection
    await client.end();
    console.log('\nPostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
