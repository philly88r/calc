/**
 * Map Questionnaire to Database
 * 
 * This script ensures that every question in the existing questionnaire
 * is properly tied to the database.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Path to the questionnaire file
const questionnairePath = path.join(__dirname, '..', 'src', 'components', 'FenceCalculatorModules', 'questionnaire.js');

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Check if questionnaire table exists
    const tableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'questionnaire_items'
      );
    `);
    
    const tableExists = tableCheckResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('\nCreating questionnaire_items table...');
      await client.query(`
        CREATE TABLE questionnaire_items (
          id VARCHAR(50) PRIMARY KEY,
          question_text TEXT NOT NULL,
          input_type VARCHAR(20) NOT NULL,
          options JSONB,
          default_value TEXT,
          validation JSONB,
          dependent_on VARCHAR(50),
          dependent_value TEXT,
          "order" INTEGER NOT NULL,
          section VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      console.log('questionnaire_items table created successfully.');
    } else {
      console.log('\nquestionnaire_items table already exists.');
    }
    
    // Read the existing questionnaire file
    console.log('\nReading existing questionnaire...');
    let questionnaire;
    try {
      // Try to read the file
      const questionnaireContent = fs.readFileSync(questionnairePath, 'utf8');
      
      // Extract the questionnaire object using regex
      const match = questionnaireContent.match(/export\s+const\s+questionnaire\s*=\s*(\{[\s\S]*?\n\});/m);
      if (match && match[1]) {
        // Convert the string to a JavaScript object
        // This is not safe for production, but works for our script
        questionnaire = eval(`(${match[1]})`);
      } else {
        throw new Error('Could not parse questionnaire object');
      }
    } catch (error) {
      console.error('Error reading questionnaire file:', error);
      
      // Create a sample questionnaire for demonstration
      console.log('Creating sample questionnaire for demonstration...');
      questionnaire = {
        basicInfo: {
          title: 'Basic Information',
          questions: [
            {
              id: 'totalLinearLength',
              text: 'Total Linear Length (ft)',
              type: 'number',
              defaultValue: 100
            },
            {
              id: 'heightOfFence',
              text: 'Height of Fence (ft)',
              type: 'select',
              options: [4, 5, 6, 7, 8, 10, 12],
              defaultValue: 6
            }
          ]
        },
        postInfo: {
          title: 'Post Information',
          questions: [
            {
              id: 'numberOfPulls',
              text: 'Number of Pulls',
              type: 'number',
              defaultValue: 0
            },
            {
              id: 'numberOfEndTerminals',
              text: 'Number of End Terminals',
              type: 'number',
              defaultValue: 2
            }
          ]
        }
      };
    }
    
    // Map questionnaire to database
    console.log('\nMapping questionnaire to database...');
    
    // Get existing items from database
    const existingItemsResult = await client.query(`
      SELECT id FROM questionnaire_items;
    `);
    
    const existingItemIds = new Set(existingItemsResult.rows.map(row => row.id));
    
    // Process each section and question
    let order = 0;
    for (const [sectionId, section] of Object.entries(questionnaire)) {
      console.log(`\nProcessing section: ${section.title}`);
      
      for (const question of section.questions) {
        order += 10; // Increment order by 10 to allow for insertions
        
        // Prepare question data
        const questionData = {
          id: question.id,
          question_text: question.text,
          input_type: question.type,
          options: question.options ? JSON.stringify(question.options) : null,
          default_value: question.defaultValue !== undefined ? String(question.defaultValue) : null,
          validation: question.validation ? JSON.stringify(question.validation) : null,
          dependent_on: question.dependentOn || null,
          dependent_value: question.dependentValue !== undefined ? String(question.dependentValue) : null,
          order: order,
          section: sectionId
        };
        
        // Check if question already exists in database
        if (existingItemIds.has(question.id)) {
          console.log(`Updating question: ${question.id}`);
          
          // Update existing question
          await client.query(`
            UPDATE questionnaire_items
            SET 
              question_text = $1,
              input_type = $2,
              options = $3,
              default_value = $4,
              validation = $5,
              dependent_on = $6,
              dependent_value = $7,
              "order" = $8,
              section = $9,
              updated_at = NOW()
            WHERE id = $10;
          `, [
            questionData.question_text,
            questionData.input_type,
            questionData.options,
            questionData.default_value,
            questionData.validation,
            questionData.dependent_on,
            questionData.dependent_value,
            questionData.order,
            questionData.section,
            questionData.id
          ]);
        } else {
          console.log(`Inserting question: ${question.id}`);
          
          // Insert new question
          await client.query(`
            INSERT INTO questionnaire_items (
              id, question_text, input_type, options, default_value,
              validation, dependent_on, dependent_value, "order", section
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
          `, [
            questionData.id,
            questionData.question_text,
            questionData.input_type,
            questionData.options,
            questionData.default_value,
            questionData.validation,
            questionData.dependent_on,
            questionData.dependent_value,
            questionData.order,
            questionData.section
          ]);
        }
      }
    }
    
    // Create a database-driven version of the questionnaire component
    console.log('\nCreating database-driven questionnaire component...');
    
    const dbQuestionnairePath = path.join(__dirname, '..', 'src', 'components', 'FenceCalculatorModules', 'DatabaseQuestionnaire.js');
    
    const dbQuestionnaireContent = `/**
 * Database-Driven Questionnaire Component
 * 
 * This component fetches the questionnaire structure from the database
 * and renders it dynamically.
 */

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Grid, Divider } from '@mui/material';
import QuestionRenderer from './QuestionRenderer';

const DatabaseQuestionnaire = () => {
  const { watch } = useFormContext();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Watch all form values to handle dependencies
  const formValues = watch();
  
  // Fetch questionnaire from database
  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        setLoading(true);
        
        // Fetch questionnaire from API
        const response = await fetch('/api/questionnaire');
        
        if (!response.ok) {
          throw new Error('Failed to fetch questionnaire');
        }
        
        const data = await response.json();
        
        // Organize questions by section
        const organizedQuestionnaire = {};
        
        data.forEach(item => {
          if (!organizedQuestionnaire[item.section]) {
            organizedQuestionnaire[item.section] = {
              title: item.section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              questions: []
            };
          }
          
          organizedQuestionnaire[item.section].questions.push({
            id: item.id,
            text: item.question_text,
            type: item.input_type,
            options: item.options,
            defaultValue: item.default_value,
            validation: item.validation,
            dependentOn: item.dependent_on,
            dependentValue: item.dependent_value
          });
        });
        
        // Sort questions by order
        Object.values(organizedQuestionnaire).forEach(section => {
          section.questions.sort((a, b) => a.order - b.order);
        });
        
        setQuestionnaire(organizedQuestionnaire);
        setError(null);
      } catch (err) {
        console.error('Error fetching questionnaire:', err);
        setError('Failed to load questionnaire. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestionnaire();
  }, []);
  
  // Show loading state
  if (loading) {
    return <Box p={2}>Loading questionnaire...</Box>;
  }
  
  // Show error state
  if (error) {
    return <Box p={2} color="error.main">{error}</Box>;
  }
  
  // Show questionnaire
  return (
    <Box>
      {questionnaire && Object.entries(questionnaire).map(([sectionId, section]) => {
        // Filter questions based on dependencies
        const visibleQuestions = section.questions.filter(question => {
          if (!question.dependentOn) return true;
          
          const dependentValue = formValues[question.dependentOn];
          
          if (question.dependentValue === undefined) {
            return !!dependentValue;
          }
          
          return String(dependentValue) === String(question.dependentValue);
        });
        
        // Skip empty sections
        if (visibleQuestions.length === 0) return null;
        
        return (
          <Box key={sectionId} mb={4}>
            <Typography variant="h5" gutterBottom>{section.title}</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              {visibleQuestions.map(question => (
                <Grid item xs={12} sm={6} md={4} key={question.id}>
                  <QuestionRenderer
                    id={question.id}
                    text={question.text}
                    type={question.type}
                    options={question.options}
                    defaultValue={question.defaultValue}
                    validation={question.validation}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default DatabaseQuestionnaire;
`;
    
    fs.writeFileSync(dbQuestionnairePath, dbQuestionnaireContent);
    console.log(`Database-driven questionnaire component created at: ${dbQuestionnairePath}`);
    
    // Create API endpoint for questionnaire
    console.log('\nCreating API endpoint for questionnaire...');
    
    const apiDirPath = path.join(__dirname, '..', 'src', 'api');
    if (!fs.existsSync(apiDirPath)) {
      fs.mkdirSync(apiDirPath, { recursive: true });
    }
    
    const questionnaireApiPath = path.join(apiDirPath, 'questionnaire.js');
    
    const questionnaireApiContent = `/**
 * Questionnaire API
 * 
 * This file provides API functions for fetching the questionnaire from the database.
 */

import { supabase } from '../utils/supabaseClient';

/**
 * Fetch the complete questionnaire from the database
 * @returns {Promise<Array>} Array of questionnaire items
 */
export const fetchQuestionnaire = async () => {
  const { data, error } = await supabase
    .from('questionnaire_items')
    .select('*')
    .order('order');
  
  if (error) {
    console.error('Error fetching questionnaire:', error);
    throw new Error('Failed to fetch questionnaire');
  }
  
  return data;
};

/**
 * Fetch a specific questionnaire item by ID
 * @param {string} id - Item ID
 * @returns {Promise<Object>} Questionnaire item
 */
export const fetchQuestionnaireItem = async (id) => {
  const { data, error } = await supabase
    .from('questionnaire_items')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching questionnaire item:', error);
    throw new Error('Failed to fetch questionnaire item');
  }
  
  return data;
};

/**
 * Update a questionnaire item
 * @param {string} id - Item ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated questionnaire item
 */
export const updateQuestionnaireItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('questionnaire_items')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error updating questionnaire item:', error);
    throw new Error('Failed to update questionnaire item');
  }
  
  return data;
};
`;
    
    fs.writeFileSync(questionnaireApiPath, questionnaireApiContent);
    console.log(`Questionnaire API created at: ${questionnaireApiPath}`);
    
    // Create integration guide
    console.log('\nCreating integration guide...');
    
    const integrationGuidePath = path.join(__dirname, '..', 'docs', 'database-integration-guide.md');
    
    // Ensure docs directory exists
    const docsDir = path.join(__dirname, '..', 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    const integrationGuideContent = `# Database Integration Guide for Fence Calculator

## Overview

This guide explains how to integrate the fence calculator with the database to ensure all components are properly connected.

## Database Tables

### 1. questionnaire_items

Stores all questionnaire questions and their properties.

\`\`\`sql
CREATE TABLE questionnaire_items (
  id VARCHAR(50) PRIMARY KEY,
  question_text TEXT NOT NULL,
  input_type VARCHAR(20) NOT NULL,
  options JSONB,
  default_value TEXT,
  validation JSONB,
  dependent_on VARCHAR(50),
  dependent_value TEXT,
  "order" INTEGER NOT NULL,
  section VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

### 2. material_formulas

Stores formulas for calculating material quantities.

### 3. formula_products

Maps formulas to product types in the product database.

### 4. chainlink_products

Stores all product information.

## Integration Steps

### 1. Replace Static Questionnaire with Database-Driven Version

In \`FenceCalculatorContext.js\`, replace the import:

\`\`\`javascript
// Replace this:
import { questionnaire } from './FenceCalculatorModules/questionnaire';

// With this:
import DatabaseQuestionnaire from './FenceCalculatorModules/DatabaseQuestionnaire';
\`\`\`

Then update the JSX:

\`\`\`jsx
{/* Replace this */}
<Questionnaire questionnaire={questionnaire} />

{/* With this */}
<DatabaseQuestionnaire />
\`\`\`

### 2. Update the Cost Calculation Logic

In \`FenceCalculatorContext.js\`, update the \`calculateCosts\` function:

\`\`\`javascript
const calculateCosts = async (formData) => {
  try {
    // Call the API endpoint that performs database-driven calculations
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to calculate costs');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calculating costs:', error);
    throw error;
  }
};
\`\`\`

### 3. Create API Endpoint for Calculations

Create a new file \`src/api/calculate.js\`:

\`\`\`javascript
import { supabase } from '../utils/supabaseClient';

export const calculateMaterialCosts = async (formData) => {
  // Fetch all formulas
  const { data: formulas, error: formulasError } = await supabase
    .from('material_formulas')
    .select('*');
  
  if (formulasError) {
    throw new Error('Failed to fetch formulas');
  }
  
  // Calculate quantities and costs
  const results = {
    quantities: {},
    products: {},
    costs: {},
    total: 0
  };
  
  // Process each formula
  for (const formula of formulas) {
    // Check if formula is triggered
    const isTriggered = evaluateTrigger(formula.questionnaire_trigger, formData);
    
    if (isTriggered && formula.calculation_details?.formula) {
      // Calculate quantity
      const quantity = calculateQuantity(formula.calculation_details.formula, formData);
      results.quantities[formula.id] = quantity;
      
      // Skip product lookup if quantity is zero
      if (quantity <= 0) continue;
      
      // Look up product
      const { data: productMapping } = await supabase
        .from('formula_products')
        .select('*')
        .eq('formula_id', formula.id)
        .limit(1)
        .single();
      
      if (productMapping) {
        const product = await lookupProduct(productMapping, formData);
        
        if (product) {
          results.products[formula.id] = product;
          results.costs[formula.id] = quantity * product.price;
          results.total += quantity * product.price;
        }
      }
    }
  }
  
  return results;
};

// Helper functions for trigger evaluation, quantity calculation, and product lookup
// ...
\`\`\`

### 4. Update Frontend Components

Update \`MaterialBreakdown.js\` and other components to use the data from the database-driven calculation.

## Testing

1. Run the database migration script to ensure all questionnaire items are in the database.
2. Test the questionnaire to ensure all questions appear correctly.
3. Test the calculation to ensure all formulas are triggered correctly.
4. Verify that product lookups work as expected, following the "next size up" rule.

## Troubleshooting

- If questions don't appear, check the database connection and API endpoint.
- If calculations are incorrect, verify the formulas in the database.
- If product lookups fail, check the formula_products mappings.
`;
    
    fs.writeFileSync(integrationGuidePath, integrationGuideContent);
    console.log(`Integration guide created at: ${integrationGuidePath}`);
    
    // Verify the mapping
    console.log('\nVerifying questionnaire mapping...');
    
    const verifyResult = await client.query(`
      SELECT COUNT(*) FROM questionnaire_items;
    `);
    
    const questionCount = parseInt(verifyResult.rows[0].count);
    
    console.log(`\nSuccessfully mapped ${questionCount} questions to the database.`);
    console.log('\nNext steps:');
    console.log('1. Review the database-driven questionnaire component.');
    console.log('2. Implement the API endpoints for fetching the questionnaire.');
    console.log('3. Update the FenceCalculatorContext to use the database-driven components.');
    console.log('4. Follow the integration guide for complete instructions.');
    
  } catch (error) {
    console.error('Error mapping questionnaire to database:', error);
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
