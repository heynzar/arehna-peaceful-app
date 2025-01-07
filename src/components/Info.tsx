"use client";

import { ArrowUpRight, X } from "lucide-react";
import { SetStateAction } from "react";
import { ruqaa } from "@/app/font";
import Link from "next/link";

interface InfoSectionProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

export default function InfoSection({ open, setOpen }: InfoSectionProps) {
  if (!open) return null;

  return (
    <section
      aria-hidden={!open}
      aria-labelledby="about-title"
      role="dialog"
      className="flex justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm px-6"
    >
      <div
        className="p-4 w-full md:scale-150 min-w-[270px] max-w-[350px] rounded-2xl bg-zinc-950 border border-zinc-800"
        role="document"
      >
        <header className="flex items-center">
          <h2 id="about-title" className="text-white/80">
            About Arehna
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg bg-zinc-900 p-1 hover:text-white/80"
            aria-label="Close About Section"
          >
            <X />
          </button>
        </header>

        <div className="flex flex-col mt-4 gap-2">
          <p className="md:text-sm font-medium">
            Arehna is a Sadaqa Jaria (ongoing charity). Your support helps us
            improve Arehna and bring it to more people.
          </p>

          <div className="flex justify-between items-center mt-2 w-full">
            <a
              href="https://ko-fi.com/heynzar"
              target="_blank"
              className="scale-75 -ml-6"
            >
              <button className="key__button-2 !px-6 inline-flex items-center justify-center">
                Support Arehna
              </button>
            </a>
            <span className={`${ruqaa.className} text-lg`}>
              جَزَاكَ ٱللَّٰهُ خَيْرًا
            </span>
          </div>
          <hr className="mt-4 opacity-20" />
          <footer className="flex my-2 w-full justify-between items-center text-[0.7rem] text-zinc-400">
            {/* <a
              href="#"
              className="flex underline underline-offset-4  items-end hover:text-zinc-100 transition-colors duration-300"
              aria-label="Open Chrome Extension"
            >
              <span>Chrome Extension</span>
              <ArrowUpRight strokeWidth={1} size={16} />
            </a> */}
            <Link
              href="/about"
              className="underline underline-offset-4  hover:text-zinc-100 transition-colors duration-300"
            >
              About Page
            </Link>

            <span>
              Developed by{" "}
              <a
                href="https://nzar.dev"
                target="_blank"
                className="underline underline-offset-2 hover:text-zinc-100 transition-colors duration-300"
              >
                Nzar
              </a>
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
}
