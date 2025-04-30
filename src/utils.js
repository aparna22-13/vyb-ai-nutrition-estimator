const householdMeasurements = require('./data/householdMeasurements.json');

function getApproximateGram(quantityString) {
  // Very simple rule based
  const lower = quantityString.toLowerCase();
  
  if (lower.includes('cup')) return 200;
  if (lower.includes('tablespoon')) return 15;
  if (lower.includes('teaspoon')) return 5;
  if (lower.includes('g')) {
    const num = parseInt(lower);
    return isNaN(num) ? 50 : num;
  }

  return 50; // default fallback
}

module.exports = { getApproximateGram };
