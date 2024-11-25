import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ estateIdTree: string[] | undefined }>;
}) {
  const { estateIdTree } = await params;
  return (
    <div className="flex flex-row items-stretch">
      <div className="flex flex-col">{estateIdTree?.join(",")}</div>
      <div className="bg-slate-300 w-1 m-2"></div>
      {children}
    </div>
  );
}
