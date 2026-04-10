import type { Metadata } from "next";
import { Bricolage_Grotesque, Host_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

// ── Display: Bricolage Grotesque ──
// Variable grotesk with real engineering character and a fluid optical-size axis.
// Chosen to reinforce the "kinetic precision" brand and deliberately avoid
// the reflex-reject pool (Space Grotesk, Syne, DM Sans, etc.).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ── Body: Host Grotesk ──
// Neutral but uncommon workhorse with precise engineering feel and tabular
// numerals well-suited to spec tables and capacity figures.
const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pro ITECH — Industrielle Kältemaschinen und Temperiergeräte",
  description:
    "Kinetic Precision — Kälte- und Temperierlösungen für anspruchsvolle Industrieanwendungen. Entwickelt und geprüft in Berlin.",
  icons: {
    icon: "/faviconchiller.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${host.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
