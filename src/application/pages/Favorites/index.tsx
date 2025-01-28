import { Box, Text } from '@chakra-ui/react';
import { MusicList } from '../../components/MusicList';
import { useFavorites } from '../../../shared/hooks/useFavorites';

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Minhas Músicas Favoritas
      </Text>
      {!favorites?.length && (
        <Text data-testid="no-favorites">
          Você ainda não tem músicas favoritas
        </Text>
      )}

      {!!favorites?.length && (
        <MusicList musics={favorites} audioRef={{ current: null }} />
      )}
    </Box>
  );
}
