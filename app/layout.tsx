import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "../components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Divine College of Creative Arts",
  description: "Empowering the next generation with creative arts and fashion education",
  keywords: ["fashion school", "creative arts", "design education", "fashion design", "art college"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
