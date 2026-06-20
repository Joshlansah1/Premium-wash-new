import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import FinalCTA from "./FinalCTA";
import LocationsMap from "./LocationsMap";
import usePageTitle from "../../hooks/usePageTitle";
import { usePageMeta } from "../../hooks/usePageMeta";
import AnimatedBackground from "../../ui/AnimatedBackground";

const Home = () => {
  usePageTitle("Homepage");
  usePageMeta({
    title: "Premium Wash Laundry - Professional Laundry Services in Ghana",
    description:
      "Premium Wash is your trusted laundry service provider in Ghana. Offering fast, reliable, and affordable laundry solutions with free pickup and delivery.",
    keywords:
      "laundry service, laundry near me, dry cleaning, premium wash, Ghana laundry",
    canonical: "https://www.premiumwashgh.com",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  });
  return (
    <>
      <AnimatedBackground />
      <Hero />

      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <FinalCTA />
      <LocationsMap />
    </>
  );
};

export default Home;
