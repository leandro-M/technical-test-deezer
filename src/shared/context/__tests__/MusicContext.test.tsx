import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { MusicContext, MusicProvider } from '../MusicContext';

function TestComponent() {
  const { searchMusicsUseCase, getTopMusicsUseCase } = useContext(MusicContext);

  return (
    <div>
      <p data-testid="search-usecase">{searchMusicsUseCase.constructor.name}</p>
      <p data-testid="gettop-usecase">{getTopMusicsUseCase.constructor.name}</p>
    </div>
  );
}

describe('MusicProvider', () => {
  it('provides searchMusicsUseCase and getTopMusicsUseCase', () => {
    render(
      <MusicProvider>
        <TestComponent />
      </MusicProvider>,
    );

    expect(screen.getByTestId('search-usecase')).toHaveTextContent(
      'SearchMusics',
    );
    expect(screen.getByTestId('gettop-usecase')).toHaveTextContent(
      'GetTopMusics',
    );
  });
});
