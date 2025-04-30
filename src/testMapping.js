const mapIngredients = require('./mapIngredients');

const sampleIngredients = [
  { ingredient: "Paneer", grams: 200 },
  { ingredient: "Butter", grams: 10 },
  { ingredient: "Tomato", grams: 100 },
  { ingredient: "Onion", grams: 100 },
  { ingredient: "Cream", grams: 30 }
];

const mapped = mapIngredients(sampleIngredients);

console.log("✅ Mapped Ingredients with Nutrition Info:\n");
console.log(JSON.stringify(mapped, null, 2));
