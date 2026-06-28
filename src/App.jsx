import Navbar from "./components/Navbar";
import PageHeader from "./components/PageHeader";
import StatsCard from "./components/StatsCard";
import BalanceCard from "./components/BalanceCard";
import ListingCards from "./components/ListingCards";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <PageHeader />

      {/* Main Container */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-8">

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Listings" value="5" />
          <StatsCard title="Active Listings" value="3" />
          <StatsCard title="Sold" value="1" />
          <StatsCard title="Total Value" value="$27,050" />
        </div>

        {/* Balance Cards */}
        <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BalanceCard title="Earned" amount="$0.00" />
            <BalanceCard title="Withdrawn" amount="$0.00" />
            <BalanceCard title="Available" amount="$0.00" />
          </div>
        </div>

        {/* Listing Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <ListingCards
            icon="youtube"
            title="Tech YouTube Channel with 120k Subscribers"
            username="@TechSavvyAlex"
            followers="120.0K followers"
            engagement="4% engagement"
            price="$7,500"
            status="Active"
          />

          <ListingCards
            icon="instagram"
            title="Travel Instagram Page with 50k Followers"
            username="@wanderlust.sophia"
            followers="50.0K followers"
            engagement="3% engagement"
            price="$2,800"
            status="Active"
          />

          <ListingCards
            icon="pinterest"
            title="Fashion Pinterest Board with 90k Monthly Views"
            username="@stylebyalex"
            followers="15.0K followers"
            engagement="4% engagement"
            price="$950"
            status="Active"
          />

          <ListingCards
            icon="tiktok"
            title="Fitness TikTok with 300k Followers"
            username="@fitwithdavid"
            followers="300.0K followers"
            engagement="5% engagement"
            price="$12,000"
            status="Pending"
          />

          <ListingCards
            icon="twitch"
            title="Music Twitch Channel with 20k Followers"
            username="@SophiaBeats"
            followers="20.0K followers"
            engagement="6% engagement"
            price="$3,800"
            status="Sold"
          />

        </div>

        <Footer />

      </div>
    </div>
  );
}

export default App;