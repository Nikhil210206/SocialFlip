import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlipEarn - Social Media Account Marketplace",
  description: "Buy and sell social media accounts on FlipEarn's trusted marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
