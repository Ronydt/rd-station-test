// getRecommendations.js

const countMatches = (selected = [], productItems = []) =>
  selected.filter((item) => productItems.includes(item)).length;

const calculateScore = (product, { preferences, features }) =>
  countMatches(preferences, product.preferences) +
  countMatches(features, product.features);

const rankedProducts = (products, formData) => {
  const { selectedPreferences = [], selectedFeatures = [] } = formData;

  return products
    .map((product) => ({
      ...product,
      score: calculateScore(product, {
        preferences: selectedPreferences,
        features: selectedFeatures,
      }),
    }))
    .filter((product) => product.score > 0)
    .sort((a, b) => b.score - a.score);
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  // if (!products?.length) return [];
  if (!products || !products.length) return [];

  const rankedProductsList = rankedProducts(products, formData);
  if (!rankedProductsList.length) return [];

  if (formData.selectedRecommendationType === 'SingleProduct') {
    return [rankedProductsList[0]];
  }

  return rankedProductsList;
};

export default getRecommendations;
