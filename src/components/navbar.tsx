import { NAVLINKS } from "@/utils/misc";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="navbar m-2 flex flex-row lg:flex-col items-center lg:items-stretch gap-5">
      <h1 className="font-extrabold">R.C.</h1>
      <ul className="flex flex-row lg:flex-col items-center lg:items-stretch gap-5">
        {NAVLINKS.map(({ title, url }) => (
          <Link href={url} key={url}>
            <li className="button text-center">{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
