import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { SectionTitle, Button } from "./ui";

import igImg1 from "../assets/BITES CHOCO.png";
import igImg2 from "../assets/BITES STRAWBERRY.png";
import igImg3 from "../assets/BITES TARO.png";
import igImg4 from "../assets/BITES-LOTUS.png";
import igImg5 from "../assets/OREO CREAM.png";
import igImg6 from "../assets/YUPPI BLUBERRY.png";

const IG_IMAGES = [igImg1, igImg2, igImg3, igImg4, igImg5, igImg6];
const INSTAGRAM_URL = "https://www.instagram.com/cankitchen_?igsh=MWRuYWoxNG9nOGVydg==";

function InstagramFeed() {
  return (
    <section className="py-24 md:py-32 bg-rose-50/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionTitle
          eyebrow="Follow Us"
          title="Follow Our Journey"
          subtitle="@cankitchen_ — ikuti update rasa terbaru dan promo eksklusif."
        />

        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-10">
          {IG_IMAGES.map((img, index) => (
            <motion.a
              key={index}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-2xl aspect-square group"
            >
              <img
                src={img}
                alt={`Instagram Mochi Bub ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-colors duration-300 flex items-center justify-center">
                <FaInstagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <Button href={INSTAGRAM_URL} variant="outline" size="md">
            <FaInstagram className="w-4 h-4" /> @cankitchen_
          </Button>
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;