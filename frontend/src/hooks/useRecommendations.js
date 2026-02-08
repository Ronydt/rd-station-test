// useRecommendations.js

import getRecommendationsFromService from '../services/recommendation.service';

function useRecommendations(products) {
  // const [recommendations, setRecommendations] = useState([]); //
  // Código antigo -> O estado `recommendations` não era utilizado no fluxo do formulário,
  // pois o cálculo passou a ser feito de forma síncrona via retorno do service.

  const getRecommendations = (formData) => {
    return getRecommendationsFromService(formData, products); // Corrigido para evitar erro de execução causado por incompatibilidade de import/export.
  };

  // return { recommendations, getRecommendations, setRecommendations }; // Código antigo ->
  return { getRecommendations };
}

export default useRecommendations;
