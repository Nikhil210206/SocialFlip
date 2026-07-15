import React from "react";

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-150">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">
            {label}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </h3>
        </div>
        <Icon
          size={22}
          className="text-gray-400"
        />
      </div>
    </div>
  );
}
