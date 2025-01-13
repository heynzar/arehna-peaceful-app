"use client";

import Image from "next/image";
import bg1 from "@/assets/bg.jpg";
import bg3 from "@/assets/bg3.gif";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import { quranList, reciterList } from "@/lib/data";
import Dropdown from "./Dropdown";

export default function Settings({
  open,
  setOpen,
  settings,
  setSettings,
}: {
  open: boolean;
  settings: {
    isHijri: boolean;
    selectedSurah: string;
    selectedReciter: string;
    bg: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSettings: Dispatch<
    SetStateAction<{
      isHijri: boolean;
      selectedSurah: string;
      selectedReciter: string;
      bg: string;
    }>
  >;
}) {
  const handleBackgroundSelect = (bg: string) => {
    setSettings((prev) => ({ ...prev, bg }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSettings((prev) => ({ ...prev, bg: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSurahChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = parseInt(event.target.value, 10);
  //   // setSettings((prev) => ({ ...prev, selectedSurah: value }));
  // };

  if (!open) return null;

  return (
    <section
      hidden={!open}
      className={`flex justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm px-6`}
    >
      <div
        role="dialog"
        aria-labelledby="settings-title"
        aria-describedby="settings-description"
        className="p-4 w-full md:scale-150 min-w-[270px] max-w-max rounded-2xl bg-zinc-950 border border-zinc-800"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2
              id="settings-title"
              className="font-medium text-lg md:text-base"
            >
              App Settings
            </h2>
            <p
              id="settings-description"
              className="md:text-[0.7rem] text-zinc-400"
            >
              Customize your preferences.
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close settings"
            className="bg-zinc-900 p-1 rounded-lg"
          >
            <X className="hover:text-white/80" />
          </button>
        </div>

        <div className="flex flex-col mt-6">
          <div>
            <label
              htmlFor="toggle-hijri"
              className="flex justify-between items-center pb-2"
            >
              <span className="text-lg md:text-sm opacity-80">
                Toggle Hijri Date
              </span>
              <div
                onClick={() =>
                  setSettings((prev) => ({ ...prev, isHijri: !prev.isHijri }))
                }
                id="toggle-hijri"
                role="switch"
                aria-checked={settings.isHijri}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSettings((prev) => ({
                      ...prev,
                      isHijri: !prev.isHijri,
                    }));
                  }
                }}
                className={`${
                  settings.isHijri ? "bg-zinc-50" : "bg-zinc-700"
                } w-9 cursor-pointer transition-colors duration-300 rounded-full p-0.5`}
              >
                <div
                  className={`${
                    settings.isHijri && "translate-x-4"
                  } size-4 rounded-full transition-transform duration-300 bg-zinc-950`}
                ></div>
              </div>
            </label>
          </div>

          <div className="mb-2">
            <label
              htmlFor="select-surah"
              className="flex justify-between items-center"
            >
              <span className="text-lg md:text-sm opacity-80">
                Select the Default Surah
              </span>
              <Dropdown
                list={quranList}
                search
                settings={settings}
                setSettings={setSettings}
                type="quran"
              />
              {/* <select
                id="select-surah"
                onChange={handleSurahChange}
                dir="rtl"
                className={`${ruqaa.className} bg-zinc-950 cursor-pointer hover:text-zinc-300 transition-colors`}
                value={settings.selectedSurah}
              >
                {quran.map(({ name }, index) => (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ))}
              </select> */}
            </label>
          </div>

          <div className="mb-2">
            <label
              htmlFor="select-surah"
              className="flex justify-between items-center"
            >
              <span className="text-lg md:text-sm opacity-80">
                Select the Default Reciter
              </span>
              <Dropdown
                list={reciterList}
                settings={settings}
                setSettings={setSettings}
                type="reciter"
              />
            </label>
          </div>
        </div>

        <span className="text-lg md:text-sm opacity-80">
          Select Or Upload A Background
        </span>
        <div
          id="backgrounds"
          className="pl-1 flex flex-wrap gap-2 justify-center items-center my-2"
        >
          {[bg1, bg3].map((bg, index) => (
            <div
              key={index}
              onClick={() => handleBackgroundSelect(bg.src)}
              className={`aspect-video cursor-pointer hover:bg-neutral-700 transition-all duration-300 flex items-center justify-center rounded-lg bg-neutral-800 overflow-hidden ${
                settings.bg === bg.src
                  ? "outline outline-2 outline-offset-2 outline-sky-400 h-[50px]"
                  : "h-[54px]"
              }`}
              role="button"
              aria-label={`Select background ${index + 1}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleBackgroundSelect(bg.src);
                }
              }}
            >
              <Image src={bg} alt={`background ${index + 1}`} />
            </div>
          ))}

          <div className="relative h-[54px] aspect-video cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2"
              aria-label="Upload custom background image"
            />
            <div className="flex items-center justify-center h-full w-full rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors border border-zinc-700">
              <p className="text-neutral-400 text-[0.7rem] group-hover:text-neutral-200 transition-colors">
                Upload Image
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
