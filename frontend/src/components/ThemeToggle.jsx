import { motion } from "framer-motion";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label="Ganti mode tampilan"
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-charcoal-700 dark:text-cream-100 transition-colors"
    >
      {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
    </motion.button>
  );
}

export default ThemeToggle;