import { z } from "zod";
import {
  MAX_DESCRIPTION_CHARS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILES,
} from "./constants";

export const listingSchema = z.object({
  listingTitle: z
    .string()
    .min(1, "Listing title is required")
    .max(150, "Title must be 150 characters or fewer"),

  platform: z.enum([
    "instagram",
    "youtube",
    "tiktok",
    "twitter",
    "facebook",
    "linkedin",
    "pinterest",
    "snapchat",
    "twitch",
    "other",
  ], { error: "Platform is required" }),

  usernameHandle: z
    .string()
    .min(1, "Username / handle is required")
    .max(100, "Username must be 100 characters or fewer"),

  nicheCategory: z.enum([
    "fashion",
    "beauty",
    "fitness",
    "travel",
    "food",
    "tech",
    "gaming",
    "finance",
    "education",
    "entertainment",
    "lifestyle",
    "sports",
    "music",
    "art",
    "business",
    "health",
    "parenting",
    "pets",
    "photography",
    "other",
  ], { error: "Niche / category is required" }),

  followersCount: z
    .number({ error: "Followers count must be a number" })
    .int("Followers count must be a whole number")
    .min(0, "Followers count cannot be negative"),

  engagementRate: z
    .number({ error: "Engagement rate must be a number" })
    .min(0, "Engagement rate cannot be negative")
    .max(100, "Engagement rate cannot exceed 100"),

  monthlyViews: z
    .number({ error: "Monthly views must be a number" })
    .int("Monthly views must be a whole number")
    .min(0, "Monthly views cannot be negative"),

  primaryAudienceCountry: z
    .string()
    .min(1, "Primary audience country is required")
    .max(100, "Country name must be 100 characters or fewer"),

  primaryAudienceAgeRange: z.enum([
    "13-17",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ], { error: "Audience age range is required" }),

  isVerified: z.boolean().default(false),
  isMonetized: z.boolean().default(false),

  askingPrice: z
    .number({ error: "Asking price must be a number" })
    .positive("Asking price must be greater than 0"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(
      MAX_DESCRIPTION_CHARS,
      `Description must be ${MAX_DESCRIPTION_CHARS} characters or fewer`
    ),

  screenshots: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE_BYTES,
          `Each file must be ${MAX_FILE_SIZE_MB} MB or smaller`
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only JPEG, PNG, WebP, and GIF files are accepted"
        )
    )
    .max(MAX_FILES, `You can upload a maximum of ${MAX_FILES} files`)
    .optional(),
});
