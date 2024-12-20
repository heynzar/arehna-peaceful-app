"use client";

import Image from "next/image";
import bg1 from "@/assets/bg1-square.png";
import bg2 from "@/assets/bg2-square.png";
import bg3 from "@/assets/bg3-square.png";
import { SetStateAction, useState } from "react";
import { X } from "lucide-react";

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  const [check, setCheck] = useState(false);
  const [hijriDate, setHijriDate] = useState(false);
  return (
    <section
      className={`justify-center  items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-max scale-110 rounded-2xl bg-zinc-950 border border-white/15">
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="bg-zinc-900 p-1 rounded-lg ml-auto absolute right-4 top-4"
        >
          <X className="hover:text-white/80" />
        </button>

        <div className="flex flex-col">
          <div className="mt-4">
            <span className="">App Settings</span>
            <div className="mt-2 flex justify-between items-center pb-2">
              <span className="text-sm opacity-80">Toggole Hijri Date</span>
              <div
                onClick={() => setHijriDate(!hijriDate)}
                className={`${
                  hijriDate ? "bg-zinc-50" : "bg-zinc-700"
                } w-9 cursor-pointer transition-colors duration-300 rounded-full p-0.5`}
              >
                <div
                  className={`${
                    hijriDate && "translate-x-4"
                  } size-4 rounded-full transition-transform duration-300 bg-zinc-950`}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <span className="text-sm opacity-80">
              Toggle Quran Playing Method
            </span>
            <div
              onClick={() => setCheck(!check)}
              className={`${
                check ? "bg-zinc-50" : "bg-zinc-700"
              } w-9 cursor-pointer transition-colors duration-300 rounded-full p-0.5`}
            >
              <div
                className={`${
                  check && "translate-x-4"
                } size-4 rounded-full transition-transform duration-300 bg-zinc-950`}
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
      </div>
    </section>
  );
}
