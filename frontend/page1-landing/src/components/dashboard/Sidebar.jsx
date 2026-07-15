import React from "react";
import {
  LayoutDashboard,
  CheckCircle,
  RefreshCw,
  List,
  CreditCard,
  Wallet,
  User,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Verify", icon: CheckCircle },
  { label: "Change", icon: RefreshCw },
  { label: "Listings", icon: List },
  { label: "Transactions", icon: CreditCard },
  { label: "Withdrawal", icon: Wallet },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-150 min-h-[calc(100vh-56px)] flex flex-col">
      <div className="flex flex-col items-center py-6 border-b border-gray-50">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
          <User className="text-violet-500" />
        </div>
        <p className="hidden md:block mt-2 text-sm font-semibold text-gray-800">
          John Doe
        </p>
        <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</span>
      </div>

      <nav className="flex-1 px-2 py-4">
        {navItems.map(({ label, icon: Icon }) => {
          const isActive = label === activeTab;
          return (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition ${
                isActive
                  ? "bg-violet-50 text-violet-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              <span className="hidden md:block text-sm">{label}</span>
            </div>
          );
        })}
      </nav>

      {/* Return to Marketplace link */}
      <div className="p-4 border-t border-gray-50">
        <Link
          to="/marketplace"
          className="flex items-center gap-2 p-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-650 transition text-xs font-semibold"
        >
          <ArrowLeft size={16} />
          <span className="hidden md:block">Marketplace</span>
        </Link>
      </div>
    </aside>
  );
}
