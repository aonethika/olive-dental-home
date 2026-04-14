import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Dental Clinic in Ramanattukara | Olive Dental Home Ramanattukara, Calicut",
  description:
  "Olive Dental Home is a trusted dental clinic in Ramanattukara, Calicut offering expert dentists, advanced dental treatments, teeth cleaning, cosmetic dentistry, and online appointment booking. Visit our dental clinic in Ramanattukara for quality and modern dental care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}