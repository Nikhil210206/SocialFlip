import type { Platform, NicheCategory, AudienceAgeRange } from "@/types/Listing";

export const PLATFORMS: { label: string; value: Platform }[] = [
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Twitter / X", value: "twitter" },
  { label: "Facebook", value: "facebook" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Snapchat", value: "snapchat" },
  { label: "Twitch", value: "twitch" },
  { label: "Other", value: "other" },
];

export const NICHE_CATEGORIES: { label: string; value: NicheCategory }[] = [
  { label: "Fashion", value: "fashion" },
  { label: "Beauty", value: "beauty" },
  { label: "Fitness", value: "fitness" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Tech", value: "tech" },
  { label: "Gaming", value: "gaming" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "Art", value: "art" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
  { label: "Parenting", value: "parenting" },
  { label: "Pets", value: "pets" },
  { label: "Photography", value: "photography" },
  { label: "Other", value: "other" },
];

export const AUDIENCE_AGE_RANGES: { label: string; value: AudienceAgeRange }[] = [
  { label: "13–17", value: "13-17" },
  { label: "18–24", value: "18-24" },
  { label: "25–34", value: "25-34" },
  { label: "35–44", value: "35-44" },
  { label: "45–54", value: "45-54" },
  { label: "55–64", value: "55-64" },
  { label: "65+", value: "65+" },
];

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_FILES = 10;
export const MAX_DESCRIPTION_CHARS = 1000;

export const DEFAULT_FOLLOWERS_COUNT = 10000;
export const DEFAULT_ENGAGEMENT_RATE = 4;
export const DEFAULT_MONTHLY_VIEWS = 100000;
export const DEFAULT_ASKING_PRICE = 2500;