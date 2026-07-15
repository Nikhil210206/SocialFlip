import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flipearn - List Your Account",
  description: "Create a mock listing to display your account info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", margin: 0, padding: 0, backgroundColor: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}