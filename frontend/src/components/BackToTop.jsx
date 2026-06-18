import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () =>
      window.removeEventListener(
        "scroll",
        toggleVisibility
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 50,
          }}
          transition={{
            duration: 0.3,
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="
          fixed
          bottom-24
          right-6
          z-50
          bg-pink-500
          hover:bg-pink-600
          text-white
          w-14
          h-14
          rounded-full
          shadow-xl
          flex
          items-center
          justify-center
          text-2xl
          "
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;