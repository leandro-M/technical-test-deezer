import { GetTopMusics } from '../GetTopMusics';
import { MusicRepository } from '../../repositories/MusicRepository';
import { Music } from '../../entities/Music';

const mockRepository: jest.Mocked<MusicRepository> = {
  getTopMusics: jest.fn(),
  searchMusics: jest.fn(),
};

describe('GetTopMusics Use Case', () => {
  let getTopMusicsUseCase: GetTopMusics;

  beforeEach(() => {
    jest.clearAllMocks();
    getTopMusicsUseCase = new GetTopMusics(mockRepository);
  });

  it('should return musics on success', async () => {
    const mockData: Music[] = [
      {
        id: 1,
        title: 'Song 1',
        artist: 'Artist 1',
        albumCover: 'cover1.jpg',
        previewUrl: 'preview1.mp3',
        duration: 180,
        deezerLink: 'https://deezer.com/track/1',
      },
    ];
    mockRepository.getTopMusics.mockResolvedValueOnce(mockData);

    const result = await getTopMusicsUseCase.execute();

    expect(result).toEqual(mockData);
    expect(mockRepository.getTopMusics).toHaveBeenCalledTimes(1);
  });

  it('should warn if no top musics found, but return empty array', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockRepository.getTopMusics.mockResolvedValueOnce([]);

    const result = await getTopMusicsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockRepository.getTopMusics).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('No top musics found');

    warnSpy.mockRestore();
  });

  it('should throw error if repository fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockRepository.getTopMusics.mockRejectedValueOnce(new Error('Repo Error'));

    await expect(getTopMusicsUseCase.execute()).rejects.toThrow(
      'Failed to fetch top musics.',
    );
    expect(mockRepository.getTopMusics).toHaveBeenCalledTimes(1);

    errorSpy.mockRestore();
  });
});
