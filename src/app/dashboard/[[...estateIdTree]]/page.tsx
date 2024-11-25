export default async function DashboardSelected({
  params,
}: {
  params: Promise<{ estateIdTree?: string[] }>;
}) {
  const { estateIdTree } = await params;
  return <main>What's up {estateIdTree?.join("?")}</main>;
}
