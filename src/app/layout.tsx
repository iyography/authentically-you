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
  title: "Recess | For Skool Owners",
  description: "You don't have to build alone anymore. Recess is where Skool owners rest, connect, and remember why they started. Free forever.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Recess | For Skool Owners",
    description: "You don't have to build alone anymore. Recess is where Skool owners rest, connect, and remember why they started. Free forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recess - For Skool Owners",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recess | For Skool Owners",
    description: "You don't have to build alone anymore. Recess is where Skool owners rest, connect, and remember why they started. Free forever.",
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
