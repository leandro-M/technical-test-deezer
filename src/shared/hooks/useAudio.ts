import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!Object.keys(context).length) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
