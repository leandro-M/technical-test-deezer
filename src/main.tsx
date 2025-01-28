import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { FavoritesProvider } from './shared/context/FavoritesContext';
import { MusicProvider } from './shared/context/MusicContext';
import { AppRoutes } from './application/routes/AppRoutes';
import { AudioProvider } from './shared/context/AudioContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MusicProvider>
        <FavoritesProvider>
          <AudioProvider>
            <AppRoutes />
          </AudioProvider>
        </FavoritesProvider>
      </MusicProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
