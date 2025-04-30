const express = require('express');
const path = require('path');
const { fetchRecipe } = require('./fetchRecipe');
const { mapIngredients } = require('./mapIngredients');
const { classifyDish } = require('./classifyDish');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, JS, etc.) from the 'public' folder
app.use(express.static('public'));

// API to get nutrition estimate for a dish
app.get('/estimate', async (req, res) => {
  const dishName = req.query.dish;

  if (!dishName) {
    return res.status(400).json({ error: 'Dish name is required' });
  }

  try {
    const recipe = await fetchRecipe(dishName);
    const mappedIngredients = await mapIngredients(recipe);
    const nutritionData = calculateNutrition(mappedIngredients);
    const dishType = await classifyDish(dishName);

    const output = {
      estimated_nutrition_per_200ml_katori: nutritionData,
      dish_type: dishType,
      ingredients_used: mappedIngredients
    };

    res.json(output);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get nutrition data' });
  }
});

// Serve index.html on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 💡 Utility function to calculate overall nutrition safely
function calculateNutrition(mappedIngredients) {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    for (const item of mappedIngredients) {
        const nut = item.totalNutrition || {};
        totalCalories += nut.calories || 0;
        totalProtein += nut.protein || 0;
        totalCarbs += nut.carbs || 0;
        totalFat += nut.fat || 0;
    }

    return {
        calories: parseFloat(totalCalories.toFixed(2)),
        protein: parseFloat(totalProtein.toFixed(2)),
        carbs: parseFloat(totalCarbs.toFixed(2)),
        fat: parseFloat(totalFat.toFixed(2))
    };
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
