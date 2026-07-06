import { motion } from "framer-motion";
import {
  FaLeaf,
  FaBookOpen,
  FaClock,
  FaShippingFast,
  FaSmile,
  FaShieldAlt,
} from "react-icons/fa";
import { SectionTitle, GlassCard } from "./ui";

const FEATURES = [
  {
    icon: FaLeaf,
    title: "Premium Ingredients",
    description: "Bahan pilihan berkualitas tinggi untuk menjaga cita rasa terbaik di setiap gigitan.",
  },
  {
    icon: FaBookOpen,
    title: "Authentic Recipe",
    description: "Resep autentik ala Jepang yang dijaga konsistensinya sejak pertama kali dibuat.",
  },
  {
    icon: FaClock,
    title: "Fresh Everyday",
    description: "Diproduksi setiap hari, bukan disimpan lama — mochi selalu terasa fresh.",
  },
  {
    icon: FaShippingFast,
    title: "Fast Delivery",
    description: "Pesanan diproses dan dikirim cepat agar mochi tetap dalam kondisi terbaik.",
  },
  {
    icon: FaSmile,
    title: "Friendly Service",
    description: "Tim kami siap membantu dari pemesanan hingga mochi sampai di tangan Anda.",
  },
  {
    icon: FaShieldAlt,
    title: "Quality Guaranteed",
    description: "Kami menjamin setiap produk yang keluar sudah melalui standar kualitas kami.",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 bg-rose-50/40 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionTitle
          eyebrow="The Experience"
          title="The Mochi Bub Experience"
          subtitle="Bukan sekadar menjual mochi — ini komitmen kami di setiap detail, dari bahan hingga sampai ke tangan Anda."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <GlassCard className="h-full text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-[var(--shadow-glow-rose)] mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-charcoal-700/60 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;