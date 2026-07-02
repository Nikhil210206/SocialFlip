import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-gradient-brand">flip</span>
          <span className="text-gray-900">earn</span>
          <span className="text-purple-600">.</span>
        </h1>
        <p className="text-gray-600 mb-8">Social Media Account Marketplace</p>
        <Link
          href="/marketplace"
          className="gradient-purple text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Browse Marketplace
        </Link>
      </div>
    </div>
  );
}
