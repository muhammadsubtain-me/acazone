import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import HireExpertCTA from '@/components/HireExpertCTA';

export const metadata = {
  title: 'Professional Academic Assistance & Tutoring',
  description:
    'Acezon provides expert, 24/7 academic assistance, subject tutoring, solved assignment samples, and technical report writing across engineering and computer science.',
};

export default function HomePage() {
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
