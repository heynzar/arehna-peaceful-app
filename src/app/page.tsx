"use client";

import { useEffect, useState } from "react";

import bg from "@/assets/bg.jpg";
import { Settings as SettingsIcon } from "lucide-react";

import Quran from "@/components/Quran";
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

  const [settings, setSettings] = useState({
    isHijri: false,
    isReapting: false,
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

        <Timer play={play} />

        <Quran
          open={openQuran}
          setOpen={setOpenQuran}
          play={play}
          openApp={openApp}
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
