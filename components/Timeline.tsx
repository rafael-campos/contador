import React, { useRef } from 'react';
import { motion, useScroll, MotionValue } from 'framer-motion';
import MilestoneCard, { Milestone } from './MilestoneCard';

const TimelinePath: React.FC<{ scrollProgress: MotionValue<number> }> = ({ scrollProgress }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const pathDefinition = "M 10 0 Q -5 50, 10 100 T 10 200 Q 25 250, 10 300 T 10 400 Q -5 450, 10 500 T 10 600 Q 25 650, 10 700 T 10 800";

  return (
    <motion.svg
      width="20"
      height="100%"
      viewBox="0 0 20 800"
      preserveAspectRatio="none"
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
    >
      <motion.path
        ref={pathRef}
        d={pathDefinition}
        stroke="url(#path-gradient)"
        strokeWidth="3"
        fill="none"
        style={{ pathLength: scrollProgress }}
      />
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92A8D1" stopOpacity="0" />
          <stop offset="20%" stopColor="#92A8D1" stopOpacity="1" />
          <stop offset="80%" stopColor="#7B93BC" stopOpacity="1" />
          <stop offset="100%" stopColor="#7B93BC" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

const Timeline: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl relative">
        <TimelinePath scrollProgress={scrollYProgress} />
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.4 }}
            className="flex flex-col"
        >
            {milestones.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline; 