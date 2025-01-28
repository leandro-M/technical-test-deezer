import { Music } from '../entities/Music';

export interface MusicRepository {
  getTopMusics(): Promise<Music[]>;
  searchMusics(query: string): Promise<Music[]>;
}
