"use client";

import { Platform } from "@/types";

interface PlatformIconProps {
  platform: Platform;
  size?: number;
}

export default function PlatformIcon({ platform, size = 40 }: PlatformIconProps) {
  const iconSize = size;

  switch (platform) {
    case "TikTok":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#000000" />
          <path
            d="M26.5 14.5c-1.1-.7-1.9-1.8-2.2-3.1H22v12.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1v-2.4c-.3 0-.5-.1-.8-.1-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5v-6.5c1 .7 2.2 1.1 3.5 1.1v-2.3c-.7 0-1.4-.2-2-.3z"
            fill="white"
          />
        </svg>
      );
    case "YouTube":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#FF0000" />
          <path
            d="M30.5 15.3c-.3-1.2-1.2-2.1-2.4-2.4C26 12.5 20 12.5 20 12.5s-6 0-8.1.4c-1.2.3-2.1 1.2-2.4 2.4C9 17.4 9 20 9 20s0 2.6.5 4.7c.3 1.2 1.2 2.1 2.4 2.4C14 27.5 20 27.5 20 27.5s6 0 8.1-.4c1.2-.3 2.1-1.2 2.4-2.4C31 22.6 31 20 31 20s0-2.6-.5-4.7z"
            fill="white"
          />
          <polygon points="17.5,23.5 24.5,20 17.5,16.5" fill="#FF0000" />
        </svg>
      );
    case "Instagram":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#8134AF" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="20" fill="url(#ig-grad)" />
          <rect x="11" y="11" width="18" height="18" rx="5" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="20" cy="20" r="4.5" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="26" cy="14" r="1.2" fill="white" />
        </svg>
      );
    case "Facebook":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#1877F2" />
          <path
            d="M22 29v-8h2.7l.4-3H22v-1.9c0-.9.2-1.5 1.5-1.5H25v-2.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H16v3h2.8v8H22z"
            fill="white"
          />
        </svg>
      );
    case "Twitter":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#000000" />
          <path
            d="M22.3 18.4L28.5 11H27l-5.4 6.3L17.1 11H11.5l6.5 9.5L11.5 29H13l5.7-6.6 4.6 6.6H28.5L22.3 18.4zm-2 2.3l-.7-1L13.4 12.3h2.3l4.3 6.2.7 1 5.7 8.2h-2.3l-4.8-6.9z"
            fill="white"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#0A66C2" />
          <rect x="11" y="16" width="4" height="13" fill="white" />
          <circle cx="13" cy="12.5" r="2.5" fill="white" />
          <path
            d="M18 16h3.7v1.8h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V29h-4v-6.3c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V29H18V16z"
            fill="white"
          />
        </svg>
      );
    case "Twitch":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#9146FF" />
          <path
            d="M13 11l-2 5v13h5v3h3l3-3h4l5-5V11H13zm16 12l-3 3h-5l-3 3v-3h-4V13h15v10z"
            fill="white"
          />
          <rect x="22" y="16" width="2" height="5" fill="#9146FF" />
          <rect x="17" y="16" width="2" height="5" fill="#9146FF" />
        </svg>
      );
    case "Discord":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#5865F2" />
          <path
            d="M27.2 13.5c-1.4-.7-2.9-1.2-4.5-1.5-.2.4-.4.8-.5 1.2-1.7-.3-3.3-.3-5 0-.1-.4-.3-.8-.5-1.2-1.6.3-3.1.8-4.5 1.5C10.1 17.8 9.3 22 9.7 26.2c1.8 1.3 3.6 2.1 5.3 2.7.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.8-.8l.4-.4c3.4 1.6 7.2 1.6 10.6 0 .1.1.3.3.4.4-.6.3-1.2.6-1.8.8.3.7.7 1.3 1.1 1.9 1.7-.6 3.5-1.4 5.3-2.7.5-4.8-.8-9-3.1-12.7zM15.8 23.5c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm8.4 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z"
            fill="white"
          />
        </svg>
      );
    case "Pinterest":
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#E60023" />
          <path
            d="M20 10c-5.5 0-10 4.5-10 10 0 4.2 2.6 7.8 6.3 9.3-.1-.8-.1-2 .2-2.9.3-1 1.9-7.9 1.9-7.9s-.5-.9-.5-2.3c0-2.2 1.3-3.8 2.9-3.8 1.4 0 2 1 2 2.2 0 1.4-.9 3.4-1.3 5.3-.4 1.6.8 2.8 2.3 2.8 2.7 0 4.5-2.9 4.5-7 0-3.7-2.6-6.2-6.4-6.2-4.4 0-6.9 3.3-6.9 6.7 0 1.3.5 2.7 1.1 3.5.1.1.1.3.1.4-.1.5-.4 1.6-.4 1.8-.1.3-.2.4-.5.2-1.9-.9-3.1-3.6-3.1-5.8 0-4.7 3.4-9 9.8-9 5.1 0 9.1 3.7 9.1 8.6 0 5.1-3.2 9.2-7.7 9.2-1.5 0-2.9-.8-3.4-1.7l-.9 3.5c-.3 1.3-1.2 2.9-1.8 3.9.7.2 1.3.3 2 .3 5.5 0 10-4.5 10-10S25.5 10 20 10z"
            fill="white"
          />
        </svg>
      );
    default:
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#7c3aed" />
          <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            {platform[0]}
          </text>
        </svg>
      );
  }
}
