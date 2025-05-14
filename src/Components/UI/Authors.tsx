import React from 'react';
import { Link } from 'react-router-dom';
// import booksData from '../../data/books.json';
// NOTE: No books.json file available. Replace with static authors list for now.
const Authors: React.FC = () => {
  // Static authors list as fallback
  const authors: string[] = [
    'Nivin Vincent',
    'Jane Doe',
    'John Smith',
    'Priya Varma',
    'Rahul Nair',
    'Anjali Menon',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="max-w-5xl w-full px-6 py-12 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-8 tracking-wide drop-shadow-lg">
          Featured Authors
        </h2>

        {/* Grid Layout for Authors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <Link
              key={author}
              to={`/books?author=${author}`}
              className="group relative block overflow-hidden rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>

              {/* Author Name */}
              <span className="relative z-10 block text-xl font-semibold text-blue-300 transition-all duration-300 group-hover:text-white">
                {author}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Authors;
