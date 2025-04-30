const dishCategories = require('./data/dishCategories.json');

async function classifyDish(dishName) {
  const normalizedInput = dishName.trim().toLowerCase();

  for (const category of Object.keys(dishCategories)) {
    const dishes = dishCategories[category];
    for (const dish of dishes) {
      if (dish.trim().toLowerCase() === normalizedInput) {
        return category;
      }
    }
  }

  return "Unknown";
}

module.exports = { classifyDish };
