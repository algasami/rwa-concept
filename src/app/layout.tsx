import type { Metadata } from "next";
import "./globals.css";
import { geist, geistMono } from "@/utils/font";
import { Footer } from "@/components/footer";
import { Web3Provider } from "@/components/web3-provider";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: {
    absolute: "Ticket Tool",
    template: "%s | Ticket Tool",
  },
  description: "This is a RWA Concept website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-sans ${geist.variable} ${geistMono.variable} flex flex-col min-h-[100vh] bg-cover bg-gradient-to-r from-violet-900 to-slate-900`}
      >
        <div className="flex flex-row justify-center">
          <Web3Provider>{children}</Web3Provider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
