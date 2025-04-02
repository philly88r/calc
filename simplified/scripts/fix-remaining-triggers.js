/**
 * Fix Remaining Triggers
 * 
 * This script fixes the remaining triggers with "user" in them.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Define remaining triggers to fix
const remainingTriggers = [
  { id: 'duckbill_posts', trigger: 'hasDuckbillGateStop' },
  { id: 'flanged_posts_centered', trigger: 'numberOfFlangedPosts > 0' },
  { id: 'flanged_posts_off_centered', trigger: 'numberOfFlangedPostsOffCentered > 0' }
];

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Update remaining triggers
    console.log('\nUpdating remaining triggers...');
    
    for (const trigger of remainingTriggers) {
      const result = await client.query(`
        UPDATE material_formulas
        SET 
          questionnaire_trigger = $1,
          updated_at = NOW()
        WHERE id = $2;
      `, [trigger.trigger, trigger.id]);
      
      if (result.rowCount > 0) {
        console.log(`Updated trigger for ${trigger.id}: ${trigger.trigger}`);
      } else {
        console.log(`Formula not found: ${trigger.id}`);
      }
    }
    
    // Verify the update
    console.log('\nVerifying triggers...');
    
    const verifyResult = await client.query(`
      SELECT id, name, questionnaire_trigger
      FROM material_formulas
      WHERE questionnaire_trigger LIKE '%user%'
      ORDER BY id;
    `);
    
    if (verifyResult.rows.length === 0) {
      console.log('No more triggers with "user" in them.');
    } else {
      console.log(`Found ${verifyResult.rows.length} triggers with "user" in them:`);
      verifyResult.rows.forEach(row => {
        console.log(`- ${row.id}: ${row.questionnaire_trigger}`);
      });
    }
    
  } catch (error) {
    console.error('Error fixing remaining triggers:', error);
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
