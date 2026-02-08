import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: ['Automação', 'CRM'],
    features: ['Relatórios', 'Integrações'],
  }),
}));

describe('Form', () => {
  it('Renderiza as seções do formulário', () => {
    render(<Form onUpdateRecommendations={jest.fn()} />);

    expect(screen.getByText(/preferências/i)).toBeInTheDocument();
    expect(screen.getByText(/funcionalidades/i)).toBeInTheDocument();
  });

  it('Submete o formulário e chama o callback de atualização de recomendações', () => {
  const onUpdateRecommendations = jest.fn();

  render(<Form onUpdateRecommendations={onUpdateRecommendations} />);

  fireEvent.click(
    screen.getByRole('button', { name: /obter recomendação/i })
  );

  expect(onUpdateRecommendations).toHaveBeenCalled();
});
});
