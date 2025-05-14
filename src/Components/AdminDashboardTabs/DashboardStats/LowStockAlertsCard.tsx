import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface LowStockAlertsCardProps {
  onClick: () => void;
  lowStockCount: number;
}

const LowStockAlertsCard: React.FC<LowStockAlertsCardProps> = ({ onClick, lowStockCount }) => (
  <div
    className="bg-amber-50 border border-amber-200 rounded-2xl shadow-md p-6 flex flex-col items-start cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all min-h-[140px]"
    onClick={onClick}
  >
    <div className="flex items-center mb-2">
      <span className="text-amber-500 text-2xl mr-3"><FaExclamationTriangle /></span>
      <span className="text-lg font-semibold text-amber-800">Low Stock Alerts</span>
    </div>
    <span className="text-amber-800 text-sm font-medium mb-1">{lowStockCount} product{lowStockCount !== 1 ? 's' : ''} low in stock</span>
    <span className="text-amber-700 text-xs">Click to view all low stock products.</span>
  </div>
);

export default LowStockAlertsCard;
