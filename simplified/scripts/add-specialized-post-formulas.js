/**
 * Add Specialized Post Formulas to Supabase
 * 
 * This script adds formulas for specialized post types like duckbill posts
 * and flanged posts to the Supabase database.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Specialized post formulas to add
const specializedPostFormulas = [
  // Duckbill post formula
  {
    id: 'duckbill_posts',
    name: 'Duckbill Posts',
    category: 'posts',
    description: 'Duckbill posts are specialized posts used as gate stops for sliding gates.',
    formula: 'Number of sliding gates × 1',
    calculation_details: {
      quantity_calculation: 'Number of sliding gates',
      price_calculation: 'Post price × quantity'
    },
    questionnaire_trigger: 'When user specifies sliding gates'
  },
  
  // Flanged post formula (centered)
  {
    id: 'flanged_posts_centered',
    name: 'Flanged Posts (Centered)',
    category: 'posts',
    description: 'Flanged posts with centered mounting plate are used for mounting fences to concrete surfaces.',
    formula: 'Number of flanged posts specified by user',
    calculation_details: {
      quantity_calculation: 'Number of flanged posts specified by user',
      price_calculation: 'Post price × quantity'
    },
    questionnaire_trigger: 'When user specifies flanged posts'
  },
  
  // Flanged post formula (off-centered)
  {
    id: 'flanged_posts_off_centered',
    name: 'Flanged Posts (Off-Centered)',
    category: 'posts',
    description: 'Flanged posts with off-centered mounting plate are used for mounting fences to concrete surfaces at edges or corners.',
    formula: 'Number of flanged posts specified by user',
    calculation_details: {
      quantity_calculation: 'Number of flanged posts specified by user',
      price_calculation: 'Post price × quantity'
    },
    questionnaire_trigger: 'When user specifies flanged posts'
  }
];

// Formula-product relationships to add
const formulaProductRelationships = [
  // Duckbill posts
  {
    formula_id: 'duckbill_posts',
    product_type: 'duckbill_post'
  },
  
  // Flanged posts (centered)
  {
    formula_id: 'flanged_posts_centered',
    product_type: 'flanged_post',
    product_size: 'Centered'
  },
  
  // Flanged posts (off-centered)
  {
    formula_id: 'flanged_posts_off_centered',
    product_type: 'flanged_post',
    product_size: 'Off Centered'
  }
];

// Main function
async function main() {
  console.log('Starting to add specialized post formulas to Supabase...');
  
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Add each formula
    console.log('Adding specialized post formulas...');
    
    for (const formula of specializedPostFormulas) {
      // Check if formula already exists
      const checkResult = await client.query(
        'SELECT id FROM material_formulas WHERE id = $1',
        [formula.id]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`Formula ${formula.id} already exists, updating...`);
        
        // Update existing formula
        await client.query(
          `UPDATE material_formulas 
           SET name = $1, category = $2, description = $3, calculation_details = $4, formula = $5, questionnaire_trigger = $6
           WHERE id = $7`,
          [
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.formula,
            formula.questionnaire_trigger,
            formula.id
          ]
        );
      } else {
        console.log(`Adding new formula: ${formula.id}`);
        
        // Insert new formula
        await client.query(
          `INSERT INTO material_formulas 
           (id, name, category, description, calculation_details, formula, questionnaire_trigger)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            formula.id,
            formula.name,
            formula.category,
            formula.description,
            JSON.stringify(formula.calculation_details),
            formula.formula,
            formula.questionnaire_trigger
          ]
        );
      }
    }
    
    // Add formula-product relationships
    console.log('Adding formula-product relationships...');
    
    for (const relationship of formulaProductRelationships) {
      // Check if relationship already exists
      const checkQuery = relationship.product_size 
        ? 'SELECT id FROM formula_products WHERE formula_id = $1 AND product_type = $2 AND product_size = $3'
        : 'SELECT id FROM formula_products WHERE formula_id = $1 AND product_type = $2';
      
      const checkParams = relationship.product_size 
        ? [relationship.formula_id, relationship.product_type, relationship.product_size]
        : [relationship.formula_id, relationship.product_type];
      
      const checkResult = await client.query(checkQuery, checkParams);
      
      if (checkResult.rows.length > 0) {
        console.log(`Relationship for formula ${relationship.formula_id} and product type ${relationship.product_type} already exists, skipping...`);
      } else {
        console.log(`Adding new relationship for formula ${relationship.formula_id} and product type ${relationship.product_type}...`);
        
        // Insert new relationship
        const insertQuery = relationship.product_size
          ? `INSERT INTO formula_products 
             (formula_id, product_type, product_size)
             VALUES ($1, $2, $3)`
          : `INSERT INTO formula_products 
             (formula_id, product_type)
             VALUES ($1, $2)`;
        
        const insertParams = relationship.product_size
          ? [relationship.formula_id, relationship.product_type, relationship.product_size]
          : [relationship.formula_id, relationship.product_type];
        
        await client.query(insertQuery, insertParams);
      }
    }
    
    // Count formulas
    const formulaCount = await client.query(
      'SELECT COUNT(*) FROM material_formulas'
    );
    
    console.log(`Total formulas in database: ${formulaCount.rows[0].count}`);
    
    // Count formula-product relationships
    const relationshipCount = await client.query(
      'SELECT COUNT(*) FROM formula_products'
    );
    
    console.log(`Total formula-product relationships in database: ${relationshipCount.rows[0].count}`);
    
    console.log('Specialized post formulas added successfully!');
    
  } catch (error) {
    console.error('Error adding specialized post formulas:', error);
  } finally {
    // Close the PostgreSQL connection
    console.log('Closing PostgreSQL connection...');
    await client.end();
    console.log('PostgreSQL connection closed');
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
