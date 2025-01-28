import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FavoritesContext, FavoritesProvider } from '../FavoritesContext';
import { Music } from '../../../domain/entities/Music';

const mockMusic: Music = {
  id: 1,
  title: 'Mock Song',
  artist: 'Mock Artist',
  albumCover: 'cover.jpg',
  previewUrl: 'preview.mp3',
  duration: 120,
  deezerLink: 'https://deezer.com/track/1',
};

function TestComponent() {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  return (
    <div>
      <p data-testid="favorites-count">{favorites.length}</p>

      <button data-testid="add-btn" onClick={() => addFavorite(mockMusic)}>
        Add to Favorites
      </button>
      <button
        data-testid="remove-btn"
        onClick={() => removeFavorite(mockMusic.id)}
      >
        Remove from Favorites
      </button>
      <button
        data-testid="check-btn"
        onClick={() => alert(isFavorite(mockMusic.id))}
      >
        Check isFavorite
      </button>
    </div>
  );
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initially loads favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([mockMusic]));

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  });

  it('adds favorite to state and localStorage', async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');

    await user.click(screen.getByTestId('add-btn'));

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(mockMusic.id);
  });

  it('removes favorite from state and localStorage', async () => {
    const user = userEvent.setup();
    localStorage.setItem('favorites', JSON.stringify([mockMusic]));

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    await user.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');

    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored.length).toBe(0);
  });

  it('isFavorite returns correct boolean', async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');

    await user.click(screen.getByTestId('add-btn'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await user.click(screen.getByTestId('check-btn'));
    expect(alertSpy).toHaveBeenCalledWith(true);

    await user.click(screen.getByTestId('remove-btn'));
    await user.click(screen.getByTestId('check-btn'));
    expect(alertSpy).toHaveBeenLastCalledWith(false);

    alertSpy.mockRestore();
  });

  it('does not add duplicate favorites', async () => {
    const user = userEvent.setup();

    localStorage.setItem('favorites', JSON.stringify([mockMusic]));

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    await user.click(screen.getByTestId('add-btn'));

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(mockMusic.id);
  });
});
