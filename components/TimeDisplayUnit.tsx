// components/TimeDisplayUnit.tsx
import React from 'react';

interface TimeDisplayUnitProps {
  value: number;
  label: string;
  valueClassName?: string; // For specific styling of the number
  labelClassName?: string; // For specific styling of the label
}

const TimeDisplayUnit: React.FC<TimeDisplayUnitProps> = ({
  value,
  label,
  valueClassName = "font-script text-5xl md:text-6xl text-rose-gold",
  labelClassName = "font-cormorant text-sm md:text-base text-champagne-gold mt-1"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 mx-1 md:mx-2">
      {/*
        Animation for value change (e.g., flip/tick) can be added here later.
        For now, it's a direct display.
        A simple keyframe animation could be used for a subtle "pop" on change if needed.
      */}
      <span className={valueClassName}>{value}</span>
      <span className={labelClassName}>{label}</span>
    </div>
  );
};

export default TimeDisplayUnit;
