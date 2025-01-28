import { screen, fireEvent } from '@testing-library/react';
import { MusicCard } from '../../MusicCard';
import { Music } from '../../../../domain/entities/Music';
import { useFavorites } from '../../../../shared/hooks/useFavorites';
import { useAudio } from '../../../../shared/hooks/useAudio';
import { renderWithChakra } from '../../../../tests/utils/renders';

jest.mock('../../../../shared/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));
jest.mock('../../../../shared/hooks/useAudio', () => ({
  useAudio: jest.fn(),
}));

describe('MusicCard Component', () => {
  const mockMusic: Music = {
    id: 1,
    title: 'Title',
    artist: 'Artist',
    albumCover: 'https://deezer.com/60',
    duration: 180,
    previewUrl: 'https://deezer.com/preview.mp3',
    deezerLink: 'https://deezer.com/track/1',
  };

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

  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useAudio as jest.Mock).mockReturnValue(mockUseAudio);
    (useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

    mockUseAudio.isPlaying.mockReturnValue(false);
    mockUseFavorites.isFavorite.mockReturnValue(false);
  });

  test('renders correctly with all elements', () => {
    renderWithChakra(<MusicCard music={mockMusic} />);

    expect(screen.getByText(mockMusic.title)).toBeInTheDocument();
    expect(screen.getByText(mockMusic.artist)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockMusic.duration * 1000).toISOString().substr(14, 5),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockMusic.albumCover,
    );
  });

  test('plays the music correctly', () => {
    mockUseAudio.isPlaying.mockReturnValue(false);
    renderWithChakra(<MusicCard music={mockMusic} />);

    const playPauseButton = screen.getByLabelText('Tocar');
    fireEvent.click(playPauseButton);

    expect(mockUseAudio.playAudio).toHaveBeenCalledWith(
      mockMusic.id,
      mockMusic.previewUrl,
    );

    expect(mockUseAudio.isPlaying).toHaveBeenCalledWith(mockMusic.id);
  });

  test('pauses the music correctly', () => {
    mockUseAudio.isPlaying.mockReturnValue(true);
    renderWithChakra(<MusicCard music={mockMusic} />);

    const pauseButton = screen.getByLabelText('Pausar');
    fireEvent.click(pauseButton);

    expect(mockUseAudio.stopAudio).toHaveBeenCalled();
  });

  test('plays and pauses the music correctly', () => {
    mockUseAudio.isPlaying.mockReturnValue(false);
    const { rerender } = renderWithChakra(<MusicCard music={mockMusic} />);

    const playPauseButton = screen.getByLabelText('Tocar');
    fireEvent.click(playPauseButton);

    expect(mockUseAudio.playAudio).toHaveBeenCalledWith(
      mockMusic.id,
      mockMusic.previewUrl,
    );

    expect(mockUseAudio.isPlaying).toHaveBeenCalledWith(mockMusic.id);

    mockUseAudio.isPlaying.mockReturnValue(true);
    rerender(<MusicCard music={mockMusic} />);

    const pauseButton = screen.getByLabelText('Pausar');
    fireEvent.click(pauseButton);

    expect(mockUseAudio.stopAudio).toHaveBeenCalled();
  });

  test('adds favorite correctly', () => {
    mockUseFavorites.isFavorite.mockReturnValue(false);

    renderWithChakra(<MusicCard music={mockMusic} />);

    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    fireEvent.click(favoriteButton);

    expect(mockUseFavorites.addFavorite).toHaveBeenCalledWith(mockMusic);
  });

  test('removes favorite correctly', () => {
    mockUseFavorites.isFavorite.mockReturnValue(true);

    renderWithChakra(<MusicCard music={mockMusic} />);

    const removeFavoriteButton = screen.getByLabelText('Remover dos favoritos');
    fireEvent.click(removeFavoriteButton);

    expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith(mockMusic.id);
  });

  test('adds and remove favorite correctly', () => {
    mockUseFavorites.isFavorite.mockReturnValue(false);

    const { rerender } = renderWithChakra(<MusicCard music={mockMusic} />);

    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    fireEvent.click(favoriteButton);
    expect(mockUseFavorites.addFavorite).toHaveBeenCalledWith(mockMusic);

    mockUseFavorites.isFavorite.mockReturnValue(true);

    rerender(<MusicCard music={mockMusic} />);

    const removeFavoriteButton = screen.getByLabelText('Remover dos favoritos');
    fireEvent.click(removeFavoriteButton);
    expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith(mockMusic.id);
  });

  test('opens the Deezer link', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation();

    renderWithChakra(<MusicCard music={mockMusic} />);

    const linkButton = screen.getByLabelText('Abrir no Deezer');
    fireEvent.click(linkButton);

    expect(openSpy).toHaveBeenCalledWith(mockMusic.deezerLink, '_blank');

    openSpy.mockRestore();
  });
});
