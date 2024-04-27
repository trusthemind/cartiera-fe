import type { Metadata } from "next";
import "./globals.scss";
import ThemeProvider from "@/src/components/ThemeProvider";
import { AppHeader as Header } from "@/src/components/AppHeader"; 

export const metadata: Metadata = {
  title: "Cartiera sales",
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
        <body>
          <Header />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
