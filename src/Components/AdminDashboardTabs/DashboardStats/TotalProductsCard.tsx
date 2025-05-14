import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsApi } from "../../../Components/Api/Products";

const TotalProductsCard: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductsApi.getProducts();
        setTotalProducts(products.length);
      } catch (error) {
        setTotalProducts(0);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate("/admin/products")}
      title="View all products"
    >
      <div className="text-blue-600 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6" />
        </svg>
      </div>
      <div className="text-2xl font-bold">{totalProducts}</div>
      <div className="text-gray-600 mt-1">Total Products</div>
    </div>
  );
};

export default TotalProductsCard;
