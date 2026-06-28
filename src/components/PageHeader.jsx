function PageHeader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Listings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your social media account listings
          </p>
        </div>

        {/* Right Side */}
        <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition">
          + New Listing
        </button>

      </div>
    </div>
  );
}

export default PageHeader;