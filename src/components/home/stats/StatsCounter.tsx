import { Users, ArrowUpRight, Database } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Container } from '../../ui/Container';

const stats = [
  {
    name: 'Utilisateurs connectés',
    value: 2500,
    icon: Users,
    suffix: '+',
    color: 'bg-blue-500',
  },
  {
    name: 'Volume des transactions',
    value: 150,
    prefix: '$',
    suffix: 'M',
    icon: ArrowUpRight,
    color: 'bg-green-500',
  },
  {
    name: 'Données sous gestion',
    value: 500,
    suffix: 'TB',
    icon: Database,
    color: 'bg-purple-500',
  },
];

export function StatsCounter() {
  return (
    <div className="relative -mt-12 mb-12">
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 ${stat.color} opacity-10 rounded-full blur-2xl`} />
              <div className="relative">
                <div className={`inline-flex items-center justify-center rounded-lg ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-base text-gray-600">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}