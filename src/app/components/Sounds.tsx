"use client";
import { useState } from "react";
import {
  Bird,
  CloudLightning,
  CloudRain,
  Coffee,
  Droplets,
  Flame,
  MoonStar,
  Volume2,
  Waves,
  Wheat,
  Wind,
  X,
} from "lucide-react";
export default function Sounds() {
  const [openSounds, setOpenSounds] = useState(false);
  return (
    <section
      className={`justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        openSounds ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-neutral-900 border border-white/15">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-neutral-800 py-1 px-4">
            <Volume2 className="cursor-pointer hover:text-white/80" />
            <input type="range" className="w-full" />
          </div>
          <button
            onClick={() => {
              setOpenSounds(false);
            }}
            className="bg-neutral-800 p-1 rounded-lg "
          >
            <X className="hover:text-white/80" />
          </button>
        </div>
        <div
          id="sounds"
          className="flex flex-wrap gap-2 justify-center items-center mt-4"
        >
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Bird size={40} strokeWidth={1} />
          </div>
          <div
            // onClick={playAudio}
            className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-sky-600"
          >
            <CloudRain size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <CloudLightning size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <MoonStar size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Flame size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Coffee size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Droplets size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Wind size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Waves size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <Wheat size={40} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
