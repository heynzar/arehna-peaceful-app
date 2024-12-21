"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const pathVariants = [
  ["M2 8v7", "M6 3v18", "M10 10v2", "M14 5v13", "M18 10v3", "M22 6v11"],
  ["M2 10v2", "M6 6v11", "M10 3v18", "M14 8v7", "M18 5v13", "M22 10v3"],
  ["M2 5v15", "M6 8v7", "M10 4v16", "M14 10v5", "M18 6v13", "M22 8v7"],
];

export default function AudioLine({ play }: { play: boolean }) {
  const [activePaths, setActivePaths] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (play) {
      interval = setInterval(() => {
        setActivePaths((prev) => (prev + 1) % pathVariants.length);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [play]);

  return (
    <div className="flex gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-audio-lines"
      >
        {pathVariants[activePaths].map((path, index) => (
          <motion.path
            key={index}
            d={path}
            initial={{ d: path }}
            animate={{ d: path }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}
