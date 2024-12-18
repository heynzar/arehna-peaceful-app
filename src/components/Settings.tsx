"use client";

import Image from "next/image";
import bg1 from "@/assets/bg1-square.png";
import bg2 from "@/assets/bg2-square.png";
import bg3 from "@/assets/bg3-square.png";
import { useState } from "react";
import { X } from "lucide-react";

export default function Settings() {
  const [openSettings, setOpenSettings] = useState(true);
  const [check, setCheck] = useState(false);
  const [hijriDate, setHijriDate] = useState(false);
  return (
    <section
      className={`justify-center  items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        openSettings ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-max scale-110 rounded-2xl bg-zinc-950 border border-white/15">
        <button
          onClick={() => {
            setOpenSettings(false);
          }}
          className="bg-zinc-900 p-1 rounded-lg ml-auto absolute right-4 top-4"
        >
          <X className="hover:text-white/80" />
        </button>

        <div className="flex flex-col">
          <div className="mt-4">
            <span className="">App Settings</span>
            <div className="my-2 flex justify-between items-center bg-zinc-800 py-1 px-2 rounded-lg">
              <span className="text-sm opacity-80">Toggole Hijri Date</span>
              <div
                onClick={() => setHijriDate(!hijriDate)}
                className="w-9 cursor-pointer rounded-full p-0.5 bg-zinc-950"
              >
                <div
                  className={`${
                    hijriDate ? "bg-zinc-50 translate-x-4" : "bg-zinc-700"
                  } size-4 rounded-full transition-all ease-in-out duration-300`}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center bg-zinc-800 py-1 px-2 rounded-lg">
            <span className="text-sm opacity-80">
              Toggle Quran Playing Method
            </span>
            <div
              onClick={() => setCheck(!check)}
              className="w-9 cursor-pointer rounded-full p-0.5 bg-zinc-950"
            >
              <div
                className={`${
                  check ? "bg-zinc-50 translate-x-4" : "bg-neutral-600"
                } size-4 rounded-full transition-all ease-in-out duration-300`}
              ></div>
            </div>
          </div>
        </div>
        <span className="">Backgrounds</span>
        <div
          id="backgounds"
          className="pl-1 flex flex-wrap gap-2 justify-start items-center mt-2"
        >
          <div className="h-[54px] aspect-video outline outline-2 outline-offset-2 outline-sky-400 cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800 overflow-hidden">
            <Image src={bg1} alt="background image 1" className="bg-contain" />
          </div>

          <div className="h-[60px] aspect-video cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800 overflow-hidden">
            <Image src={bg2} alt="background image 1" className="bg-contain" />
          </div>
          <div className="h-[60px] aspect-video cursor-pointer hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center rounded-lg bg-neutral-800 overflow-hidden">
            <Image src={bg3} alt="background image 1" className="bg-contain" />
          </div>
        </div>

        <div className="mt-4 w-full flex justify-between items-end">
          <button className="px-6 py-0.5 bg-zinc-50 text-black rounded-lg">
            Save
          </button>
          <p className="text-[0.7rem]">
            Develop by{" "}
            <a href="" className="underline">
              Nzar
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
