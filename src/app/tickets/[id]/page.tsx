import { ConnectButton } from "@rainbow-me/rainbowkit";

type TParams = Promise<{ id: string }>;
export default async function TicketId({ params }: { params: TParams }) {
  const { id } = await params;

  return (
    <main className="m-4 lg:max-w-[50rem]">
      <ConnectButton />
      <h1 className="text-center">Ticket {id}</h1>
      <dl>
        <dt>Available Tickets:</dt>
        <dd>[Available Tickets]</dd>
        <dt>Price:</dt>
        <dd>[Price] ETH</dd>
      </dl>
    </main>
  );
}
