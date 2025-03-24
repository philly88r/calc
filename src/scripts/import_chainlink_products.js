const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to the JSON file
const jsonFilePath = path.join(__dirname, '..', 'data', 'complete-pricebook.json');

async function importProducts() {
  try {
    // Read and parse the JSON file
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const products = JSON.parse(data);
    
    console.log(`Total products in JSON file: ${products.length}`);
    
    // Prepare the products for insertion
    const formattedProducts = products.map(product => {
      // Extract variant options if they exist
      const variants = product.variations || [];
      
      // Default values for variant options
      let variantOptionOneName = null;
      let variantOptionOneValue = null;
      let variantOptionTwoName = null;
      let variantOptionTwoValue = null;
      let variantOptionThreeName = null;
      let variantOptionThreeValue = null;
      
      // Assign variant options if they exist
      if (variants.length > 0 && variants[0].options) {
        if (variants[0].options.length > 0) {
          variantOptionOneName = variants[0].name || null;
          variantOptionOneValue = variants[0].options[0].value || null;
        }
        if (variants.length > 1 && variants[1].options && variants[1].options.length > 0) {
          variantOptionTwoName = variants[1].name || null;
          variantOptionTwoValue = variants[1].options[0].value || null;
        }
        if (variants.length > 2 && variants[2].options && variants[2].options.length > 0) {
          variantOptionThreeName = variants[2].name || null;
          variantOptionThreeValue = variants[2].options[0].value || null;
        }
      }
      
      // Determine product category from description or name
      let productCategory = 'Uncategorized';
      if (product.description && product.description.includes('Chain link')) {
        productCategory = 'Chain Link Accessories';
      } else if (product.name && product.name.toLowerCase().includes('mesh')) {
        productCategory = 'Chain Link Mesh';
      } else if (product.description && product.description.includes('PostPipe')) {
        productCategory = 'Chain Link Posts';
      } else if (product.name && product.name.toLowerCase().includes('gate')) {
        productCategory = 'Chain Link Gates';
      }
      
      // Return formatted product
      return {
        sku: product.sku,
        name: product.name,
        product_category: productCategory,
        variant_option_one_name: variantOptionOneName,
        variant_option_one_value: variantOptionOneValue,
        variant_option_two_name: variantOptionTwoName,
        variant_option_two_value: variantOptionTwoValue,
        variant_option_three_name: variantOptionThreeName,
        variant_option_three_value: variantOptionThreeValue,
        supply_price: parseFloat(product.basePrice) || 0,
        retail_price: parseFloat(product.basePrice) || 0, // Using basePrice for retail_price as well since we don't have separate retail price
      };
    });
    
    // Insert products in batches to avoid potential issues with large datasets
    const batchSize = 100;
    let successCount = 0;
    
    for (let i = 0; i < formattedProducts.length; i += batchSize) {
      const batch = formattedProducts.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('chainlink_products')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        successCount += batch.length;
        console.log(`Inserted batch ${i / batchSize + 1} (${batch.length} products)`);
      }
    }
    
    console.log(`Successfully imported ${successCount} out of ${products.length} products`);
    
    // Verify the count in the database
    const { data: countData, error: countError } = await supabase
      .from('chainlink_products')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error getting count:', countError);
    } else {
      console.log(`Total products in database: ${countData.count}`);
    }
    
  } catch (error) {
    console.error('Error importing products:', error);
  }
}

// Run the import function
importProducts();
