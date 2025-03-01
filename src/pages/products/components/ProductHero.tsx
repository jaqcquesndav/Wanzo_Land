import { ReactNode } from 'react';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';

interface ProductHeroProps {
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}

export function ProductHero({ title, description, image, children }: ProductHeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-indigo-100/20">
      <Container className="py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg">Demander une démo</Button>
              <Button variant="secondary" size="lg">En savoir plus</Button>
            </div>
            {children}
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}