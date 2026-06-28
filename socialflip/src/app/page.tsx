import ListingForm from "@/components/listing/ListingForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            flip<span className="text-blue-600">earn</span>
            <span className="text-blue-600">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Marketplace
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Messages
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              My Listings
            </a>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
            Login
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="rounded-xl p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">List Your Account</h1>
          <p className="text-sm text-gray-500 mb-8">
            Create a mock listing to display your account info
          </p>
          <ListingForm />
        </div>
      </main>
    </div>
  );
}