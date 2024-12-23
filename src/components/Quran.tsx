"use client";

import { RotateCcw, Volume2, VolumeOff, X } from "lucide-react";
import { ruqaa } from "@/app/font";
import { SetStateAction, useState, useRef, useEffect } from "react";
import { quran } from "@/lib/data";

export default function Quran({
  open,
  setOpen,
  play,
  openApp,
  selectedSurah,
}: {
  play: boolean;
  open: boolean;
  openApp: boolean;
  selectedSurah: number;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioPositions, setAudioPositions] = useState<{
    [key: string]: number;
  }>({});
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const playAudio = (src: string) => {
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

  const pauseAudio = () => {
    if (currentPlaying && audioRefs.current[currentPlaying]) {
      const audio = audioRefs.current[currentPlaying]!;
      setAudioPositions((prev) => ({
        ...prev,
        [currentPlaying]: audio.currentTime,
      }));
      audio.pause();
    }
  };

  const toggleAudio = (src: string) => {
    if (currentPlaying === src) {
      pauseAudio();
      setCurrentPlaying(null);
    } else {
      pauseAudio();
      playAudio(src);
    }
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

  useEffect(() => {
    if (openApp && !initialized) {
      playAudio(quran[selectedSurah].src);
      setInitialized(true);
    }
  }, [openApp]);

  useEffect(() => {
    if (play) {
      if (currentPlaying) {
        audioRefs.current[currentPlaying]
          ?.play()
          .catch((error) => console.error("Audio playback failed:", error));
      } else {
        playAudio(quran[selectedSurah].src);
      }
    } else {
      pauseAudio();
    }
  }, [play]);

  return (
    <section
      className={`${ruqaa.className} ${
        open ? "flex" : "hidden"
      } justify-center items-center scale-125 absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}
      aria-hidden={!open}
    >
      <div
        className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-zinc-950 border border-white/15"
        role="dialog"
        aria-labelledby="quran-title"
        aria-describedby="quran-description"
      >
        <h1 id="quran-title" className="sr-only">
          Quran Player
        </h1>
        <p id="quran-description" className="sr-only">
          Play and manage the recitation of Quranic surahs.
        </p>

        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-zinc-900 py-1 px-4">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute audio" : "Mute audio"}
              className="hover:text-white/80"
            >
              {muted ? <VolumeOff /> : <Volume2 />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              aria-label="Volume control"
              className="w-full"
            />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="bg-zinc-900 p-1 rounded-lg"
            aria-label="Close Quran player"
          >
            <X className="hover:text-white/80" />
          </button>
        </div>

        <div
          dir="rtl"
          id="quran"
          className="flex flex-wrap gap-2 justify-center items-center mt-4"
          role="list"
        >
          {quran.map(({ name, src }) => (
            <div
              key={name}
              className={`h-10 w-[32%] transition-colors border border-zinc-800 duration-300 flex items-center justify-end px-1 rounded-lg ${
                currentPlaying === src
                  ? "bg-sky-500 hover:bg-sky-400"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
              role="listitem"
            >
              <button
                onClick={() => toggleAudio(src)}
                aria-label={
                  currentPlaying === src ? `Pause ${name}` : `Play ${name}`
                }
                className="w-full h-10 rounded-lg"
              >
                <span className="text-center">{name}</span>
              </button>

              <button
                onClick={() => restartAudio(src)}
                className={`${
                  currentPlaying === src
                    ? "hover:bg-sky-300"
                    : "hover:bg-zinc-700"
                } p-2 rounded-md transition-colors`}
                aria-label={`Restart ${name}`}
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
