import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full select-none flex flex-col justify-center items-center backdrop-blur-[2px]">
      <h1 className="text-[2.5rem] font-medium leading-10">THU 14 NOV</h1>
      <h2 className="text-8xl font-medium">12:33</h2>
      <div className="mt-5">
        <Link href="/app">
          <button className="key__button">START</button>
        </Link>
      </div>
    </main>
  );
}
