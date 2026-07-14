const data = [
  {
    title: "Tech YouTube Channel with 120k Subscribers",
    niche: "Tech",
    platform: "Youtube",
    username: "TechSavvyAlex",
  },
  {
    title: "Travel Instagram Page with 50k Followers",
    niche: "Travel",
    platform: "Instagram",
    username: "wanderlust.sophia",
  },
  {
    title: "Fashion Pinterest Board with 90k Monthly Views",
    niche: "Fashion",
    platform: "Pinterest",
    username: "stylebyalex",
  },
  {
    title: "Fitness TikTok with 300k Followers",
    niche: "Fitness",
    platform: "Tiktok",
    username: "fitwithdavid",
  },
  {
    title: "Music Twitch Channel with 20k Followers",
    niche: "Music",
    platform: "Twitch",
    username: "SophiaBeats",
  },
];

export default function VerifyTable() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-white border-b">
          <tr className="text-left text-gray-600 text-sm">
            <th className="px-6 py-5">#</th>
            <th className="px-6 py-5">TITLE</th>
            <th className="px-6 py-5">NICHE</th>
            <th className="px-6 py-5">PLATFORM</th>
            <th className="px-6 py-5">USERNAME</th>
            <th className="px-6 py-5">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-5">{index + 1}</td>

              <td className="px-6 py-5">{item.title}</td>

              <td className="px-6 py-5">{item.niche}</td>

              <td className="px-6 py-5">{item.platform}</td>

              <td className="px-6 py-5">{item.username}</td>

              <td className="px-6 py-5">
                <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}