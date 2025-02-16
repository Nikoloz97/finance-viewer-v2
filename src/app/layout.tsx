import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: figure out how this work (looks like next uses this under the hood; title modifies the tab)
export const metadata: Metadata = {
  title: "Finance Viewer",
  description: "Fintech app that displays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* TODO: create dark mode button, which works by conditionally adding "dark" classname here */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark flex h-screen items-center gap-40`}
      >
        <div>
          <Sidebar />
        </div>
        {/* flex-1 = takes up rest of container */}
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
