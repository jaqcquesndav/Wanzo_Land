import { Check, X } from 'lucide-react';
import { pricingFeatures } from '../data/pricing';

export function PricingComparison() {
  return (
    <div className="mt-24">
      <h3 className="text-2xl font-bold text-gray-900">Comparaison détaillée des fonctionnalités</h3>
      
      <div className="mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Fonctionnalité
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                  Starter
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                  Professional
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pricingFeatures.map((feature) => (
                <tr key={feature.name}>
                  <td className="py-4 pl-4 pr-3 text-sm text-gray-900">{feature.name}</td>
                  {feature.tiers.map((included, idx) => (
                    <td key={idx} className="px-3 py-4 text-center">
                      {included ? (
                        <Check className="mx-auto h-5 w-5 text-indigo-600" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-400" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}