"use client";

import { useState } from "react";

import bg from "@/assets/bg.jpg";
import { AudioLines, Settings as SettingsIcon } from "lucide-react";

import Quran from "@/components/Quran";
import Settings from "@/components/Settings";
import Sounds from "@/components/Sounds";
import Time from "@/components/Time";

export default function Page() {
  const [openApp, setOpenApp] = useState(true);
  const [openSounds, setOpenSounds] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openQuran, setOpenQuran] = useState(false);
  const [settings, setSettings] = useState({
    isHijri: false,
    isReapting: false,
    bg: `${bg.src}`,
  });

  console.log(settings.bg);
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
          openApp ? "flex" : "hidden"
        }  flex h-full select-none  flex-col justify-center items-center backdrop-blur-[2px] transition-opacity duration-500`}
      >
        <Time isHijri={settings.isHijri} />
        <div className="mt-5">
          <button onClick={() => setOpenApp(false)} className="key__button">
            START
          </button>
        </div>
      </main>

      <main
        className={`${
          openApp ? "hidden" : "flex"
        } w-full h-full select-none  flex-col gap-4 scale-125 justify-center items-center p-4`}
      >
        <section className="py-4 w-full max-w-[400px] rounded-3xl  backdrop-blur-sm bg-clip-padding flex flex-col justify-center items-center text-center border-[4px] border-white/20">
          <Time isHijri={settings.isHijri} />
        </section>

        <section className="flex items-center w-full max-w-[400px] gap-2">
          <button
            onClick={() => setOpenQuran(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
            aria-label="Play Quran sounds"
          >
            <span className="text-lg font-medium">Quran</span>
            <AudioLines />
          </button>

          <button
            onClick={() => setOpenSounds(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-full"
            aria-label="Play Quran sounds"
          >
            <span className="text-lg font-medium">Sounds</span>
            <AudioLines />
          </button>

          <button
            onClick={() => setOpenSettings(true)}
            className="key__button-2 flex items-center justify-center gap-2 px-2 py-5 w-min"
            aria-label="Play Quran sounds"
          >
            <SettingsIcon />
          </button>
        </section>

        <Quran open={openQuran} setOpen={setOpenQuran} />
        <Settings
          open={openSettings}
          setOpen={setOpenSettings}
          settings={settings}
          setSettings={setSettings}
        />
        <Sounds open={openSounds} setOpen={setOpenSounds} />
      </main>
    </>
  );
}
