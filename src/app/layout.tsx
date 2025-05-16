import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Providers } from "./providers";
import { ToastProvider } from "@/toast-provider";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title:
    process.env.NODE_ENV === "production"
      ? "Finance Viewer"
      : "Finance Viewer (Development)",
  description: "Fintech app for investment, budget, and debt management",
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
        className={`${openSans.className} antialiased dark flex h-screen items-center`}
      >
        <Providers>
          <Suspense fallback={<Loading />}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Suspense>
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
