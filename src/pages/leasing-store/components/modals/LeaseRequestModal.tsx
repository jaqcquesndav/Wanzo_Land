import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Product } from '../../types';

interface LeaseRequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  mode?: 'leasing' | 'location' | 'achat'; // Ajout du mode
}

export function LeaseRequestModal({ product, isOpen, onClose, onSubmit, mode = 'leasing' }: LeaseRequestModalProps) {
  const [formData, setFormData] = useState({
    leasingCode: '',
    duration: '',
    financingType: '',
    deliveryAddress: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'leasing' && (!formData.leasingCode || !/^WL-\w{8}$/.test(formData.leasingCode))) {
      setError('Veuillez saisir un code de leasing valide (WL-XXXXXXXX).');
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-xl rounded-lg bg-white p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              {mode === 'leasing' && `Demande de Leasing - ${product.name}`}
              {mode === 'location' && `Demande de Location - ${product.name}`}
              {mode === 'achat' && `Achat échelonné - ${product.name}`}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          {mode === 'leasing' && (
            <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded">
              Vous devez avoir un <b>compte Wanzo actif</b> pour passer une commande de leasing.<br />
              Le <b>code de leasing</b> est généré dans l’app mobile ou l’app Financement PME.<br />
              Exemple de code : <span className="font-mono">WL-XXXXXXXX</span>
            </div>
          )}
          {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ code de leasing uniquement pour le mode leasing */}
            {mode === 'leasing' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Code de leasing <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.leasingCode}
                  onChange={(e) => setFormData({ ...formData, leasingCode: e.target.value.toUpperCase() })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                  placeholder="WL-XXXXXXXX"
                  required={mode === 'leasing'}
                  maxLength={11}
                />
              </div>
            ) : null}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Durée {mode === 'leasing' ? 'du Leasing' : mode === 'location' ? 'de la Location' : 'de paiement'}
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Sélectionnez une durée</option>
                {product.availableDurations?.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} mois
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {mode === 'leasing' ? 'Type de Financement' : mode === 'location' ? 'Type de Location' : 'Type de Paiement'}
              </label>
              <select
                value={formData.financingType}
                onChange={(e) => setFormData({ ...formData, financingType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Sélectionnez un type</option>
                {product.availableFinancing?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse de livraison <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Adresse complète de livraison"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message (optionnel)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={onClose} type="button">
                Annuler
              </Button>
              <Button type="submit">
                Envoyer la demande
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}