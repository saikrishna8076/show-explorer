import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import type { Show, ShowSearchResult } from "../types/show";

const Discover = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Science-Fiction",
    "Thriller",
  ];

  const filteredShows =
    selectedGenre === "All"
      ? shows
      : shows.filter((show) => show.genres?.includes(selectedGenre));

  const searchShows = async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`,
        { signal },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data: ShowSearchResult[] = await response.json();

      const results = data.map((result) => result.show);

      setShows(results);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("API error:", error);
      setError("Something went wrong. Please try again.");
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setShows([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(() => {
      searchShows(controller.signal);
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <p className="text-blue-400 font-semibold mb-2">DISCOVER</p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Discover Shows
        </h1>

        <p className="text-gray-400 mt-3">Find your next favorite TV show.</p>
      </div>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for a TV show..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-4 pr-14 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedGenre("All");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 transition hover:text-white"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="mb-8">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-white outline-none focus:border-blue-500"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      {loading && (
        <p className="mb-6 text-center text-gray-400">Searching...</p>
      )}
      {error && (
        <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <p className="mb-4 text-red-400">{error}</p>

          <button
            onClick={() => searchShows()}
            disabled={loading}
            className="rounded-lg bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}
      {!loading && !error && search.trim() && filteredShows.length === 0 && (
        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">
          <p className="text-4xl mb-3">📭</p>

          <h2 className="text-xl font-semibold text-white">
            {selectedGenre === "All"
              ? "No shows found"
              : "No shows found for this genre"}
          </h2>

          <p className="mt-2 text-gray-400">
            {selectedGenre === "All"
              ? "Try searching for something else."
              : `Try selecting another genre or choose "All".`}
          </p>
          {selectedGenre !== "All" && (
            <button
              onClick={() => setSelectedGenre("All")}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
            >
              Clear Genre Filter
            </button>
          )}
        </div>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </section>
    </main>
  );
};

export default Discover;
