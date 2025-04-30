const fs = require('fs');
const csv = require('csvtojson');

csv()
  .fromFile('src/data/nutrition_database.csv') // Make sure the file name and path are correct
  .then(json => {
    fs.writeFileSync('src/data/nutritionDatabase.json', JSON.stringify(json, null, 2));
    console.log("✅ CSV converted to JSON and saved to src/data/nutritionDatabase.json");
  });
