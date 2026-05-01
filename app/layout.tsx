import type { Metadata } from "next";
import "./globals.css";
import ContentAgency from "./ContentAgency";

export const metadata: Metadata = {
  title: "Content Agency — AI Content Generator",
  description: "Generate blog posts, social media content, and emails in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
