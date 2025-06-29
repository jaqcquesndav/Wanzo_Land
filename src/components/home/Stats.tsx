import { Users, Building2, Globe2, Award } from 'lucide-react';

const stats = [
  { name: 'Entreprises Partenaires', value: '500+', icon: Building2 },
  { name: 'PME Accompagnées', value: '2,000+', icon: Users },
  { name: 'Pays Couverts', value: '15', icon: Globe2 },
  { name: "Taux de Satisfaction", value: '98%', icon: Award },
];

export function Stats() {
  return (
    <section className="relative w-full py-16" style={{ background: 'linear-gradient(180deg, #e5e7eb 0%, #f3f4f6 100%)' }}>
      <svg className="absolute top-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z" fill="#f3f4f6" />
      </svg>
      <div className="relative z-10">
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    <div className="flex items-center justify-center gap-x-2">
                      <stat.icon className="h-8 w-8 text-primary" />
                      <span>{stat.value}</span>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,32 C480,0 960,64 1440,32 L1440,64 L0,64 Z" fill="#e5e7eb" />
      </svg>
    </section>
  );
}