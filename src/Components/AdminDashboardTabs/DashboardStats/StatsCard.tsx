import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition cursor-pointer min-w-[140px]">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

export default StatsCard;
