import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { geist, geistMono } from "@/utils/font";
import { Footer } from "@/components/footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    absolute: "RWA Concept",
    template: "%s | RWA Concept",
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
        className={`antialiased font-sans ${geist.variable} ${geistMono.variable} flex flex-col min-h-[100vh] bg-[url('/imgs/bg-forest.jpg')] bg-cover`}
      >
        <div className={`flex flex-col lg:flex-row justify-center`}>
          <Navbar />
          <div className="region rounded-lg p-2 shadow-lg backdrop-blur-sm bg-opacity-80 bg-stone-800 m-4 content-page lg:w-[80rem]">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
