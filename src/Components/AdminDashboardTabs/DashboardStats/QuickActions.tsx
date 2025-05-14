import React from "react";
import { FaPlus, FaListAlt, FaCog } from "react-icons/fa";

interface QuickActionsProps {
  onAddProduct: () => void;
  onViewOrders: () => void;
  onGoToSettings: () => void;
}

const actions = [
  { icon: <FaPlus />, label: "Add Product", action: "add" },
  { icon: <FaListAlt />, label: "View Orders", action: "orders" },
  { icon: <FaCog />, label: "Settings", action: "settings" },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onAddProduct, onViewOrders, onGoToSettings }) => (
  <div className="flex flex-wrap gap-3 mt-6">
    {actions.map(({ icon, label, action }) => (
      <button
        key={action}
        className="flex items-center gap-2 bg-gray-100 hover:bg-blue-50 text-gray-700 px-4 py-2 rounded-full shadow-sm transition font-semibold text-sm"
        onClick={() => {
          if (action === "add") onAddProduct();
          if (action === "orders") onViewOrders();
          if (action === "settings") onGoToSettings();
        }}
      >
        <span className="text-base">{icon}</span>
        {label}
      </button>
    ))}
  </div>
);

export default QuickActions;
