// getRecommendations.js

const countMatches = (selected = [], productItems = []) =>
  selected.filter((item) => productItems.includes(item)).length;

const calculateScore = (product, { preferences, features }) =>
  countMatches(preferences, product.preferences) +
  countMatches(features, product.features);

const rankedProducts = (products, formData) => {
  const { selectedPreferences = [], selectedFeatures = [] } = formData;

  return products
    .map((product, index) => ({
      ...product,
      score: calculateScore(product, {
        preferences: selectedPreferences,
        features: selectedFeatures,
      }),
      originalIndex: index, // usado apenas para desempate
    }))
    .filter((product) => product.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // critério do README: último produto vence em empate
      return b.originalIndex - a.originalIndex;
    })
    .map(({ originalIndex, ...product }) => product);
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  // if (!products?.length) return []; // Forma simplificada
  if (!products || !products.length) return [];

  const rankedProductsList = rankedProducts(products, formData);
  if (!rankedProductsList.length) return [];

  if (formData.selectedRecommendationType === 'SingleProduct') {
    return [rankedProductsList[0]];
  }

  return rankedProductsList;
};

export default  getRecommendations;
