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
  { action: "Play • Pause", key: "Space", width: "!px-6" },
  { action: "Open/Close Quran Panel", key: "Q" },
  { action: "Open/Close Sound Library", key: "S" },
  { action: "Open/Close Preferences", key: "P" },
  { action: "Open/Close Keyboard Shortcuts", key: "K" },
];

export default function KeyboardShortcuts({ open, setOpen }: KeyboardProps) {
  if (!open) return null;

  return (
    <section
      aria-hidden={!open}
      aria-labelledby="keyboard-shortcuts-title"
      role="dialog"
      className="fixed inset-0 scale-150 flex items-center justify-center w-screen h-screen bg-black/20 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-[350px] rounded-2xl border border-white/15 bg-zinc-950 p-4"
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
