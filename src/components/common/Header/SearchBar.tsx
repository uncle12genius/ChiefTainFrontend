import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search laptop parts, batteries, screens..."
          className="w-full pl-4 pr-12 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-gray-700 focus:border-orange-400"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 disabled:hover:scale-100 disabled:hover:shadow-lg"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      
      {/* Search suggestions only when user types */}
      {query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50">
          <div className="p-2">
            <button
              type="submit"
              className="w-full text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-700">Search for "{query}"</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;