import { MusicRepository } from '../repositories/MusicRepository';
import { Music } from '../entities/Music';

export class GetTopMusics {
  private musicRepository: MusicRepository;

  constructor(musicRepository: MusicRepository) {
    this.musicRepository = musicRepository;
  }

  async execute(): Promise<Music[]> {
    try {
      const musics = await this.musicRepository.getTopMusics();

      if (!musics?.length) {
        console.warn('No top musics found');
      }

      return musics;
    } catch (error) {
      console.error('Error fetching top musics:', error);
      throw new Error('Failed to fetch top musics.');
    }
  }
}
