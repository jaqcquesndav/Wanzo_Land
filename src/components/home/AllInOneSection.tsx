import React from 'react';
import { Container } from '../ui/Container';
import allInOneImg from '../../assets/images/allinone.png';
import stepAccount from '../../assets/images/step_account.svg';
import stepApps from '../../assets/images/step_apps.svg';
import stepEvaluation from '../../assets/images/step_evaluation.svg';
import stepFinance from '../../assets/images/step_finance.svg';

const floatingApps = [
  { label: 'Comptabilité', icon: stepAccount, group: 'PME', top: '15%', left: '60%' },
   { label: 'Vente', icon: stepAccount, group: 'PME', top: '18%', left: '85%' },
  { label: 'Facturation', icon: stepApps, group: 'PME', top: '35%', left: '60%' },
  { label: 'Inventaire', icon: stepApps, group: 'PME', top: '80%', left: '80%' },
  { label: 'Reporting', icon: stepEvaluation, group: 'Investisseurs', top: '10%', left: '25%' },
  { label: 'Analyse crédit', icon: stepFinance, group: 'Institutions', top: '80%', left: '20%' },
  { label: 'Scoring', icon: stepFinance, group: 'Institutions', top: '30%', left: '10%' },
  { label: 'Portail Investisseur', icon: stepEvaluation, group: 'Investisseurs', top: '90%', left: '50%' },
];

export function AllInOneSection() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">Une solution tout en un</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pensée pour vous satisfaire
          </p>
          <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto">
            La plateforme congolaise où PME, investisseurs et institutions financières se connectent et grandissent ensemble.
          </p>
        </div>
        <div className="relative flex justify-center items-center min-h-[520px]">
          {/* Image centrale */}
          <img src={allInOneImg} alt="Wanzo All In One" className="w-[1100px] h-[700px] max-w-full rounded-2xl shadow-2xl object-contain z-10 mx-auto" />
          {/* Apps flottantes */}
          {floatingApps.map((app) => (
            <div
              key={app.label}
              className="absolute flex flex-col items-center group"
              style={{ top: app.top, left: app.left, transform: 'translate(-50%, -50%)' }}
            >
              <div className="bg-white shadow-lg rounded-full p-3 border-2 border-primary group-hover:scale-110 transition-transform">
                <img src={app.icon} alt={app.label} className="w-8 h-8" />
              </div>
              <span className="mt-2 text-xs font-semibold text-gray-700 bg-white/80 px-2 py-1 rounded-full shadow">
                {app.label}
              </span>
              <span className="text-[10px] text-primary mt-0.5">{app.group}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
