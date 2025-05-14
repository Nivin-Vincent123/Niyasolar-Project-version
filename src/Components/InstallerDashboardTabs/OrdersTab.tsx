import React, { useEffect, useState } from 'react';

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

const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    setOrders(stored ? JSON.parse(stored) : []);
    // Check for installer notification flag
    if (localStorage.getItem('installerOrderNotification') === 'true') {
      setShowNotification(true);
      // Clear notification after viewing
      localStorage.removeItem('installerOrderNotification');
    }
  }, []);

  const handleStatus = (id: string, status: 'accepted' | 'declined') => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {showNotification && (
        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800 border border-yellow-300 shadow">
          New order(s) received! Refresh to see the latest orders.
        </div>
      )}
      {orders.length === 0 && <p>No orders to show.</p>}
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white/10 rounded-lg p-4 border border-white/20 shadow">
            <div className="mb-2 flex justify-between items-center">
              <span className="font-semibold text-lg">Order #{order.id}</span>
              <span className={`text-xs px-2 py-1 rounded-full ml-2 ${order.status === 'pending' ? 'bg-yellow-300 text-yellow-900' : order.status === 'accepted' ? 'bg-green-400 text-green-900' : 'bg-red-300 text-red-900'}`}>{order.status}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Buyer:</span> {order.shippingInfo?.name || order.buyer}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Contact Number:</span> {order.shippingInfo?.contactNumber || 'N/A'}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email:</span> {order.shippingInfo?.email || 'N/A'}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Shipping Address:</span><br />
              <span className="ml-2">
                {order.shippingInfo?.shippingAddress
                  ? `${order.shippingInfo.shippingAddress.street}, ${order.shippingInfo.shippingAddress.city}, ${order.shippingInfo.shippingAddress.zipCode}, ${order.shippingInfo.shippingAddress.country}`
                  : order.shippingInfo?.address || 'N/A'}
              </span>
            </div>
            <div className="mb-2">Items: <ul className="list-disc ml-5">{order.items.map((item, i) => <li key={i}>{item.Product?.name || item.name} (Qty: {item.quantity ?? item.qty})</li>)}</ul></div>
            <div className="text-sm text-gray-400 mb-2">Placed: {new Date(order.createdAt).toLocaleString()}</div>
            {order.status === 'pending' && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleStatus(order.id, 'accepted')} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">Accept</button>
                <button onClick={() => handleStatus(order.id, 'declined')} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Decline</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
