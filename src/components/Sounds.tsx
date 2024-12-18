"use client";
import { SetStateAction } from "react";
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
export default function Sounds({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <section
      className={`justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-zinc-950 border border-zinc-800">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-zinc-900 py-1 px-4">
            <Volume2 className="cursor-pointer hover:text-white/80" />
            <input type="range" className="w-full" />
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
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Bird size={40} strokeWidth={1} />
          </div>
          <div
            // onClick={playAudio}
            className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-sky-400"
          >
            <CloudRain size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <CloudLightning size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <MoonStar size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Flame size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Coffee size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Droplets size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Wind size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Waves size={40} strokeWidth={1} />
          </div>
          <div className="size-[86px] cursor-pointer hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center rounded-lg bg-zinc-900">
            <Wheat size={40} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
