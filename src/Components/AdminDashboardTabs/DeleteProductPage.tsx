import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import ProtectedRoute from "../ProtectedRoute";

const DeleteProductPage: React.FC = () => {
  const [staticProducts, setStaticProducts] = useState<Product[]>([]);
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/src/Data/Products.json');
        const staticList: Product[] = await res.json();
        setStaticProducts(staticList);

        const dyn: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
        setDynamicProducts(dyn);

        setAllProducts([...staticList, ...dyn]);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();
  }, []);

  const deleteOne = (id: string) => {
    const updated = dynamicProducts.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    setDynamicProducts(updated);
    setAllProducts([...staticProducts, ...updated]);
  };

  const deleteAll = () => {
    localStorage.removeItem('products');
    setDynamicProducts([]);
    setAllProducts([...staticProducts]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6">Delete Products</h2>
      <button
        onClick={deleteAll}
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Delete All Added Products
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map(prod => (
          <div key={prod.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={prod.image}
              alt={prod.name}
              className="h-40 w-full object-contain mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{prod.name}</h3>
            <p className="text-gray-600 mb-1">${prod.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-2">{prod.description}</p>
            <p className="text-gray-500 mb-4">Stock: {prod.stock || 0}</p>
            {dynamicProducts.some(p => p.id === prod.id) && (
              <button
                onClick={() => deleteOne(prod.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default () => (
  <ProtectedRoute allowedRoles={["Admin"]}>
    <DeleteProductPage />
  </ProtectedRoute>
);
