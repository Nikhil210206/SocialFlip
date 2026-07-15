import { useState } from "react";

import {
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitch,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

import {
  FiStar,
  FiLock,
  FiUsers,
  FiTrendingUp,
  FiTrash2,
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function ListingCard({
  icon,
  title,
  username,
  followers,
  engagement,
  price,
  status,
}) {
  const [favorite, setFavorite] = useState(false);
  const [hidden, setHidden] = useState(false);

  const statusColor = {
    Active: "text-green-600",
    Pending: "text-gray-500",
    Sold: "text-indigo-600",
  };

  return (
    <div
      tabIndex={0}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 px-6 py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 flex-1">
          {/* Platform Icon */}
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            {icon === "youtube" && (
              <FaYoutube className="text-red-600 text-2xl" />
            )}

            {icon === "instagram" && (
              <FaInstagram className="text-pink-600 text-2xl" />
            )}

            {icon === "pinterest" && (
              <FaPinterestP className="text-red-500 text-2xl" />
            )}

            {icon === "tiktok" && (
              <FaTiktok className="text-black text-2xl" />
            )}

            {icon === "twitch" && (
              <FaTwitch className="text-purple-600 text-2xl" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1">
            <h2 className="font-semibold text-[17px] leading-7 text-gray-800">
              {title}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {username}
            </p>
          </div>
        </div>

        {/* Lock + Star */}
        <div className="flex items-center gap-2 ml-3">
          <FiLock className="text-gray-500 text-base" />

          <button onClick={() => setFavorite(!favorite)}>
            {favorite ? (
              <FaStar className="text-yellow-400 text-base" />
            ) : (
              <FiStar className="text-gray-500 text-base" />
            )}
          </button>
        </div>
      </div>

      {/* Followers & Status */}
      <div className="mt-5 flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiUsers />
            {followers}
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiTrendingUp />
            {engagement}
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium ${statusColor[status]}`}
        >
          {status === "Active" && <FiCheckCircle />}
          {status === "Pending" && <FiClock />}
          {status === "Sold" && <FaDollarSign className="text-xs" />}

          <span>{status.toLowerCase()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-200"></div>

      {/* Bottom */}
      <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-bold leading-none">
          {price}
        </h1>

        <div className="flex gap-2">
          <button className="border border-gray-300 rounded-xl p-2.5 hover:bg-gray-100 transition">
            <FiTrash2 className="text-lg" />
          </button>

          <button className="border border-gray-300 rounded-xl p-2.5 hover:bg-gray-100 transition">
            <FiEdit2 className="text-lg" />
          </button>

          <button
            onClick={() => setHidden(!hidden)}
            className="border border-gray-300 rounded-xl p-2.5 hover:bg-gray-100 transition"
          >
            {hidden ? (
              <FiEyeOff className="text-lg" />
            ) : (
              <FiEye className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;