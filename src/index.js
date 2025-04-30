const express = require('express');
const { fetchRecipe } = require('./fetchRecipe');
const { mapIngredients } = require('./mapIngredients');
const { classifyDish } = require('./classifyDish');

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

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // For parsing JSON bodies

// Define the root route ("/")
app.get('/', (req, res) => {
    res.send("🧠 Welcome to VYB AI Dish Nutrition Estimator!");
});

// Define the POST route to estimate nutrition
app.post('/estimate', async (req, res) => {
    const { dishName } = req.body;

    if (!dishName) {
        return res.status(400).json({ error: "Dish name is required" });
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

        res.json(output);  // Respond with the nutrition estimate
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
