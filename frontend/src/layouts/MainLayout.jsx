import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import BackToTop from "../components/BackToTop";

function MainLayout({ children }) {
  const location = useLocation();

  const hiddenRoutes = [
    "/login",
    "/register",
  ];

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  const hideLayout =
    hiddenRoutes.includes(location.pathname) ||
    isAdminRoute;

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "20px",
        }}
      >
        {children}
      </main>

      <Footer />

      <FloatingWhatsapp />

      <BackToTop />
    </>
  );
}

export default MainLayout;