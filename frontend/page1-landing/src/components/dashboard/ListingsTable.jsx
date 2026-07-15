import React from "react";
import { mockListings } from "../../data/listings";

export default function ListingsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase">
                #
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
                Title
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
                Niche
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
                Platform
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            {mockListings.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 hover:bg-gray-50/55 transition"
              >
                <td className="py-4 px-5 text-gray-700 font-medium">
                  {item.id}.
                </td>
                <td className="py-4 px-4 text-gray-700 font-semibold">
                  {item.title}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {item.category}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {item.platform}
                </td>
                <td className="py-4 px-4 text-gray-700 font-mono text-xs">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
