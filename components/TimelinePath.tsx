// components/TimelinePath.tsx
import React, { useEffect, useRef } from 'react';

interface TimelinePathProps {
  // Will accept scrollYProgress from Framer Motion or a similar value (0 to 1)
  // For now, we'll simulate or attempt direct JS scroll tracking if Framer Motion isn't working
  scrollProgress: number;
}

const TimelinePath: React.FC<TimelinePathProps> = ({ scrollProgress }) => {
  const pathRef = useRef<SVGPathElement>(null);

  // Define a meandering path. Adjust d attribute for desired shape.
  // This path starts from top-middle, meanders down.
  // Height of this path should roughly correspond to the total scrollable height of the timeline content.
  // Example path, likely needs significant adjustment for actual content length and desired aesthetics.
  // viewBox might be "0 0 20 1500" (thin and tall)
  const pathDefinition = "M 10 0 Q 15 50, 10 100 T 10 200 Q 5 250, 10 300 T 10 400 Q 15 450, 10 500 T 10 600 Q 5 650, 10 700 T 10 800 Q 15 850, 10 900 T 10 1000 Q 5 1050, 10 1100 T 10 1200 Q 15 1250, 10 1300 T 10 1400 Q 5 1450, 10 1500";
  const svgViewBox = "0 0 20 1500"; // Width 20, Height 1500

  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      // Animate path drawing based on scrollProgress
      // scrollProgress is expected to be a value from 0 (top) to 1 (bottom)
      const drawLength = length * scrollProgress;
      path.style.strokeDashoffset = `${length - drawLength}`;
    }
  }, [scrollProgress]); // Rerun when scrollProgress changes

  return (
    <svg
      width="20" // Fixed width for the path container
      height="1500" // Fixed height, should be tall enough for the content
      viewBox={svgViewBox}
      preserveAspectRatio="xMidYMax meet" // Adjust as needed
      className="absolute top-0 left-1/2 -translate-x-1/2 z-0" // Positioned in center
      style={{ height: 'auto', maxHeight: '1500px' }} // Or set a dynamic height based on content
    >
      <path
        ref={pathRef}
        d={pathDefinition}
        stroke="url(#pathGradient)" // Using a gradient for the stroke
        strokeWidth="3" // Adjust for thickness
        fill="none"
        className="transition-stroke-dashoffset duration-100 ease-linear" // CSS transition for smoothness
      />
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B76E79" stopOpacity="0.3" /> {/* Rose Gold, slightly transparent start */}
          <stop offset="100%" stopColor="#B76E79" stopOpacity="1"/> {/* Rose Gold, opaque end */}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TimelinePath;
