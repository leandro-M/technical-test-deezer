import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Input,
  Flex,
  Text,
  VStack,
  Spinner,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { MusicList } from '../../components/MusicList';
import { Music } from '../../../domain/entities/Music';
import { useMusic } from '../../../shared/hooks/useMusic';

export function Home() {
  const { getTopMusicsUseCase, searchMusicsUseCase } = useMusic();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [musics, setMusics] = useState<Music[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function fetchTopMusics() {
    try {
      setIsLoading(true);
      setError(null);
      const topMusics = await getTopMusicsUseCase.execute();
      setMusics(topMusics);
    } catch (err) {
      console.error(err);
      setError('Houve um erro ao buscar as músicas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTopMusics();
  }, []);

  async function handleSearch() {
    const searchQuery = inputRef.current?.value;
    if (!searchQuery?.trim()) return;
    try {
      setIsLoading(true);
      setError(null);
      const result = await searchMusicsUseCase.execute(searchQuery);
      setMusics(result);
    } catch (err) {
      console.error(err);
      setError('Houve um erro ao realizar a busca. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  const Render: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Box p={4}>
        <Text fontSize="2xl" mb={4}>
          Top 10 Músicas
        </Text>
        {children}
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Render>
        <VStack>
          <Spinner role="status" color="colorPalette.600" />
          <Text color="colorPalette.600">Buscando...</Text>
        </VStack>
      </Render>
    );
  }

  if (error) {
    return (
      <Render>
        <VStack>
          <Text color="red.500" data-testid="error-message">
            {error}
          </Text>
          <Button
            colorScheme="blue"
            onClick={fetchTopMusics}
            data-testid="retry-button"
          >
            Tentar Novamente
          </Button>
        </VStack>
      </Render>
    );
  }

  return (
    <Render>
      <Flex mb={4} gap={2}>
        <Input
          placeholder="Busque por álbum, artista ou título..."
          data-testid="search-input"
          ref={inputRef}
        />

        <IconButton
          icon={<Search2Icon />}
          aria-label="Buscar músicas"
          data-testid="search-button"
          onClick={handleSearch}
          colorScheme="gray"
          variant="solid"
        />
      </Flex>
      {!musics.length && (
        <Text data-testid="no-musics">Nenhuma música encontrada</Text>
      )}

      {!!musics.length && <MusicList musics={musics} audioRef={audioRef} />}
    </Render>
  );
}
