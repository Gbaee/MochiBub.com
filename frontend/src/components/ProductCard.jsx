import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import QuickViewModal from "./QuickViewModal";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [showQuickView, setShowQuickView] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // LOAD FAVORITE STATUS
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem("favorites");
        const favorites = stored ? JSON.parse(stored) : [];

        setIsFavorite(favorites.includes(product.id));
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        setIsFavorite(false);
      }
    };

    loadFavorites();
  }, [product.id]);

  // HANDLE FAVORITE TOGGLE
  const handleFavorite = () => {
    try {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      let updatedFavorites;

      if (favorites.includes(product.id)) {
        updatedFavorites = favorites.filter(
          (id) => id !== product.id
        );

        toast("💔 Dihapus dari favorit");
        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, product.id];

        toast.success("❤️ Ditambahkan ke favorit");
        setIsFavorite(true);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Favorite update error:", error);
    }
  };

  // HANDLE ADD TO CART
  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      `${product.nama_produk} berhasil ditambahkan ke keranjang`
    );
  };

  return (
    <>
      <motion.div
        whileHover={{
          y: -12,
          rotateX: 5,
          rotateY: -5,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        duration-300
        group
        "
      >
        {/* IMAGE SECTION */}
        <div className="relative">

          <Link to={`/product/${product.id}`}>
            <motion.img
              src={
                product.foto ||
                "https://placehold.co/600x400"
              }
              alt={product.nama_produk}
              whileHover={{ scale: 1.08 }}
              className="h-56 w-full object-cover cursor-pointer"
            />
          </Link>

          {/* FAVORITE BUTTON */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleFavorite}
            className="
            absolute
            top-4
            right-4
            bg-white
            w-11
            h-11
            rounded-full
            shadow-lg
            text-xl
            flex
            items-center
            justify-center
            "
          >
            {isFavorite ? "❤️" : "🤍"}
          </motion.button>

          {/* QUICK VIEW */}
          <button
            onClick={() => setShowQuickView(true)}
            className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            bg-white
            text-gray-800
            px-4
            py-2
            rounded-full
            shadow-lg
            opacity-0
            group-hover:opacity-100
            transition
            "
          >
            👁 Quick View
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-5">
          <Link to={`/product/${product.id}`}>
            <h3 className="
              font-bold
              text-xl
              hover:text-pink-500
              transition
              cursor-pointer
            ">
              {product.nama_produk}
            </h3>
          </Link>

          <p className="text-gray-500 mt-2">
            {product.deskripsi}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-pink-500">
              Rp{" "}
              {Number(product.harga).toLocaleString("id-ID")}
            </span>

            <button
              onClick={handleAddToCart}
              className="
              bg-pink-500
              text-white
              px-4
              py-2
              rounded-full
              hover:bg-pink-600
              transition
              "
            >
              + Keranjang
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}

export default ProductCard;