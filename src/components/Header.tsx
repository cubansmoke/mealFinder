import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useGetDataQuery } from "../services/mealApi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, isLoading, isError } = useGetDataQuery("list.php?c=list");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories.</div>;

  return (
    <header className="relative">
      {/* Header */}
      <div className="grid h-24 bg-orange-400 grid-cols-2 items-center px-6">
        {/* Logo */}
        <div className="justify-self-start">
          <Link to="/" className="flex h-16 items-center gap-5">
            <img
              className="h-full w-auto object-contain"
              src="/logo.svg"
              alt="logo"
            />

            <span className="text-2xl font-bold text-white">Meal Finder</span>
          </Link>
        </div>

        {/* Hamburger */}
        <div className="justify-self-end">
          <button
            type="button"
            className="text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div className="flex justify-end">
          <nav className="w-64 absolute z-1 max-h-96 overflow-y-auto scrollbar-hide rounded-bl-xl border-t border-orange-300 bg-orange-400 px-6 py-4">
            <div className="flex flex-col gap-3">
              {data?.meals?.map((category: { strCategory: string }) => (
                <Link
                  key={category.strCategory}
                  to={`/category/${category.strCategory}`}
                  className="py-2 text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.strCategory}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
