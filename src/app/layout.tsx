import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCars sales",
  description: "Sale old, find new. With SCars sales operations never been easier",
  keywords: ["cars, sale, trade, buy car, sell car, details, buy details, sell details, auction"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
