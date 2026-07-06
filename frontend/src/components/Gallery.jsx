import { motion } from "framer-motion";
import { SectionTitle } from "./ui";

// Foto diambil dari asset produk yang sudah ada.
// Nanti kalau punya foto proses produksi/kios asli, tinggal ganti import ini.
import galleryImg1 from "../assets/hero.png";
import galleryImg2 from "../assets/mochi-warna.jpg";
import galleryImg3 from "../assets/mochi-warna2.jpg";
import galleryImg4 from "../assets/CHOCO-FULL.png";
import galleryImg5 from "../assets/DAIFUKU-STRAWBERRY.png";
import galleryImg6 from "../assets/MANGGA CREAM.png";

const GALLERY_IMAGES = [
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg4,
  galleryImg5,
  galleryImg6,
];

function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionTitle
          eyebrow="Gallery"
          title="Momen Mochi Bub"
          subtitle="Sekilas keindahan setiap kreasi mochi kami."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
            >
              <img
                src={img}
                alt={`Mochi Bub gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;