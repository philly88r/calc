/**
 * Add Specialized Post Formulas to Supabase
 * 
 * This script adds formulas for specialized post types like duckbill posts
 * and flanged posts to the Supabase database using the Supabase client.
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://kdhwrlhzevzekoanusbs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaHdybGh6ZXZ6ZWtvYW51c2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMzM5NTYsImV4cCI6MjAzMTcwOTk1Nn0.yjvQKLDFqJ7HQwQX0uRzHh0Zj4sylhtcSvfG38-gWGE';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  
  try {
    // Add each formula
    console.log('Adding specialized post formulas...');
    
    for (const formula of specializedPostFormulas) {
      // Check if formula already exists
      const { data: existingFormula, error: checkError } = await supabase
        .from('material_formulas')
        .select('id')
        .eq('id', formula.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error(`Error checking formula ${formula.id}:`, checkError);
        continue;
      }
      
      if (existingFormula) {
        console.log(`Formula ${formula.id} already exists, updating...`);
        
        // Update existing formula
        const { error: updateError } = await supabase
          .from('material_formulas')
          .update({
            name: formula.name,
            category: formula.category,
            description: formula.description,
            calculation_details: formula.calculation_details,
            formula: formula.formula,
            questionnaire_trigger: formula.questionnaire_trigger
          })
          .eq('id', formula.id);
        
        if (updateError) {
          console.error(`Error updating formula ${formula.id}:`, updateError);
        }
      } else {
        console.log(`Adding new formula: ${formula.id}`);
        
        // Insert new formula
        const { error: insertError } = await supabase
          .from('material_formulas')
          .insert([formula]);
        
        if (insertError) {
          console.error(`Error inserting formula ${formula.id}:`, insertError);
        }
      }
    }
    
    // Add formula-product relationships
    console.log('Adding formula-product relationships...');
    
    for (const relationship of formulaProductRelationships) {
      // Check if relationship already exists
      const query = supabase
        .from('formula_products')
        .select('id')
        .eq('formula_id', relationship.formula_id)
        .eq('product_type', relationship.product_type);
      
      if (relationship.product_size) {
        query.eq('product_size', relationship.product_size);
      }
      
      const { data: existingRelationship, error: checkError } = await query;
      
      if (checkError) {
        console.error(`Error checking relationship for formula ${relationship.formula_id}:`, checkError);
        continue;
      }
      
      if (existingRelationship && existingRelationship.length > 0) {
        console.log(`Relationship for formula ${relationship.formula_id} and product type ${relationship.product_type} already exists, skipping...`);
      } else {
        console.log(`Adding new relationship for formula ${relationship.formula_id} and product type ${relationship.product_type}...`);
        
        // Insert new relationship
        const { error: insertError } = await supabase
          .from('formula_products')
          .insert([relationship]);
        
        if (insertError) {
          console.error(`Error inserting relationship for formula ${relationship.formula_id}:`, insertError);
        }
      }
    }
    
    // Count formulas
    const { data: formulaCount, error: countError } = await supabase
      .from('material_formulas')
      .select('id', { count: 'exact' });
    
    if (countError) {
      console.error('Error counting formulas:', countError);
    } else {
      console.log(`Total formulas in database: ${formulaCount.length}`);
    }
    
    // Count formula-product relationships
    const { data: relationshipCount, error: relCountError } = await supabase
      .from('formula_products')
      .select('id', { count: 'exact' });
    
    if (relCountError) {
      console.error('Error counting relationships:', relCountError);
    } else {
      console.log(`Total formula-product relationships in database: ${relationshipCount.length}`);
    }
    
    console.log('Specialized post formulas added successfully!');
    
  } catch (error) {
    console.error('Error adding specialized post formulas:', error);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
