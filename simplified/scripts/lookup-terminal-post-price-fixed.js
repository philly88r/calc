/**
 * Lookup Terminal Post Price (Fixed)
 * 
 * This script looks up the price of a terminal post based on the specifications
 * from the questionnaire, using the length field instead of height.
 */

const { Client } = require('pg');

// PostgreSQL connection string
const connectionString = 'postgresql://postgres:Yitbos88@db.kdhwrlhzevzekoanusbs.supabase.co:5432/postgres';

// Terminal post specifications from the questionnaire
const postSpecs = {
  material: 'Galvanized',
  diameter: '2 7/8',
  thickness: 'SCH 40',
  fenceHeight: 8,
  holeDepth: 36 / 12, // Convert to feet
  hasBarbed: false
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
    
    // Calculate required post length
    const extraHeightForBarbedWire = postSpecs.hasBarbed ? 1 : 0;
    const postHeightAboveGround = postSpecs.fenceHeight + extraHeightForBarbedWire;
    const postHoleDepthInFeet = postSpecs.holeDepth;
    const requiredLength = Math.ceil(postHeightAboveGround + postHoleDepthInFeet);
    
    console.log(`\nTerminal Post Specifications:`);
    console.log(`- Material: ${postSpecs.material}`);
    console.log(`- Diameter: ${postSpecs.diameter}`);
    console.log(`- Thickness: ${postSpecs.thickness}`);
    console.log(`- Fence Height: ${postSpecs.fenceHeight} feet`);
    console.log(`- Hole Depth: ${postSpecs.holeDepth} feet`);
    console.log(`- Has Barbed Wire: ${postSpecs.hasBarbed}`);
    console.log(`- Required Post Length: ${requiredLength} feet`);
    
    // Look up the post price in the chainlink_products table
    // First try exact match on Galvanized
    const postResult = await client.query(`
      SELECT *
      FROM chainlink_products
      WHERE 
        type = 'post' AND
        (LOWER(material) = LOWER($1) OR LOWER(material) LIKE '%galv%') AND
        diameter = $2 AND
        thickness = $3 AND
        CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS INTEGER) >= $4
      ORDER BY CAST(SUBSTRING(length, 1, POSITION('ft' in length) - 1) AS INTEGER) ASC
      LIMIT 1;
    `, [
      postSpecs.material,
      postSpecs.diameter,
      postSpecs.thickness,
      requiredLength
    ]);
    
    if (postResult.rows.length === 0) {
      console.log('\nNo matching terminal post found in the database.');
      
      // Try a more flexible search
      console.log('\nTrying a more flexible search...');
      const flexibleResult = await client.query(`
        SELECT *
        FROM chainlink_products
        WHERE 
          type = 'post' AND
          diameter = $1 AND
          length IS NOT NULL
        ORDER BY id
        LIMIT 10;
      `, [postSpecs.diameter]);
      
      if (flexibleResult.rows.length > 0) {
        console.log('\nAvailable posts with similar specifications:');
        flexibleResult.rows.forEach(row => {
          console.log(`- ${row.material} ${row.diameter} ${row.thickness} ${row.length}: $${row.price} (SKU: ${row.sku})`);
        });
      }
    } else {
      const post = postResult.rows[0];
      console.log(`\nFound matching terminal post:`);
      console.log(`- SKU: ${post.sku}`);
      console.log(`- Description: ${post.material} ${post.diameter} ${post.thickness} ${post.length} post`);
      console.log(`- Price: $${post.price}`);
      
      // Look up associated hardware
      console.log(`\nAssociated hardware for one terminal post:`);
      
      // Dome cap
      const domeCapResult = await client.query(`
        SELECT *
        FROM chainlink_products
        WHERE 
          type = 'dome_cap' AND
          (LOWER(material) = LOWER($1) OR LOWER(material) LIKE '%galv%') AND
          diameter = $2
        LIMIT 1;
      `, [postSpecs.material, postSpecs.diameter]);
      
      if (domeCapResult.rows.length > 0) {
        const domeCap = domeCapResult.rows[0];
        console.log(`- Dome Cap: $${domeCap.price} (SKU: ${domeCap.sku})`);
      }
      
      // Tension bands (based on fence height)
      const tensionBandsCount = Math.ceil(postSpecs.fenceHeight);
      const tensionBandResult = await client.query(`
        SELECT *
        FROM chainlink_products
        WHERE 
          type = 'tension_band' AND
          (LOWER(material) = LOWER($1) OR LOWER(material) LIKE '%galv%') AND
          diameter = $2
        LIMIT 1;
      `, [postSpecs.material, postSpecs.diameter]);
      
      if (tensionBandResult.rows.length > 0) {
        const tensionBand = tensionBandResult.rows[0];
        console.log(`- Tension Bands: ${tensionBandsCount} × $${tensionBand.price} = $${(tensionBandsCount * tensionBand.price).toFixed(2)} (SKU: ${tensionBand.sku})`);
      }
      
      // Brace bands
      const braceBandsCount = 1; // One for top rail
      const braceBandResult = await client.query(`
        SELECT *
        FROM chainlink_products
        WHERE 
          type = 'brace_band' AND
          (LOWER(material) = LOWER($1) OR LOWER(material) LIKE '%galv%') AND
          diameter = $2
        LIMIT 1;
      `, [postSpecs.material, postSpecs.diameter]);
      
      if (braceBandResult.rows.length > 0) {
        const braceBand = braceBandResult.rows[0];
        console.log(`- Brace Bands: ${braceBandsCount} × $${braceBand.price} = $${(braceBandsCount * braceBand.price).toFixed(2)} (SKU: ${braceBand.sku})`);
      }
      
      // Calculate total cost for one terminal post with hardware
      let totalCost = post.price;
      
      if (domeCapResult.rows.length > 0) {
        totalCost += domeCapResult.rows[0].price;
      }
      
      if (tensionBandResult.rows.length > 0) {
        totalCost += tensionBandsCount * tensionBandResult.rows[0].price;
      }
      
      if (braceBandResult.rows.length > 0) {
        totalCost += braceBandsCount * braceBandResult.rows[0].price;
      }
      
      console.log(`\nTotal cost for one terminal post with hardware: $${totalCost.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error('Error looking up terminal post price:', error);
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
