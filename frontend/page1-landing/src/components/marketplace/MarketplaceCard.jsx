import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, TrendingUp, MapPin, CheckCircle2 } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

const categoryColors = {
  Fitness: "bg-pink-100 text-pink-700",
  Tech: "bg-blue-100 text-blue-700",
  Travel: "bg-emerald-100 text-emerald-700",
  Fashion: "bg-purple-100 text-purple-700",
  Music: "bg-indigo-100 text-indigo-700",
  Business: "bg-amber-100 text-amber-700",
  Gaming: "bg-cyan-100 text-cyan-700",
  Lifestyle: "bg-rose-100 text-rose-700",
  Food: "bg-orange-100 text-orange-700",
  Beauty: "bg-fuchsia-100 text-fuchsia-700",
  Education: "bg-teal-100 text-teal-700",
  Sports: "bg-green-100 text-green-700",
  Entertainment: "bg-red-100 text-red-700",
};

export default function MarketplaceCard({ listing, index }) {
  const categoryClass = categoryColors[listing.category] || "bg-gray-100 text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Featured Ribbon */}
      {listing.featured && (
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-1.5 px-4 flex items-center justify-center">
          <span className="text-white text-xs font-bold tracking-widest uppercase">Featured</span>
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        {/* Header: Icon + Title + Verified */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <PlatformIcon platform={listing.platform} size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2">
              {listing.title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {listing.username} – {listing.platform}
            </p>
          </div>
          {listing.verified && (
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 size={18} className="text-green-500" />
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Users size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-800">{listing.followers}</span>
            <span className="text-gray-400 font-normal">followers</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <TrendingUp size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-800">{listing.engagement}%</span>
            <span className="text-gray-400 font-normal">engagement</span>
          </div>
        </div>

        {/* Category + Country */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}>
            {listing.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} />
            <span>{listing.country}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {listing.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ${listing.price.toLocaleString("en-US")}
            </span>
            <span className="text-xs text-gray-400 ml-1 font-medium">USD</span>
          </div>
          <Link to={`/marketplace/${listing.id}`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:shadow-md hover:shadow-purple-200 transition-all duration-200 whitespace-nowrap"
            >
              More Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
