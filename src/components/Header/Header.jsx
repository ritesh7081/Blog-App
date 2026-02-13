import React, { useState } from "react";
import { LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm dark:bg-gray-900/70 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Logo />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Writely
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className={`relative group font-medium transition duration-300 cursor-pointer
                      ${
                        location.pathname === item.slug
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                      }`}
                  >
                    {item.name}

                    {/* Animated Underline */}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300
                        ${
                          location.pathname === item.slug
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </button>
                )
            )}

            {authStatus && <LogoutBtn />}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <span className="text-2xl font-semibold">&times;</span>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden px-6 pb-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 font-medium transition cursor-pointer
                      ${
                        location.pathname === item.slug
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                      }`}
                  >
                    {item.name}
                  </button>
                )
            )}

            {authStatus && <LogoutBtn />}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;