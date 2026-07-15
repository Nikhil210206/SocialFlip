import React, { useState } from "react";
import { TrendingUp, DollarSign, AlignJustify, Users, Menu, X, CheckCircle, ShieldCheck, RefreshCw } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import ListingsTable from "../components/dashboard/ListingsTable";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Mock verify items state
  const [verifyList, setVerifyList] = useState([
    { id: 1, handle: "@stylebyalex", platform: "Pinterest", niche: "Fashion", status: "Pending Verification" },
    { id: 2, handle: "@GamingHub", platform: "Discord", niche: "Gaming", status: "Pending Verification" }
  ]);

  // Mock withdrawal requests state
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, user: "Alex Savvy", amount: "$7,500", date: "Today", status: "Pending Approval" },
    { id: 2, user: "Sophia Beats", amount: "$3,800", date: "Yesterday", status: "Approved" }
  ]);

  const handleVerify = (id) => {
    setVerifyList(verifyList.map(item => item.id === id ? { ...item, status: "Verified" } : item));
  };

  const handleApproveWithdrawal = (id) => {
    setWithdrawals(withdrawals.map(item => item.id === id ? { ...item, status: "Approved" } : item));
  };

  const stats = [
    { label: "Total Listings", value: "10", icon: TrendingUp },
    { label: "Total Revenue", value: "$10,300", icon: DollarSign },
    { label: "Active Listings", value: "8", icon: AlignJustify },
    { label: "Total Users", value: "12", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Verify":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Pending Verification Queue</h2>
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
              {verifyList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 pb-2 text-gray-400 font-semibold">
                        <th className="text-left py-3 px-4">Handle</th>
                        <th className="text-left py-3 px-4">Platform</th>
                        <th className="text-left py-3 px-4">Niche</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verifyList.map(item => (
                        <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <td className="py-4 px-4 font-mono font-semibold text-gray-700">{item.handle}</td>
                          <td className="py-4 px-4 text-gray-600">{item.platform}</td>
                          <td className="py-4 px-4 text-gray-600">{item.niche}</td>
                          <td className="py-4 px-4">
                            <span className={`text-xxs font-bold px-2.5 py-0.5 rounded-full ${item.status === 'Verified' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {item.status === "Pending Verification" ? (
                              <button
                                onClick={() => handleVerify(item.id)}
                                className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                                <CheckCircle size={14} /> Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">Verification queue is clean!</p>
              )}
            </div>
          </div>
        );
      case "Change":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Platform Activity & Audits</h2>
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3 border-l-2 border-violet-500 pl-4 py-1">
                <div>
                  <span className="text-xxs text-gray-400 font-bold">10 MINUTES AGO</span>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">Escrow fee changed to 0% promotion</p>
                  <p className="text-xs text-gray-500">Admin configured zero percent fee active tier.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-green-500 pl-4 py-1">
                <div>
                  <span className="text-xxs text-gray-400 font-bold">1 HOUR AGO</span>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">Audit log clean - 10 active listings</p>
                  <p className="text-xs text-gray-500">Security check passed on database verification.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Listings":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">All System Listings</h2>
            <ListingsTable />
          </div>
        );
      case "Transactions":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Platform Transactions</h2>
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 pb-2 text-gray-400 font-semibold">
                      <th className="text-left py-3 px-4">Deal ID</th>
                      <th className="text-left py-3 px-4">Listing Title</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Buyer</th>
                      <th className="text-left py-3 px-4">Escrow Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-4 px-4 font-bold">#4902</td>
                      <td className="py-4 px-4 font-semibold text-gray-800">Travel Instagram Page with 50k Followers</td>
                      <td className="py-4 px-4">$2,800</td>
                      <td className="py-4 px-4">Jinshi</td>
                      <td className="py-4 px-4">
                        <span className="bg-purple-50 text-purple-700 text-xxs font-bold px-2 py-0.5 rounded-full border border-purple-100">
                          Funds Held
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-4 px-4 font-bold">#4891</td>
                      <td className="py-4 px-4 font-semibold text-gray-800">Music Twitch Channel with 20k Followers</td>
                      <td className="py-4 px-4">$3,800</td>
                      <td className="py-4 px-4">Watson</td>
                      <td className="py-4 px-4">
                        <span className="bg-green-50 text-green-700 text-xxs font-bold px-2 py-0.5 rounded-full border border-green-100">
                          Released
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Withdrawal":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Withdrawal Approvals</h2>
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 pb-2 text-gray-400 font-semibold">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map(w => (
                    <tr key={w.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="py-4 px-4 font-semibold text-gray-700">{w.user}</td>
                      <td className="py-4 px-4 text-gray-900 font-bold">{w.amount}</td>
                      <td className="py-4 px-4 text-gray-500">{w.date}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xxs font-bold px-2.5 py-0.5 rounded-full ${w.status === "Approved" ? "bg-green-50 text-green-700 border border-green-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {w.status === "Pending Approval" ? (
                          <button
                            onClick={() => handleApproveWithdrawal(w.id)}
                            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                          >
                            Approve Payout
                          </button>
                        ) : (
                          <span className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                            <CheckCircle size={14} /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Dashboard":
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Recent Listings
              </h2>
              <ListingsTable />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 sticky top-[72px] lg:top-[88px]">
        <span className="text-xl font-extrabold text-violet-600">
          flip<span className="text-black">earn</span>
          <span className="text-violet-500">.</span>
          <span className="text-xs text-gray-400 font-bold ml-2 uppercase tracking-widest">Admin</span>
        </span>

        <div className="flex items-center gap-4">
          <a
            href="/sell"
            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-md shadow-violet-100"
          >
            + Create Listing
          </a>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-150"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Body container with sidebar + main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Dashboard Main Metrics */}
        <main className="flex-1 min-h-[calc(100vh-112px)] bg-gray-50 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin{" "}
              <span className="text-violet-500 underline">
                Dashboard
              </span>
            </h1>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
