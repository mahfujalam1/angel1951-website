import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { Toaster } from 'react-hot-toast';
import ChatAssistant from "@/components/layout/ChatAssistant";

export const metadata: Metadata = {
  title: "Buan Logistics — Track Goods Any Time",
  description: "Reliable logistics from China to Africa and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ChatAssistant />
        </Providers>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}