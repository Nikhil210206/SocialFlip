export type Platform =
  | "YouTube"
  | "Instagram"
  | "TikTok"
  | "Facebook"
  | "Twitter"
  | "LinkedIn"
  | "Twitch"
  | "Discord"
  | "Pinterest";

export interface Listing {
  id: number;
  title: string;
  platform: Platform;
  username: string;
  followers: string;
  followersCount: number;
  engagement: string;
  category: string;
  country: string;
  description: string;
  price: number;
  verified: boolean;
  featured: boolean;
  monetized?: boolean;
}

export interface FilterState {
  search: string;
  platforms: Platform[];
  priceRange: [number, number];
  minFollowers: string;
  niche: string;
  verifiedOnly: boolean;
  monetizedOnly: boolean;
}
