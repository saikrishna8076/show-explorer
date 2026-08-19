import { useContext } from "react";
import { Link } from "react-router";
import FavoritesContext from "../context/FavoritesContext";
import type { Show } from "../types/show";


type ShowCardProps = {
  show: Show;
};

const ShowCard = ({ show }: ShowCardProps) => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("ShowCard must be used inside FavoritesProvider");
  }

  const { favorites, addToFavorites, removeFromFavorites } = context;

  const isFavorite = favorites.some((favorite) => favorite.id === show.id);
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
      {/* Poster */}
      <div className="relative aspect-5/6 overflow-hidden bg-gray-800">
        {show.image?.medium ? (
          <img
            src={show.image.medium}
            alt={show.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Poster gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80" />

        {/* Rating badge */}
        {show.rating?.average && (
          <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-yellow-400 backdrop-blur-sm">
            ⭐ {show.rating.average}
          </div>
        )}
      </div>

      {/* Information */}
      <div className="p-5">
        <h2 className="mb-3 truncate text-xl font-bold text-white transition-colors duration-200 group-hover:text-blue-400">
          {show.name}
        </h2>

        {/* Genres */}
        <div className="mb-5 flex flex-wrap gap-2">
          {show.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs text-gray-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Button */}
        {isFavorite ? (
          <button
            onClick={() => removeFromFavorites(show.id)}
            className="mb-3 block w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            💔 Remove from Favorites
          </button>
        ) : (
          <button
            onClick={() => addToFavorites(show)}
            className="mb-3 block w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-center font-semibold text-white transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
          >
            ❤️ Add to Favorites
          </button>
        )}
        <Link
          to={`/shows/${show.id}`}
          className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
};

export default ShowCard;
