import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "./types/Product";
import { ProductsApi } from "./Api/Products";
import SearchBar from "./SearchBar";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllProducts = async () => {
      setIsLoading(true);
      try {
        // 1. Try to load products from the API first
        let apiProducts: Product[] = [];
        try {
          apiProducts = await ProductsApi.getProducts();
        } catch (apiError) {
          console.warn("Could not load products from API:", apiError);
          
          // 2. Fallback to static JSON file if API fails
          try {
            // Import directly from the data file
            const ProductsData = await import("../data/Products.json");
            apiProducts = ProductsData.default;
          } catch (jsonError) {
            console.error("Could not load products from JSON file:", jsonError);
          }
        }
        
        // 3. Load custom products from localStorage
        const localStorageProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
        
        // 4. Merge by id: localStorage overrides static/API
        const mergedProducts = [
          ...apiProducts.map(sp => {
            const override = localStorageProducts.find(lp => lp.id === sp.id);
            return override ? { ...sp, ...override } : sp;
          }),
          ...localStorageProducts.filter(lp => !apiProducts.some(sp => sp.id === lp.id))
        ];
        // 5. Set the merged products
        setProducts(mergedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAllProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#1a1a3a] text-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="text-5xl font-bold text-[#ffca28] mb-12 text-center drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
          Products
        </h2>
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ffca28]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="transform hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
                >
                  <ProductCard Product={product} />
                </div>
              ))}
            </div>
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center mt-12">
                <p className="text-2xl text-[#ffca28]">
                  No products found matching your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
