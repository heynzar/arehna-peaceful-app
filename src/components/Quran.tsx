"use client";

import { RotateCcw, Volume2, VolumeOff, X } from "lucide-react";
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
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioPositions, setAudioPositions] = useState<{
    [key: string]: number;
  }>({});
  const [volume, setVolume] = useState<number>(1); // Global volume (1 is max, 0 is muted)
  const [muted, setMuted] = useState<boolean>(false); // Track if audio is muted

  const toggleAudio = (src: string) => {
    if (currentPlaying && audioRefs.current[currentPlaying]) {
      const currentAudio = audioRefs.current[currentPlaying]!;
      setAudioPositions((prev) => ({
        ...prev,
        [currentPlaying]: currentAudio.currentTime,
      }));
      currentAudio.pause();
    }

    if (currentPlaying === src) {
      setCurrentPlaying(null);
      return;
    }

    if (!audioRefs.current[src]) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = muted ? 0 : volume;
      audioRefs.current[src] = audio;
    }

    const audio = audioRefs.current[src]!;
    audio.currentTime = audioPositions[src] || 0;

    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    setCurrentPlaying(src);
  };

  const restartAudio = (src: string) => {
    if (audioRefs.current[src]) {
      const audio = audioRefs.current[src]!;
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setCurrentPlaying(src);
    }
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = newMuted ? 0 : volume;
      }
    });
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = muted ? 0 : newVolume;
      }
    });
  };

  return (
    <section
      className={`${ruqaa.className} ${
        open ? "flex" : "hidden"
      } justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-zinc-950 border border-white/15">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-zinc-900 py-1 px-4">
            {muted ? (
              <button onClick={toggleMute}>
                <VolumeOff className="hover:text-white/80" />
              </button>
            ) : (
              <button onClick={toggleMute}>
                <Volume2 className="hover:text-white/80" />
              </button>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setOpen(false)}
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
            <div
              key={name}
              className={`h-10 w-[32%] transition-colors border border-zinc-800 duration-300 flex items-center justify-end px-1 rounded-lg ${
                currentPlaying === src
                  ? "bg-sky-500 hover:bg-sky-400"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <button
                onClick={() => toggleAudio(src)}
                className="w-full h-10 rounded-lg"
              >
                <span className="text-center">{name}</span>
              </button>

              <button
                onClick={() => restartAudio(src)}
                className={`${
                  currentPlaying === src
                    ? " hover:bg-sky-300"
                    : " hover:bg-zinc-700"
                } p-2 rounded-md transition-colors`}
              >
                <RotateCcw size={24} className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
