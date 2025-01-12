"use client";

import { Loader2, RotateCcw, Volume2, VolumeOff, X } from "lucide-react";
import { ruqaa } from "@/app/font";
import { SetStateAction, useState, useRef, useEffect } from "react";
import { quran } from "@/lib/data";
import { quranList, reciterList } from "@/lib/data";
import DropdownQuran from "./DropdownQuran";
import DropdownReciter from "./DropdownReciter";

export default function Quran({
  open,
  setOpen,
  play,
  openApp,
  settings,
}: {
  play: boolean;
  open: boolean;
  openApp: boolean;
  settings: {
    isHijri: boolean;
    selectedSurah: string;
    selectedReciter: string;
    bg: string;
  };
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioPositions, setAudioPositions] = useState<{
    [key: string]: number;
  }>({});
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<{ [key: string]: string }>({});

  const [selecedOption, setSelecedOption] = useState(settings);

  const initAudio = (src: string) => {
    if (!audioRefs.current[src]) {
      setLoadingStates((prev) => ({ ...prev, [src]: true }));
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = muted ? 0 : volume;
      audioRefs.current[src] = audio;

      audio.addEventListener("canplaythrough", () => {
        setLoadingStates((prev) => ({ ...prev, [src]: false }));
        // Clear any previous errors
        setLoadError((prev) => {
          const newErrors = { ...prev };
          delete newErrors[src];
          return newErrors;
        });
      });

      audio.addEventListener("error", () => {
        setLoadingStates((prev) => ({ ...prev, [src]: false }));
        setLoadError((prev) => ({
          ...prev,
          [src]: "Failed to load audio",
        }));
      });
    }
    return audioRefs.current[src]!;
  };

  const playAudio = async (src: string) => {
    try {
      const audio = initAudio(src);
      audio.currentTime = audioPositions[src] || 0;

      await audio.play();
      setCurrentPlaying(src);
    } catch (error) {
      console.error("Audio playback failed:", error);
      setLoadError((prev) => ({
        ...prev,
        [src]: "Failed to play audio",
      }));
    }
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

  const restartAudio = async (src: string) => {
    if (audioRefs.current[src]) {
      const audio = audioRefs.current[src]!;
      audio.currentTime = 0;
      try {
        await audio.play();
        setCurrentPlaying(src);
      } catch (error) {
        console.error("Audio playback failed:", error);
        setLoadError((prev) => ({
          ...prev,
          [src]: "Failed to restart audio",
        }));
      }
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
      playAudio(`${settings.selectedReciter}/${settings.selectedSurah}.mp3`);
      setInitialized(true);
    }
  }, [openApp]);

  useEffect(() => {
    if (play) {
      if (currentPlaying) {
        audioRefs.current[currentPlaying]?.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setLoadError((prev) => ({
            ...prev,
            [currentPlaying]: "Playback failed",
          }));
        });
      } else {
        playAudio(`${settings.selectedReciter}/${settings.selectedSurah}.mp3`);
      }
    } else {
      pauseAudio();
    }
  }, [play]);
  return (
    <section
      className={`${
        open ? "flex" : "hidden"
      } justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm px-6`}
      aria-hidden={!open}
    >
      <div
        className="p-4 w-full md:scale-150 min-w-[270px] max-w-[496px] rounded-2xl bg-zinc-950 border border-zinc-800"
        role="dialog"
        aria-labelledby="quran-title"
        aria-describedby="quran-description"
      >
        <h2 id="quran-title" className="sr-only">
          Quran Player
        </h2>
        <p id="quran-description" className="sr-only">
          Play and manage the recitation of Quranic surahs.
        </p>

        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[200px] md:w-[240px] rounded-lg bg-zinc-900 py-1 px-4">
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
        <div className="flex justify-between gap-2 my-4 items-center">
          <DropdownQuran
            list={quranList}
            toggleAudio={toggleAudio}
            restartAudio={restartAudio}
            loadingStates={loadingStates}
            selecedOption={selecedOption}
            setSelecedOption={setSelecedOption}
          />
          <DropdownReciter
            list={reciterList}
            selecedOption={selecedOption}
            setSelecedOption={setSelecedOption}
            toggleAudio={toggleAudio}
            loadingStates={loadingStates}
          />
        </div>

        <div
          dir="rtl"
          id="quran"
          className="mt-4 flex flex-wrap gap-2 justify-center items-center"
          role="list"
        >
          {quran.map(({ name, src }) => (
            <div
              key={name}
              className={`${
                ruqaa.className
              } md:h-10 w-[48%] min-w-max md:w-[32%] transition-colors border border-zinc-800 duration-300 flex items-center justify-end px-1 rounded-lg ${
                currentPlaying === `${selecedOption.selectedReciter}/${src}.mp3`
                  ? "bg-sky-500 hover:bg-sky-400"
                  : "bg-zinc-900 hover:bg-zinc-800"
              } ${
                loadError[`${selecedOption.selectedReciter}/${src}.mp3`]
                  ? "border-red-500"
                  : ""
              }`}
              role="listitem"
            >
              <button
                onClick={() => {
                  toggleAudio(`${selecedOption.selectedReciter}/${src}.mp3`);
                  setSelecedOption((prevState) => ({
                    ...prevState,
                    selectedSurah: src,
                  }));
                }}
                disabled={
                  loadingStates[`${selecedOption.selectedReciter}/${src}.mp3`]
                }
                aria-label={
                  currentPlaying ===
                  `${selecedOption.selectedReciter}/${src}.mp3`
                    ? `Pause ${name}`
                    : `Play ${name}`
                }
                className="w-full h-10 rounded-lg relative"
              >
                {loadingStates[
                  `${selecedOption.selectedReciter}/${src}.mp3`
                ] ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5" />
                  </div>
                ) : (
                  <span className="text-center">
                    {loadError[
                      `${selecedOption.selectedReciter}/${src}.mp3`
                    ] ? (
                      <span className="text-red-500 text-sm">Error</span>
                    ) : (
                      name
                    )}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  restartAudio(`${selecedOption.selectedReciter}/${src}.mp3`)
                }
                disabled={
                  loadingStates[`${selecedOption.selectedReciter}/${src}.mp3`]
                }
                className={`${
                  loadingStates[`${selecedOption.selectedReciter}/${src}.mp3`]
                    ? "hidden"
                    : currentPlaying ===
                      `${selecedOption.selectedReciter}/${src}.mp3`
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
