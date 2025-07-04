import { Container } from '../ui/Container';
import { TestimonialsCarousel } from './testimonials/TestimonialsCarousel';
import { testimonials } from './testimonials/testimonials-data';

export function Testimonials() {
  return (
    <section className="relative w-full py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      <svg className="absolute top-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z" fill="#e5e7eb" />
      </svg>
      <div className="relative z-10 pt-8">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Témoignages
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ils nous font confiance
            </p>
          </div>

          <div className="mx-auto mt-16 mb-8 w-full max-w-6xl px-2 sm:px-0 overflow-hidden">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </Container>
      </div>
      <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,32 C480,0 960,64 1440,32 L1440,64 L0,64 Z" fill="#f3f4f6" />
      </svg>
    </section>
  );
}