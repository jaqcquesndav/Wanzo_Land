import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Testimonials } from '../components/home/Testimonials';
import { RDCitiesMap } from '../components/home/RDCitiesMap';

export function Home() {
  return (
    <div className="bg-white space-y-0">
      <Hero />
      <Features />
      <RDCitiesMap />
      <Testimonials />
    </div>
  );
}