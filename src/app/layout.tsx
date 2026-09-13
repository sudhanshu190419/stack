import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stackstich.online"),
  title: "StackStich — App & Web Development Agency",
  description:
    "From startup MVPs to enterprise software, we design, develop and launch high-performance mobile apps, web applications, AI solutions, and custom software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StackStich — App & Web Development Agency",
    description:
      "We build apps & websites that grow businesses. From MVPs to enterprise software.",
    url: "https://www.stackstich.online",
    siteName: "StackStich",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "StackStich — App & Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StackStich — App & Web Development Agency",
    description:
      "We build apps & websites that grow businesses. From MVPs to enterprise software.",
    images: ["/hero.png"],
  },
};

import Navbar from "@/components/navbar/Navbar";
import ScrollToTop from "@/components/common/ScrollToTop";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <ScrollToTop />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
