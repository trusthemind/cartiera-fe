import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartiera Details",
  description: "Buy and sell your details here, find what you really want",
  keywords: ["details", "sell details", "buy details", "trade", "old junk"],
};

export default function DetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
