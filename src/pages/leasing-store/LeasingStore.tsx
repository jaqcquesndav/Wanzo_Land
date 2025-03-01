import { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { PageContainer } from '../../components/layout/PageContainer';
import { SearchBar } from './components/SearchBar';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { ActiveFilters } from './components/ActiveFilters';
import { useProducts } from './hooks/useProducts';
import { useFilters } from './hooks/useFilters';
import { useSearch } from './hooks/useSearch';
import { LeaseRequestModal } from './components/modals/LeaseRequestModal';
import { ProductDetailsModal } from './components/modals/ProductDetailsModal';
import { Filter } from 'lucide-react';

export function LeasingStore() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { products, isLoading } = useProducts();
  const { searchQuery, setSearchQuery, searchResults } = useSearch(products);
  const { filters, handleFilterChange, removeFilter, clearFilters, filteredProducts } = useFilters(searchResults);

  const handleLeaseRequest = (product) => {
    setSelectedProduct(product);
    setIsLeaseModalOpen(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  return (
    <PageContainer>
      <div className="bg-white">
        <Container className="py-16">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Boutique Leasing
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-5 w-5" />
                <span className="ml-2">Filtres</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 mt-8">
            {/* Filtres */}
            <div className="hidden lg:block">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
              />
            </div>

            {/* Produits */}
            <div className="lg:col-span-3">
              <ActiveFilters
                filters={filters}
                onRemoveFilter={removeFilter}
                onClearAll={clearFilters}
              />

              {isLoading ? (
                <div className="mt-8 text-center">Chargement...</div>
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  onProductClick={handleProductClick}
                  onLeaseRequest={handleLeaseRequest}
                />
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <>
          <ProductDetailsModal
            product={selectedProduct}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onLeaseRequest={() => {
              setIsDetailsModalOpen(false);
              setIsLeaseModalOpen(true);
            }}
          />

          <LeaseRequestModal
            product={selectedProduct}
            isOpen={isLeaseModalOpen}
            onClose={() => setIsLeaseModalOpen(false)}
            onSubmit={(formData) => {
              console.log('Lease request submitted:', formData);
              setIsLeaseModalOpen(false);
            }}
          />
        </>
      )}
    </PageContainer>
  );
}