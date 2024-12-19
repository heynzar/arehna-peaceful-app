import Link from "next/link";
import Time from "@/components/Time";
export default function Home() {
  return (
    <main className="w-full h-full select-none flex flex-col justify-center items-center backdrop-blur-[2px]">
      <Time />
      <div className="mt-5">
        <Link href="/app">
          <button className="key__button">START</button>
        </Link>
      </div>
    </main>
  );
}
