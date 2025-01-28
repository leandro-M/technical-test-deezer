import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { MusicProvider } from '../../shared/context/MusicContext';
import { FavoritesProvider } from '../../shared/context/FavoritesContext';
import { AudioProvider } from '../../shared/context/AudioContext';

export const renderWithChakra = (component: React.ReactNode) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

export const renderWithChakraAndRouter = (ui: React.ReactNode) => {
  return render(
    <ChakraProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </ChakraProvider>,
  );
};

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <ChakraProvider>
      <MusicProvider>
        <FavoritesProvider>
          <AudioProvider>{ui}</AudioProvider>
        </FavoritesProvider>
      </MusicProvider>
    </ChakraProvider>,
  );
};
