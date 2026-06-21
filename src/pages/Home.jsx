import useSEO from '@/hooks/useSEO';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import HireExpertCTA from '@/components/HireExpertCTA';

export default function Home() {
  useSEO(
    'Professional Academic Assistance & Tutoring',
    'Acezon provides expert, 24/7 academic assistance, subject tutoring, solved assignment samples, and technical report writing across engineering and computer science.'
  );

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
