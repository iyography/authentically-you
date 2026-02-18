import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const parisienne = Parisienne({
  weight: "400",
  variable: "--font-parisienne",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Authentically You | Camera Confidence Quiz",
  description: "Discover where you are on your camera confidence journey. Get clarity on your patterns, friction points, and where support helps most.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Authentically You | Camera Confidence Quiz",
    description: "Discover where you are on your camera confidence journey. Get clarity on your patterns, friction points, and where support helps most.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Authentically You - Camera Confidence Quiz",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentically You | Camera Confidence Quiz",
    description: "Discover where you are on your camera confidence journey. Get clarity on your patterns, friction points, and where support helps most.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${parisienne.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
