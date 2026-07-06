import heroImage from "../assets/DAIFUKU-STRAWBERRY.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineViewGrid } from "react-icons/hi";
import { FaHeart, FaStar, FaLeaf } from "react-icons/fa";
import { Button } from "./ui";

const STATS = [
  { icon: FaHeart, value: "1K+", label: "Mochi Terjual" },
  { icon: FaStar, value: "4.9", label: "Rating Pelanggan" },
  { icon: FaLeaf, value: "Fresh", label: "Setiap Hari" },
];

function Hero() {
  const { scrollY } = useScroll();
  const mochiY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream-50 via-rose-50 to-rose-100">
      {/* AURORA BLOBS - bergerak pelan, ciri khas luxury design */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 65%)",
        }}
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -left-16 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,161,95,0.15) 0%, transparent 65%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(252,228,236,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 items-center gap-10 relative z-10 min-h-screen py-24 md:py-0">
        {/* ===== KIRI ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 glass text-rose-600 px-5 py-2 rounded-full font-semibold text-xs md:text-sm mb-8 tracking-wide">
            Mochi Premium Tangerang
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-[1.1] mb-6 tracking-tight">
            Lembut di luar,
            <br />
            <span className="text-rose-500">lumer di dalam.</span>
          </h1>

          <p className="text-charcoal-700/70 max-w-sm leading-relaxed mb-10 text-sm md:text-base">
            Nikmati mochi premium dengan berbagai varian rasa favorit keluarga
            Indonesia. Dibuat fresh setiap hari menggunakan bahan berkualitas.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Button to="/products" variant="primary" size="lg">
              <HiOutlineShoppingBag className="w-5 h-5" /> Pesan Sekarang
            </Button>
            <Button href="#best-seller" variant="outline" size="lg">
              <HiOutlineViewGrid className="w-5 h-5" /> Lihat Menu
            </Button>
          </div>

          <div className="flex gap-8 sm:gap-10">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center glass text-rose-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 leading-none">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-charcoal-700/50 mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ===== KANAN ===== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center items-center relative min-h-[420px] md:min-h-[500px]"
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "420px",
              height: "420px",
              background:
                "radial-gradient(circle, rgba(255,128,171,0.35) 0%, rgba(255,214,231,0.2) 50%, transparent 75%)",
            }}
          />

          <div className="absolute top-6 right-2 z-20 w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center text-center font-bold glass shadow-[var(--shadow-glow-gold)] border-2 border-gold-400">
            <span className="text-gold-600 text-[9px] leading-tight">
              PREMIUM
            </span>
            <span className="text-gold-600 text-[9px] leading-tight">
              QUALITY
            </span>
            <span className="text-gold-400 text-[8px] mt-0.5">✦ ✦ ✦</span>
          </div>

          <motion.img
            src={heroImage}
            alt="Mochi Bub"
            className="relative z-10 rounded-3xl"
            style={{
              y: mochiY,
              width: "100%",
              maxWidth: "420px",
              filter: "drop-shadow(0 30px 60px rgba(233,30,140,0.25))",
            }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
