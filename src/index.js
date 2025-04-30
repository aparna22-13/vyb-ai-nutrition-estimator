const { fetchRecipe } = require('./fetchRecipe');
const { mapIngredients }  = require('./mapIngredients');
const { classifyDish } = require('./classifyDish');
const readline = require('readline');

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

async function main(dishName) {
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

        console.log("\n✅ Nutrition Estimate:");
        console.log(JSON.stringify(output, null, 2));
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🧠 Welcome to VYB AI Dish Nutrition Estimator!");

rl.question('🍽️ Enter a dish name to estimate its nutrition: ', (dishName) => {
    main(dishName.trim());
    rl.close();
});
