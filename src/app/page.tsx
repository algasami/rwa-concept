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
    description: <p></p>,
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
          <li className="region lg:max-w-[30rem]">
            <h2 className="uppercase">{title}</h2>
            {description}
          </li>
        ))}
      </ul>
    </main>
  );
}
