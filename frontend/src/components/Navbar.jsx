import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/mochi-logo.jpeg";
import ProductSearch from "../components/ProductSearch";

function Navbar() {
  const { cart } = useCart();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [showMenu, setShowMenu] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const menuRef = useRef();

  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav
      className={`
      sticky
      top-0
      z-50
      transition-all
      duration-300

      ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-white shadow-md"
      }
      `}
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="
          flex
          items-center
          gap-3
          "
        >
          <img
            src={logo}
            alt="Mochi Bub"
            className="
            w-12
            h-12
            rounded-full
            object-cover
            border-2
            border-pink-300
            shadow
            "
          />

          <div>
            <h1
              className="
              text-2xl
              font-bold
              text-pink-500
              "
            >
              Mochi Bubb
            </h1>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Healthy Sweet, Guilt Free Treat
            </p>
          </div>
        </Link>

        <ProductSearch />

        {/* MENU */}
        <div
          className="
          flex
          items-center
          gap-8
          "
        >
          <Link
            to="/"
            className="
            font-medium
            text-gray-700
            hover:text-pink-500
            transition
            "
          >
            Home
          </Link>

          <Link
            to="/products"
            className="
            font-medium
            text-gray-700
            hover:text-pink-500
            transition
            "
          >
            Produk
          </Link>

          <Link
            to="/cart"
            className="
            relative
            font-medium
            text-gray-700
            hover:text-pink-500
            transition
            "
          >
            🛒 Keranjang

            {totalItems > 0 && (
              <span
                className="
                absolute
                -top-3
                -right-5
                bg-pink-500
                text-white
                text-xs
                font-bold
                rounded-full
                px-2
                py-1
                "
              >
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                className="
                flex
                items-center
                gap-3
                bg-pink-500
                text-white
                px-4
                py-2
                rounded-full
                hover:bg-pink-600
                transition
                shadow-md
                "
              >
                <div
                  className="
                  w-8
                  h-8
                  bg-white
                  text-pink-500
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  "
                >
                  {user.nama
                    ? user.nama
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </div>

                <span>
                  {user.nama || "User"}
                </span>

                <span>
                  {showMenu ? "▲" : "▼"}
                </span>
              </button>

              {showMenu && (
                <div
                  className="
                  absolute
                  right-0
                  mt-4
                  w-64
                  bg-white
                  rounded-3xl
                  shadow-2xl
                  border
                  overflow-hidden
                  animate-in
                  fade-in
                  zoom-in
                  "
                >
                  <div
                    className="
                    px-5
                    py-4
                    bg-pink-50
                    border-b
                    "
                  >
                    <p
                      className="
                      font-bold
                      text-gray-800
                      "
                    >
                      {user.nama}
                    </p>

                    <p
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      Selamat datang 👋
                    </p>
                  </div>

                  <Link
                    to="/my-orders"
                    className="
                    block
                    px-5
                    py-3
                    hover:bg-pink-50
                    "
                    onClick={() =>
                      setShowMenu(false)
                    }
                  >
                    📦 Pesanan Saya
                  </Link>

                  <Link
                    to="/favorites"
                    className="
                    block
                    px-5
                    py-3
                    hover:bg-pink-50
                    "
                    onClick={() =>
                      setShowMenu(false)
                    }
                  >
                    ❤️ Favorit
                  </Link>

                  <Link
                    to="/my-account"
                    className="
                    block
                    px-5
                    py-3
                    hover:bg-pink-50
                    "
                    onClick={() =>
                      setShowMenu(false)
                    }
                  >
                    ⚙️ Akun Saya
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
                    w-full
                    text-left
                    px-5
                    py-3
                    text-red-500
                    hover:bg-red-50
                    border-t
                    "
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="
              flex
              items-center
              gap-3
              "
            >
              <Link
                to="/login"
                className="
                bg-pink-500
                text-white
                px-5
                py-2
                rounded-full
                hover:bg-pink-600
                transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                border
                border-pink-500
                text-pink-500
                px-5
                py-2
                rounded-full
                hover:bg-pink-50
                transition
                "
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;