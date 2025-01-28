import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FavoritesProvider } from '../../context/FavoritesContext';
import { useFavorites } from '../useFavorites';
import { Music } from '../../../domain/entities/Music';

const mockMusic: Music = {
  id: 1,
  title: 'Mock Song',
  artist: 'Mock Artist',
  albumCover: '',
  previewUrl: '',
  duration: 100,
  deezerLink: '',
};

function TestComponent() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button data-testid="add-button" onClick={() => addFavorite(mockMusic)}>
        Add
      </button>
      <button
        data-testid="remove-button"
        onClick={() => removeFavorite(mockMusic.id)}
      >
        Remove
      </button>
      <button
        data-testid="check-button"
        onClick={() => alert(isFavorite(mockMusic.id))}
      >
        Check
      </button>
    </div>
  );
}

describe('useFavorites hook', () => {
  it('throws an error if used outside of FavoritesProvider', () => {
    function TestWithoutProvider() {
      useFavorites();
      return null;
    }

    expect(() => render(<TestWithoutProvider />)).toThrow(
      'useFavorites must be used within an FavoritesContext',
    );
  });

  it('can add and remove favorites', async () => {
    localStorage.clear();
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count').textContent).toBe('0');
    await user.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('favorites-count').textContent).toBe('1');

    await user.click(screen.getByTestId('remove-button'));
    expect(screen.getByTestId('favorites-count').textContent).toBe('0');
  });

  it('returns context if used inside FavoritesProvider', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toBeInTheDocument();
  });
});
