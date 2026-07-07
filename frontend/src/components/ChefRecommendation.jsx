import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import fallbackImage from "../assets/mochi-hero.jpg";
import { SectionTitle, Button } from "./ui";

function ChefRecommendation() {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/best-seller",
      );
      if (response.data.length > 0) {
        setProduct(response.data[0]);
        setStatus("success");
      } else {
        setStatus("empty");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Kalau data belum ada / gagal, section tidak ditampilkan sama sekali
  // — lebih baik daripada tampil kosong/aneh di homepage
  if (status !== "success" || !product) return null;

  return (
    <section className="py-24 md:py-32 bg-rose-50/40 dark:bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative order-2 md:order-1"
        >
          <div className="absolute -inset-4 rounded-[2rem] glass" />
          <img
            src={product.foto || fallbackImage}
            alt={product.nama_produk}
            className="relative rounded-3xl w-full h-[420px] object-cover shadow-[var(--shadow-soft)]"
          />
        </motion.div>

        <div className="order-1 md:order-2">
          <SectionTitle
            align="left"
            eyebrow="Chef's Recommendation"
            title="Today's Recommendation"
          />

          <h3 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-50 -mt-8 mb-3">
            {product.nama_produk}
          </h3>

          {product.review_count > 0 && (
            <div className="flex items-center gap-1 text-gold-500 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(product.avg_rating) ? "opacity-100" : "opacity-25"}
                />
              ))}
              <span className="text-xs text-charcoal-700/50 ml-1">
                {Number(product.avg_rating).toFixed(1)} ({product.review_count} ulasan)
              </span>
            </div>
          )}

          <p className="text-charcoal-700/70 dark:text-cream-100/60 leading-relaxed mb-6 max-w-md">
            {product.deskripsi}
          </p>

          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-gold-600 mb-6">
            <HiOutlineSparkles className="w-3.5 h-3.5" /> Pilihan Terlaris Kami
          </div>

          <p className="font-display text-2xl font-bold text-rose-500 mb-6">
            Rp {Number(product.harga).toLocaleString("id-ID")}
          </p>

          <Button to={`/product/${product.id}`} variant="primary" size="lg">
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ChefRecommendation;