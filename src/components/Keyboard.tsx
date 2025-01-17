"use client";

import { X } from "lucide-react";
import { SetStateAction } from "react";

interface KeyboardShortcut {
  action: string;
  key: string;
  width?: string;
}

interface KeyboardProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

const shortcuts: KeyboardShortcut[] = [
  { action: "Play • Pause", key: "space", width: "!px-6" },
  { action: "Open/Close Quran Panel", key: "q" },
  { action: "Open/Close Sound Library", key: "s" },
  { action: "Open/Close Preferences", key: "p" },
  { action: "Open/Close Keyboard Shortcuts", key: "k" },
  { action: "Open/Close App Info", key: "i" },
  { action: "Toggle FullScreen Mode", key: "f" },
];

export default function KeyboardShortcuts({ open, setOpen }: KeyboardProps) {
  if (!open) return null;

  return (
    <section
      hidden={!open}
      aria-labelledby="keyboard-shortcuts-title"
      role="dialog"
      className="flex justify-center items-center absolute inset-0 w-screen h-screen bg-black/20 backdrop-blur-sm px-6"
    >
      <div
        className="p-4 w-full md:scale-150 min-w-[270px] max-w-[350px] rounded-2xl bg-zinc-950 border border-zinc-800"
        role="document"
      >
        <header className="flex items-center">
          <h2 id="keyboard-shortcuts-title" className="font-medium text-white">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg bg-zinc-900 p-1 hover:text-white/80"
            aria-label="Close keyboard shortcuts"
          >
            <X />
          </button>
        </header>

        <div className="space-y-3 my-4">
          {shortcuts.map(({ action, key, width }) => (
            <div
              key={action}
              className="flex items-center justify-between text-sm text-zinc-300"
            >
              <span>{action}</span>
              <kbd
                className={`key__button_3 scale-90 ${
                  width ?? ""
                } inline-flex items-center justify-center rounded-md bg-zinc-800 text-white px-2 py-1`}
                aria-label={`Key for ${action}`}
              >
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
