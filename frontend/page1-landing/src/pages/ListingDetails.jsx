import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, DollarSign, ShieldAlert, MessageSquare, TrendingUp, Users, MapPin, Eye, FileText, CheckCircle, CreditCard, Lock, ShieldCheck, X, Flame } from "lucide-react";
import PlatformIcon from "../components/marketplace/PlatformIcon";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const listingId = parseInt(id, 10);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive Graph Hover State
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Watch count state
  const [watchCount, setWatchCount] = useState(0);

  // Custom Offers States
  const [offers, setOffers] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [offerAmount, setOfferAmount] = useState("");

  // Checkout modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch listing from database");
        return res.json();
      })
      .then((data) => {
        setListing(data);
        setWatchCount(data.watchCount || 0);
        setOffers(data.offers || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleWatch = () => {
    fetch(`http://localhost:5000/api/listings/${listingId}/watch`, { method: "POST" })
      .then(res => res.json())
      .then(data => setWatchCount(data.watchCount))
      .catch(err => console.error(err));
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!buyerName || !offerAmount) {
      alert("Please enter both your name and offer amount.");
      return;
    }

    fetch(`http://localhost:5000/api/listings/${listingId}/offers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyerName, offerAmount })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit offer");
        return res.json();
      })
      .then(data => {
        setOffers(data);
        setBuyerName("");
        setOfferAmount("");
      })
      .catch(err => alert(err.message));
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!email || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        cardNumber,
        expiry,
        cvv,
        listingId
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Payment checkout failed");
        return res.json();
      })
      .then((data) => {
        setPaymentSuccess(true);
        setShowPaymentModal(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-150 shadow-sm max-w-md w-full text-center">
          <ShieldAlert className="mx-auto text-red-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            {error || "The social account you are looking for might have been sold, deleted, or the link is invalid."}
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Calculate dynamic SVG graph points
  const growthData = listing.growthData || [];
  const chartWidth = 600;
  const chartHeight = 160;
  const paddingX = 45;
  const paddingY = 20;

  const maxVal = growthData.length > 0 ? Math.max(...growthData.map(d => d.value)) : 100;
  const minVal = growthData.length > 0 ? Math.min(...growthData.map(d => d.value)) * 0.95 : 0;

  const points = growthData.map((d, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (growthData.length - 1);
    const y = chartHeight - paddingY - ((d.value - minVal) * (chartHeight - paddingY * 2)) / (maxVal - minVal);
    return { x, y, ...d };
  });

  const pathD = points.length > 0 ? `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}` : "";
  const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z` : "";

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top Banner and Navigation */}
      <div className="bg-white border-b border-gray-100 py-4 shadow-sm sticky top-[72px] lg:top-[88px] z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150 group font-semibold"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Listings</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWatch}
              className="flex items-center gap-1 text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-full font-semibold transition cursor-pointer"
            >
              <Flame size={14} className="fill-purple-300 text-purple-600" /> Watch ({watchCount})
            </button>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full font-semibold">
              Listing ID: #{listing.id}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {paymentSuccess && (
          <div className="bg-green-50 border border-green-150 rounded-2xl p-6 mb-6 text-center max-w-lg mx-auto shadow-sm animate-fadeIn">
            <CheckCircle2 className="text-green-500 mx-auto w-12 h-12 mb-3" />
            <h2 className="text-xl font-bold text-green-900 mb-1">Purchase Successful!</h2>
            <p className="text-sm text-green-700 mb-4">
              Your payment is held securely in escrow. Temporary login credentials: <br />
              <span className="font-mono bg-green-100 px-2 py-0.5 rounded text-xs select-all">Username: {listing.username} | Pass: socialflip_temp_2026</span>
            </p>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Close Alert
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Account Details Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Card Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <PlatformIcon platform={listing.platform} size={50} />
                  <div className="flex flex-col gap-1.5">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                      {listing.title}
                    </h1>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-mono text-gray-500 font-medium">{listing.username}</span>
                      {listing.verified && (
                        <CheckCircle2 className="text-green-500 fill-green-50" size={16} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {listing.verified && (
                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-100 flex items-center gap-1">
                      <CheckCircle size={12} /> Verified Seller
                    </span>
                  )}
                  {listing.monetized && (
                    <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                      ⚡ Monetized
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Listing Description</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {listing.description}
                  {"\n\n"}This account has been thoroughly vetted by SocialFlip's verification team. It features high organic reach, clean copyright standing, and is fully ready for transfer. All assets, login credentials, and linked emails are ready to be securely delivered to the buyer.
                </p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Channel Performance</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Users className="text-purple-600 mx-auto mb-2" size={20} />
                  <p className="text-xs text-gray-400 font-medium">Followers</p>
                  <p className="text-lg font-bold text-gray-900">{listing.followers}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <TrendingUp className="text-indigo-600 mx-auto mb-2" size={20} />
                  <p className="text-xs text-gray-400 font-medium">Engagement Rate</p>
                  <p className="text-lg font-bold text-gray-900">{listing.engagement}%</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <MapPin className="text-pink-600 mx-auto mb-2" size={20} />
                  <p className="text-xs text-gray-400 font-medium">Audience Location</p>
                  <p className="text-lg font-bold text-gray-900">{listing.country}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Eye className="text-blue-600 mx-auto mb-2" size={20} />
                  <p className="text-xs text-gray-400 font-medium">Audience Quality</p>
                  <p className="text-lg font-bold text-gray-900">Excellent</p>
                </div>
              </div>
            </div>

            {/* Interactive Audience Growth Graph */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Audience Growth (Last 6 Months)</h2>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  +12.4% MoM
                </span>
              </div>

              {/* Responsive Chart Area */}
              <div className="relative pt-6 pb-8">
                {points.length > 0 ? (
                  <div className="relative">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path d={areaD} fill="url(#growthGrad)" />

                      {/* Line Path */}
                      <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />

                      {/* Horizontal Grid lines */}
                      <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1={paddingX} y1={(chartHeight - paddingY) / 2} x2={chartWidth - paddingX} y2={(chartHeight - paddingY) / 2} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Axis labels */}
                      {points.map((p, index) => (
                        <text
                          key={`lbl-${index}`}
                          x={p.x}
                          y={chartHeight - 2}
                          textAnchor="middle"
                          className="text-[10px] fill-gray-400 font-semibold"
                        >
                          {p.month}
                        </text>
                      ))}

                      {/* Interactive Dots with large hover and touch trigger areas */}
                      {points.map((p, index) => (
                        <g key={`dot-${index}`} className="group/dot cursor-pointer">
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={22}
                            fill="transparent"
                            onMouseEnter={() => setHoveredPoint(p)}
                            onMouseLeave={() => setHoveredPoint(null)}
                            onTouchStart={() => {
                              setHoveredPoint(p);
                            }}
                            onClick={() => {
                              setHoveredPoint((prev) => (prev && prev.month === p.month ? null : p));
                            }}
                          />
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={hoveredPoint && hoveredPoint.month === p.month ? 8 : 5}
                            className="fill-purple-600 stroke-white stroke-2 transition-all duration-150 shadow"
                          />
                        </g>
                      ))}
                    </svg>

                    {/* Floating Tooltip Bubble */}
                    {hoveredPoint && (
                      <div
                        className="absolute bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl border border-gray-800 transition-all duration-100 pointer-events-none"
                        style={{
                          left: `${((hoveredPoint.x - paddingX) / (chartWidth - paddingX * 2)) * 100}%`,
                          top: `${(hoveredPoint.y / chartHeight) * 100 - 32}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <p className="text-[10px] text-purple-300 uppercase tracking-widest">{hoveredPoint.month}</p>
                        <p>{hoveredPoint.value.toLocaleString()} followers</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-10 text-sm">No growth charts available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Action and Purchase Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500" />

              <div className="mb-4">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Buyout Price
                </span>
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    ${listing.price.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm font-semibold text-gray-400 ml-1.5">USD</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-100 transition-all duration-200 cursor-pointer"
                >
                  <DollarSign size={18} /> Buy Instantly
                </button>
                <Link
                  to="/messages"
                  state={{ sellerUsername: listing.username }}
                  className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3.5 px-6 rounded-xl border border-gray-200 transition-all duration-200 text-center"
                >
                  <MessageSquare size={18} /> Chat with Seller
                </Link>
              </div>

              {/* Submit Custom Offer backend-driven block */}
              <div className="border-t border-gray-100 pt-5 mt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Submit Custom Offer
                </h4>
                <form onSubmit={handleOfferSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      placeholder="Offer Amount ($)"
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 rounded-xl transition cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                {/* List of active offers fetched from backend */}
                {offers.length > 0 && (
                  <div className="mt-4 bg-purple-50/50 border border-purple-100/50 rounded-xl p-3 space-y-2">
                    <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block">
                      Active Offers ({offers.length})
                    </span>
                    <ul className="text-xs space-y-1">
                      {offers.map((off, index) => (
                        <li key={index} className="flex justify-between text-gray-600">
                          <span>{off.buyer}</span>
                          <span className="font-bold text-gray-900">${off.amount.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Seller Information
              </h3>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-50 to-indigo-50 border border-purple-100 rounded-full flex items-center justify-center text-indigo-650 font-bold text-lg select-none">
                  {listing.username[1].toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{listing.username}</h4>
                  <p className="text-xs text-gray-400 font-semibold">Joined May 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs border-t border-gray-100 pt-4">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <span className="font-bold text-gray-900 block text-sm">18</span>
                  <span className="text-gray-400">Total Deals</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <span className="font-bold text-green-600 block text-sm">100%</span>
                  <span className="text-gray-400">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mock Escrow payment modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xl max-w-md w-full p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="text-purple-600" size={20} />
                Secure Checkout
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePaySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Delivery Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="•••• •••• •••• ••••"
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-sm"
                  />
                  <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition cursor-pointer"
              >
                Pay ${listing.price.toLocaleString()} Securely
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
