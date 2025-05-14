import React, { useState, useEffect } from 'react';
import OrderService from '../services/orders/OrderService';

type Toast = { message: string; type: 'success' | 'error' };


type Order = {
  id: string;
  productId?: string;
  items: any[];
  contactInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
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
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  approved?: boolean;
  date?: string;
  status?: string;
};



const InstallerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    setOrders(OrderService.getOrders());
  }, []);

  const getOrderSummary = (order: Order) => {
    if (!order.items) return { products: [], total: 0 };
    let total = 0;
    const products = order.items.map((item: any) => {
      const name = item.Product?.name || item.name || 'Unknown Product';
      const qty = item.quantity ?? item.qty ?? 1;
      const price = item.Product?.price || item.price || 0;
      total += price * qty;
      return { name, qty, price };
    });
    return { products, total };
  };

  const handleStatus = (orderId: string, status: 'Approved' | 'Rejected') => {
    const updated = orders.map(order => order.id === orderId ? { ...order, status, approved: status === 'Approved' } : order);
    setOrders(updated);
    if (typeof OrderService.saveOrders === 'function') {
      OrderService.saveOrders(updated);
    } else {
      localStorage.setItem('orders', JSON.stringify(updated));
    }
    setToast({ message: `Order ${status.toLowerCase()}.`, type: 'success' });
    setTimeout(() => setToast(null), 2500);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 p-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2">
        Installer Dashboard
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-xl">
        Welcome! Review and manage your assigned orders below. Approve or reject orders as needed. All actions are saved and tracked for your convenience.
      </p>

      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white font-semibold ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{toast.message}</div>
      )}

      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-[#00bcd4]">Orders</h2>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No orders found. New orders will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => {
              const { products, total } = getOrderSummary(order);
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg shadow-lg border border-gray-100 transition-all ${order.status === 'Approved' ? 'opacity-70 ring-2 ring-green-400' : order.status === 'Rejected' ? 'opacity-50 ring-2 ring-red-400' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 gap-2 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}>
                    <div>
                      <p className="text-lg font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        {products.map(p => `${p.name} (x${p.qty})`).join(', ')}
                      </p>
                      <span className="text-xs font-medium text-gray-700">Total: ₹{total.toLocaleString()}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 md:mt-0 ml-0 md:ml-2 ${order.status === 'pending' ? 'bg-yellow-300 text-yellow-900' : order.status === 'Approved' ? 'bg-green-400 text-green-900' : 'bg-red-300 text-red-900'}`}>{order.status || 'Pending'}</span>
                  </div>
                  {expandedOrderId === order.id && (
                    <div className="p-4 border-t bg-gray-50">
                      <h3 className="font-medium text-[#00bcd4] mb-2">Shipping Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{order.shippingInfo?.name || order.contactInfo?.name || order.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{order.shippingInfo?.contactNumber || order.contactInfo?.phone || order.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{order.shippingInfo?.email || order.contactInfo?.email || order.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{
                            order.shippingInfo?.shippingAddress
                              ? `${order.shippingInfo.shippingAddress.street}, ${order.shippingInfo.shippingAddress.city}, ${order.shippingInfo.shippingAddress.zipCode}, ${order.shippingInfo.shippingAddress.country}`
                              : order.shippingInfo?.address || order.contactInfo?.address || order.address || 'N/A'
                          }</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {order.status === 'pending' && (
                    <div className="flex gap-2 p-4 border-t bg-white">
                      <button
                        onClick={() => handleStatus(order.id, 'Approved')}
                        className="flex-1 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatus(order.id, 'Rejected')}
                        className="flex-1 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallerDashboard;
