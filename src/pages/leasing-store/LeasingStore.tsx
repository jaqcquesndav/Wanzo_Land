import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { PageContainer } from '../../components/layout/PageContainer';
import { SearchBar } from './components/SearchBar';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { ActiveFilters } from './components/ActiveFilters';
import { useProducts } from './hooks/useProducts';
import { useFilters } from './hooks/useFilters';
import { useSearch } from './hooks/useSearch';
import { Filter, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Pagination } from './components/Pagination';

export function LeasingStore() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { products, isLoading } = useProducts();
  const { searchQuery, setSearchQuery, searchResults } = useSearch(products);
  const { filters, handleFilterChange, removeFilter, clearFilters, filteredProducts } = useFilters(searchResults);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageContainer>
      <div className="bg-white">
        <Container className="py-16">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Boutique Leasing
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Trouvez l'équipement idéal pour votre entreprise
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/leasing-store/custom-request">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Demande personnalisée
                </Button>
              </Link>

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
                <div className="mt-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : (
                <>
                  <ProductGrid products={currentProducts} onProductClick={function (): void {
                      throw new Error('Function not implemented.');
                    } } onLeaseRequest={function (): void {
                      throw new Error('Function not implemented.');
                    } } />
                  
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}