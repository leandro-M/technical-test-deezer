import { MusicRepository } from '../repositories/MusicRepository';
import { Music } from '../entities/Music';

export class SearchMusics {
  private musicRepository: MusicRepository;

  constructor(musicRepository: MusicRepository) {
    this.musicRepository = musicRepository;
  }

  async execute(query: string): Promise<Music[]> {
    if (!query.trim()) {
      throw new Error('Search query cannot be empty');
    }

    const musics = await this.musicRepository.searchMusics(query);

    if (!musics?.length) {
      console.warn('No results found for the search query');
    }

    return musics;
  }
}
