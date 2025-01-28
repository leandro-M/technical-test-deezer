import React, { createContext, useRef, useState } from 'react';

interface AudioContextProps {
  currentPlayingId: number | null;
  playAudio: (id: number, previewUrl: string) => void;
  stopAudio: () => void;
  isPlaying: (id: number) => boolean;
}

export const AudioContext = createContext<AudioContextProps>(
  {} as AudioContextProps,
);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (id: number, previewUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(previewUrl);
    audioRef.current.play();
    setCurrentPlayingId(id);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentPlayingId(null);
    }
  };

  const isPlaying = (id: number) => currentPlayingId === id;

  return (
    <AudioContext.Provider
      value={{ currentPlayingId, playAudio, stopAudio, isPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
};
