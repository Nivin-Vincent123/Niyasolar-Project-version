import React from "react";

interface GreetingBannerProps {
  adminName?: string;
  date?: string;
  time?: string;
}

const GreetingBanner: React.FC<GreetingBannerProps> = ({ adminName = "Admin", date = "April 21, 2025", time = "07:52 AM" }) => (
  <div className="relative bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl shadow-sm px-6 py-5 flex items-center justify-between mb-6 overflow-hidden">
    <div className="z-10">
      <div className="text-lg font-semibold text-gray-700 mb-1">Welcome back, {adminName} <span role="img" aria-label="wave">👋</span></div>
      <div className="text-sm text-gray-500">Here’s what’s happening today.</div>
    </div>
    <div className="flex items-center gap-4 z-10">
      <div className="flex flex-col items-end mr-6">
        <span className="text-xs text-gray-400">{date}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 text-lg shadow">A</div>
        <span className="text-xs font-semibold text-gray-600 bg-white rounded px-2 py-1 shadow-sm">Admin</span>
      </div>
      <button className="ml-4 flex items-center px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 text-sm font-semibold shadow-sm">
        <span className="mr-1">🌗</span> Theme
      </button>
    </div>
    {/* Abstract SVG background shapes */}
    <svg className="absolute right-0 top-0 opacity-20" width="120" height="80" fill="none" viewBox="0 0 120 80">
      <ellipse cx="90" cy="40" rx="60" ry="30" fill="#fbbf24" />
    </svg>
    <svg className="absolute left-0 bottom-0 opacity-10" width="120" height="80" fill="none" viewBox="0 0 120 80">
      <ellipse cx="30" cy="40" rx="60" ry="30" fill="#60a5fa" />
    </svg>
  </div>
);

export default GreetingBanner;
