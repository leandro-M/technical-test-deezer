import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../../Home';
import { useMusic } from '../../../../shared/hooks/useMusic';
import { Music } from '../../../../domain/entities/Music';
import { renderWithChakra } from '../../../../tests/utils/renders';
import { useAudio } from '../../../../shared/hooks/useAudio';
import { useFavorites } from '../../../../shared/hooks/useFavorites';

jest.mock('../../../../shared/hooks/useMusic', () => ({
  useMusic: jest.fn(),
}));

jest.mock('../../../../shared/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('../../../../shared/hooks/useAudio', () => ({
  useAudio: jest.fn(),
}));

describe('Home Component', () => {
  const mockGetTopMusicsExecute = jest.fn();
  const mockSearchMusicsExecute = jest.fn();

  const mockUseAudio = {
    playAudio: jest.fn(),
    stopAudio: jest.fn(),
    isPlaying: jest.fn(),
  };

  const mockUseFavorites = {
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAudio as jest.Mock).mockReturnValue(mockUseAudio);
    (useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

    (useMusic as jest.Mock).mockReturnValue({
      getTopMusicsUseCase: { execute: mockGetTopMusicsExecute },
      searchMusicsUseCase: { execute: mockSearchMusicsExecute },
    });
  });

  it('displays loading spinner while fetching top musics', async () => {
    const neverResolvingPromise = new Promise(() => {});

    mockGetTopMusicsExecute.mockReturnValueOnce(neverResolvingPromise);

    renderWithChakra(<Home />);

    expect(screen.getByText('Buscando...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state when fetchTopMusics fails', async () => {
    mockGetTopMusicsExecute.mockRejectedValueOnce(new Error('Network Error'));

    renderWithChakra(<Home />);

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toHaveTextContent(
      'Houve um erro ao buscar as músicas. Tente novamente.',
    );

    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });

  it('allows retry after error', async () => {
    mockGetTopMusicsExecute
      .mockRejectedValueOnce(new Error('Network Error'))
      .mockResolvedValueOnce([
        {
          id: 1,
          title: 'Mock Song',
          artist: 'Mock Artist',
          albumCover: '',
          duration: 120,
          previewUrl: '',
          deezerLink: '',
        },
      ]);

    renderWithChakra(<Home />);

    await screen.findByTestId('error-message');
    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();

    await userEvent.click(retryButton);

    expect(await screen.findByText('Mock Song')).toBeInTheDocument();
  });

  it("shows 'Nenhuma música encontrada' when fetch is successful but empty array", async () => {
    mockGetTopMusicsExecute.mockResolvedValueOnce([]);

    renderWithChakra(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('no-musics')).toBeInTheDocument();
  });

  it('renders MusicList if top musics exist', async () => {
    const mockMusics: Music[] = [
      {
        id: 1,
        title: 'Song 1',
        artist: 'Artist 1',
        albumCover: 'cover1.jpg',
        duration: 200,
        previewUrl: '',
        deezerLink: '',
      },
      {
        id: 2,
        title: 'Song 2',
        artist: 'Artist 2',
        albumCover: 'cover2.jpg',
        duration: 250,
        previewUrl: '',
        deezerLink: '',
      },
    ];
    mockGetTopMusicsExecute.mockResolvedValueOnce(mockMusics);

    renderWithChakra(<Home />);

    expect(await screen.findByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Song 2')).toBeInTheDocument();
  });

  it('does nothing if searchQuery is empty', async () => {
    mockGetTopMusicsExecute.mockResolvedValueOnce([]);

    renderWithChakra(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
    });

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    expect(mockSearchMusicsExecute).not.toHaveBeenCalled();
  });

  it('performs a search when query is provided', async () => {
    mockGetTopMusicsExecute.mockResolvedValueOnce([]);

    mockSearchMusicsExecute.mockResolvedValueOnce([
      {
        id: 99,
        title: 'Searched Song',
        artist: 'Search Artist',
        albumCover: '',
        duration: 100,
        previewUrl: '',
        deezerLink: '',
      },
    ]);

    renderWithChakra(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
    });

    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'Search Query');

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    expect(mockSearchMusicsExecute).toHaveBeenCalledWith('Search Query');

    expect(await screen.findByText('Searched Song')).toBeInTheDocument();
  });

  it('shows error state when handleSearch fails', async () => {
    mockGetTopMusicsExecute.mockResolvedValueOnce([]);

    mockSearchMusicsExecute.mockRejectedValue(new Error('Network Error'));

    renderWithChakra(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
    });

    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'Search Query');

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toHaveTextContent(
      'Houve um erro ao realizar a busca. Tente novamente.',
    );

    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });
});
