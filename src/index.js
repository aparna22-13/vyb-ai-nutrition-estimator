const express = require('express');
const { fetchRecipe } = require('./fetchRecipe');
const { mapIngredients } = require('./mapIngredients');
const { classifyDish } = require('./classifyDish');

const app = express();
const PORT = process.env.PORT || 3000;

function calculateNutrition(mappedIngredients) {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;

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

app.get('/estimate', async (req, res) => {
    const dishName = req.query.dish;

    if (!dishName) {
        return res.status(400).json({ error: "Dish name is required as a query param (?dish=poha)" });
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
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send("🧠 Welcome to VYB AI Dish Nutrition Estimator! Use /estimate?dish=poha to get data.");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
