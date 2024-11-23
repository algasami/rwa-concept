import { Geist, Geist_Mono } from "next/font/google";

export const geist = Geist({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
