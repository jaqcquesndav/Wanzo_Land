import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Package, Truck, Factory } from 'lucide-react';

const categories = [
  {
    name: 'Équipements IT',
    icon: Package,
    description: 'Serveurs, ordinateurs, et matériel réseau',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Véhicules',
    icon: Truck,
    description: 'Flotte et véhicules professionnels',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Machines',
    icon: Factory,
    description: 'Équipements de production industrielle',
    image: 'https://images.unsplash.com/photo-1565439322945-e56aca643d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

export function LeasingSection() {
  return (
    <div className="bg-gray-50 py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Solutions de Leasing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Équipez votre entreprise sans investissement initial avec nos solutions 
            de leasing flexibles et adaptées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/products/financing" 
                className="group block relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products/financing"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-indigo-500 transition-colors"
          >
            Découvrir nos solutions de financement
          </Link>
        </div>
      </Container>
    </div>
  );
}