// components/AnimatedTimeCounter.tsx (Reshaping this to be the new TimeCounter)
import React, { useState, useEffect } from 'react';

interface TimeCounterProps { // Renaming props interface for clarity
  startDateTime: string;
  title: string; // New prop for the title like "Tempo de Namoro"
}

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Reusable TimeDisplayUnit, now internal or could be separate if preferred
const TimeDisplayUnit: React.FC<{ value: number; label: string; isSeconds?: boolean; key?: any }> = ({ value, label, isSeconds = false }) => {
  // The 'key' prop for seconds is for a potential CSS animation reset, not Framer's AnimatePresence
  return (
    <div className="flex flex-col items-center p-2">
      <span
        key={isSeconds ? value : undefined} // Add key only for seconds to potentially re-trigger CSS animation
        className={`font-cormorant text-5xl md:text-6xl font-bold text-[var(--text-primary)] ${isSeconds ? 'animate-tick' : ''}`}
      >
        {value}
      </span>
      <span className="font-cormorant text-xs sm:text-sm md:text-base text-[var(--text-secondary)] mt-1">{label}</span>
    </div>
  );
};

const AnimatedTimeCounter: React.FC<TimeCounterProps> = ({ startDateTime, title }) => {
  const [duration, setDuration] = useState<Duration>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to help trigger second animation
  const [secondTick, setSecondTick] = useState(0);

  useEffect(() => {
    const calculateDuration = () => {
      const startTime = new Date(startDateTime);
      const currentTime = new Date();

      let years = currentTime.getFullYear() - startTime.getFullYear();
      let months = currentTime.getMonth() - startTime.getMonth();
      let days = currentTime.getDate() - startTime.getDate();
      let hours = currentTime.getHours() - startTime.getHours();
      let minutes = currentTime.getMinutes() - startTime.getMinutes();
      let seconds = currentTime.getSeconds() - startTime.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const prevMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) { months += 12; years--; }

      setDuration({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
      setSecondTick(s => s + 1); // Trigger re-render for seconds animation key change
    };

    calculateDuration();
    const intervalId = setInterval(calculateDuration, 1000);
    return () => clearInterval(intervalId);
  }, [startDateTime]);

  // const timeUnits = [
  //   { value: duration.years, label: duration.years === 1 ? "Ano" : "Anos", show: duration.years > 0 },
  //   { value: duration.months, label: duration.months === 1 ? "Mês" : "Meses", show: duration.months > 0 },
  //   { value: duration.days, label: duration.days === 1 ? "Dia" : "Dias", show: true }, // Always show days
  //   { value: duration.hours, label: duration.hours === 1 ? "Hora" : "Horas", show: true }, // Always show hours
  //   { value: duration.minutes, label: duration.minutes === 1 ? "Minuto" : "Minutos", show: true }, // Always show minutes
  //   { value: duration.seconds, label: duration.seconds === 1 ? "Segundo" : "Segundos", show: true, isSeconds: true }, // Always show seconds
  // ];

  // const visibleUnits = timeUnits.filter(unit => unit.show);
  // If only showing days and above, and all are zero, then it looks weird.
  // Let's ensure we always show at least D,H,M,S if Y/M are zero.
  // The user plan shows Y,M,D,H,M,S. We should try to show all if possible, or hide leading zeros.
  // The user example shows all 6 units. So we will show all.

  return (
    <div className="text-center text-[var(--text-primary)] w-full">
      <h2 className="font-dancing-script text-3xl md:text-4xl mb-6 text-[var(--primary-accent)]">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        <TimeDisplayUnit value={duration.years} label={duration.years === 1 ? "Ano" : "Anos"} />
        <TimeDisplayUnit value={duration.months} label={duration.months === 1 ? "Mês" : "Meses"} />
        <TimeDisplayUnit value={duration.days} label={duration.days === 1 ? "Dia" : "Dias"} />
        <TimeDisplayUnit value={duration.hours} label={duration.hours === 1 ? "Hora" : "Horas"} />
        <TimeDisplayUnit value={duration.minutes} label={duration.minutes === 1 ? "Minuto" : "Minutos"} />
        <TimeDisplayUnit value={duration.seconds} label={duration.seconds === 1 ? "Segundo" : "Segundos"} isSeconds={true} key={secondTick} />
      </div>
    </div>
  );
};

export default AnimatedTimeCounter; // Keep name or rename file/component to TimeCounter
