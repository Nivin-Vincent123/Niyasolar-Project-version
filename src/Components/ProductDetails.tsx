import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "./types/Product";
import { Button } from "@/Components/UI/button";
import { useCart } from "./CartContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [Product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found in backend");
        return res.json();
      })
      .then(data => {
        setProduct({ ...data, id: data._id ?? data.id });
        setError(null);
      })
      .catch(() => {
        // Try to find the product in localStorage
        const localProducts = JSON.parse(localStorage.getItem("products") || "[]");
        let found = localProducts.find((p: Product) => p.id === id);
        if (found) {
          setProduct(found);
          setError(null);
          setLoading(false);
        } else {
          // Try to find in static Products.json
          import("../data/Products.json").then(module => {
            const staticProducts = module.default || [];
            const staticFound = staticProducts.find((p: Product) => p.id === id);
            if (staticFound) {
              setProduct(staticFound);
              setError(null);
            } else {
              setError("Product not found");
              setProduct(null);
            }
            setLoading(false);
          }).catch(() => {
            setError("Product not found");
            setProduct(null);
            setLoading(false);
          });
        }
      });
  }, [id]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-center p-8 bg-[#0a0a1a] rounded-xl shadow-[0_4px_12px_rgba(0,255,255,0.15)]">
          <h2 className="text-2xl font-semibold text-[#00ffff] mb-4">Loading...</h2>
        </div>
      </div>
    );
  }
  if (error || !Product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-center p-8 bg-[#0a0a1a] rounded-xl shadow-[0_4px_12px_rgba(0,255,255,0.15)]">
          <h2 className="text-2xl font-semibold text-[#00ffff] mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            We couldn't find the Product you're looking for.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-[#0a0a1a] bg-[#00ffff] rounded-lg hover:bg-[#00cccc] transition duration-300"
          >
            Return to Product List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-12 px-4 sm:px-6 lg:px-8">
      {showNotification && (
        <div className="fixed top-24 right-4 bg-[#00ffff] text-[#0a0a1a] px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Item added to cart successfully!
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0a0a1a] rounded-2xl shadow-[0_4px_12px_rgba(0,255,255,0.15)] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 xl:w-2/5 p-8">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={Product.image}
                  alt={Product.name}
                  className="w-full h-full object-cover rounded-lg shadow-[0_4px_12px_rgba(0,255,255,0.15)] border border-[#00ffff]/20 bg-white"
                  onError={(e) => {
                    console.warn('ProductDetails: image failed to load, using fallback:', Product.image);
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500?text=No+Image";
                  }}
                  onLoad={() => {

                  }}
                />
              </div>
            </div>

            <div className="lg:w-1/2 xl:w-3/5 p-8 lg:p-12">
              <div className="h-full flex flex-col">
                <div>
                  <h1 className="text-4xl font-bold text-[#00ffff] mb-4">
                    {Product.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="bg-[#00ffff]/10 text-[#00ffff] px-4 py-1 rounded-full font-semibold text-base border border-[#00ffff]/30">
                      Brand: {Product.brand}
                    </span>
                    <span className="bg-[#00ffff]/10 text-[#00ffff] px-4 py-1 rounded-full font-semibold text-base border border-[#00ffff]/30">
                      Category: {Product.category}
                    </span>
                    {Product.wattage && (
                      <span className="bg-[#00ffff]/10 text-[#00ffff] px-4 py-1 rounded-full font-semibold text-base border border-[#00ffff]/30">
                        Wattage: {Product.wattage}W
                      </span>
                    )}
                    <span className={`px-4 py-1 rounded-full font-semibold text-base border ${(Product.stock ?? 0) > 0 ? 'bg-green-100/10 text-green-400 border-green-400/30' : 'bg-red-100/10 text-red-400 border-red-400/30'}`}>
                      {(Product.stock ?? 0) > 0 ? `In Stock: ${Product.stock ?? 0}` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="prose prose-lg text-gray-300 mb-8">
                    {Product.description}
                  </div>
                </div>

                <div className="mt-auto">
                  {showNotification && (
                    <div className="mb-4 w-full text-center">
                      <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
                        Added to cart!
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    <p className="text-3xl font-bold text-[#00ffff]">
                      ₹{Product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(Product)}
                      variant="default"
                      className="w-full sm:w-auto px-8 py-4 text-lg bg-[#00ffff] hover:bg-[#00cccc] text-[#0a0a1a] rounded-lg transition duration-300"
                      disabled={(Product.stock ?? 0) <= 0}
                    >
                      {(Product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <Link
                      to="/"
                      className="inline-flex items-center text-[#00ffff] hover:text-[#00cccc] transition duration-300"
                    >
                      ← Back to Product List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
