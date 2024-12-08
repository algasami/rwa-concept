import { Navbar } from "@/components/navbar";
import React from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col lg:flex-row justify-center`}>
      <Navbar />
      <div className="region rounded-lg p-2 shadow-lg backdrop-blur-sm bg-opacity-80 bg-stone-800 m-4 content-page">
        {children}
      </div>
    </div>
  );
}
