import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { LeaseRequestModal } from './components/modals/LeaseRequestModal';
import { ProductGallery } from './components/ProductGallery';
import { ProductSpecs } from './components/ProductSpecs';
import { ProductDocuments } from './components/ProductDocuments';
import { SimilarProducts } from './components/SimilarProducts';
import { ArrowLeft, FileText, Package, Truck } from 'lucide-react';
import { useProducts } from './hooks/useProducts';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <PageContainer>
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Produit non trouvé</h1>
            <Link to="/leasing-store" className="mt-4 text-primary hover:text-primary-hover">
              Retourner à la boutique
            </Link>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="bg-white">
        <Container className="py-16">
          {/* Retour */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la boutique
          </button>

          {/* Produit principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <ProductGallery product={product} enableZoom={true} />

            {/* Informations produit */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString('en-US')}
                </p>
                <p className="text-lg text-primary">
                  ou ${product.monthlyPayment.toLocaleString('en-US')}/mois en leasing
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <p className="text-gray-600">{product.description}</p>

                <div className="border-t border-b border-gray-200 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <Package className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-600">Stock disponible</span>
                      <span className="font-medium">{product.stock} unités</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Truck className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-600">Livraison</span>
                      <span className="font-medium">2-4 semaines</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <FileText className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-600">Documents</span>
                      <span className="font-medium">3 fichiers</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsLeaseModalOpen(true)}
                  className="w-full"
                >
                  Demander un leasing
                </Button>
              </div>
            </div>
          </div>

          {/* Spécifications */}
          <ProductSpecs product={product} />

          {/* Documents */}
          <ProductDocuments product={product} />

          {/* Produits similaires */}
          <SimilarProducts currentProduct={product} />
        </Container>
      </div>

      {/* Modal de demande */}
      <LeaseRequestModal
        product={product}
        isOpen={isLeaseModalOpen}
        onClose={() => setIsLeaseModalOpen(false)}
        onSubmit={(formData) => {
          console.log('Lease request submitted:', formData);
          setIsLeaseModalOpen(false);
        }}
      />
    </PageContainer>
  );
}