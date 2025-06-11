import { useState, useEffect } from 'react';

interface TimeCounterProps {
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

const TimeCounter: React.FC<TimeCounterProps> = ({ startDateTime }) => {
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
      const startTime = new Date(startDateTime).getTime();
      const currentTime = new Date().getTime();
      let diff = Math.floor((currentTime - startTime) / 1000); // difference in seconds

      if (diff < 0) diff = 0; // Ensure no negative time

      // const s = diff % 60; // Original calculation, now replaced by finalSeconds
      // diff = Math.floor(diff / 60);
      // const m = diff % 60; // Original calculation, now replaced by finalMinutes
      // diff = Math.floor(diff / 60);
      // const h = diff % 24; // Original calculation, now replaced by finalHours
      // diff = Math.floor(diff / 24);

      // Approximate calculation for days, months, years
      // This is a simplified calculation. For high accuracy, a date library would be better.
      // const d = diff; // Remaining days after taking out H, M, S - This 'd' is no longer used due to refined date calculation

      // For simplicity in this example, we are not calculating accurate years and months
      // as it involves complexities with leap years and varying month lengths.
      // We'll display total days, and then break down H, M, S.
      // A more robust solution would use a library like date-fns or moment.js for this.

      // Simplified approach: Calculate total days, and then break down H, M, S from the remainder.
      // For a more accurate year/month/day breakdown, this logic needs to be more sophisticated.

      // Let's refine the day, month, year calculation.
      // This is still an approximation but better than just total days.
      const startDateObj = new Date(startDateTime);
      const currentDateObj = new Date();

      let years = currentDateObj.getFullYear() - startDateObj.getFullYear();
      let months = currentDateObj.getMonth() - startDateObj.getMonth();
      let days = currentDateObj.getDate() - startDateObj.getDate();

      if (days < 0) {
        months--;
        const prevMonthLastDay = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0).getDate();
        days += prevMonthLastDay;
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // The time part (h, m, s) is already calculated based on total seconds diff.
      // We need to ensure 'days' here reflects the calendar day difference,
      // and h, m, s reflect the time difference for the current day.

      // Recalculate H, M, S based on the current time and start time for more accuracy with dates
      let secondsDiff = Math.floor((currentDateObj.getTime() - startDateObj.getTime()) / 1000);

      const finalSeconds = secondsDiff % 60;
      secondsDiff = Math.floor(secondsDiff / 60);
      const finalMinutes = secondsDiff % 60;
      secondsDiff = Math.floor(secondsDiff / 60);
      const finalHours = secondsDiff % 24;
      // The 'days', 'months', 'years' calculation above is a calendar difference.

      setDuration({
        years: years < 0 ? 0 : years,
        months: months < 0 ? 0 : months, // Ensure months isn't negative if overall duration is small
        days: days < 0 ? 0 : days, // Ensure days isn't negative
        hours: finalHours,
        minutes: finalMinutes,
        seconds: finalSeconds,
      });
    };

    calculateDuration(); // Calculate once immediately
    const intervalId = setInterval(calculateDuration, 1000); // Then update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [startDateTime]);

  return (
    <div className="flex flex-wrap items-baseline">
      {duration.years > 0 && (
        <span className="mr-2">
          <span className="font-bold text-xl">{duration.years}</span>
          <span className="text-sm ml-1">anos,</span>
        </span>
      )}
      {duration.months > 0 && (
        <span className="mr-2">
          <span className="font-bold text-xl">{duration.months}</span>
          <span className="text-sm ml-1">meses,</span>
        </span>
      )}
      {duration.days > 0 && (
        <span className="mr-2">
          <span className="font-bold text-xl">{duration.days}</span>
          <span className="text-sm ml-1">dias,</span>
        </span>
      )}
      <span className="mr-2">
        <span className="font-bold text-xl">{duration.hours}</span>
        <span className="text-sm ml-1">horas,</span>
      </span>
      <span className="mr-2">
        <span className="font-bold text-xl">{duration.minutes}</span>
        <span className="text-sm ml-1">minutos,</span>
      </span>
      <span>
        <span className="font-bold text-xl">{duration.seconds}</span>
        <span className="text-sm ml-1">segundos</span>
      </span>
    </div>
  );
};

export default TimeCounter;
