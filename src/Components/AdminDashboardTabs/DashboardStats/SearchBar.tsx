import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => (
  <div className="relative w-full max-w-xs ml-auto mb-4">
    <input
      type="text"
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 text-sm"
      disabled
    />
    <span className="absolute left-3 top-2.5 text-gray-400">
      <FaSearch />
    </span>
  </div>
);

export default SearchBar;
