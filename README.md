
# 🍽️ VYB AI Dish Nutrition Estimator

## 📘 Introduction

This tool estimates the nutritional value of Indian home-cooked dishes using a modular Node.js pipeline. It maps recipe ingredients to a nutrition database, standardizes quantities, and calculates nutrition per standard serving.

---

## ✅ Assumptions Made

- Recipes are assumed to serve 3–4 people unless otherwise noted.
- Ingredient weights are estimated using common household measurements (e.g., 1 cup = 200g).
- If no match is found in the nutrition database, the system skips the ingredient and logs a warning.
- Dish type classification is based on predefined categories: Wet Sabzi, Dry Sabzi, Dal, Non-Veg Curry, etc.
- Full dish weight is distributed proportionally to calculate nutrition per standard serving (e.g., 1 katori = 180g for Wet Sabzi).

---

## 🧩 Modularization Approach

1. **Recipe Fetching** - Simulated (or can be fetched using an API/LLM).
2. **Ingredient Normalization** - Cleans up and standardizes ingredient names.
3. **Measurement Standardization** - Converts cups, spoons, etc., to grams using a conversion map.
4. **Nutrition Mapping** - Maps ingredients to the IFCT-2017-derived nutrition database.
5. **Calculation Engine** - Computes total nutrition using sum-product of quantity and nutrition per 100g.
6. **Serving Adjustment** - Divides total nutrition by estimated number of servings based on dish type.
7. **Graceful Failure Handling** - Skips unknown ingredients, logs warnings, and avoids crashing.

---

## 🧪 Input/Output Examples

### 1. Input: `Paneer Butter Masala`
```json
{
  "estimated_nutrition_per_200ml_katori": {
    "calories": 280,
    "protein": 12,
    "carbs": 10,
    "fat": 18
  },
  "dish_type": "Wet Sabzi",
  "ingredients_used": [
    { "ingredient": "Paneer", "quantity": "0.75 cup cubes" },
    { "ingredient": "Butter", "quantity": "2 teaspoons" },
    { "ingredient": "Tomato", "quantity": "0.5 cup puree" },
    { "ingredient": "Onion", "quantity": "0.5 cup chopped" },
    { "ingredient": "Cream", "quantity": "1 tablespoon" }
  ]
}
```

### 2. Input: `Rajma Masala`
```json
{
  "estimated_nutrition_per_200ml_katori": {
    "calories": 210,
    "protein": 13,
    "carbs": 25,
    "fat": 6
  },
  "dish_type": "Dal",
  "ingredients_used": [
    { "ingredient": "Rajma", "quantity": "1 cup boiled" },
    { "ingredient": "Onion", "quantity": "1 medium" },
    { "ingredient": "Tomato", "quantity": "1 medium" },
    { "ingredient": "Oil", "quantity": "1 tablespoon" }
  ]
}
```

### 3. Input: `Mushroom Curry`
```json
{
  "estimated_nutrition_per_200ml_katori": {
    "calories": 300,
    "protein": 25,
    "carbs": 5,
    "fat": 20
  },
  "dish_type": "Veg Curry",
  "ingredients_used": [
    { "ingredient": "Mushroom", "quantity": "200g" },
    { "ingredient": "Oil", "quantity": "2 tablespoons" },
    { "ingredient": "Onion", "quantity": "1 medium" },
    { "ingredient": "Tomato", "quantity": "1 medium" }
  ]
}
```

### 4. Input: `Bhindi Fry`
```json
{
  "estimated_nutrition_per_200ml_katori": {
    "calories": 150,
    "protein": 4,
    "carbs": 12,
    "fat": 10
  },
  "dish_type": "Dry Sabzi",
  "ingredients_used": [
    { "ingredient": "Bhindi", "quantity": "1 cup chopped" },
    { "ingredient": "Oil", "quantity": "1 tablespoon" },
    { "ingredient": "Onion", "quantity": "1 small" }
  ]
}
```

### 5. Input: `Moong Dal Tadka`
```json
{
  "estimated_nutrition_per_200ml_katori": {
    "calories": 180,
    "protein": 10,
    "carbs": 20,
    "fat": 6
  },
  "dish_type": "Dal",
  "ingredients_used": [
    { "ingredient": "Moong Dal", "quantity": "0.5 cup boiled" },
    { "ingredient": "Ghee", "quantity": "1 teaspoon" },
    { "ingredient": "Onion", "quantity": "0.25 cup chopped" },
    { "ingredient": "Tomato", "quantity": "0.25 cup chopped" }
  ]
}
```

---

## 🚀 How to Run

```bash
npm install
npm start
```

Enter dish names when prompted to get the nutrition estimate.

---

## 🧠 Project Vision

This project aims to power a smart Indian health assistant that can estimate dish-wise nutrition for Indian households using an AI-driven approach. Join us in making nutrition personalized and intelligent. 💡
