import React from "react";
import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mt-6 w-full md:w-[340px]">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;
