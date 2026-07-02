"use client";

import { Platform } from "@/types";

const PLATFORMS: Platform[] = [
  "YouTube",
  "Instagram",
  "TikTok",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Twitch",
  "Discord",
];

interface PlatformFilterProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  const toggle = (platform: Platform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter((p) => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="space-y-2">
      {PLATFORMS.map((platform) => (
        <label
          key={platform}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(platform)}
              onChange={() => toggle(platform)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                selected.includes(platform)
                  ? "bg-purple-600 border-purple-600"
                  : "bg-white border-gray-300 group-hover:border-purple-400"
              }`}
            >
              {selected.includes(platform) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className={`text-sm transition-colors duration-150 ${
            selected.includes(platform) ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-800"
          }`}>
            {platform}
          </span>
        </label>
      ))}
    </div>
  );
}
