import { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

export const useMusic = () => useContext(MusicContext);
