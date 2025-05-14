import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductManagementTab from "./ProductManagementTab";
import FeedbackTab from "./Feedback";
import AdminNavbar from "./AdminNavbar";
import NotificationList, { Notification } from "./DashboardStats/NotificationList";
import OrderManagementCard from "./DashboardStats/OrderManagementCard";
import LowStockAlertsCard from "./DashboardStats/LowStockAlertsCard";


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = sessionStorage.getItem("adminActiveTab");
    return tab || "dashboard";
  });

  // Mock notification state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Installer John accepted an order',
      timestamp: '2 hrs ago',
      type: 'success',
      read: false,
      link: '/admin/orders/123',
    },
    {
      id: '2',
      message: 'New product added',
      timestamp: '4 hrs ago',
      type: 'info',
      read: false,
      link: '/admin/products',
    },
    {
      id: '3',
      message: 'System update scheduled',
      timestamp: '1 day ago',
      type: 'warning',
      read: false,
    },
  ]);

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Mock low stock data
  const [lowStockProducts] = useState([
    { name: 'Solar Panel X', stock: 3 },
    { name: 'Battery Y', stock: 2 },
    { name: 'Inverter Pro', stock: 1 },
  ]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen relative overflow-x-hidden">
      {/* Abstract SVG background decorations */}
      <svg className="absolute left-0 top-0 opacity-10 -z-10" width="220" height="180" fill="none" viewBox="0 0 220 180">
        <ellipse cx="110" cy="90" rx="110" ry="90" fill="#60a5fa" />
      </svg>
      <svg className="absolute right-0 bottom-0 opacity-10 -z-10" width="220" height="180" fill="none" viewBox="0 0 220 180">
        <ellipse cx="110" cy="90" rx="110" ry="90" fill="#fbbf24" />
      </svg>
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6 pt-28 max-w-7xl mx-auto">
        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Order Management & Low Stock Alerts */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrderManagementCard onClick={() => navigate('/admin/orders')} />
              <LowStockAlertsCard
                onClick={() => navigate('/admin/manage-stocks')}
                lowStockCount={lowStockProducts.length}
              />
            </div>
            {/* Right side: Notifications */}
            <div className="col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 h-[380px] overflow-y-auto flex flex-col">
                <div className="text-lg font-semibold text-gray-700 mb-3">Recent Notifications</div>
                <NotificationList
                  notifications={notifications}
                  onMarkRead={handleMarkRead}
                  onClear={handleClearNotification}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && <ProductManagementTab key={activeTab} />}
        {activeTab === "feedback" && <FeedbackTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
