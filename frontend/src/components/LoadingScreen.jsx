import { motion } from "framer-motion";
import logo from "../assets/mochi-logo.jpeg";

function LoadingScreen() {
  return (
    <motion.div
      className="
      fixed
      inset-0
      z-[9999]
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-white
      via-pink-50
      to-white
      "
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow Effect */}
      <div className="relative flex items-center justify-center">
        <div
          className="
          absolute
          w-52
          h-52
          bg-pink-300
          rounded-full
          blur-3xl
          opacity-30
          "
        />

        <motion.img
          src={logo}
          alt="Mochi Bub"
          className="
          relative
          w-40
          h-40
          object-cover
          rounded-full
          shadow-2xl
          border-4
          border-white
          "
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.h1
        className="
        mt-8
        text-4xl
        font-extrabold
        text-pink-600
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        Mochi Bub
      </motion.h1>

      <motion.p
        className="
        mt-3
        text-gray-600
        text-center
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
        }}
      >
        Menyiapkan mochi terbaik untukmu...
      </motion.p>

      <div
        className="
        mt-8
        w-64
        h-2
        bg-pink-100
        rounded-full
        overflow-hidden
        shadow-inner
        "
      >
        <motion.div
          className="
          h-full
          bg-pink-500
          rounded-full
          "
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.p
        className="
        mt-4
        text-sm
        text-gray-500
        "
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}

export default LoadingScreen;