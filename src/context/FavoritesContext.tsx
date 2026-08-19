import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  type FavoriteShow,
} from "../utils/favorites";

type FavoritesContextType = {
  favorites: FavoriteShow[];
  addToFavorites: (show: FavoriteShow) => void;
  removeFromFavorites: (showId: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<FavoriteShow[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addToFavorites = (show: FavoriteShow) => {
    addFavorite(show);
    setFavorites(getFavorites());
  };

  const removeFromFavorites = (showId: number) => {
    removeFavorite(showId);
    setFavorites(getFavorites());
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
