"use client";

import { useEffect, useState, useCallback } from "react";
import bg from "@/assets/bg.jpeg";
import {
  Info,
  Keyboard as KeyboardIcon,
  Pause,
  Play,
  Settings as SettingsIcon,
} from "lucide-react";
import Quran from "@/components/Quran";
import Keyboard from "@/components/Keyboard";
import Settings from "@/components/Settings";
import Sounds from "@/components/Sounds";
import Time from "@/components/Time";
import Timer from "@/components/Timer";
import AudioLine from "@/components/AudioLines";
import InfoSection from "@/components/Info";

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [isSoundsOpen, setIsSoundsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuranOpen, setIsQuranOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [settings, setSettings] = useState({
    isHijri: false,
    selectedSurah: 0,
    bg: bg.src,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const toggleApp = () => {
    setIsAppOpen(true);
    setIsPlaying(true);
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          if (!isAppOpen) toggleApp();
          else setIsPlaying((prev) => !prev);
          break;
        case "enter":
          if (!isAppOpen) toggleApp();
          break;
        case "q":
          setIsQuranOpen((prev) => !prev);
          setIsKeyboardOpen(false);
          setIsSoundsOpen(false);
          setIsSettingsOpen(false);
          setIsInfoOpen(false);
          break;
        case "s":
          setIsSoundsOpen((prev) => !prev);
          setIsQuranOpen(false);
          setIsKeyboardOpen(false);
          setIsSettingsOpen(false);
          setIsInfoOpen(false);
          break;
        case "p":
          setIsSettingsOpen((prev) => !prev);
          setIsQuranOpen(false);
          setIsKeyboardOpen(false);
          setIsSoundsOpen(false);
          setIsInfoOpen(false);
          break;
        case "k":
          setIsKeyboardOpen((prev) => !prev);
          setIsQuranOpen(false);
          setIsSoundsOpen(false);
          setIsSettingsOpen(false);
          setIsInfoOpen(false);
          break;
        case "i":
          setIsInfoOpen((prev) => !prev);
          setIsQuranOpen(false);
          setIsSoundsOpen(false);
          setIsSettingsOpen(false);
          setIsKeyboardOpen(false);
          break;
      }
    },
    [isAppOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${settings.bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          filter: "brightness(50%)",
        }}
        className="absolute inset-0 -z-10"
      />

      <main
        className={`${
          isAppOpen ? "hidden" : "flex"
        } flex h-full overflow-hidden select-none flex-col justify-center items-center backdrop-blur-[2px] transition-opacity duration-500`}
      >
        <Time isHijri={settings.isHijri} />
        <div className="scale-75 mt-2 md:mt-5  md:scale-100">
          <button
            onClick={toggleApp}
            className="key__button "
            aria-label="Start the application"
            tabIndex={0}
          >
            START
          </button>
        </div>
      </main>

      <main
        className={`${
          isAppOpen ? "flex" : "hidden"
        } w-full h-[100dvh] overflow-hidden select-none flex-col gap-4 justify-center items-center py-4 px-8`}
      >
        <div className="mb-auto" />
        <section className="md:scale-125 py-4 w-full max-w-[400px] rounded-3xl backdrop-blur-sm bg-clip-padding flex flex-col justify-center items-center text-center border-[4px] border-white/20">
          <Time isHijri={settings.isHijri} />
        </section>

        <section
          id="control-buttons"
          className="md:scale-125 md:mt-8 flex items-center w-full max-w-[400px] gap-2 "
        >
          <button
            tabIndex={1}
            onClick={() => setIsQuranOpen(true)}
            className="key__button-2 flex items-center justify-center gap-2 w-full"
            aria-label="Open Quran"
          >
            <span className="text-lg font-medium">Quran</span>
            <AudioLine play={isPlaying} />
          </button>

          <div className="flex  items-center gap-2 w-full">
            <button
              tabIndex={2}
              onClick={() => setIsSoundsOpen(true)}
              className="key__button-2 flex items-center justify-center gap-2 w-full"
              aria-label="Open Sounds"
            >
              <span className="text-lg font-medium">Sounds</span>
              <AudioLine play={isPlaying} />
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="key__button-2 flex items-center justify-center gap-2 w-min"
              aria-label="Open Settings"
            >
              <SettingsIcon />
            </button>
          </div>
        </section>

        <div className="w-full flex justify-between items-center mt-auto">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="backdrop-blur-sm rounded-lg p-1 border border-white/20 hover:opacity-70 transition-opacity duration-300"
            aria-label="Open About Section"
          >
            <Info size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="hidden lg:block lg:ml-28 backdrop-blur-sm rounded-lg p-1 border border-white/20 hover:opacity-70 transition-opacity duration-300"
            aria-label="Open Keyboard"
          >
            {isPlaying ? (
              <Pause size={20} strokeWidth={1.5} />
            ) : (
              <Play size={20} strokeWidth={1.5} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <Timer play={isPlaying} />

            <button
              onClick={() => setIsKeyboardOpen(true)}
              className="hidden lg:block backdrop-blur-sm rounded-lg p-1 border border-white/20 hover:opacity-70 transition-opacity duration-300"
              aria-label="Open Keyboard"
            >
              <KeyboardIcon size={20} strokeWidth={1.5} />
            </button>
          </div>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="lg:hidden backdrop-blur-sm rounded-lg p-1 border border-white/20 hover:opacity-70 transition-opacity duration-300"
            aria-label="Play/Pause button"
          >
            {isPlaying ? (
              <Pause size={20} strokeWidth={1.5} />
            ) : (
              <Play size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
        <Keyboard open={isKeyboardOpen} setOpen={setIsKeyboardOpen} />
        <InfoSection open={isInfoOpen} setOpen={setIsInfoOpen} />
        <Quran
          open={isQuranOpen}
          setOpen={setIsQuranOpen}
          play={isPlaying}
          openApp={isAppOpen}
          selectedSurah={settings.selectedSurah}
        />
        <Settings
          open={isSettingsOpen}
          setOpen={setIsSettingsOpen}
          settings={settings}
          setSettings={setSettings}
        />
        <Sounds
          open={isSoundsOpen}
          setOpen={setIsSoundsOpen}
          play={isPlaying}
          openApp={isAppOpen}
        />
      </main>
    </>
  );
}
