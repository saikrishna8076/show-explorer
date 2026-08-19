const About = () => {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <section className="text-center">
        <p className="mb-3 font-semibold text-blue-400">
          🎬 SHOW EXPLORER
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          About Show Explorer
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          A simple and modern way to discover TV shows, explore their details,
          and keep track of the ones you love.
        </p>
      </section>

      {/* Features */}
      <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
          <div className="mb-4 text-3xl">🔎</div>

          <h2 className="mb-2 text-xl font-bold text-white">
            Discover Shows
          </h2>

          <p className="leading-7 text-gray-400">
            Search for TV shows and explore different genres to find something
            interesting to watch.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
          <div className="mb-4 text-3xl">📺</div>

          <h2 className="mb-2 text-xl font-bold text-white">
            Explore Details
          </h2>

          <p className="leading-7 text-gray-400">
            View ratings, genres, language, status, runtime, and summaries for
            each show.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
          <div className="mb-4 text-3xl">❤️</div>

          <h2 className="mb-2 text-xl font-bold text-white">
            Save Favorites
          </h2>

          <p className="leading-7 text-gray-400">
            Save your favorite shows and access them anytime from your
            Favorites collection.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;    