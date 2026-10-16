import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROMTech Order Center",
  description: "A NetSuite-style sales order app built with React, Next.js and TypeScript",
};

// The root layout wraps every page, so the header shows everywhere
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}