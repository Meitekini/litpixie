import type { Metadata } from "next";

import "./globals.css";
import ScrollToTop from "../components/shared/scroll-to-top";

export const metadata: Metadata = {
  title: "LitPixel Photography",
  description: "A modern photography portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ScrollToTop />
        {children}</body>
    </html>
  );
}
