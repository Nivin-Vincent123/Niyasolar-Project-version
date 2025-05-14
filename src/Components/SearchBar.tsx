import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative w-full max-w-md mx-auto pb-7">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-3 text-lg border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
