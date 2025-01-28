import { VStack } from '@chakra-ui/react';
import { MusicCard } from '../MusicCard';
import { Music } from '../../../domain/entities/Music';

interface MusicListProps {
  musics: Music[];
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export function MusicList({ musics }: MusicListProps) {
  return (
    <VStack spacing={4}>
      {musics.map((music) => (
        <MusicCard key={music.id} music={music} />
      ))}
    </VStack>
  );
}
