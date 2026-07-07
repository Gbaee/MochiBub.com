import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

function AiInsightBanner({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-rose-600 to-rose-400 text-white rounded-3xl p-6 mb-8 shadow-[var(--shadow-glow-rose)] flex items-start gap-4"
    >
      <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
        <HiSparkles className="w-5 h-5" />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold mb-1">AI Admin Assistant</h2>
        <p className="text-white/90 text-sm">{insight}</p>
      </div>
    </motion.div>
  );
}

export default AiInsightBanner;