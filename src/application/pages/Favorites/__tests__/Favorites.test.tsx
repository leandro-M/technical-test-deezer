import { screen } from '@testing-library/react';
import { Favorites } from '../../Favorites';
import { renderWithChakra } from '../../../../tests/utils/renders';
import { useFavorites } from '../../../../shared/hooks/useFavorites';
import { useAudio } from '../../../../shared/hooks/useAudio';

jest.mock('../../../../shared/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('../../../../shared/hooks/useAudio', () => ({
  useAudio: jest.fn(),
}));

describe('Favorites Component', () => {
  const mockUseFavorites = {
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
  };

  const mockUseAudio = {
    playAudio: jest.fn(),
    stopAudio: jest.fn(),
    isPlaying: jest.fn(),
  };

  afterEach(() => {});

  beforeEach(() => {
    jest.clearAllMocks();

    (useAudio as jest.Mock).mockReturnValue(mockUseAudio);
    (useFavorites as jest.Mock).mockReturnValue({
      ...mockUseFavorites,
      favorites: [],
    });

    mockUseAudio.isPlaying.mockReturnValue(false);
    mockUseFavorites.isFavorite.mockReturnValue(false);
  });

  it("renders the title 'Minhas Músicas Favoritas'", () => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [] });

    renderWithChakra(<Favorites />);

    const pageTitle = screen.getByText('Minhas Músicas Favoritas');
    expect(pageTitle).toBeInTheDocument();
  });

  it('shows a message when there are no favorites', () => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [] });

    renderWithChakra(<Favorites />);

    expect(screen.getByTestId('no-favorites')).toBeInTheDocument();
  });

  it('renders the MusicList with favorites', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      ...mockUseFavorites,
      favorites: [
        {
          id: 1,
          title: 'Favorite Song 1',
          artist: 'Artist',
          albumCover: 'https://deezer.com/60',
          duration: 180,
          previewUrl: 'https://deezer.com/preview.mp3',
          deezerLink: 'https://deezer.com/track/1',
        },
        {
          id: 2,
          title: 'Favorite Song 2',
          artist: 'Artist',
          albumCover: 'https://deezer.com/60',
          duration: 180,
          previewUrl: 'https://deezer.com/preview.mp3',
          deezerLink: 'https://deezer.com/track/1',
        },
      ],
    });

    renderWithChakra(<Favorites />);

    const favoriteItems = screen.getAllByTestId('music-item');
    expect(favoriteItems).toHaveLength(2);

    expect(screen.getByText('Favorite Song 1')).toBeInTheDocument();
    expect(screen.getByText('Favorite Song 2')).toBeInTheDocument();
  });
});
