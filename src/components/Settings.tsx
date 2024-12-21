"use client";

import Image from "next/image";
import bg1 from "@/assets/bg.jpeg";
import bg3 from "@/assets/bg3.gif";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import { quran } from "@/lib/data";
import { ruqaa } from "@/app/font";

export default function Settings({
  open,
  setOpen,
  settings,
  setSettings,
}: {
  open: boolean;
  settings: {
    isHijri: boolean;
    selectedSurah: number;
    bg: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSettings: Dispatch<
    SetStateAction<{
      isHijri: boolean;
      selectedSurah: number;
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
      const fileUrl = URL.createObjectURL(file);
      setSettings((prev) => ({ ...prev, bg: fileUrl }));
    }
  };

  const handleSurahChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSettings((prev) => ({ ...prev, selectedSurah: value }));
  };

  return (
    <section
      className={`justify-center items-center scale-150 absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-max rounded-2xl bg-zinc-950 border border-white/15">
        <button
          onClick={() => setOpen(false)}
          className="bg-zinc-900 p-1 rounded-lg ml-auto absolute right-4 top-4"
        >
          <X className="hover:text-white/80" />
        </button>

        <div className="flex flex-col">
          <div className="mt-4">
            <span>App Settings</span>
            <div className="mt-2 flex justify-between items-center pb-2">
              <span className="text-sm opacity-80">Toggle Hijri Date</span>
              <div
                onClick={() =>
                  setSettings((prev) => ({ ...prev, isHijri: !prev.isHijri }))
                }
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
            </div>
          </div>

          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm opacity-80">Select the Default Surah</span>

            <select
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
            </select>
          </div>
        </div>
        <span>Backgrounds</span>
        <div
          id="backgounds"
          className="pl-1 flex flex-wrap gap-2 justify-start items-center mt-2"
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
            >
              <Image src={bg} alt={`background image ${index + 1}`} />
            </div>
          ))}

          <div className="relative h-[60px] aspect-video cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-center h-full w-full rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors border border-zinc-700">
              <p className="text-neutral-400 text-sm group-hover:text-neutral-200 transition-colors">
                Upload File
              </p>
            </div>
          </div>
        </div>

        <p className="text-[0.7rem] mt-4 -mb-1 text-center text-zinc-400">
          Developed by{" "}
          <a
            href="https://nzar.dev"
            target="_blank"
            className="underline underline-offset-2"
          >
            Nzar
          </a>
        </p>
      </div>
    </section>
  );
}
