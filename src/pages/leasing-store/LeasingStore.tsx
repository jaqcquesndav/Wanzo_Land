import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { PageContainer } from "../../components/layout/PageContainer";
import { SearchBar } from "./components/SearchBar";
import { ProductFilters } from "./components/ProductFilters";
import { ProductGrid } from "./components/ProductGrid";
import { ActiveFilters } from "./components/ActiveFilters";
import { useProducts } from "./hooks/useProducts";
import { useFilters } from "./hooks/useFilters";
import { useSearch } from "./hooks/useSearch";
import { Filter, Plus, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Pagination } from "./components/Pagination";

export function LeasingStore() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const { products, isLoading } = useProducts();
  const { searchQuery, setSearchQuery, searchResults } = useSearch(products);
  const {
    filters,
    handleFilterChange,
    removeFilter,
    clearFilters,
    filteredProducts,
  } = useFilters(searchResults);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageContainer>
      <div className="bg-white">
        <Container className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-700 mt-4">
                Kiota Store
              </h1>
              <h3 className="text-xl font-medium tracking-tight text-green-700 mt-2">
                Achetez, Louez, payez à votre rythme !
              </h3>
              <div className="mt-6">
                <button
                  onClick={toggleDetails}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span>En savoir plus</span>
                </button>
                {showDetails && (
                  <div className="mt-4 space-y-6 text-gray-600">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                      <p className="text-justify leading-relaxed">
                        <strong>Travaillez avec des professionnels :</strong>{" "}
                        Choisissez vos équipements avec l'aide de professionnels
                        qualifiés. Des prestataires locaux peuvent également
                        concevoir vos équipements, évitant ainsi le recours à
                        l'importation.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                      <p className="text-justify leading-relaxed">
                        <strong>Équipements présentés :</strong> Les équipements
                        listés ici ne sont qu'un échantillon pour illustrer les
                        types d'équipements pris en charge. Cette offre est
                        rendue possible grâce à nos institutions financières
                        partenaires, disposant des autorisations nécessaires
                        pour fournir ce service particulier.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                      <p className="text-justify leading-relaxed">
                        <strong>Options d'achat :</strong> Ces équipements sont
                        également disponibles pour achat, offrant une
                        flexibilité adaptée à vos besoins professionnels.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/leasing-store/custom-request">
              <Button
                variant="secondary"
                className="flex items-center gap-2 sm:static"
              >
                <Plus className="h-4 w-4" />
                Demande personnalisée
              </Button>
            </Link>
          </div>

          <div className="mt-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
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
                  <ProductGrid
                    products={currentProducts}
                    onProductClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onLeaseRequest={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />

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
