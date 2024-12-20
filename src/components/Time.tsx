"use client";

import React, { useState, useEffect } from "react";

interface DateTimeDisplayProps {
  isHijri: boolean;
}

const Time: React.FC<DateTimeDisplayProps> = ({ isHijri }) => {
  const [currentDate, setCurrentDate] = useState<string>("Monday, December 20");
  const [currentTime, setCurrentTime] = useState<string>("10:09");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const getGregorianDate = () => {
        return now.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
        });
      };

      const getHijriDate = () => {
        try {
          return new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
            month: "long",
            weekday: "long",
            day: "2-digit",
          }).format(now);
        } catch {
          return "Hijri calendar not supported";
        }
      };

      setCurrentDate(isHijri ? getHijriDate() : getGregorianDate());

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    const timer = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(timer);
  }, [isHijri]);

  return (
    <div>
      <h1 className="text-xl font-normal leading-10 text-center">
        {currentDate}
      </h1>
      <h2 className="text-8xl font-medium text-center">{currentTime}</h2>
    </div>
  );
};

export default Time;
