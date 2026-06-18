import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSeller();
  }, []);

  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/best-seller"
      );

      setProducts(response.data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Favorit Pelanggan
          </h2>

          <p className="text-gray-600 mt-4">
            Produk pilihan yang paling diminati pelanggan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
              "
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={
                    item.foto ||
                    "https://placehold.co/600x400"
                  }
                  alt={item.nama_produk}
                  className="
                    w-full
                    h-full
                    object-cover
                    hover:scale-110
                    transition
                    duration-500
                  "
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  {item.nama_produk}
                </h3>

                <div className="mt-3 text-yellow-500 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="mt-3 text-gray-500">
                  Produk terlaris berdasarkan pembelian pelanggan🔥
                </p>

                <p className="mt-5 text-2xl font-bold text-pink-500">
                  Rp{" "}
                  {Number(item.harga).toLocaleString(
                    "id-ID"
                  )}
                </p>

                <Link
                  to={`/product/${item.id}`}
                  className="
                    inline-block
                    mt-6
                    bg-pink-500
                    hover:bg-pink-600
                    text-white
                    px-6
                    py-3
                    rounded-full
                    font-semibold
                    transition
                  "
                >
                  Lihat Produk
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSeller;