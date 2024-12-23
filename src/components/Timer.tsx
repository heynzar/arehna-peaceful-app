"use client";

import React, { useState, useEffect } from "react";

const Timer: React.FC<{ play: boolean }> = ({ play }) => {
  const [time, setTime] = useState({ horses: 0, minutes: 0, seconds: 0 });

  // Load saved time on mount
  useEffect(() => {
    const saved = localStorage.getItem("timer");
    if (saved) {
      setTime(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (play) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          let { horses, minutes, seconds } = prevTime;

          seconds += 1;

          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes >= 60) {
            minutes = 0;
            horses += 1;
          }

          const newTime = { horses, minutes, seconds };
          localStorage.setItem("timer", JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [play]);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="min-w-[100px] text-center text-lg backdrop-blur-sm rounded-lg px-4 border border-white/20">
      {`${time.horses}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`}
    </div>
  );
};

export default Timer;
