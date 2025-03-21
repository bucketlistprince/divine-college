import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils/classnames";

export const metadata: Metadata = {
  title: "Divine College of Creative Arts",
  description: "Empowering the next generation with creative arts and fashion education",
  keywords: ["fashion school", "creative arts", "design education", "fashion design", "art college"],
  icons: {
    icon: [
      {
        url: "/favicon-light.ico",
        sizes: "16x16",
        type: "image/x-icon",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/favicon-dark.ico",
        sizes: "16x16",
        type: "image/x-icon",
        media: "(prefers-color-scheme: dark)"
      },
      {
        url: "/images/logo-black.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/images/logo-white.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)"
      }
    ],
    shortcut: [
      {
        url: "/favicon-light.ico",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: dark)"
      }
    ],
    apple: [
      {
        url: "/images/logo-black.svg",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/images/logo-white.svg",
        media: "(prefers-color-scheme: dark)"
      }
    ],
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        "font-sans antialiased bg-white min-h-screen flex flex-col"
      )}>
        {children}
      </body>
    </html>
  );
}
