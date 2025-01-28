import { createContext } from 'react';
import { DeezerMusicRepository } from '../../infra/services/DeezerMusicRepository';
import { SearchMusics } from '../../domain/usecases/SearchMusics';
import { GetTopMusics } from '../../domain/usecases/GetTopMusics';

const musicRepository = new DeezerMusicRepository();
const searchMusicsUseCase = new SearchMusics(musicRepository);
const getTopMusicsUseCase = new GetTopMusics(musicRepository);

export const MusicContext = createContext({
  searchMusicsUseCase,
  getTopMusicsUseCase,
});

export const MusicProvider = ({ children }: { children: React.ReactNode }) => (
  <MusicContext.Provider value={{ searchMusicsUseCase, getTopMusicsUseCase }}>
    {children}
  </MusicContext.Provider>
);
