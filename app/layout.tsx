import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayank | Digital Asset Exchange",
  description: "A curated exchange for startup-built digital assets with documented ownership and a practical transfer route.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
