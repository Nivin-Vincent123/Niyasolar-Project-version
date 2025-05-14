import React from "react";
import { FaClipboardList } from "react-icons/fa";

interface OrderManagementCardProps {
  onClick: () => void;
}

const OrderManagementCard: React.FC<OrderManagementCardProps> = ({ onClick }) => (
  <div
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-blue-200 min-h-[140px]"
    onClick={onClick}
  >
    <div className="flex items-center mb-2">
      <span className="text-blue-500 text-2xl mr-3"><FaClipboardList /></span>
      <span className="text-lg font-semibold text-gray-700">Manage Orders</span>
    </div>
    <span className="text-gray-500 text-sm">View and process all customer orders.</span>
  </div>
);

export default OrderManagementCard;
