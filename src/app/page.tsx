"use client";

import { useEffect, useState } from "react";

import bg from "@/assets/bg.jpeg";
import {
  ArrowUpRight,
  Keyboard as KeyboardIcon,
  Settings as SettingsIcon,
} from "lucide-react";

import Quran from "@/components/Quran";
import Keyboard from "@/components/Keyboard";
import Settings from "@/components/Settings";
import Sounds from "@/components/Sounds";
import Time from "@/components/Time";
import Timer from "@/components/Timer";
import AudioLine from "@/components/AudioLines";

export default function Page() {
  const [play, setPlay] = useState(false);
  const [openApp, setOpenApp] = useState(false);

  const [openSounds, setOpenSounds] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openQuran, setOpenQuran] = useState(false);
  const [openKeyboard, setOpenKeyboard] = useState(false);

  const [settings, setSettings] = useState({
    isHijri: false,
    selectedSurah: 0,
    bg: `${bg.src}`,
  });

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();

      if (!openApp) {
        setOpenApp(true);
        setPlay(true);
      } else {
        setPlay((prevPlay) => !prevPlay);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!openApp) {
        setOpenApp(true);
        setPlay(true);
      }
    } else if (e.key === "q") {
      setOpenQuran((prevPlay) => !prevPlay);
      setOpenKeyboard(false);
      setOpenSounds(false);
      setOpenSettings(false);
    } else if (e.key === "s") {
      setOpenQuran(false);
      setOpenKeyboard(false);
      setOpenSounds((prevPlay) => !prevPlay);
      setOpenSettings(false);
    } else if (e.key === "p") {
      setOpenQuran(false);
      setOpenKeyboard(false);
      setOpenSounds(false);
      setOpenSettings((prevPlay) => !prevPlay);
    } else if (e.key === "k") {
      setOpenQuran(false);
      setOpenKeyboard((prevPlay) => !prevPlay);
      setOpenSounds(false);
      setOpenSettings(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [openApp]);

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
      ></div>

      <main
        className={`${
          openApp ? "hidden" : "flex"
        }  flex h-full select-none  flex-col justify-center items-center backdrop-blur-[2px] transition-opacity duration-500`}
      >
        <Time isHijri={settings.isHijri} />
        <div className="mt-5">
          <button
            onClick={() => {
              setOpenApp(true);
              setPlay(true);
            }}
            className="key__button"
          >
            START
          </button>
        </div>
      </main>

      <main
        className={`${
          openApp ? "flex" : "hidden"
        } w-full h-full  select-none  flex-col gap-4 justify-center items-center p-4`}
      >
        <div className="mb-auto"></div>
        <section className="scale-125 py-4 w-full max-w-[400px] rounded-3xl  backdrop-blur-sm bg-clip-padding flex flex-col justify-center items-center text-center border-[4px] border-white/20">
          <Time isHijri={settings.isHijri} />
        </section>

        <section className="scale-125 mt-8 flex items-center w-full max-w-[400px] gap-2">
          <button
            onClick={() => setOpenQuran(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
            aria-label="Play Quran sounds"
          >
            <span className="text-lg font-medium">Quran</span>
            <AudioLine play={play} />
          </button>

          <button
            onClick={() => setOpenSounds(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
            aria-label="Play Sounds"
          >
            <span className="text-lg font-medium">Sounds</span>
            <AudioLine play={play} />
          </button>

          <button
            onClick={() => setOpenSettings(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-min"
            aria-label="Open settings"
          >
            <SettingsIcon />
          </button>
        </section>

        <div className="w-full flex justify-between items-center mt-auto">
          <a
            href="#"
            className="flex gap-1 items-end hover:opacity-70 transition-opacity duration-300"
          >
            <span className="underline underline-offset-4">
              chrome extension
            </span>
            <ArrowUpRight strokeWidth={1} size={20} />
          </a>

          <div className="flex items-center gap-2">
            <Timer play={play} />
            <button
              onClick={() => setOpenKeyboard(true)}
              className="backdrop-blur-sm rounded-lg p-1 border border-white/20 hover:opacity-70 transition-opacity duration-300"
            >
              <KeyboardIcon className="size-5" size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <Keyboard open={openKeyboard} setOpen={setOpenKeyboard} />

        <Quran
          open={openQuran}
          setOpen={setOpenQuran}
          play={play}
          openApp={openApp}
          selectedSurah={settings.selectedSurah}
        />
        <Settings
          open={openSettings}
          setOpen={setOpenSettings}
          settings={settings}
          setSettings={setSettings}
        />
        <Sounds
          open={openSounds}
          setOpen={setOpenSounds}
          play={play}
          openApp={openApp}
        />
      </main>
    </>
  );
}
