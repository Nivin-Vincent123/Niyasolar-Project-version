import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import ProductsData from "../../data/Products.json";
import ProductCard from "../ProductCard";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(ProductsData.slice(0, 4));
    setNewArrivals(ProductsData.slice(4, 8));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            Power Your Life with Solar Energy
          </h1>
          <p className="text-xl mb-8 leading-relaxed text-white/90">
            Discover high-efficiency solar panels, batteries, inverters, and
            more. Clean energy starts here — brighten your future with
            sustainable solutions.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/Products"
              className="px-8 py-4 text-lg font-semibold bg-white text-yellow-700 rounded-lg shadow-lg transition duration-300 hover:bg-yellow-100 hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg shadow-md transition duration-300 hover:bg-white hover:text-yellow-700 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-yellow-700">
            Featured Solar Products
          </h2>
          <Link
            to="/Products"
            className="text-yellow-600 hover:text-yellow-800 font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((Product) => (
            <ProductCard key={Product.id} Product={Product} />
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="bg-yellow-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold text-yellow-700">New Arrivals</h2>
            <Link
              to="/Products"
              className="text-yellow-600 hover:text-yellow-800 font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {newArrivals.map((Product) => (
              <ProductCard key={Product.id} Product={Product} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#f5f5f5] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-yellow-700 text-center mb-16">
            Why Choose Solar from Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-700">
                Fast Delivery
              </h3>
              <p className="text-gray-700">
                Get your solar kits delivered within 2-3 days.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-700">
                Assured Quality
              </h3>
              <p className="text-gray-700">
                All products go through rigorous testing and inspection.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-700">
                Secure Checkout
              </h3>
              <p className="text-gray-700">Safe & encrypted payment systems.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-yellow-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Get Solar Tips & Exclusive Deals
          </h2>
          <p className="text-lg mb-8 text-yellow-100">
            Subscribe to our newsletter and never miss out on new solar
            technologies and offers.
          </p>
          <form className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg bg-white text-gray-800 border border-yellow-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-yellow-700 font-semibold rounded-r-lg hover:bg-yellow-100 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
