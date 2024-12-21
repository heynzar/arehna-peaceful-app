"use client";

import { Volume2, VolumeOff, X } from "lucide-react";
import { SetStateAction, useState, useRef, useEffect } from "react";
import { sounds } from "@/lib/data";

export default function Sounds({
  open,
  setOpen,
  play,
  openApp,
}: {
  open: boolean;
  play: boolean;
  openApp: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set());
  const [audioPositions, setAudioPositions] = useState<{
    [key: string]: number;
  }>({});
  const [volume, setVolume] = useState<number>(1); // Global volume (1 is max, 0 is muted)
  const [muted, setMuted] = useState<boolean>(false); // Track if audio is muted
  const [initialized, setInitialized] = useState<boolean>(false); // Tracks if the first audio has already been played

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

    setPlayingSounds((prev) => new Set(prev).add(src));
  };

  const pauseAudio = (src: string) => {
    if (audioRefs.current[src]) {
      const audio = audioRefs.current[src]!;
      setAudioPositions((prev) => ({
        ...prev,
        [src]: audio.currentTime,
      }));
      audio.pause();
    }
  };

  const toggleAudio = (src: string) => {
    if (playingSounds.has(src)) {
      pauseAudio(src);
      setPlayingSounds((prev) => {
        const newPlaying = new Set(prev);
        newPlaying.delete(src);
        return newPlaying;
      });
    } else {
      playAudio(src);
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

  // Play the first audio when the app starts (only once)
  useEffect(() => {
    if (openApp && !initialized) {
      playAudio(sounds[1].src);
      playAudio(sounds[4].src);
      setInitialized(true);
    }
  }, [openApp]);

  // Control audio playback when the play state toggles
  useEffect(() => {
    if (play) {
      // Resume audio playback for all currently playing sounds
      playingSounds.forEach((src) => {
        const audio = audioRefs.current[src];
        audio
          ?.play()
          .catch((error) => console.error("Audio playback failed:", error));
      });
    } else {
      // Pause all audio
      playingSounds.forEach((src) => pauseAudio(src));
    }
  }, [play, playingSounds]);

  return (
    <section
      className={`justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 w-full max-w-[496px] scale-125 rounded-2xl bg-zinc-950 border border-zinc-800">
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
            className="bg-zinc-900 p-1 rounded-lg"
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
                playingSounds.has(src)
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
