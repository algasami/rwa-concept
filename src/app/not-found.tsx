import Link from "next/link";

export default function NotFoundGeneral() {
  return (
    <main>
      <h1>404 NOT FOUND</h1>
      You have navigated to uncharted lands. Fortunately, you bumped into a
      wizard and his followers. He gave you a portion. If you drink it, you will
      be teleported back to your home instantaneously. Do you accept his offer?
      <Link href={"/"} className="link">
        Yes!
      </Link>
    </main>
  );
}
