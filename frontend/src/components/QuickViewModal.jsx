import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/useCart";
import toast from "react-hot-toast";

function QuickViewModal({
  product,
  isOpen,
  onClose,
}) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      `${product.nama_produk} berhasil ditambahkan ke keranjang`
    );

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-[9998]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="
            fixed
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            z-[9999]
            w-[95%]
            max-w-4xl
            "
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
          >
            <div className="grid md:grid-cols-2">

              <div>
                <img
                  src={
                    product.foto ||
                    "https://placehold.co/600x400"
                  }
                  alt={product.nama_produk}
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />
              </div>

              <div className="p-8">

                <button
                  onClick={onClose}
                  className="
                  absolute
                  top-4
                  right-4
                  text-2xl
                  "
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold">
                  {product.nama_produk}
                </h2>

                <div className="mt-3 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="mt-4 text-pink-500 text-2xl font-bold">
                  Rp{" "}
                  {Number(product.harga).toLocaleString(
                    "id-ID"
                  )}
                </p>

                <p className="mt-5 text-gray-600">
                  {product.deskripsi}
                </p>

                <button
                  onClick={handleAddToCart}
                  className="
                  mt-8
                  w-full
                  bg-pink-500
                  text-white
                  py-4
                  rounded-2xl
                  hover:bg-pink-600
                  transition
                  "
                >
                  🛒 Tambah ke Keranjang
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default QuickViewModal;