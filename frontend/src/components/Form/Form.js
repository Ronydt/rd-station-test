// Form.js

import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ onUpdateRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  // const { getRecommendations, recommendations } = useRecommendations(products); // Código antigo -> Removido porque `recommendations` não refletia o resultado atualizado do submit atual.
  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);

    // const finalRecommendations =
    //   dataRecommendations.length > 0
    //     ? dataRecommendations
    //     : recommendations;

    // onUpdateRecommendations(finalRecommendations); // Estava usando assim apenas para satisfazer o Lint, ou seja, estava apenas maquiando o uso do "recommendations"

    onUpdateRecommendations(dataRecommendations);
    // Novo fluxo -> Utiliza diretamente o retorno do service para garantir que as recomendações correspondam exatamente aos dados submetidos.
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
