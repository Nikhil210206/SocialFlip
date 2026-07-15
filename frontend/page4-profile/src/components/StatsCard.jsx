import {
  FiEye,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

function StatsCard({ title, value }) {
  const icons = {
    "Total Listings": (
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <FiEye className="text-indigo-600" />
      </div>
    ),

    "Active Listings": (
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <FiCheckCircle className="text-green-600" />
      </div>
    ),

    Sold: (
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <FiTrendingUp className="text-indigo-600" />
      </div>
    ),

    "Total Value": (
      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
        <FaDollarSign className="text-yellow-600" />
      </div>
    ),
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-5 flex justify-between items-center">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>
      </div>

      {icons[title]}

    </div>
  );
}

export default StatsCard;