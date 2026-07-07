import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import promo1 from "../assets/BITES-LOTUS.png";
import promo2 from "../assets/MARSHMELLOW-CHOCO.png";
import promo3 from "../assets/CHOCO-FULL.png";
import promo4 from "../assets/BITES-MACHA.png";
import promo5 from "../assets/BITES-MANGGA.png";

function PromoCarousel() {
  const promos = [
    {
      title: "Kenalan dengan Rasa Baru!",
      subtitle: "Varian spesial Mochi Bub",
      desc: "Coba sensasi mochi dengan rasa terbaru yang siap jadi favoritmu.",
      image: promo1,
      badge: "NEW",
      searchKeyword: "lotus",
    },
    {
      title: "🎁 Bonus Topping Spesial",
      subtitle: "Khusus hari ini",
      desc: "Dapatkan tambahan topping pilihan yang bikin mochi makin nikmat.",
      image: promo2,
      badge: "BONUS",
      searchKeyword: "marshmallow",
    },
    {
      title: "🍫 Surga untuk Pecinta Cokelat",
      subtitle: "Mochi Chocolate Premium",
      desc: "Isi cokelat lumer yang selalu berhasil bikin susah berhenti ngemil.",
      image: promo3,
      badge: "LIMITED",
      searchKeyword: "choco",
    },
    {
      title: "🍡 Paket Hemat untuk Dinikmati",
      subtitle: "Lebih banyak, lebih hemat",
      desc: "Pilihan terbaik untuk berbagi momen manis bersama keluarga dan teman.",
      image: promo4,
      badge: "FAMILY PACK",
      searchKeyword: "matcha",
    },
    {
      title: "🥭 Sensasi Buah yang Menyegarkan",
      subtitle: "Tropical Mochi Series",
      desc: "Perpaduan rasa buah pilihan dengan tekstur mochi yang lembut.",
      image: promo5,
      badge: "SPECIAL",
      searchKeyword: "mangga",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-b from-pink-50 to-white dark:from-charcoal-900 dark:to-charcoal-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-cream-50">
            Promo Spesial ✨
          </h2>

          <p className="text-gray-500 dark:text-cream-100/50 mt-3">
            Spesial buat kamu yang lagi scroll, yuk ambil promonya sekarang juga!
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {promos.map((promo, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* IMAGE SECTION */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    {promo.badge}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-cream-50">
                    {promo.title}
                  </h3>

                  <p className="text-sm text-pink-500 mt-1 font-medium">
                    {promo.subtitle}
                  </p>

                  <p className="text-gray-500 dark:text-cream-100/50 mt-3 text-sm leading-relaxed">
                    {promo.desc}
                  </p>

                  <Link
                    to={`/products?search=${encodeURIComponent(promo.searchKeyword)}`}
                    className="mt-5 block w-full text-center py-2 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition"
                  >
                    Lihat Promo
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default PromoCarousel;