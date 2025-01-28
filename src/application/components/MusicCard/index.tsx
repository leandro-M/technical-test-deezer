import {
  Box,
  Image,
  Flex,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { Music } from '../../../domain/entities/Music';
import { useFavorites } from '../../../shared/hooks/useFavorites';
import { BsHeartFill, BsHeart, BsPlay, BsPause } from 'react-icons/bs';
import { useAudio } from '../../../shared/hooks/useAudio';

interface MusicCardProps {
  music: Music;
}

export function MusicCard({ music }: MusicCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { playAudio, stopAudio, isPlaying } = useAudio();

  const iconSize = useBreakpointValue({ base: '20px', md: '24px' });
  const isMusicPlaying = isPlaying(music.id);

  const handlePlayPause = () => {
    if (isMusicPlaying) {
      return stopAudio();
    }

    return playAudio(music.id, music.previewUrl);
  };

  const handleFavorite = () => {
    if (isFavorite(music.id)) {
      return removeFavorite(music.id);
    }

    return addFavorite(music);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      w="100%"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent={{ md: 'space-between' }}
      gap={4}
      data-testid="music-item"
    >
      <Flex alignItems="center" w="100%">
        <Image
          src={music.albumCover}
          boxSize={{ base: '80px', md: '60px' }}
          mr={4}
          borderRadius="md"
        />
        <Box>
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
            {music.title}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>{music.artist}</Text>
          <Text fontSize="sm" color="gray.500">
            {new Date(music.duration * 1000).toISOString().substr(14, 5)}
          </Text>
        </Box>
      </Flex>

      <Flex
        gap={2}
        w={{ base: '100%', md: 'auto' }}
        justifyContent={{ base: 'center', md: 'flex-end' }}
      >
        <IconButton
          icon={<FiExternalLink size={iconSize} />}
          aria-label="Abrir no Deezer"
          onClick={() => window.open(music.deezerLink, '_blank')}
          variant="outline"
          colorScheme="white"
        />

        <IconButton
          icon={
            isMusicPlaying ? (
              <BsPause size={iconSize} />
            ) : (
              <BsPlay size={iconSize} />
            )
          }
          aria-label={isMusicPlaying ? 'Pausar' : 'Tocar'}
          onClick={handlePlayPause}
          variant="outline"
          colorScheme="white"
        />

        <IconButton
          icon={
            isFavorite(music.id) ? (
              <BsHeartFill size={iconSize} />
            ) : (
              <BsHeart size={iconSize} />
            )
          }
          aria-label={
            isFavorite(music.id)
              ? 'Remover dos favoritos'
              : 'Adicionar aos favoritos'
          }
          data-testid={
            isFavorite(music.id) ? 'remove-favorites' : 'add-favorites'
          }
          onClick={handleFavorite}
          colorScheme={isFavorite(music.id) ? 'red' : 'white'}
          variant="outline"
        />
      </Flex>
    </Flex>
  );
}
