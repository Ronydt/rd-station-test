
function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2 border border-black/15 rounded-lg px-6 py-8 font-semibold hover:bg-zinc-100 transition-colors cursor-pointer">
            {recommendation.name}
            <p className="text-zinc-500 text-sm font-normal">{recommendation.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
