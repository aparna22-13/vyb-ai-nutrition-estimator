async function calculateNutrition(mappedIngredients) {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
  
    for (const item of mappedIngredients) {
      const factor = item.grams / 100;
      totalCalories += item.nutritionPer100g.calories * factor;
      totalProtein += item.nutritionPer100g.protein * factor;
      totalCarbs += item.nutritionPer100g.carbs * factor;
      totalFat += item.nutritionPer100g.fat * factor;
    }
  
    // Assume total recipe is 800g cooked
    // Standard serving is 180g for Wet Sabzi
    const scaleFactor = 180 / 800;
  
    return {
      calories: Math.round(totalCalories * scaleFactor),
      protein: Math.round(totalProtein * scaleFactor),
      carbs: Math.round(totalCarbs * scaleFactor),
      fat: Math.round(totalFat * scaleFactor)
    };
  }
  
  module.exports = { calculateNutrition };
  