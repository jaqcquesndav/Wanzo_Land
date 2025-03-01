import { Hero } from './Hero';
import { Features } from './Features';
import { Stats } from './Stats';
import { Benefits } from './Benefits';
import { LeasingSection } from './LeasingSection';
import { Testimonials } from './Testimonials';
import { PartnerLogos } from './PartnerLogos';
import { StatsCounter } from './stats/StatsCounter';

export function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <StatsCounter />
      <Stats />
      <Features />
      <LeasingSection />
      <Benefits />
      <PartnerLogos />
      <Testimonials />
    </div>
  );
}