import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!Object.keys(context).length) {
    throw new Error('useFavorites must be used within an FavoritesContext');
  }
  return context;
}
