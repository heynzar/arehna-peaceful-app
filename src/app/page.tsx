import Image from "next/image";
import bg from "@/assets/bg.jpg";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="h-full w-full select-none"
    >
      <main className="w-full h-full flex flex-col justify-center items-center bg-black/45 backdrop-blur-[2px]">
        <h1 className="text-[2.5rem] font-medium leading-10">THU 14 NOV</h1>
        <h2 className="text-8xl font-medium">12:33</h2>
        <div className="mt-5">
          <button className="key__button">START</button>
        </div>
      </main>
    </div>
  );
}
