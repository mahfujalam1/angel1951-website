import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { Toaster } from 'react-hot-toast';

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Buan Logistics — Track Goods Any Time",
  description: "Reliable logistics from China to Africa and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` ${inter.variable}`}>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}