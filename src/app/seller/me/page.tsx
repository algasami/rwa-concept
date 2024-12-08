import { SellerContractPage } from "@/components/web3-provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SellerMePage() {
  return (
    <main>
      <h1>Welcome [username]</h1>
      <p>
        You are currently logged in as a seller. You can view your account
        details here as well as manage or create new ticket contracts.
      </p>
      <ConnectButton />
      <SellerContractPage />
    </main>
  );
}
