// pages/index.tsx
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import AnimatedTimeCounter from '../components/AnimatedTimeCounter';
import ScrollProgressTimeline from '../components/ScrollProgressTimeline'; // Import the new component

const ScrollDownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-10 h-10 text-[var(--primary-accent)]"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0L4.5 13.5M12 21V3" />
  </svg>
);

export default function Home() {
  const wifeName = "Mirelle"; // Atualizado
  const datingStartDate = "2021-12-15T20:00:00"; // Atualizado
  const weddingStartDate = "2024-10-24T17:00:00"; // Atualizado

  // Refs for sections
  const introRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for Counters section fade-in
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const countersObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('opacity-100');
        } else {
          entry.target.classList.remove('opacity-100');
          entry.target.classList.add('opacity-0');
        }
      });
    }, observerOptions);

    const currentCountersRef = countersRef.current; // Capture current value for cleanup

    if (currentCountersRef) {
      countersObserver.observe(currentCountersRef);
    }

    return () => {
      if (currentCountersRef) {
        countersObserver.unobserve(currentCountersRef);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Nossa Jornada no Tempo - Para {wifeName}</title>
        <meta name="description" content={`Uma dedicatória especial para ${wifeName}`} />
      </Head>

      {/* ScrollProgressTimeline is placed here, its fixed positioning will handle layout */}
      <ScrollProgressTimeline />

      <div> {/* Main content container */}
        {/* Intro Section */}
        <section
          ref={introRef}
          className="h-screen flex flex-col items-center justify-center text-center p-4 relative transition-opacity duration-1000 ease-in-out"
        >
          <div className="mb-16">
            <h1 className="font-dancing-script text-5xl md:text-7xl text-[var(--text-primary)] mb-6">
              Para a minha amada {wifeName}
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-[var(--text-secondary)]">
              Nossa jornada começou aqui...
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ScrollDownArrow />
          </div>
        </section>

        {/* Counters Section */}
        <section
          ref={countersRef}
          className="h-screen flex flex-col justify-center items-center gap-10 md:gap-16 p-4 opacity-0 transition-opacity duration-1000 ease-in-out"
        >
          <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start gap-10 md:gap-16 w-full max-w-5xl">
            <AnimatedTimeCounter
              title="Tempo de Namoro"
              startDateTime={datingStartDate}
            />
            <AnimatedTimeCounter
              title="Tempo de Casamento"
              startDateTime={weddingStartDate}
            />
          </div>
        </section>
      </div>
    </>
  );
}
