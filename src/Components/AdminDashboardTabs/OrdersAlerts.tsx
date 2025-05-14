import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import OrderService from '../../services/orders/OrderService';
const dummyLowStock = [
  { name: 'Solar Panel X', stock: 3 },
  { name: 'Battery Y', stock: 2 },
  { name: 'Inverter Pro', stock: 1 },
];

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
};

const OrdersAlertsTab: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchedOrders = OrderService.getOrders();
    setOrders(fetchedOrders);
  }, []);

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 font-['Roboto_Condensed'] text-yellow-700 flex items-center gap-2">
        <FaBoxOpen className="text-yellow-500" /> Orders & Alerts
      </h2>
      {/* Order Management Section */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="font-semibold text-lg">Orders</span>
          <label htmlFor="statusFilter" className="font-medium ml-4">Filter by Status:</label>
          <select
            id="statusFilter"
            className="border rounded px-2 py-1"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product(s)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={order.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {order.shippingInfo?.name || order.buyer || order.shippingInfo?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.items && order.items.map((item: any, idx: number) => (
                        <span key={idx} className="block">
                          {item.Product?.name || item.name || 'Unknown Product'}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Low Stock Alerts Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FaExclamationTriangle className="text-red-500" />
          <span className="font-semibold text-lg">Low Stock Alerts</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyLowStock.map(product => (
            <div key={product.name} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-red-200 relative">
              <span className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <FaExclamationTriangle className="inline text-red-500 mr-1" /> Low Stock
              </span>
              <div className="font-semibold text-gray-800 text-lg mb-1">{product.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-red-700 font-bold">Stock: {product.stock}</span>
                <a href="/admin/manage-stocks" className="ml-auto text-blue-600 hover:underline flex items-center gap-1">
                  Manage <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersAlertsTab;
