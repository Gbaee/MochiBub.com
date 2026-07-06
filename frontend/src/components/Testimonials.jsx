import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { SectionTitle, GlassCard } from "./ui";

function SkeletonTestimonial() {
  return (
    <div className="rounded-3xl overflow-hidden glass animate-pulse p-6 space-y-4">
      <div className="h-8 w-8 bg-beige-200 rounded" />
      <div className="h-4 bg-beige-200 rounded w-full" />
      <div className="h-4 bg-beige-200 rounded w-3/4" />
      <div className="h-11 w-11 bg-beige-200 rounded-full mt-4" />
    </div>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reviews/testimonials",
      );
      setTestimonials(response.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-cream-50 overflow-hidden">
      <div
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,161,95,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionTitle
          eyebrow="Testimonials"
          title="Apa Kata Mereka"
          subtitle="Ulasan asli dari pelanggan yang sudah mencicipi Mochi Bub."
        />

        {status === "loading" && (
          <div className="grid md:grid-cols-3 gap-8">
            <SkeletonTestimonial />
            <SkeletonTestimonial />
            <SkeletonTestimonial />
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-16 glass rounded-3xl">
            <p className="text-charcoal-700/60">Ulasan sedang tidak dapat dimuat.</p>
          </div>
        )}

        {status === "success" && testimonials.length === 0 && (
          <div className="text-center py-16 glass rounded-3xl">
            <p className="text-charcoal-700/60">
              Belum ada ulasan pelanggan. Jadilah yang pertama memberi ulasan
              setelah pesananmu selesai!
            </p>
          </div>
        )}

        {status === "success" && testimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <GlassCard className="h-full relative" hover>
                  <FaQuoteLeft className="w-8 h-8 text-rose-200 mb-4" />

                  <p className="text-charcoal-800 italic leading-relaxed mb-6">
                    "{item.comment}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/50">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-gold-400 flex items-center justify-center text-white font-bold shrink-0">
                      {item.reviewer_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal-900 text-sm">
                        {item.reviewer_name}
                      </h3>
                      <div className="flex gap-0.5 text-gold-500 text-xs mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < item.rating ? "opacity-100" : "opacity-25"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;