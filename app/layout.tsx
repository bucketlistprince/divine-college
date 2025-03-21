import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils/classnames";

export const metadata: Metadata = {
  title: "Divine College of Creative Arts",
  description: "Empowering the next generation with creative arts and fashion education",
  keywords: ["fashion school", "creative arts", "design education", "fashion design", "art college"],
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
