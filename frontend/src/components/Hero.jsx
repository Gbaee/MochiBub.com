import { Link } from "react-router-dom";
import heroImage from "../assets/DAIFUKU-STRAWBERRY.png";
import { motion, useScroll, useTransform } from "framer-motion";

function Hero() {
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const mochiY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section
      data-aos="fade"
      className="
      relative
      bg-gradient-to-r
      from-pink-100
      via-pink-200
      to-pink-300
      overflow-hidden
      "
    >
      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y: backgroundY }}
        className="
        absolute
        inset-0
        opacity-30
        pointer-events-none
        "
      >
        <div
          className="
          absolute
          top-0
          right-0
          w-[600px]
          h-[600px]
          bg-white
          rounded-full
          blur-3xl
          opacity-40
          "
        />
      </motion.div>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-20
        grid
        md:grid-cols-2
        items-center
        gap-12
        relative
        z-10
        "
      >
        {/* KIRI */}
        <div data-aos="fade-right">
          <span
            className="
            inline-block
            bg-white
            text-pink-500
            px-4
            py-2
            rounded-full
            font-semibold
            shadow-md
            mb-6
            "
          >
            Mochi Premium Tangerang
          </span>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-extrabold
            text-gray-800
            leading-tight
            "
          >
            Lembut di luar,
            <br />
            <span className="text-pink-500">lumer di dalam.</span>
          </h1>

          <p
            className="
            mt-6
            text-lg
            text-gray-700
            max-w-xl
            "
          >
            Nikmati mochi premium dengan berbagai varian rasa favorit keluarga
            Indonesia. Dibuat fresh setiap hari menggunakan bahan berkualitas.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="
    bg-pink-500
    hover:bg-pink-600
    text-white
    px-8
    py-4
    rounded-full
    font-bold
    shadow-lg
    hover:scale-105
    transition
    duration-300
    "
            >
              🛒 Pesan Sekarang
            </Link>

            <a
              href="#featured-products"
              className="
    bg-white
    hover:bg-gray-100
    text-pink-500
    border-2
    border-pink-500
    px-8
    py-4
    rounded-full
    font-bold
    shadow-lg
    hover:scale-105
    transition
    duration-300
    "
            >
              📋 Lihat Menu
            </a>
          </div>

          <div className="mt-10 flex gap-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">1K+</h3>
              <p className="text-gray-600">Mochi Terjual</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-800">4.9★</h3>
              <p className="text-gray-600">Rating Pelanggan</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-800">Fresh</h3>
              <p className="text-gray-600">Setiap Hari</p>
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div data-aos="fade-left" className="flex justify-center">
          <motion.img
            src={heroImage}
            alt="Mochi Bub"
            style={{ y: mochiY }}
            className="
            w-full
            max-w-md
            drop-shadow-2xl
            "
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
