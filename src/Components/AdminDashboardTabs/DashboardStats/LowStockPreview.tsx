import React from "react";

interface LowStockProduct {
  name: string;
  stock: number;
}

interface LowStockPreviewProps {
  products: LowStockProduct[];
  onViewAll: () => void;
}

const LowStockPreview: React.FC<LowStockPreviewProps> = ({ products, onViewAll }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 mt-6">
    <div className="flex justify-between items-center mb-3">
      <span className="font-semibold text-gray-700">Low Stock Products</span>
      <button className="text-blue-600 text-sm hover:underline" onClick={onViewAll}>
        View All
      </button>
    </div>
    <ul>
      {products.slice(0, 5).map((p, i) => (
        <li key={i} className="flex justify-between text-sm py-1 border-b last:border-b-0">
          <span>{p.name}</span>
          <span className="text-red-600 font-semibold">{p.stock}</span>
        </li>
      ))}
      {products.length === 0 && <li className="text-gray-400 text-sm">No low stock items</li>}
    </ul>
  </div>
);

export default LowStockPreview;
