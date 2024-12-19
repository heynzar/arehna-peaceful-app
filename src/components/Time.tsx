"use client";

import React, { useState, useEffect } from "react";

const DateTimeDisplay: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("THU, DEC 18");
  const [currentTime, setCurrentTime] = useState<string>("12:22");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
      };
      setCurrentDate(now.toLocaleDateString("en-US", options));
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    // Update date and time every second
    const timer = setInterval(updateDateTime, 1000);
    updateDateTime(); // Call immediately to set initial value

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1 className="text-[2.5rem] font-normal leading-10">
        {currentDate.toUpperCase()}
      </h1>
      <h2 className="text-8xl font-medium">{currentTime}</h2>
    </div>
  );
};

export default DateTimeDisplay;
