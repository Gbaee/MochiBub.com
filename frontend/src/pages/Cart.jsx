import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  const navigate = useNavigate();

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-b
      from-white
      via-pink-50/40
      to-white
      py-10
      px-4
      relative
      overflow-hidden
    "
    >
      {/* BACKGROUND BLUR */}
      <div
        className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-pink-200/30
        rounded-full
        blur-[180px]
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        bg-fuchsia-200/30
        rounded-full
        blur-[180px]
      "
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            bg-pink-100
            text-pink-600
            font-semibold
            mb-5
          "
          >
            <FaShoppingBag />
            Keranjang Belanja
          </div>

          <h1
            className="
            text-5xl
            md:text-6xl
            font-black
            text-gray-900
          "
          >
            Shopping Cart
          </h1>

          <p
            className="
            text-gray-500
            mt-4
            text-lg
          "
          >
            Hampir sampai 🍡 Selesaikan pesanan Mochi Bub favoritmu
          </p>
        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
            max-w-xl
            mx-auto
            bg-white/70
            backdrop-blur-xl
            border
            border-white
            rounded-[32px]
            shadow-xl
            p-10
            text-center
          "
          >
            <div className="text-7xl mb-5">🍡</div>

            <h2
              className="
              text-3xl
              font-bold
              text-gray-900
            "
            >
              Keranjang Masih Kosong
            </h2>

            <p
              className="
              text-gray-500
              mt-3
              mb-8
            "
            >
              Belum ada produk yang ditambahkan.
            </p>

            <Link
              to="/products"
              className="
              inline-flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-pink-500
              via-fuchsia-500
              to-purple-500
              text-white
              font-bold
              shadow-lg
            "
            >
              Lihat Produk
              <FaArrowRight />
            </Link>
          </motion.div>
        ) : (
          <div
            className="
            grid
            lg:grid-cols-[1fr_400px]
            gap-8
          "
          >
            {/* PRODUCT LIST */}
            <div>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                  bg-white/70
                  backdrop-blur-xl
                  border
                  border-white
                  rounded-[30px]
                  p-6
                  mb-5
                  shadow-lg
                "
                >
                  <div className="flex justify-between">
                    <div>
                      <h3
                        className="
                        text-2xl
                        font-bold
                        text-gray-900
                      "
                      >
                        {item.nama_produk}
                      </h3>

                      <p
                        className="
                        text-pink-500
                        font-semibold
                        mt-2
                      "
                      >
                        Rp {Number(item.harga).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="
  w-12
  h-12
  flex
  items-center
  justify-center
  rounded-2xl
  bg-red-50
  text-red-500
  hover:bg-red-500
  hover:text-white
  transition-all
  duration-300
  shrink-0
"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  <div
                    className="
                    flex
                    justify-between
                    items-center
                    mt-8
                  "
                  >
                    <div
                      className="
                      flex
                      items-center
                      gap-3
                    "
                    >
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="
  w-11
  h-11
  flex
  items-center
  justify-center
  rounded-xl
  bg-pink-100
  text-pink-600
  hover:bg-pink-200
  transition-all
  duration-300
  shrink-0
"
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span
                        className="
  w-12
  text-center
  text-xl
  font-bold
  flex
  items-center
  justify-center
"
                      >
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="
  w-11
  h-11
  flex
  items-center
  justify-center
  rounded-xl
  bg-pink-500
  text-white
  hover:bg-pink-600
  transition-all
  duration-300
  shrink-0
"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    <div
                      className="
                      text-2xl
                      font-black
                      text-pink-500
                    "
                    >
                      Rp {Number(item.harga * item.qty).toLocaleString("id-ID")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SUMMARY */}
            <div>
              <div
                className="
                sticky
                top-24
                bg-white/80
                backdrop-blur-xl
                border
                border-white
                rounded-[32px]
                p-8
                shadow-xl
              "
              >
                <h2
                  className="
                  text-3xl
                  font-black
                  mb-8
                "
                >
                  Ringkasan
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jumlah Produk</span>

                    <span className="font-bold">{cart.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>

                    <span className="font-bold">
                      Rp {Number(totalPrice).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between">
                    <span
                      className="
                      text-xl
                      font-bold
                    "
                    >
                      Total
                    </span>

                    <span
                      className="
                      text-3xl
                      font-black
                      text-pink-500
                    "
                    >
                      Rp {Number(totalPrice).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="
                  mt-8
                  w-full
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  via-fuchsia-500
                  to-purple-500
                  text-white
                  font-bold
                  text-lg
                  shadow-lg
                  shadow-pink-500/30
                  hover:scale-[1.02]
                  transition
                  flex
                  justify-center
                  items-center
                  gap-3
                "
                >
                  Checkout Sekarang
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
