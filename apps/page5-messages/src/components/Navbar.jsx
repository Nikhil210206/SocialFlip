import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-black">Social</span>
          <span className="text-blue-600">Flip</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-700 hover:text-blue-600">
            Home
          </button>

          <button className="text-gray-700 hover:text-blue-600">
            Marketplace
          </button>

          <button className="text-blue-600 font-medium">
            Messages
          </button>

          <button className="text-gray-700 hover:text-blue-600">
            My Listings
          </button>
        </div>

        {/* Desktop Login */}
        <button className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex flex-col p-4 gap-4">

            <button className="text-left text-gray-700 hover:text-blue-600">
              Home
            </button>

            <button className="text-left text-gray-700 hover:text-blue-600">
              Marketplace
            </button>

            <button className="text-left text-blue-600 font-medium">
              Messages
            </button>

            <button className="text-left text-gray-700 hover:text-blue-600">
              My Listings
            </button>

            <button className="bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700">
              Login
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;