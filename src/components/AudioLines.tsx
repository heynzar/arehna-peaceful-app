"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Static path variants outside the component
const pathVariants = [
  ["M2 8v7", "M6 3v18", "M10 10v2", "M14 5v13", "M18 10v3", "M22 6v11"],
  ["M2 10v2", "M6 6v11", "M10 3v18", "M14 8v7", "M18 5v13", "M22 10v3"],
  ["M2 5v15", "M6 8v7", "M10 4v16", "M14 10v5", "M18 6v13", "M22 8v7"],
];

export default function AudioLine() {
  const [check, setCheck] = useState(false);
  const [activePaths, setActivePaths] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (check) {
      interval = setInterval(() => {
        setActivePaths((prev) => (prev + 1) % pathVariants.length);
      }, 500); // Switch paths every 500ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [check]);

  return (
    <div className="flex gap-2 items-center bg-white p-1 text-black">
      <button
        onClick={() => {
          setCheck(!check);
        }}
      >
        {check ? "Stop" : "Start"}
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
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
