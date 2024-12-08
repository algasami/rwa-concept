import React from "react";

const KEYPOINTS: Array<{ title: string; description: React.ReactNode }> = [
  {
    title: "Decentralized",
    description: (
      <p>
        Our ticket selling platform is built on the decentralized web, which
        ensures that all the buyers and sellers are connected directly without
        compromising their privacy.
      </p>
    ),
  },
  {
    title: "Anti-Fraud",
    description: (
      <p>
        The peer-to-peer nature of our platform ensures that all transactions
        are secure and free from fraud. No more worries about fake tickets or
        scams.
      </p>
    ),
  },
  {
    title: "Scalper-Proof",
    description: (
      <p>
        No more scalpers! With our custom-built smart contracts, you can be sure
        that all tickets are sold at a fair price with no third-party fees.
      </p>
    ),
  },
  {
    title: "Comprehensive Dashboard",
    description: (
      <p>
        With our service, you are always one step ahead of other competitors via
        our comprehensive dashboard system, which offers an assortment of
        analysis tools to ensure your success.
      </p>
    ),
  },
];

export default function Home() {
  return (
    <main>
      <h1>Decentralized Ticket Selling Platform</h1>
      <p className="italic">
        Sellers are often troubled by scalpers and fraudsters. Our platform
        solves these problems by providing a decentralized ticket selling
        interface with blockchain technology.
      </p>
      <ul className="flex flex-row flex-wrap justify-center lg:justify-start gap-5">
        {KEYPOINTS.map(({ title, description }) => (
          <li className="region lg:max-w-[30rem]" key={title}>
            <h2 className="uppercase text-violet-400">{title}</h2>
            {description}
          </li>
        ))}
      </ul>
    </main>
  );
}
