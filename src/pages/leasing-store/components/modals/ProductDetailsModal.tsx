import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Product } from '../../types';

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onLeaseRequest: () => void;
}

export function ProductDetailsModal({ 
  product, 
  isOpen, 
  onClose, 
  onLeaseRequest 
}: ProductDetailsModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white">
          <div className="flex items-start justify-between p-6">
            <div>
              <Dialog.Title className="text-lg font-semibold">
                {product.name}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-500">
                {product.description}
              </Dialog.Description>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 pt-0">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Prix</h4>
                <p className="mt-1 text-sm text-gray-500">
                  ${product.price.toLocaleString('en-US')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Paiement mensuel</h4>
                <p className="mt-1 text-sm text-gray-500">
                  ${product.monthlyPayment.toLocaleString('en-US')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Catégorie</h4>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">État</h4>
                <p className="mt-1 text-sm text-gray-500">{product.condition}</p>
              </div>
            </div>

            {product.specifications && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Spécifications</h4>
                <dl className="mt-2 grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-500">{key}</dt>
                      <dd className="text-sm font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={onClose}>
                Fermer
              </Button>
              <Button onClick={onLeaseRequest}>
                Demander un leasing
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}