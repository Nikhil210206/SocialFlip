export type Platform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "twitter"
  | "facebook"
  | "linkedin"
  | "pinterest"
  | "snapchat"
  | "twitch"
  | "other";

export type NicheCategory =
  | "fashion"
  | "beauty"
  | "fitness"
  | "travel"
  | "food"
  | "tech"
  | "gaming"
  | "finance"
  | "education"
  | "entertainment"
  | "lifestyle"
  | "sports"
  | "music"
  | "art"
  | "business"
  | "health"
  | "parenting"
  | "pets"
  | "photography"
  | "other";

export type AudienceAgeRange =
  | "13-17"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65+";

export interface ListingFormData {
  // Basic Information
  listingTitle: string;
  platform: Platform;
  usernameHandle: string;
  nicheCategory: NicheCategory;

  // Account Metrics
  followersCount: number;
  engagementRate: number;
  monthlyViews: number;
  primaryAudienceCountry: string;
  primaryAudienceAgeRange: AudienceAgeRange;
  isVerified: boolean;
  isMonetized: boolean;

  // Pricing & Description
  askingPrice: number;
  description: string;

  // Screenshots & Proof
  screenshots: File[];
}

export interface UploadedFile {
  file: File;
  previewUrl: string | null;
  id: string;
}