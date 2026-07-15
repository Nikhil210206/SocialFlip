import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterContent from "./FilterContent";

export default function FilterSidebar({ filters, onFilterChange, onReset }) {
  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.verifiedOnly ||
    filters.monetizedOnly ||
    filters.minFollowers ||
    filters.niche !== "All niches" ||
    filters.search ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000;

  return (
    <aside className="w-[280px] flex-shrink-0 hidden lg:block">
      <div className="sticky top-[80px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-purple-600" />
            <span className="text-sm font-semibold text-gray-900">Filters</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors duration-150"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>

        {/* Filter Content */}
        <div className="px-5 py-3 scrollbar-thin max-h-[calc(100vh-120px)] overflow-y-auto">
          <FilterContent filters={filters} onFilterChange={onFilterChange} />
        </div>
      </div>
    </aside>
  );
}
