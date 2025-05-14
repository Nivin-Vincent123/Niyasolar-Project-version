import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-[#1a1a1a] shadow-[0_4px_20px_rgba(255,193,7,0.15)]">
      <nav className="px-4 py-3 flex justify-between items-center">
        <Link to="/admin/dashboard" className="text-3xl font-bold text-[#ffc107] tracking-wider font-['Roboto_Condensed'] hover:text-[#ffca28] transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,193,7,0.4)]">
          Admin Portal
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/admin/dashboard" className="text-white hover:text-[#ffc107] font-semibold rounded px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:bg-[#ffc107]/10">Overview</Link>
          <Link to="/admin/products" className="text-white hover:text-[#ffc107] font-semibold rounded px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:bg-[#ffc107]/10">Product Management</Link>
          <Link to="/admin/users" className="text-white hover:text-[#ffc107] font-semibold rounded px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:bg-[#ffc107]/10">User Management</Link>

          <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-[#ffc107] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#ffca28] transition-all duration-300 shadow-[0_0_15px_rgba(255,193,7,0.3)] focus:outline-none focus:ring-2 focus:ring-[#ffc107]">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
