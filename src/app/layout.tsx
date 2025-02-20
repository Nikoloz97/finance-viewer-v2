import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "./sidebar";
import { Providers } from "./providers";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "300",
});

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
        className={`${openSans.className} antialiased dark flex h-screen items-center p-10`}
      >
        <Providers>
          <Sidebar />
          {/* flex-1 = takes up rest of container */}
          <div className="flex-1 h-full flex items-center">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
