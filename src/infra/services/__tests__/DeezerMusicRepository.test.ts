import { DeezerMusicRepository } from '../DeezerMusicRepository';
import { deezerApi } from '../deezerApi';

jest.mock('../deezerApi', () => ({
  deezerApi: {
    get: jest.fn(),
  },
}));

describe('DeezerMusicRepository', () => {
  let repository: DeezerMusicRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new DeezerMusicRepository();
  });

  describe('getTopMusics', () => {
    it('should map API response to Music[]', async () => {
      (deezerApi.get as jest.Mock).mockResolvedValueOnce({
        data: {
          tracks: {
            data: [
              {
                id: 101,
                title: 'Top Song',
                artist: { name: 'Top Artist' },
                album: { cover: 'cover.jpg' },
                preview: 'preview.mp3',
                duration: 300,
                link: 'https://deezer.com/track/101',
              },
            ],
          },
        },
      });

      const result = await repository.getTopMusics();

      expect(deezerApi.get).toHaveBeenCalledWith('/editorial/0/charts');
      expect(result).toEqual([
        {
          id: 101,
          title: 'Top Song',
          artist: 'Top Artist',
          albumCover: 'cover.jpg',
          previewUrl: 'preview.mp3',
          duration: 300,
          deezerLink: 'https://deezer.com/track/101',
        },
      ]);
    });

    it('should throw an error if the API call fails', async () => {
      (deezerApi.get as jest.Mock).mockRejectedValueOnce(
        new Error('API Error'),
      );

      await expect(repository.getTopMusics()).rejects.toThrow('API Error');
    });
  });

  describe('searchMusics', () => {
    it('should map API response to Music[]', async () => {
      (deezerApi.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: [
            {
              id: 202,
              title: 'Search Song',
              artist: { name: 'Search Artist' },
              album: { cover: 'search-cover.jpg' },
              preview: 'search-preview.mp3',
              duration: 180,
              link: 'https://deezer.com/track/202',
            },
          ],
        },
      });

      const result = await repository.searchMusics('test query');

      expect(deezerApi.get).toHaveBeenCalledWith('/search', {
        params: { q: 'test query' },
      });
      expect(result).toEqual([
        {
          id: 202,
          title: 'Search Song',
          artist: 'Search Artist',
          albumCover: 'search-cover.jpg',
          previewUrl: 'search-preview.mp3',
          duration: 180,
          deezerLink: 'https://deezer.com/track/202',
        },
      ]);
    });

    it('should throw an error if the API call fails', async () => {
      (deezerApi.get as jest.Mock).mockRejectedValueOnce(
        new Error('Network Err'),
      );

      await expect(repository.searchMusics('some query')).rejects.toThrow(
        'Network Err',
      );
    });
  });
});
