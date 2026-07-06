import { motion } from "framer-motion";
import { FaBreadSlice, FaGem, FaHandHoldingHeart, FaTruck } from "react-icons/fa";
import storyImage from "../assets/mochi-warna.jpg";
import { SectionTitle } from "./ui";

const PROCESS_STEPS = [
  { icon: FaBreadSlice, label: "Fresh Dough" },
  { icon: FaGem, label: "Premium Filling" },
  { icon: FaHandHoldingHeart, label: "Handcrafted" },
  { icon: FaTruck, label: "Delivered" },
];

function OurStory() {
  return (
    <section className="relative py-24 md:py-32 bg-cream-50 overflow-hidden">
      {/* Aurora blob halus di background, konsisten dengan Hero */}
      <div
        className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,161,95,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-14 items-center relative z-10">
        {/* ===== KIRI: STORY + TIMELINE ===== */}
        <div>
          <SectionTitle
            align="left"
            eyebrow="Since 2025"
            title={
              <>
                Every Mochi
                <br />
                Starts With Love.
              </>
            }
            subtitle="Kami percaya bahwa mochi terbaik dibuat setiap hari, bukan diproduksi massal. Setiap adonan digulung dengan tangan, setiap isian dipilih dengan cermat — supaya rasa yang sampai ke Anda selalu terasa fresh."
          />

          {/* TIMELINE PROSES */}
          <div className="relative flex justify-between mt-4 max-w-md">
            {/* garis penghubung */}
            <div className="absolute top-6 left-6 right-6 h-[2px] bg-beige-300" />

            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center gap-2 w-16"
                >
                  <div className="w-12 h-12 rounded-full bg-cream-50 border-2 border-gold-400 flex items-center justify-center text-gold-600 shadow-[var(--shadow-soft)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] text-center text-charcoal-700/70 font-medium leading-tight">
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== KANAN: FOTO DENGAN FRAME GLASS ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] glass" />
          <img
            src={storyImage}
            alt="Proses pembuatan Mochi Bub"
            className="relative rounded-3xl w-full h-[420px] object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-6 py-4 shadow-[var(--shadow-glow-gold)]">
            <p className="font-display text-2xl font-bold text-charcoal-900">100%</p>
            <p className="text-xs text-charcoal-700/60">Handmade Fresh</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default OurStory;