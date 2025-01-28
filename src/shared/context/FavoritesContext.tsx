import { createContext, useState, useEffect } from 'react';
import { Music } from '../../domain/entities/Music';

interface FavoritesContextProps {
  favorites: Music[];
  addFavorite(music: Music): void;
  removeFavorite(id: number): void;
  isFavorite(id: number): boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>(
  {} as FavoritesContextProps,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Music[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(music: Music) {
    if (!favorites.find((fav) => fav.id === music.id)) {
      setFavorites([...favorites, music]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites(favorites.filter((m) => m.id !== id));
  }

  function isFavorite(id: number) {
    return !!favorites.find((m) => m.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
