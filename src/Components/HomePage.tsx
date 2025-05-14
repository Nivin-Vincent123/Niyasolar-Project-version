import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "./types/Product";
import productsData from "../data/Products.json";
import ProductCard from "./ProductCard";

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(productsData.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#000033] via-[#000066] to-[#0000cc] text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Powering Your World Sustainably
          </h1>
          <p className="text-xl mb-8 leading-relaxed text-[#00ffff]">
            Discover cutting-edge solar products designed to save energy, reduce
            costs, and promote a greener tomorrow. Illuminate your life with
            clean power.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-4 text-lg font-semibold bg-[#00ffff] text-[#000033] rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] transition duration-300 hover:bg-[#00cccc] hover:transform hover:scale-105"
            >
              View Products
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 text-lg font-semibold border-2 border-[#00ffff] text-[#00ffff] rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.2)] transition duration-300 hover:bg-[#00ffff] hover:text-[#000033] hover:transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-[#00ffff] mb-10">
          Featured Solar Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} Product={product} />
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="bg-gradient-to-r from-[#000033] via-[#000066] to-[#0000cc] rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-[#00ffff] mb-6 text-center">
            About Our Solar Store
          </h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-[#00ffff]/80 mb-6">
              We specialize in high-quality solar solutions — from panels and
              batteries to complete energy systems.
            </p>
            <p className="text-xl text-[#00ffff]/80">
              Our mission is to make sustainable energy accessible and
              affordable. Let’s build a cleaner, brighter future together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
