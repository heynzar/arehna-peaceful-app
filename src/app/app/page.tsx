import Quran from "@/components/Quran";
import Settings from "@/components/Settings";
import { AudioLines, Settings as SettingsIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="w-full h-full select-none flex flex-col gap-4 scale-125 justify-center items-center p-4">
      <section className="py-4 w-full max-w-[400px] rounded-3xl  backdrop-blur-sm bg-clip-padding flex flex-col justify-center items-center text-center border-[4px] border-white/20">
        <h1 className="text-[2.5rem] font-normal leading-10">THU 14 NOV</h1>
        <h2 className="text-8xl font-medium">12:33</h2>
      </section>

      <section className="flex items-center w-full max-w-[400px] gap-2">
        <button
          className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
          aria-label="Play Quran sounds"
        >
          <span className="text-lg font-medium">Quran</span>
          <AudioLines />
        </button>

        <button
          className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
          aria-label="Play Quran sounds"
        >
          <span className="text-lg font-medium">Sounds</span>
          <AudioLines />
        </button>

        <button
          className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-min"
          aria-label="Play Quran sounds"
        >
          <SettingsIcon />
        </button>
      </section>

      <Quran />
    </main>
  );
}
