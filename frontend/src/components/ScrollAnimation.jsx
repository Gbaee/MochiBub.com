import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

function ScrollAnimation() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });

    AOS.refresh();
  }, [location]);

  return null;
}

export default ScrollAnimation;