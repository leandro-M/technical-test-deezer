import { render, screen } from '@testing-library/react';

import { MusicProvider } from '../../context/MusicContext';
import { useMusic } from '../useMusic';

function TestComponent() {
  const { searchMusicsUseCase, getTopMusicsUseCase } = useMusic();

  return (
    <div>
      <p data-testid="search-usecase">{searchMusicsUseCase.constructor.name}</p>
      <p data-testid="gettop-usecase">{getTopMusicsUseCase.constructor.name}</p>
    </div>
  );
}

describe('useMusic hook', () => {
  it('returns the music context objects', () => {
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
