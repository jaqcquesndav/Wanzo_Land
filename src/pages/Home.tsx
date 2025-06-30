import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Testimonials } from '../components/home/Testimonials';
import { RDCitiesMap } from '../components/home/RDCitiesMap';
import { AllInOneSection } from '../components/home/AllInOneSection';

export function Home() {
  return (
    <div className="bg-white space-y-0">
      <Hero />
      <Features />
      <AllInOneSection />
      <RDCitiesMap />
      <Testimonials />
    </div>
  );
}