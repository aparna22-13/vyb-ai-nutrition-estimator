const dummyRecipes = {
  "Paneer Butter Masala": [
    { ingredient: "Paneer", quantity: "0.75 cup cubes" },
    { ingredient: "Butter", quantity: "2 teaspoons" },
    { ingredient: "Tomato", quantity: "0.5 cup puree" },
    { ingredient: "Onion", quantity: "0.5 cup chopped" },
    { ingredient: "Cream", quantity: "1 tablespoon" }
  ],
  "Dal Tadka": [
    { ingredient: "Toor Dal", quantity: "1 cup" },
    { ingredient: "Ghee", quantity: "1 tablespoon" },
    { ingredient: "Onion", quantity: "0.5 cup chopped" },
    { ingredient: "Tomato", quantity: "0.5 cup chopped" }
  ],
  "Mushroom Curry": [
    { ingredient: "Mushroom", quantity: "300g" },
    { ingredient: "Onion", quantity: "1 cup chopped" },
    { ingredient: "Tomato", quantity: "1 cup chopped" },
    { ingredient: "Oil", quantity: "2 tablespoons" }
  ],
  "Aloo Gobi": [
    { ingredient: "Potato", quantity: "1 cup cubes" },
    { ingredient: "Cauliflower", quantity: "1.5 cups florets" },
    { ingredient: "Onion", quantity: "0.5 cup chopped" },
    { ingredient: "Oil", quantity: "1 tablespoon" }
  ],
  "Roti": [
    { ingredient: "Wheat Flour", quantity: "1 cup" },
    { ingredient: "Water", quantity: "0.5 cup" },
    { ingredient: "Oil", quantity: "1 teaspoon" }
  ],
  "Bhindi Fry": [
    { ingredient: "Okra", quantity: "1.5 cups sliced" },
    { ingredient: "Onion", quantity: "0.5 cup sliced" },
    { ingredient: "Oil", quantity: "1 tablespoon" }
  ],
  "Rajma Masala": [
    { ingredient: "Kidney Beans", quantity: "1 cup boiled" },
    { ingredient: "Onion", quantity: "1 cup chopped" },
    { ingredient: "Tomato", quantity: "1 cup chopped" },
    { ingredient: "Oil", quantity: "1 tablespoon" },
    { ingredient: "Ginger Garlic Paste", quantity: "1 tablespoon" }
  ],
  "Moong Dal Tadka": [
    { ingredient: "Moong Dal", quantity: "1 cup" },
    { ingredient: "Ghee", quantity: "1 tablespoon" },
    { ingredient: "Onion", quantity: "0.5 cup chopped" },
    { ingredient: "Tomato", quantity: "0.5 cup chopped" }
  ],
  "Dry Sabzi": [
    { ingredient: "Mixed Vegetables", quantity: "1.5 cups chopped" },
    { ingredient: "Oil", quantity: "1 tablespoon" },
    { ingredient: "Onion", quantity: "0.5 cup chopped" }
  ],
  "Wet Sabzi": [
    { ingredient: "Mixed Vegetables", quantity: "1.5 cups chopped" },
    { ingredient: "Tomato Puree", quantity: "0.5 cup" },
    { ingredient: "Cream", quantity: "1 tablespoon" },
    { ingredient: "Oil", quantity: "1 tablespoon" }
  ]
};

async function fetchRecipe(dishName) {
  if (dummyRecipes[dishName]) {
    return dummyRecipes[dishName];
  } else {
    throw new Error('Recipe not found for the given dish.');
  }
}

module.exports = { fetchRecipe };
