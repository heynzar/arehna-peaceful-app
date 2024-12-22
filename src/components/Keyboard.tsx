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
    <section className="fixed inset-0 flex items-center justify-center w-screen h-screen scale-150 bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-[350px] rounded-2xl border border-white/15 bg-zinc-950 p-4">
        <header className="flex items-center">
          <h2>Keyboard Shortcuts</h2>
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
              <kbd className={`key__button_3 scale-90 ${width ?? ""}`}>
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
