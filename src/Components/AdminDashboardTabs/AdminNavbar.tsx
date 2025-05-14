import React from "react";
import { Link, useNavigate } from "react-router-dom";



interface AdminNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-[#1a1a1a] shadow-lg">
      <nav className="px-4 py-3 flex justify-between items-center">
        <span className="text-3xl font-bold text-[#ff9800] tracking-wider cursor-pointer" onClick={() => setActiveTab("dashboard")}> Niya Solar Admin Portal</span>
        <div className="flex items-center space-x-6">
          <button
            className={`text-white font-semibold hover:text-[#ff9800] ${activeTab === "dashboard" ? "underline" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Overview
          </button>
          <button
            className={`text-white font-semibold hover:text-[#ff9800] ${activeTab === "feedback" ? "underline" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
          <button
            className={`text-white font-semibold hover:text-[#ff9800] ${activeTab === "orders_alerts" ? "underline" : ""}`}
            onClick={() => setActiveTab("orders_alerts")}
          >
            Orders & Alerts
          </button>
          <button
            className={`text-white font-semibold hover:text-[#ff9800] ${activeTab === "products" ? "underline" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Product Management
          </button>
          
          <Link to="/admin/reports" className="text-white hover:text-[#ff9800] font-semibold">Reports</Link>
          <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-[#ff9800] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#fb8c00] transition-all duration-300">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
