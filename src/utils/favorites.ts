export type FavoriteShow = {
  id: number;
  name: string;
  image?: {
    medium?: string;
  };
  rating?: {
    average?: number;
  };
  genres?: string[];
};

const STORAGE_KEY = "favoriteShows";

export const getFavorites = (): FavoriteShow[] => {
  const storedFavorites = localStorage.getItem(STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown = JSON.parse(storedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites as FavoriteShow[];
  } catch (error) {
    console.error("Failed to parse favorites:", error);
    return [];
  }
};

export const saveFavorites = (favorites: FavoriteShow[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const addFavorite = (show: FavoriteShow) => {
  const favorites = getFavorites();

  const alreadyExists = favorites.some((favorite) => favorite.id === show.id);

  if (alreadyExists) {
    return;
  }

  const updatedFavorites = [...favorites, show];

  saveFavorites(updatedFavorites);

  window.dispatchEvent(new Event("favoritesChanged"));
};

export const removeFavorite = (showId: number) => {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter(
    (favorite) => favorite.id !== showId,
  );

  saveFavorites(updatedFavorites);

  window.dispatchEvent(new Event("favoritesChanged"));
};
