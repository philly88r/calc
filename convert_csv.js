const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'Downloads', 'Untitled spreadsheet - Sheet4 (1).csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('const gateData = [');
    results.forEach((row, index) => {
      const entry = `  {
    id: "${row.id || ''}",
    itemNumber: "${row.sku || ''}",
    name: "${row.name || ''}",
    category: "${row.product_category || 'Gates'}",
    height: "${row.variant_option_one_value || ''}",
    width: "${row.variant_option_two_value || ''}",
    cost: ${row.cost || 0},
    price: ${row.price || 0}
  }${index < results.length - 1 ? ',' : ''}`;
      console.log(entry);
    });
    console.log('];');
    console.log('\nexport default gateData;');
  });
