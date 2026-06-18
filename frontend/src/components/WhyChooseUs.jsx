import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      icon: "🍡",
      title: "Fresh Setiap Hari",
      description:
        "Dibuat menggunakan bahan pilihan untuk menjaga cita rasa terbaik.",
    },

    {
      icon: "🚚",
      title: "Pengiriman Cepat",
      description:
        "Pesanan diproses dengan cepat agar mochi tetap segar sampai tujuan.",
    },

    {
      icon: "⭐",
      title: "Rating Tinggi",
      description:
        "Banyak pelanggan memberikan ulasan positif dan melakukan repeat order.",
    },

    {
      icon: "🎁",
      title: "Cocok Untuk Semua Momen",
      description:
        "Teman santai, hadiah spesial, hingga acara keluarga.",
    },
  ];

  return (
    <section className="bg-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Kenapa Memilih Mochi Bub?
          </h2>

          <p className="text-gray-600 mt-4">
            Alasan kenapa pelanggan terus kembali memesan mochi favoritnya.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
              text-center
              "
            >
              <div className="text-6xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;