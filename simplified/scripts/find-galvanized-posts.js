/**
 * Find Galvanized Posts
 * 
 * This script finds all Galvanized posts in the database to determine
 * the appropriate size for a terminal post.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Required specifications
const requiredSpecs = {
  diameter: '2 7/8',
  thickness: 'SCH 40',
  minLength: 11 // feet
};

async function main() {
  const client = new Client({
    connectionString
  });
  
  try {
    // Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Find all Galvanized posts
    console.log('\nAll Galvanized posts:');
    const galvPostsResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        (LOWER(material) LIKE '%galv%' OR LOWER(material) = 'galvanized')
      ORDER BY diameter, thickness, length;
    `);
    
    if (galvPostsResult.rows.length === 0) {
      console.log('No Galvanized posts found in the database.');
    } else {
      galvPostsResult.rows.forEach(post => {
        console.log(`- ${post.material} ${post.diameter} ${post.thickness} ${post.length}: $${post.price} (SKU: ${post.sku})`);
      });
    }
    
    // Find Galvanized posts with specific diameter
    console.log(`\nGalvanized posts with ${requiredSpecs.diameter} diameter:`);
    const specificGalvPostsResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        (LOWER(material) LIKE '%galv%' OR LOWER(material) = 'galvanized') AND
        diameter = $1
      ORDER BY thickness, 
               CASE 
                 WHEN length LIKE '%ft%' 
                 THEN CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) 
                 ELSE 0 
               END;
    `, [requiredSpecs.diameter]);
    
    if (specificGalvPostsResult.rows.length === 0) {
      console.log(`No Galvanized posts with ${requiredSpecs.diameter} diameter found.`);
    } else {
      specificGalvPostsResult.rows.forEach(post => {
        console.log(`- ${post.material} ${post.diameter} ${post.thickness} ${post.length}: $${post.price} (SKU: ${post.sku})`);
      });
    }
    
    // Find posts with specific diameter and thickness (any material)
    console.log(`\nAll posts with ${requiredSpecs.diameter} diameter and ${requiredSpecs.thickness} thickness:`);
    const specificPostsResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        diameter = $1 AND
        thickness = $2
      ORDER BY material, 
               CASE 
                 WHEN length LIKE '%ft%' 
                 THEN CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) 
                 ELSE 0 
               END;
    `, [requiredSpecs.diameter, requiredSpecs.thickness]);
    
    if (specificPostsResult.rows.length === 0) {
      console.log(`No posts with ${requiredSpecs.diameter} diameter and ${requiredSpecs.thickness} thickness found.`);
    } else {
      specificPostsResult.rows.forEach(post => {
        const lengthStr = post.length || 'unknown length';
        const lengthValue = lengthStr.includes('ft') 
          ? parseFloat(lengthStr.substring(0, lengthStr.indexOf('ft'))) 
          : 0;
        
        console.log(`- ${post.material} ${post.diameter} ${post.thickness} ${lengthStr}: $${post.price} (SKU: ${post.sku})${lengthValue >= requiredSpecs.minLength ? ' ✓' : ''}`);
      });
    }
    
    // Find the best match - next size up from required length
    console.log(`\nBest match for ${requiredSpecs.diameter} ${requiredSpecs.thickness} post >= ${requiredSpecs.minLength}ft:`);
    
    // First try Galvanized
    const bestGalvMatchResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        (LOWER(material) LIKE '%galv%' OR LOWER(material) = 'galvanized') AND
        diameter = $1 AND
        thickness = $2 AND
        length LIKE '%ft%' AND
        CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) >= $3
      ORDER BY CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) ASC
      LIMIT 1;
    `, [requiredSpecs.diameter, requiredSpecs.thickness, requiredSpecs.minLength]);
    
    // If no Galvanized match, try any material
    if (bestGalvMatchResult.rows.length === 0) {
      console.log('No matching Galvanized post found. Checking any material...');
      
      const bestAnyMatchResult = await client.query(`
        SELECT *
        FROM chainlink_products
        WHERE 
          type = 'post' AND
          diameter = $1 AND
          thickness = $2 AND
          length LIKE '%ft%' AND
          CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) >= $3
        ORDER BY CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS NUMERIC) ASC
        LIMIT 1;
      `, [requiredSpecs.diameter, requiredSpecs.thickness, requiredSpecs.minLength]);
      
      if (bestAnyMatchResult.rows.length === 0) {
        console.log('No matching post found with the required specifications.');
      } else {
        const bestMatch = bestAnyMatchResult.rows[0];
        console.log(`Best match: ${bestMatch.material} ${bestMatch.diameter} ${bestMatch.thickness} ${bestMatch.length}: $${bestMatch.price} (SKU: ${bestMatch.sku})`);
        
        // Calculate the total cost with hardware
        await calculateTotalCost(client, bestMatch);
      }
    } else {
      const bestMatch = bestGalvMatchResult.rows[0];
      console.log(`Best match: ${bestMatch.material} ${bestMatch.diameter} ${bestMatch.thickness} ${bestMatch.length}: $${bestMatch.price} (SKU: ${bestMatch.sku})`);
      
      // Calculate the total cost with hardware
      await calculateTotalCost(client, bestMatch);
    }
    
  } catch (error) {
    console.error('Error finding Galvanized posts:', error);
  } finally {
    // Close the PostgreSQL connection
    await client.end();
    console.log('\nPostgreSQL connection closed');
  }
}

// Calculate the total cost of a post with hardware
async function calculateTotalCost(client, post) {
  try {
    const fenceHeight = 8; // feet
    
    // Look up associated hardware
    console.log(`\nAssociated hardware for one terminal post:`);
    
    // Dome cap
    const domeCapResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'dome_cap' AND
        (LOWER(material) LIKE '%${post.material.toLowerCase()}%') AND
        diameter = $1
      LIMIT 1;
    `, [post.diameter]);
    
    let totalCost = post.price;
    
    if (domeCapResult.rows.length > 0) {
      const domeCap = domeCapResult.rows[0];
      console.log(`- Dome Cap: $${domeCap.price} (SKU: ${domeCap.sku})`);
      totalCost += domeCap.price;
    } else {
      console.log('- Dome Cap: Not found');
    }
    
    // Tension bands (based on fence height)
    const tensionBandsCount = Math.ceil(fenceHeight);
    const tensionBandResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'tension_band' AND
        (LOWER(material) LIKE '%${post.material.toLowerCase()}%') AND
        diameter = $1
      LIMIT 1;
    `, [post.diameter]);
    
    if (tensionBandResult.rows.length > 0) {
      const tensionBand = tensionBandResult.rows[0];
      console.log(`- Tension Bands: ${tensionBandsCount} × $${tensionBand.price} = $${(tensionBandsCount * tensionBand.price).toFixed(2)} (SKU: ${tensionBand.sku})`);
      totalCost += tensionBandsCount * tensionBand.price;
    } else {
      console.log('- Tension Bands: Not found');
    }
    
    // Brace bands
    const braceBandsCount = 1; // One for top rail
    const braceBandResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'brace_band' AND
        (LOWER(material) LIKE '%${post.material.toLowerCase()}%') AND
        diameter = $1
      LIMIT 1;
    `, [post.diameter]);
    
    if (braceBandResult.rows.length > 0) {
      const braceBand = braceBandResult.rows[0];
      console.log(`- Brace Bands: ${braceBandsCount} × $${braceBand.price} = $${(braceBandsCount * braceBand.price).toFixed(2)} (SKU: ${braceBand.sku})`);
      totalCost += braceBandsCount * braceBand.price;
    } else {
      console.log('- Brace Bands: Not found');
    }
    
    console.log(`\nTotal cost for one terminal post with hardware: $${totalCost.toFixed(2)}`);
  } catch (error) {
    console.error('Error calculating total cost:', error);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
});
