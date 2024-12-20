"use client";
import { SetStateAction, useState, useRef, useEffect } from "react";
import { Volume2, VolumeOff, X } from "lucide-react";
import { sounds } from "@/lib/data";

export default function Sounds({
  open,
  setOpen,
  play,
}: {
  open: boolean;
  play: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({});
  const [volume, setVolume] = useState<number>(1); // Global volume (1 is max, 0 is muted)
  const [muted, setMuted] = useState<boolean>(false);

  const toggleAudio = (src: string) => {
    if (!audioRefs.current[src]) {
      const audio = new Audio(src);
      audio.loop = true; // Set audio to loop
      audioRefs.current[src] = audio;
    }

    const audio = audioRefs.current[src]!;

    if (playing[src]) {
      audio.pause();
      setPlaying((prev) => ({ ...prev, [src]: false }));
    } else {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setPlaying((prev) => ({ ...prev, [src]: true }));
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

  // Play default sounds when `play` is true
  useEffect(() => {
    if (play) {
      toggleAudio(sounds[1].src); // Sound 1
      toggleAudio(sounds[4].src); // Sound 4
    }
  }, [play]);

  return (
    <section
      className={`justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-zinc-950 border border-zinc-800">
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
            onClick={() => {
              setOpen(false);
            }}
            className="bg-zinc-900 p-1 rounded-lg "
          >
            <X className="hover:text-white/80" />
          </button>
        </div>
        <div
          id="sounds"
          className="flex flex-wrap gap-2 justify-center items-center mt-4"
        >
          {sounds.map(({ Icon, src }) => (
            <button
              onClick={() => toggleAudio(src)}
              key={src}
              className={`size-[86px] cursor-pointer  transition-colors duration-300 flex items-center justify-center rounded-lg ${
                playing[src]
                  ? "bg-sky-500 hover:bg-sky-400"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <Icon size={40} strokeWidth={1} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
