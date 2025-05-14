import React, { useState, useEffect } from "react";
import ProductsData from "../../data/Products.json";
import { Product } from "../types/Product";

const ManageStock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load products from static Products.json and localStorage, then merge
    const loadProducts = () => {
      // 1. Load static products
      let staticProducts: Product[] = ProductsData;
      // 2. Load dynamic products from localStorage
      let dynamicProducts: Product[] = [];
      try {
        dynamicProducts = JSON.parse(localStorage.getItem("products") || "[]");
      } catch (e) {
        dynamicProducts = [];
      }
      // 3. Merge, dynamic overrides static by ID
      const merged = [
        ...staticProducts.map(sp => {
          const override = dynamicProducts.find(dp => dp.id === sp.id);
          return override ? { ...sp, ...override } : sp;
        }),
        ...dynamicProducts.filter(dp => !staticProducts.some(sp => sp.id === dp.id))
      ];
      setProducts(merged);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleIncreaseStock = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, stock: (product.stock || 0) + 1 }
          : product
      )
    );
    setHasChanges(true);
  };

  const handleDecreaseStock = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId && (product.stock || 0) > 0
          ? { ...product, stock: (product.stock || 0) - 1 }
          : product
      )
    );
    setHasChanges(true);
  };

  const handleStockChange = (productId: string, value: string) => {
    const newStock = parseInt(value);
    if (!isNaN(newStock) && newStock >= 0) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId
            ? { ...product, stock: newStock }
            : product
        )
      );
      setHasChanges(true);
    }
  };

  const saveChanges = () => {
    // Get current localStorage products
    let localProducts: Product[] = [];
    try {
      localProducts = JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
      localProducts = [];
    }
    // For each product in products, update or add to localProducts
    const updatedProducts = [...products];
    // Remove duplicates by id, keeping the latest (from updatedProducts)
    const merged = [
      ...updatedProducts,
      ...localProducts.filter(lp => !updatedProducts.some(up => up.id === lp.id))
    ];
    localStorage.setItem("products", JSON.stringify(merged));
    alert("Stock changes have been saved!");
    setHasChanges(false);
  };

  const downloadProductsJson = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = "updated-products.json";
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4 text-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Stock</h2>
        {hasChanges && (
          <div className="flex space-x-4">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={downloadProductsJson}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download Updated JSON
            </button>
          </div>
        )}
      </div>

      {/* Search/filter bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    value={product.stock || 0}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDecreaseStock(product.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      disabled={(product.stock || 0) <= 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleIncreaseStock(product.id)}
                      className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStock;
