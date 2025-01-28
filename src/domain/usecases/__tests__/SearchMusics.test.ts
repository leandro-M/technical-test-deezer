import { SearchMusics } from '../SearchMusics';
import { MusicRepository } from '../../repositories/MusicRepository';
import { Music } from '../../entities/Music';

const mockRepository: jest.Mocked<MusicRepository> = {
  getTopMusics: jest.fn(),
  searchMusics: jest.fn(),
};

describe('SearchMusics Use Case', () => {
  let searchMusicsUseCase: SearchMusics;

  beforeEach(() => {
    jest.clearAllMocks();
    searchMusicsUseCase = new SearchMusics(mockRepository);
  });

  it('should throw an error if query is empty', async () => {
    await expect(searchMusicsUseCase.execute(' ')).rejects.toThrow(
      'Search query cannot be empty',
    );
    expect(mockRepository.searchMusics).not.toHaveBeenCalled();
  });

  it('should return musics on success', async () => {
    const mockData: Music[] = [
      {
        id: 2,
        title: 'Found Song',
        artist: 'Artist 2',
        albumCover: 'cover2.jpg',
        previewUrl: 'preview2.mp3',
        duration: 200,
        deezerLink: 'https://deezer.com/track/2',
      },
    ];
    mockRepository.searchMusics.mockResolvedValueOnce(mockData);

    const result = await searchMusicsUseCase.execute('my search');

    expect(result).toEqual(mockData);
    expect(mockRepository.searchMusics).toHaveBeenCalledWith('my search');
  });

  it('should warn if no results found, but return empty array', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockRepository.searchMusics.mockResolvedValueOnce([]);

    const result = await searchMusicsUseCase.execute('no result query');

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      'No results found for the search query',
    );
    warnSpy.mockRestore();
  });
});
