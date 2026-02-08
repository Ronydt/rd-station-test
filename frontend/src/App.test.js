import { render, screen } from '@testing-library/react';
import App from './App';

import mockFormOptions from './mocks/mockFormOptions';
import mockRecommendations from './mocks/mockRecommendations';

//Teste antigo -> O teste original era apenas um boilerplate do template React e não cobria nenhum critério de aceite do desafio técnico, então substituí por testes alinhados ao README.

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Fim do Teste antigo.

jest.mock('./hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: mockFormOptions.preferences,
    features: mockFormOptions.features,
    isLoading: false,
  }),
}));

jest.mock('./hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    getRecommendations: jest.fn(() => mockRecommendations),
  }),
}));

describe('App', () => {
  it('Renderiza o título principal da aplicação', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /recomendador de produtos rd station/i,
      })
    ).toBeInTheDocument();
  });

  it('Renderiza as seções do formulário', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /preferências/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /funcionalidades/i })
    ).toBeInTheDocument();
  });

  it('Exibe o estado inicial sem recomendações', () => {
    render(<App />);

    expect(
      screen.getByText(/nenhuma recomendação encontrada/i)
    ).toBeInTheDocument();
  });
});
