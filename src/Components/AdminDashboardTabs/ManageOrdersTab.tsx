import React, { useEffect, useState } from 'react';
import OrderService from '../../services/orders/OrderService';

interface Order {
  id: string;
  buyer: string;
  items: any[];
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  shippingInfo?: {
    name?: string;
    address?: string;
    contactNumber?: string;
    email?: string;
    shippingAddress?: {
      street: string;
      city: string;
      zipCode: string;
      country: string;
    };
  };
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
};

const ManageOrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        Manage Orders
      </h2>
      <div className="mb-6 flex gap-4 items-center">
        <label htmlFor="statusFilter" className="font-medium">Filter by Status:</label>
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
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {order.shippingInfo?.name || order.buyer || order.shippingInfo?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.items.map((item: any, idx: number) => (
                      <span key={idx} className="block">
                        {item.Product?.name || item.name || 'Unknown Product'}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
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
  );
};

export default ManageOrdersTab;
