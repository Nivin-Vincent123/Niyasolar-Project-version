import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TotalOrdersCard: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    setTotalOrders(stored ? JSON.parse(stored).length : 0);
  }, []);

  return (
    <div
      className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate("/admin/orders")}
      title="View all orders"
    >
      <div className="text-green-600 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M5 11h14M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M5 11l7 5 7-5" />
        </svg>
      </div>
      <div className="text-2xl font-bold">{totalOrders}</div>
      <div className="text-gray-600 mt-1">Total Orders</div>
    </div>
  );
};

export default TotalOrdersCard;
