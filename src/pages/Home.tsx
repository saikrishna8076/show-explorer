import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import ShowCardSkeleton from "../components/ShowCardSkeleton";
import type { Show, ScheduleItem } from "../types/show";

const Home = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/schedule");

        if (!response.ok) {
          throw new Error("Failed to fetch shows");
        }

        const data: ScheduleItem[] = await response.json();

        const uniqueShows = Array.from(
          new Map(
            data
              .filter((item) => item.show?.image)
              .map((item) => [item.show.id, item.show]),
          ).values(),
        ).slice(0, 6);

        setShows(uniqueShows);
      } catch (error) {
        console.error("API error:", error);
        setError("Unable to load shows. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <main className="px-6 py-16">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-4 font-semibold text-blue-400">🎬 SHOW EXPLORER</p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          Discover your next
          <span className="text-blue-500"> favorite show.</span>
        </h1>

        <p className="text-lg text-gray-400 md:text-xl">
          Search, discover, and explore TV shows from around the world.
        </p>
      </section>

      {/* Featured Shows */}
      <section className="mx-auto mt-20 max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 font-semibold text-blue-400">🔥 TRENDING NOW</p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Shows you might like
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ShowCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-10 text-center">
            <p className="mb-4 text-red-400">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-400"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
