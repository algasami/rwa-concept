import React from "react";

const KEYPOINTS: Array<{ title: string; description: React.ReactNode }> = [
  {
    title: "Decentralized",
    description: (
      <p>
        With the advanced W.A.C framework -- Web3, AI, ChatGPT, our platform
        channel the power of Web 3.0 and AI to your very own hand, which means
        you are at <strong>full control</strong> over all of your assets on a
        single custom-tailored experience.
      </p>
    ),
  },
  {
    title: "Performance",
    description: (
      <p>
        <strong>Uncompromised Performance.</strong> [Company Name] establishes
        an efficient bidirectional gateway between you and Web3.0.
      </p>
    ),
  },
  {
    title: "Click & Go",
    description: (
      <p>
        No need to worry about Web3 Jargons. Our service offers a full-fledged
        wallet abstraction system that reduces the quondam complex tasks of
        setting up wallet accounts into a simple "click", powered by [Add Hot
        Wallet Provider Name].
      </p>
    ),
  },
  {
    title: "Seize the Day",
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
      <p className="italic">
        Control your personal finance in <strong>one click</strong>, free from
        government controls.
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
