import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SearchBar from "./SearchBar";
import PlatformFilter from "./PlatformFilter";
import PriceSlider from "./PriceSlider";
import { niches } from "../../data/listings";

function CollapsibleSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function FilterContent({ filters, onFilterChange }) {
  const update = (partial) => {
    onFilterChange({ ...filters, ...partial });
  };

  return (
    <div className="space-y-0">
      {/* Search */}
      <div className="pb-4 border-b border-gray-100">
        <SearchBar
          value={filters.search}
          onChange={(search) => update({ search })}
        />
      </div>

      {/* Platform */}
      <CollapsibleSection title="Platform">
        <PlatformFilter
          selected={filters.platforms}
          onChange={(platforms) => update({ platforms })}
        />
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection title="Price Range">
        <PriceSlider
          value={filters.priceRange}
          onChange={(priceRange) => update({ priceRange })}
        />
      </CollapsibleSection>

      {/* Min Followers */}
      <CollapsibleSection title="Minimum Followers">
        <input
          type="text"
          value={filters.minFollowers}
          onChange={(e) => update({ minFollowers: e.target.value })}
          placeholder="Any amount"
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
        />
      </CollapsibleSection>

      {/* Niche */}
      <CollapsibleSection title="Niche">
        <div className="relative">
          <select
            value={filters.niche}
            onChange={(e) => update({ niche: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 cursor-pointer appearance-none"
          >
            {niches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <ChevronDown size={14} />
          </div>
        </div>
      </CollapsibleSection>

      {/* Account Status */}
      <CollapsibleSection title="Account Status">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => update({ verifiedOnly: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                  filters.verifiedOnly
                    ? "bg-purple-600 border-purple-600"
                    : "bg-white border-gray-300 group-hover:border-purple-400"
                }`}
              >
                {filters.verifiedOnly && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-800">Verified accounts only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={filters.monetizedOnly}
                onChange={(e) => update({ monetizedOnly: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                  filters.monetizedOnly
                    ? "bg-purple-600 border-purple-600"
                    : "bg-white border-gray-300 group-hover:border-purple-400"
                }`}
              >
                {filters.monetizedOnly && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-800">Monetized accounts only</span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
}
