import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SolutionCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  image: string;
}

export function SolutionCard({ name, description, icon: Icon, href, features, image }: SolutionCardProps) {
  return (
    <Link
      to={href}
      className="group relative rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-[16/9] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
          <Icon className="h-6 w-6 text-white" />
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600">{description}</p>
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-gray-500 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center text-sm text-indigo-600 group-hover:text-indigo-500">
          En savoir plus
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}