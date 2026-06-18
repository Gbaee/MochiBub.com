import Hero from "../components/Hero";
import PromoCarousel from "../components/PromoCarousel";
import BestSeller from "../components/BestSeller";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Products from "./Products";

function Home() {
  return (
    <>
      <Hero />

      <PromoCarousel />

      <BestSeller />

      <WhyChooseUs />

      <section id="featured-products">
        <Products />
      </section>

      <Testimonials />
    </>
  );
}

export default Home;