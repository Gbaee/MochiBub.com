import { motion } from "framer-motion";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineDocumentDownload,
  HiOutlineLogout,
  HiOutlineCog,
} from "react-icons/hi";

function IconButton({ icon: Icon, onClick, title, variant = "neutral" }) {
  const variants = {
    neutral: "bg-charcoal-900 text-cream-50 dark:bg-cream-100 dark:text-charcoal-900",
    primary: "bg-rose-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      title={title}
      onClick={onClick}
      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${variants[variant]}`}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
}

function AdminHeader({ darkMode, onToggleDarkMode, onExportPDF, onLogout, onKelolaProduk }) {
  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-[var(--shadow-soft)] p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 transition-colors duration-300">
      <div>
        <p className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-1">
          Admin Panel
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 dark:text-cream-50">
          Dashboard Admin
        </h1>
        <p className="text-charcoal-700/50 dark:text-cream-100/50 mt-1 text-sm">
          Kelola pesanan dan pantau penjualan Mochi Bub
        </p>
      </div>

      <div className="flex gap-3">
        <IconButton icon={darkMode ? HiOutlineSun : HiOutlineMoon} onClick={onToggleDarkMode} title="Mode Gelap" />
        <IconButton icon={HiOutlineDocumentDownload} onClick={onExportPDF} title="Export PDF" variant="primary" />
        <IconButton icon={HiOutlineCog} onClick={onKelolaProduk} title="Kelola Produk" />
        <IconButton icon={HiOutlineLogout} onClick={onLogout} title="Logout" variant="danger" />
      </div>
    </div>
  );
}

export default AdminHeader;