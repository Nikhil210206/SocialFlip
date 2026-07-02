"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { FilterState } from "@/types";
import FilterContent from "./FilterContent";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: MobileFilterDrawerProps) {
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
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">Filters</span>
              </div>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={onReset}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-150"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Content */}
            <div className="flex-1 overflow-y-auto px-5 py-3 scrollbar-thin">
              <FilterContent filters={filters} onFilterChange={onFilterChange} />
            </div>

            {/* Apply Button */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full gradient-purple text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
