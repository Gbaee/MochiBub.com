import { motion } from "framer-motion";

function Testimonials() {
  const testimonials = [
    {
      name: "Alma",
      text: "Mochinya lembut banget dan isiannya melimpah. Pasti repeat order!",
      avatar: "👩",
    },

    {
      name: "Dede",
      text: "Anak-anak di rumah suka banget. Rasanya enak dan tidak terlalu manis.",
      avatar: "👨",
    },

    {
      name: "Agus",
      text: "Pelayanannya cepat dan pengirimannya rapi. Recommended!",
      avatar: "🧑",
    },
  ];

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
            Apa Kata Pelanggan Kami?
          </h2>

          <p className="text-gray-600 mt-4">
            Kepuasan pelanggan adalah prioritas utama Mochi Bub.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
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
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
              bg-pink-50
              rounded-3xl
              p-8
              shadow-lg
              "
            >
              <div className="text-5xl mb-4">
                {item.avatar}
              </div>

              <div className="text-yellow-500 text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-700 italic mb-6">
                "{item.text}"
              </p>

              <h3 className="font-bold text-lg text-gray-800">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;