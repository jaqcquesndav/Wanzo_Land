import { Users, Building2, Globe2, Award } from 'lucide-react';

const stats = [
  { name: 'Entreprises Partenaires', value: '500+', icon: Building2 },
  { name: 'PME Accompagnées', value: '2,000+', icon: Users },
  { name: 'Pays Couverts', value: '15', icon: Globe2 },
  { name: "Taux de Satisfaction", value: '98%', icon: Award },
];

export function Stats() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <div className="flex items-center justify-center gap-x-2">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                  <span>{stat.value}</span>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}