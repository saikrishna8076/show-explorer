import { useContext, useState } from "react";
import { Link } from "react-router";
import FavoritesContext from "../context/FavoritesContext";

const Navbar = () => {
  const context = useContext(FavoritesContext);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!context) {
    throw new Error("Navbar must be used inside FavoritesProvider");
  }

  const { favorites } = context;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-950 px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-white"
        >
          🎬 Show Explorer
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-gray-400 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/discover"
            className="text-gray-400 transition hover:text-white"
          >
            Discover
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            Favorites

            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400">
              ❤️ {favorites.length}
            </span>
          </Link>

          <Link
            to="/about"
            className="text-gray-400 transition hover:text-white"
          >
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((current) => !current)}
          className="rounded-lg p-2 text-2xl text-gray-300 transition hover:bg-gray-800 hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mx-auto mt-4 max-w-7xl border-t border-gray-800 pt-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/discover"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              Discover
            </Link>

            <Link
              to="/favorites"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              <span>Favorites</span>

              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400">
                ❤️ {favorites.length}
              </span>
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;