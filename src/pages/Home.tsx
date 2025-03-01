import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Pricing } from '../components/home/Pricing';
import { FAQ } from '../components/home/FAQ';
import { Testimonials } from '../components/home/Testimonials';

export function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Testimonials />
    </div>
  );
}