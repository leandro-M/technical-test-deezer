import { screen } from '@testing-library/react';
import { MusicList } from '../../MusicList';
import { Music } from '../../../../domain/entities/Music';
import { renderWithChakra } from '../../../../tests/utils/renders';

jest.mock('../../../../shared/hooks/useFavorites', () => ({
  useFavorites: jest.fn(() => ({
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
  })),
}));

jest.mock('../../../../shared/hooks/useAudio', () => ({
  useAudio: jest.fn(() => ({
    playAudio: jest.fn(),
    stopAudio: jest.fn(),
    isPlaying: jest.fn(),
  })),
}));

describe('MusicList Component', () => {
  const mockMusics: Music[] = [
    {
      id: 1,
      title: 'Song 1',
      artist: 'Artist 1',
      albumCover: 'cover1.jpg',
      previewUrl: 'preview1.mp3',
      duration: 180,
      deezerLink: 'https://deezer.com/track/1',
    },
    {
      id: 2,
      title: 'Song 2',
      artist: 'Artist 2',
      albumCover: 'cover2.jpg',
      previewUrl: 'preview2.mp3',
      duration: 210,
      deezerLink: 'https://deezer.com/track/2',
    },
  ];

  const mockAudioRef = {
    current: null,
  } as React.MutableRefObject<HTMLAudioElement | null>;

  it('renders each MusicCard with the correct information', () => {
    renderWithChakra(<MusicList musics={mockMusics} audioRef={mockAudioRef} />);

    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();

    expect(screen.getByText('Song 2')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
  });

  it('renders without breaking when there are no musics', () => {
    renderWithChakra(<MusicList musics={[]} audioRef={mockAudioRef} />);

    expect(screen.queryByText('Song 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Artist 1')).not.toBeInTheDocument();
  });
});
