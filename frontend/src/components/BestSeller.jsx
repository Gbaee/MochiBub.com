import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import fallbackImage from "../assets/mochi-hero.jpg";
import { SectionTitle, Button } from "./ui";

function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden glass animate-pulse">
      <div className="h-72 bg-beige-200" />
      <div className="p-8 space-y-3">
        <div className="h-5 bg-beige-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-beige-200 rounded w-1/2 mx-auto" />
        <div className="h-8 bg-beige-200 rounded w-2/5 mx-auto mt-4" />
      </div>
    </div>
  );
}

function BestSeller() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    fetchBestSeller();
  }, []);

  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/best-seller",
      );
      setProducts(response.data.slice(0, 3));
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="best-seller"
      className="py-24 md:py-32 bg-cream-50 dark:bg-charcoal-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionTitle
          eyebrow="Best Seller"
          title="Premium Collection"
          subtitle="Pilihan mochi paling diminati, dibuat fresh setiap hari dari bahan berkualitas premium."
        />

        {status === "loading" && (
          <div className="grid md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-16 glass rounded-3xl">
            <p className="text-charcoal-700/60">
              Produk sedang tidak dapat dimuat. Silakan coba beberapa saat lagi.
            </p>
          </div>
        )}

        {status === "success" && products.length === 0 && (
          <div className="text-center py-16 glass rounded-3xl">
            <p className="text-charcoal-700/60">
              Belum ada produk best seller saat ini.
            </p>
          </div>
        )}

        {status === "success" && products.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-charcoal-800 shadow-[var(--shadow-soft)]"
              >
                {/* BADGE */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-[11px] font-semibold text-gold-600">
                  <HiOutlineSparkles className="w-3.5 h-3.5" /> Chef's Choice
                </div>

                <div className="h-72 overflow-hidden">
                  <img
                    src={item.foto || fallbackImage}
                    alt={item.nama_produk}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 text-center">
                  <h3 className="font-display text-2xl font-bold text-charcoal-900 dark:text-cream-50">
                    {item.nama_produk}
                  </h3>

                  {/* Rating asli dari sistem review, bukan lagi placeholder */}
                  {item.review_count > 0 && (
                    <div className="mt-2 flex justify-center items-center gap-1 text-gold-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(item.avg_rating)
                              ? "opacity-100"
                              : "opacity-25"
                          }
                        />
                      ))}
                      <span className="text-xs text-charcoal-700/50 ml-1">
                        {Number(item.avg_rating).toFixed(1)} (
                        {item.review_count})
                      </span>
                    </div>
                  )}

                  <p className="mt-3 text-sm text-charcoal-700/60 dark:text-cream-100/50">
                    Produk terlaris berdasarkan pembelian pelanggan
                  </p>

                  <p className="mt-5 font-display text-2xl font-bold text-rose-500">
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </p>

                  <div className="mt-6">
                    <Button
                      to={`/product/${item.id}`}
                      variant="primary"
                      size="md"
                    >
                      Lihat Produk
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BestSeller;
