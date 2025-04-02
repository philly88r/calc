/**
 * Simple Post Lookup
 * 
 * This script looks up posts with specific criteria.
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
    
    // Find posts with 2 7/8 diameter and SCH 40 thickness
    console.log('\nPosts with 2 7/8 diameter and SCH 40 thickness:');
    const result = await client.query(`
      SELECT id, sku, material, diameter, thickness, length, price
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        diameter = '2 7/8' AND
        thickness = 'SCH 40'
      ORDER BY 
        CASE 
          WHEN length LIKE '%ft%' 
          THEN CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) 
          ELSE 0 
        END;
    `);
    
    if (result.rows.length === 0) {
      console.log('No matching posts found.');
    } else {
      result.rows.forEach(post => {
        console.log(`- ${post.material} ${post.diameter} ${post.thickness} ${post.length}: $${post.price} (SKU: ${post.sku})`);
      });
      
      // Find post with length >= 11ft
      const requiredLength = 11;
      const suitablePosts = result.rows.filter(post => {
        if (!post.length || !post.length.includes('ft')) return false;
        const lengthValue = parseFloat(post.length.substring(0, post.length.indexOf('ft')));
        return lengthValue >= requiredLength;
      });
      
      if (suitablePosts.length > 0) {
        const bestMatch = suitablePosts[0];
        console.log(`\nBest match for terminal post (>= ${requiredLength}ft):`);
        console.log(`- ${bestMatch.material} ${bestMatch.diameter} ${bestMatch.thickness} ${bestMatch.length}: $${bestMatch.price} (SKU: ${bestMatch.sku})`);
      } else {
        console.log(`\nNo posts found with length >= ${requiredLength}ft`);
      }
    }
    
  } catch (error) {
    console.error('Error looking up posts:', error);
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
