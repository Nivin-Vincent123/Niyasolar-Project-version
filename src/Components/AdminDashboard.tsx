import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Products", value: 120 },
          { label: "Total Orders", value: 340 },
          { label: "Active Installers", value: 15 },
          { label: "Pending Requests", value: 8 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-md col-span-2 h-[300px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Weekly Orders
          </h2>
          <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            {/* You can replace this with a chart component */}
            Bar Chart Placeholder
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-[300px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Notifications
          </h2>
          <ul className="space-y-3">
            {["Installer John accepted an order", "New product added", "System update scheduled"].map((note, i) => (
              <li key={i} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            Add Product
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
            View Orders
          </button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
            Assign Installers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
