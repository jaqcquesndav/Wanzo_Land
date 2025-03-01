import { CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';

const paymentMethods = [
  {
    name: 'Carte bancaire',
    description: 'Visa, Mastercard, MaxiCash',
    icon: CreditCard,
  },
  {
    name: 'Mobile Money',
    description: 'M-Pesa, Orange Money, Airtel Money',
    icon: Smartphone,
  },
  {
    name: 'Virement bancaire',
    description: 'Transfert bancaire local',
    icon: Building2,
  },
  {
    name: 'PayPal',
    description: 'Paiement international sécurisé',
    icon: Wallet, // Remplacé Paypal par Wallet
  },
];

export function PaymentMethods() {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-sm font-medium text-gray-900">Moyens de paiement acceptés</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex-shrink-0">
              <method.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{method.name}</p>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}