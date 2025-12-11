import { useState } from "react";
import {
  HiMenuAlt3,
  HiX,
  HiSearch,
  HiUser,
  HiLogout,
  HiSparkles,
} from "react-icons/hi";
import { useAuth } from "../../hooks and contexts/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function LocalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, authLoading, logout } = useAuth();

  const info = useAuth();
  console.log(info?.user);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // if (authLoading)
  //   return (
  //     <span className="skeleton skeleton-text">
  //       Authentication in process...
  //     </span>
  //   );

  return (
    <nav className="bg-white font-crimson shadow-sm border-b border-neutral sticky top-0 z-50">
      <div className="max-w-[90dvw] mx-auto ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6 text-primary" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6 text-primary" />
              )}
            </button>

            {/* Logo */}
            <a href="/" className="flex  items-center gap-2 group">
              <div className="w-9 h-9 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-sm">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary hidden sm:block">
                StyleDecor
              </span>
            </a>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, decorators..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right: Nav Links & Auth */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
              {user && (
                <Link
                  className="bg-linear-to-br from-accent-light to-gray-200 py-1 px-2 rounded-lg hover:scale-105 transition-all ease-in duration-200"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Section */}
            {authLoading ? (
              <div>
                {" "}
                <span className="loading loading-ring loading-xl  text-yellow-500 [--loading-border:10px]"></span>
              </div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="flex items-center gap-2 p-1.5 hover:bg-secondary rounded-lg transition-all"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-accent"
                  />
                </button>
                <div
                  tabIndex={0}
                  className="dropdown-content mt-3 w-64 bg-white rounded-xl shadow-lg border border-neutral p-3"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-3 pb-3 border-b border-neutral">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-accent"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Dashboard Link */}
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 mt-2 text-sm text-gray-700 hover:bg-secondary rounded-lg transition-all"
                  >
                    <HiUser className="w-4 h-4 text-primary" />
                    Dashboard
                  </a>

                  {/* Be a Decorator */}
                  <a
                    href="/become-decorator"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-accent hover:bg-secondary rounded-lg transition-all font-medium"
                  >
                    <HiSparkles className="w-4 h-4" />
                    Be a Decorator
                  </a>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();
                      console.log("user logged out!");
                      navigate("/");
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all border-t border-neutral pt-3"
                  >
                    <HiLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  //   onClick={() => setIsLoggedIn(true)}
                  className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral py-4 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, decorators..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary hover:text-primary rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <div className="pt-3 border-t border-neutral space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-secondary rounded-lg transition-all"
                >
                  <HiUser className="w-4 h-4 text-primary" />
                  Dashboard
                </a>
                <a
                  href="/become-decorator"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:bg-secondary rounded-lg transition-all font-medium"
                >
                  <HiSparkles className="w-4 h-4" />
                  Be a Decorator
                </a>
                <button
                  onClick={() => {
                    logout();
                    console.log("user logged out!");
                    navigate("/");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <HiLogout className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-3 border-t border-neutral">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary rounded-lg transition-all"
                >
                  Login
                </Link>
                <Link
                  to="registration"
                  //   onClick={() => setIsLoggedIn(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
