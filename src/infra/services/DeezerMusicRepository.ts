import { deezerApi } from './deezerApi';
import { MusicRepository } from '../../domain/repositories/MusicRepository';
import { Music } from '../../domain/entities/Music';

interface DeezerTrack {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    cover: string;
  };
  preview: string;
  duration: number;
  link: string;
}

export class DeezerMusicRepository implements MusicRepository {
  async getTopMusics(): Promise<Music[]> {
    const response = await deezerApi.get('/editorial/0/charts');
    const tracks = response.data.tracks.data;
    return tracks.map((track: DeezerTrack) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      albumCover: track.album.cover,
      previewUrl: track.preview,
      duration: track.duration,
      deezerLink: track.link,
    }));
  }

  async searchMusics(query: string): Promise<Music[]> {
    const response = await deezerApi.get('/search', {
      params: { q: query },
    });
    const tracks = response.data.data;
    return tracks.map((track: DeezerTrack) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      albumCover: track.album.cover,
      previewUrl: track.preview,
      duration: track.duration,
      deezerLink: track.link,
    }));
  }
}
