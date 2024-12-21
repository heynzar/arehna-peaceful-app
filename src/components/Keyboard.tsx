"use client";

import { X } from "lucide-react";
import { SetStateAction } from "react";

export default function Keyboard({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <section
      className={`justify-center items-center scale-150 absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-[400px] rounded-2xl bg-zinc-950 border border-white/15">
        <button
          onClick={() => setOpen(false)}
          className="bg-zinc-900 p-1 rounded-lg ml-auto absolute right-4 top-4"
        >
          <X className="hover:text-white/80" />
        </button>
      </div>
    </section>
  );
}
