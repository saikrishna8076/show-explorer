import { useContext } from "react";
import ShowCard from "../components/ShowCard";
import FavoritesContext from "../context/FavoritesContext";

const Favorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("Favorites must be used inside FavoritesProvider");
  }

  const { favorites } = context;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 font-semibold text-blue-400">YOUR COLLECTION</p>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Favorite Shows
        </h1>

        <p className="mt-3 text-gray-400">Your saved TV shows in one place.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-5xl">💔</p>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No favorites yet
          </h2>

          <p className="mt-2 text-gray-400">
            Go to Discover and add some shows to your favorites.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((show) => (
            <div key={show.id}>
              <ShowCard show={show} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Favorites;
