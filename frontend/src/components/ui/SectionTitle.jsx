import { motion } from "framer-motion";

function SectionTitle({ eyebrow, title, subtitle, align = "center", dark = false }) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col ${alignClass} max-w-2xl mb-14`}
    >
      {eyebrow && (
        <span className={`text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-3 ${dark ? "text-gold-400" : "text-rose-500"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-5xl font-bold leading-tight ${dark ? "text-cream-50" : "text-charcoal-900 dark:text-cream-50"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm md:text-base leading-relaxed ${dark ? "text-cream-200/80" : "text-charcoal-700/70 dark:text-cream-100/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionTitle;