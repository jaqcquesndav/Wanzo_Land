import { Container } from '../ui/Container';
import { TestimonialsCarousel } from './testimonials/TestimonialsCarousel';
import { testimonials } from './testimonials/testimonials-data';

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ils nous font confiance
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </Container>
    </div>
  );
}