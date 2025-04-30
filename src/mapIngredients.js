// src/utils/mapIngredients.js

const nutritionData = require('./data/nutritionDatabase.json');

// Manual mapping (common names => database food names)
const manualMapping = {
  paneer: "Cottage cheese",
  butter: "Butter, unsalted",
  tomato: "Tomato, ripe, raw",
  onion: "Onion, stalk (Allium cepa)", // your database name
  cream: "Milk cream",
  okra: "Okra, raw",
  oil: "Vegetable oil"
};

// Utility to normalize strings
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Guess grams if missing
function estimateGrams(item) {
  const quantity = (item.quantity || "").toLowerCase();

  if (quantity.includes('cup')) return 120;
  if (quantity.includes('tablespoon')) return 15;
  if (quantity.includes('teaspoon')) return 5;

  return 100; // default fallback
}

// Find best matching database entry
function findBestMatch(ingredientName) {
  const normName = normalize(ingredientName);
  let bestMatch = null;
  let highestScore = 0;

  for (const item of nutritionData) {
    const candidate = normalize(item.food_name || item["food_item"] || '');

    // Exact match first
    if (candidate === normName) {
      return item;
    }

    // Partial match scoring
    let score = 0;
    if (candidate.includes(normName)) score += 2;
    if (normName.includes(candidate)) score += 1;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

// Main mapping function
function mapIngredients(ingredientListWithGrams) {
  return ingredientListWithGrams.map(item => {
    const originalName = item.ingredient.toLowerCase().trim();
    
    // Apply manual mapping if available
    const mappedName = manualMapping[originalName] || item.ingredient;

    // Find matching food item
    const match = findBestMatch(mappedName);

    if (!match) {
      console.warn(`⚠️ Ingredient not found in database: ${item.ingredient}`);
      return {
        ...item,
        nutritionPer100g: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        },
        totalNutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      };
    }

    // Parse nutrition safely
    const nutritionPer100g = {
      calories: parseFloat(match.energy_kcal) || 0,
      protein: parseFloat(match.protein_g) || 0,
      carbs: parseFloat(match.carb_g) || 0,
      fat: parseFloat(match.fat_g) || 0
    };

    // Estimate grams if not given
    const grams = item.grams || estimateGrams(item);
    const factor = grams / 100;

    const totalNutrition = {
      calories: +(nutritionPer100g.calories * factor).toFixed(2),
      protein: +(nutritionPer100g.protein * factor).toFixed(2),
      carbs: +(nutritionPer100g.carbs * factor).toFixed(2),
      fat: +(nutritionPer100g.fat * factor).toFixed(2)
    };

    return {
      ...item,
      mappedTo: mappedName, // for debugging which item it got mapped to
      nutritionPer100g,
      totalNutrition
    };
  });
}

module.exports = { mapIngredients };
