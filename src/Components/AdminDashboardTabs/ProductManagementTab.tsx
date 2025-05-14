import React from "react";
import { useNavigate } from "react-router-dom";

const ProductManagementTab: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Product Card */}
        <div
          className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg hover:bg-blue-50 transition"
          onClick={() => navigate("/admin/add-product")}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-blue-600">Add Product</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <p className="text-gray-500">Create a new solar product with images and details.</p>
        </div>
        
        {/* Delete Product Card */}
        <div
          className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg hover:bg-red-50 transition"
          onClick={() => navigate("/admin/delete-product")}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-red-600">Delete Product</h3>
            <span className="bg-red-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <p className="text-gray-500">Remove an existing product from the store.</p>
        </div>
        
        {/* Manage Stocks Card */}
        <div
          className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg hover:bg-green-50 transition"
          onClick={() => navigate("/admin/manage-stocks")}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-green-600">Manage Stocks</h3>
            <span className="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </span>
          </div>
          <p className="text-gray-500">Update the inventory and stock levels for products.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementTab;
