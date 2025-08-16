import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  // Example static search data
  const searchData = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Courses", path: "/courses" },
    { title: "Contact", path: "/contact" },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      {/* Search input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          results.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block p-2 border-b hover:bg-gray-100"
            >
              {item.title}
            </Link>
          ))
        ) : (
          query && <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}