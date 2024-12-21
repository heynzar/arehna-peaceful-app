"use client";

import React, { useState, useEffect } from "react";

const Timer: React.FC<{ play: boolean }> = ({ play }) => {
  const [time, setTime] = useState({
    horses: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (play) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          let { horses, minutes, seconds } = prevTime;

          // Increment seconds
          seconds += 1;

          // Handle overflow for seconds and minutes
          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes >= 60) {
            minutes = 0;
            horses += 1;
          }

          return { horses, minutes, seconds };
        });
      }, 1000);
    } else {
      // Clear the interval if play is false
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [play]);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="min-w-[100px] text-center ml-auto mt-auto text-lg backdrop-blur-sm rounded-lg px-4 border border-white/20">
      {`${time.horses}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`}
    </div>
  );
};

export default Timer;
