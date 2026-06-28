import React from "react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-[38px] font-extrabold tracking-tight select-none">
          <span className="text-indigo-600">flip</span>
          <span className="text-indigo-500">earn</span>
          <span className="text-black">.</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[15px] text-gray-600">

          <li className="cursor-pointer transition hover:text-indigo-600">
            Home
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Marketplace
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Messages
          </li>

          <li className="font-semibold text-gray-900 cursor-pointer">
            My Listings
          </li>

        </ul>

        {/* Login Button */}
        <button className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200">
          Login
        </button>

        {/* Mobile Menu */}
        <button className="md:hidden text-4xl text-gray-700 hover:text-indigo-600 transition">
          ☰
        </button>

      </div>
    </nav>
  );
}

export default Navbar;