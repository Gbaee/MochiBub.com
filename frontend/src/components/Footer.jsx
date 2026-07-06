import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram} from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { NAV_LINKS } from "../constants/navigation";
import { Button } from "./ui";

const CONTACTS = [
  {
    icon: FaWhatsapp,
    label: "+62 852-1360-7734",
    href: "https://wa.me/6285600829369",
  },
  // {
  //   icon: FaEnvelope,
  //   label: "mochibub@gmail.com",
  //   href: "mailto:mochibub@gmail.com",
  // },
  {
    icon: FaInstagram,
    label: "@cankitchen_",
    href: "https://www.instagram.com/cankitchen_?igsh=MWRuYWoxNG9nOGVydg==",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="font-display text-3xl font-bold text-cream-50">
            Mochi Bub
          </h2>

          <p className="text-xs tracking-[0.2em] uppercase text-gold-400 mt-1">
            Health Sweet, Guilt Free Treat
          </p>

          <p className="mt-5 text-sm text-cream-100/60 leading-relaxed max-w-xs">
            Mochi premium dengan rasa lembut, manis, dan dibuat fresh setiap
            hari menggunakan bahan berkualitas untuk memberikan pengalaman
            dessert terbaik.
          </p>

          {/* SOCIAL ICON */}
          <div className="flex gap-3 mt-6">
            {CONTACTS.map((c) => {
              const Icon = c.icon;

              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="
                    w-10
                    h-10
                    rounded-full
                    glass-dark
                    flex
                    items-center
                    justify-center
                    text-cream-100
                    hover:text-gold-400
                    transition-colors
                  "
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* MENU */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-5 text-cream-50">
            Menu
          </h3>

          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="
                  text-sm
                  text-cream-100/60
                  hover:text-gold-400
                  transition-colors
                "
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/cart"
              className="
                text-sm
                text-cream-100/60
                hover:text-gold-400
                transition-colors
              "
            >
              Keranjang
            </Link>
          </div>
        </div>

        {/* HUBUNGI KAMI */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-5 text-cream-50">
            Hubungi Kami
          </h3>

          <div className="flex flex-col gap-3">
            {CONTACTS.map((c) => {
              const Icon = c.icon;

              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2.5
                    text-sm
                    text-cream-100/60
                    hover:text-gold-400
                    transition-colors
                  "
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {c.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* JAM OPERASIONAL */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-5 text-cream-50 flex items-center gap-2">
            <HiOutlineClock className="w-5 h-5" />
            Jam Operasional
          </h3>

          <div className="text-sm text-cream-100/60 space-y-1 mb-6">
            <p>Rabu - Minggu : 10.00 - 22.00 WIB</p>
          </div>

          <Button
            href="https://www.instagram.com/cankitchen_?igsh=MWRuYWoxNG9nOGVydg=="
            variant="gold"
            size="sm"
          >
            Follow Instagram
          </Button>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-cream-100/40">
          © {year} Mochi Bub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;