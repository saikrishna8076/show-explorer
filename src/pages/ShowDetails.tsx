import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import FavoritesContext from "../context/FavoritesContext";
import type { Show } from "../types/show";

const ShowDetails = () => {
  const { id } = useParams();

  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("ShowDetails must be used inside FavoritesProvider");
  }

  const { favorites, addToFavorites, removeFromFavorites } = context;

  const [show, setShow] = useState<Show | null>(null);

  const isFavorite = show
    ? favorites.some((favorite) => favorite.id === show.id)
    : false;

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch show");
        }

        const data = await response.json();

        setShow(data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchShow();
  }, [id]);

  if (!show) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link
        to="/discover"
        className="inline-flex items-center mb-8 text-gray-400 hover:text-white transition"
      >
        ← Back to Discover
      </Link>

      <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
        {/* Poster */}
        <div className="self-start overflow-hidden rounded-2xl border border-gray-800 shadow-xl">
          {show.image?.original || show.image?.medium ? (
            <img
              src={show.image.original || show.image.medium}
              alt={show.name}
              className="block w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="aspect-5/6 flex items-center justify-center bg-gray-800 text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Information */}
        <div>
          <p className="mb-2 font-semibold text-blue-400">SHOW DETAILS</p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {show.name}
          </h1>

          {/* Rating */}
          {show.rating?.average && (
            <div className="mt-5 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-yellow-400">
              ⭐ {show.rating.average}
            </div>
          )}

          {isFavorite ? (
            <button
              onClick={() => removeFromFavorites(show.id)}
              className="mt-5 block rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              💔 Remove from Favorites
            </button>
          ) : (
            <button
              onClick={() => addToFavorites(show)}
              className="mt-5 block rounded-xl border border-gray-700 bg-gray-800 px-5 py-3 font-semibold text-white transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              ❤️ Add to Favorites
            </button>
          )}

          {/* Genres */}
          <div className="mt-5 flex flex-wrap gap-2">
            {show.genres?.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Basic information */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Language</p>
              <p className="mt-1 text-white">{show.language ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="mt-1 text-white">{show.status ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Premiered</p>
              <p className="mt-1 text-white">{show.premiered ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Runtime</p>
              <p className="mt-1 text-white">
                {show.runtime ? `${show.runtime} min` : "N/A"}
              </p>
            </div>
          </div>

          {/* Summary */}
          {show.summary && (
            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-bold text-white">Summary</h2>

              <div
                className="leading-7 text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: show.summary,
                }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ShowDetails;
