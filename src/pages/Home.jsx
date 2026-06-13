import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import HireExpertCTA from '../components/HireExpertCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <HireExpertCTA />
    </>
  );
}
