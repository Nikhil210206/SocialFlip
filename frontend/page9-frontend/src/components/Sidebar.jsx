import {
  LayoutDashboard,
  BadgeCheck,
  SlidersHorizontal,
  List,
  Wallet,
  Landmark,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-4xl font-bold">
          <span className="text-indigo-500">flip</span>earn.
        </h1>
      </div>

      <div className="flex flex-col items-center mt-2">
        <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center text-white text-3xl font-bold">
          J
        </div>

        <p className="mt-4 text-xl">John Doe</p>
      </div>

      <nav className="mt-12 flex flex-col gap-2 px-4">
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem
          active
          icon={<BadgeCheck size={20} />}
          text="Verify"
        />
        <SidebarItem
          icon={<SlidersHorizontal size={20} />}
          text="Change"
        />
        <SidebarItem icon={<List size={20} />} text="Listings" />
        <SidebarItem icon={<Wallet size={20} />} text="Transactions" />
        <SidebarItem icon={<Landmark size={20} />} text="Withdrawal" />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        active
          ? "bg-indigo-100 text-indigo-600 font-semibold border-r-4 border-indigo-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}