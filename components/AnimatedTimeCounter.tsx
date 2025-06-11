// components/AnimatedTimeCounter.tsx
import React, { useState, useEffect } from 'react';
import TimeDisplayUnit from './TimeDisplayUnit';

interface AnimatedTimeCounterProps {
  startDateTime: string;
}

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AnimatedTimeCounter: React.FC<AnimatedTimeCounterProps> = ({ startDateTime }) => {
  const [duration, setDuration] = useState<Duration>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

      // Adjust for negative values by borrowing from higher units
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        // Borrow days from previous month
        const prevMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setDuration({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
    };

    calculateDuration(); // Calculate once immediately
    const intervalId = setInterval(calculateDuration, 1000); // Then update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [startDateTime]);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
      {duration.years > 0 && <TimeDisplayUnit value={duration.years} label={duration.years === 1 ? "Ano" : "Anos"} />}
      {duration.months > 0 && <TimeDisplayUnit value={duration.months} label={duration.months === 1 ? "Mês" : "Meses"} />}
      <TimeDisplayUnit value={duration.days} label={duration.days === 1 ? "Dia" : "Dias"} />
      <TimeDisplayUnit value={duration.hours} label={duration.hours === 1 ? "Hora" : "Horas"} />
      <TimeDisplayUnit value={duration.minutes} label={duration.minutes === 1 ? "Minuto" : "Minutos"} />
      <TimeDisplayUnit value={duration.seconds} label={duration.seconds === 1 ? "Segundo" : "Segundos"} />
    </div>
  );
};

export default AnimatedTimeCounter;
