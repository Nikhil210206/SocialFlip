import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "../components/marketplace/FilterSidebar";
import MobileFilterDrawer from "../components/marketplace/MobileFilterDrawer";
import MarketplaceCard from "../components/marketplace/MarketplaceCard";
import { mockListings } from "../data/listings";

const defaultFilters = {
  search: "",
  platforms: [],
  priceRange: [0, 100000],
  minFollowers: "",
  niche: "All niches",
  verifiedOnly: false,
  monetizedOnly: false,
};

export default function MarketplacePage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !listing.title.toLowerCase().includes(searchLower) &&
          !listing.username.toLowerCase().includes(searchLower) &&
          !listing.platform.toLowerCase().includes(searchLower) &&
          !listing.category.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(listing.platform)) {
        return false;
      }

      // Price range
      if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
        return false;
      }

      // Min followers
      if (filters.minFollowers) {
        const minNum = parseInt(filters.minFollowers.replace(/,/g, ""), 10);
        if (!isNaN(minNum) && listing.followersCount < minNum) {
          return false;
        }
      }

      // Niche
      if (filters.niche !== "All niches" && listing.category !== filters.niche) {
        return false;
      }

      // Verified only
      if (filters.verifiedOnly && !listing.verified) {
        return false;
      }

      // Monetized only
      if (filters.monetizedOnly && !listing.monetized) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Back to Home + Mobile Filters Toggle */}
        <div className="flex items-center justify-between mb-5">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Filters Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal size={15} className="text-purple-600" />
            Filters
            {(filters.platforms.length > 0 ||
              filters.verifiedOnly ||
              filters.monetizedOnly ||
              filters.minFollowers ||
              filters.niche !== "All niches") && (
              <span className="w-5 h-5 flex items-center justify-center bg-purple-600 text-white text-xs rounded-full font-bold">
                {[
                  filters.platforms.length > 0,
                  filters.verifiedOnly,
                  filters.monetizedOnly,
                  !!filters.minFollowers,
                  filters.niche !== "All niches",
                ].filter(Boolean).length}
              </span>
            )}
          </motion.button>
        </div>

        {/* Content: Sidebar + Cards */}
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />

          {/* Listings Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filteredListings.length}</span>{" "}
                {filteredListings.length === 1 ? "listing" : "listings"} found
              </p>
            </div>

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {filteredListings.map((listing, index) => (
                  <MarketplaceCard key={listing.id} listing={listing} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <SlidersHorizontal size={28} className="text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">No listings match your filters</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-xs">
                  Try adjusting your filters or broadening your search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
