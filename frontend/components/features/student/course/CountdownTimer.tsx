"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isLive = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  const isToday = timeLeft.days === 0;

  if (isLive) {
    return (
      <div className="text-center space-y-2">
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full">
          <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <span className="font-semibold">Live Now</span>
        </div>
      </div>
    );
  }

  const segments = isToday
    ? [
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
      ]
    : [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
      ];

  return (
    <div className="text-center space-y-2">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="flex items-center justify-center gap-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex flex-col items-center">
            <div className="bg-card border border-border/50 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl font-bold tabular-nums">
                {String(seg.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
