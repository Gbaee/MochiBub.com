import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronDown,
} from "react-icons/hi";
import logo from "../assets/mochi-logo.jpeg";
import ProductSearch from "../components/ProductSearch";
import { Button } from "../components/ui";
import { NAV_LINKS } from "../constants/navigation";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef();

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass shadow-[var(--shadow-soft)]" : "bg-cream-50/90 dark:bg-charcoal-900/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="Mochi Bub"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-gold-400 shadow-[var(--shadow-soft)]"
            />
            <div className="hidden sm:block">
              <h1 className="font-display text-xl md:text-2xl font-bold text-charcoal-900 dark:text-cream-50 leading-tight">
                Mochi Bubb
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-gold-600">
                Health Sweet, Guilt Free Treat
              </p>
            </div>
          </Link>

          {/* SEARCH - hidden on small mobile, shown from md */}
          <div className="hidden md:block flex-1 max-w-xs">
            <ProductSearch />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium text-sm text-charcoal-700 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <ThemeToggle />

            <Link to="/cart" className="relative text-charcoal-700 hover:text-rose-500 transition-colors">
              <HiOutlineShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 bg-charcoal-900 text-cream-50 pl-2 pr-3 py-1.5 rounded-full hover:bg-charcoal-800 transition-colors"
                >
                  <div className="w-7 h-7 bg-gold-400 text-charcoal-900 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.nama ? user.nama.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm">{user.nama || "User"}</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform ${showMenu ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-64 glass rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b border-white/40">
                        <p className="font-semibold text-charcoal-900">{user.nama}</p>
                        <p className="text-xs text-charcoal-700/60">Selamat datang kembali</p>
                      </div>

                      <Link to="/my-orders" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal-700 hover:bg-rose-50/60">
                        <HiOutlineShoppingBag className="w-4 h-4" /> Pesanan Saya
                      </Link>
                      <Link to="/favorites" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal-700 hover:bg-rose-50/60">
                        <HiOutlineHeart className="w-4 h-4" /> Favorit
                      </Link>
                      <Link to="/my-account" onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal-700 hover:bg-rose-50/60">
                        <HiOutlineUser className="w-4 h-4" /> Akun Saya
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-left px-5 py-3 text-sm text-rose-600 hover:bg-rose-50/60 border-t border-white/40"
                      >
                        <HiOutlineLogout className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button to="/login" variant="outline" size="sm">Login</Button>
                <Button to="/register" variant="primary" size="sm">Register</Button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-charcoal-900"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Buka menu"
          >
            <HiOutlineMenu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-cream-50 z-[70] p-6 flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-charcoal-900">Menu</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button onClick={() => setIsMobileOpen(false)} aria-label="Tutup menu">
                    <HiOutlineX className="w-7 h-7 text-charcoal-900" />
                  </button>
                </div>
              </div>

              <ProductSearch />

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className="py-3 text-base font-medium text-charcoal-800 border-b border-beige-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between py-3 text-base font-medium text-charcoal-800 border-b border-beige-200"
                >
                  <span className="flex items-center gap-2">
                    <HiOutlineShoppingBag className="w-5 h-5" /> Keranjang
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>

              {user ? (
                <div className="flex flex-col gap-1 mt-auto">
                  <Link to="/my-account" onClick={() => setIsMobileOpen(false)} className="py-3 text-charcoal-700">Akun Saya</Link>
                  <button onClick={handleLogout} className="text-left py-3 text-rose-600">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-auto">
                  <Button to="/login" variant="outline" onClick={() => setIsMobileOpen(false)}>Login</Button>
                  <Button to="/register" variant="primary" onClick={() => setIsMobileOpen(false)}>Register</Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;