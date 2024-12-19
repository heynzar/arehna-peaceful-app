"use client";

import { Volume2, X } from "lucide-react";
import { ruqaa } from "@/app/font";
import { SetStateAction, useState, useRef } from "react";
import { quran } from "@/lib/data";

export default function Quran({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({});

  const toggleAudio = (src: string) => {
    // Initialize audio if it doesn't exist
    if (!audioRefs.current[src]) {
      const audio = new Audio(src);
      audio.loop = true; // Set audio to loop
      audioRefs.current[src] = audio;
    }

    const audio = audioRefs.current[src]!;

    if (playing[src]) {
      // If the audio is currently playing, pause it
      audio.pause();
      setPlaying((prev) => ({ ...prev, [src]: false }));
    } else {
      // Otherwise, play the audio
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setPlaying((prev) => ({ ...prev, [src]: true }));
    }
  };
  return (
    <section
      className={`${ruqaa.className} ${
        open ? "flex" : "hidden"
      }  justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-zinc-950 border border-white/15">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-zinc-900 py-1 px-4">
            <Volume2 className="cursor-pointer hover:text-white/80" />
            <input type="range" className="w-full" />
          </div>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-zinc-900 p-1 rounded-lg "
          >
            <X className="hover:text-white/80" />
          </button>
        </div>
        <div
          id="quran"
          className="flex flex-wrap gap-2 justify-center items-center mt-4"
        >
          {quran.map(({ name, src }) => (
            <button
              onClick={() => toggleAudio(src)}
              key={name}
              className={`h-10 w-[49%] cursor-pointer transition-colors border border-zinc-800 duration-300 flex items-center justify-center rounded-lg ${
                playing[src]
                  ? "bg-sky-500 hover:bg-sky-400"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <span className="text-center">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
