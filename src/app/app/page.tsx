import audio from "@/assets/audio-lines.svg";
import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full h-full flex flex-col gap-2 justify-center items-center p-4 select-none">
      <section className="bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-transparent shadow-lg rounded-2xl w-full max-w-[520px] p-6 bg-clip-padding border border-white/40 backdrop-blur-[2px] flex flex-col justify-center items-center text-center">
        <h1 className="text-[2.5rem] font-medium leading-10">THU 14 NOV</h1>
        <h2 className="text-8xl font-medium">12:33</h2>
      </section>

      <section className="flex items-center w-full max-w-[520px] gap-2">
        <button className="button-gradient" aria-label="Play Quran sounds">
          <span className="text-lg font-medium">Quran</span>
          <Image src={audio} alt="Audio icon" width={24} height={24} />
        </button>

        <button className="button-gradient" aria-label="Play relaxing noise">
          <span className="text-lg font-medium">Noise</span>
          <Image src={audio} alt="Audio icon" width={24} height={24} />
        </button>
      </section>
    </main>
  );
}
