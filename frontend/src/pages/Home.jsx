import Hero from "../components/Hero";
import PromoCarousel from "../components/PromoCarousel";
import OurStory from "../components/OurStory";
import BestSeller from "../components/BestSeller";
import ChefRecommendation from "../components/ChefRecommendation";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import InstagramFeed from "../components/InstagramFeed";

function Home() {
  return (
    <>
      <Hero />
      <PromoCarousel />
      <OurStory />
      <BestSeller />
      <ChefRecommendation />
      <WhyChooseUs />
      <Gallery />
      <InstagramFeed />
      <Testimonials />
    </>
  );
}

export default Home;