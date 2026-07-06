import { motion } from "framer-motion";

function GlassCard({ children, className = "", dark = false, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`rounded-3xl p-6 shadow-[var(--shadow-soft)] ${dark ? "glass-dark" : "glass"} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;