"use client";

import { Volume2, X } from "lucide-react";
import { ruqaa } from "@/app/font";
import { useState } from "react";

const [openQuran, setOpenQuran] = useState(false);

export default function Quran() {
  return (
    <section
      className={`${ruqaa.className} ${
        openQuran ? "flex" : "hidden"
      }  justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm`}
    >
      <div className="p-4 w-full max-w-[496px] scale-110 rounded-2xl bg-neutral-900 border border-white/15">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-[240px] rounded-lg bg-neutral-800 py-1 px-4">
            <Volume2 className="cursor-pointer hover:text-white/80" />
            <input type="range" className="w-full" />
          </div>
          <button
            onClick={() => {
              setOpenQuran(false);
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
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
          <div className="h-10 w-[49%] cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-center">إن المتقين في مقام أمين</span>
          </div>
        </div>
      </div>
    </section>
  );
}
