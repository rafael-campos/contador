// pages/index.tsx
import Head from 'next/head';
import { useState, useEffect } from 'react';
import TimelinePath from '../components/TimelinePath';
import HeroSection from '../components/HeroSection';
import MilestoneCard from '../components/MilestoneCard';
import CountersFinale from '../components/CountersFinale'; // Import CountersFinale

// PlaceholderComponent can now be fully removed if it's not used elsewhere.
// For this example, assuming it's fully replaced.

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScrollableHeight > 0 ? currentScroll / totalScrollableHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const wifeName = "Amada";
  const yourName = "Seu Nome";
  const datingStartDate = "2021-01-15T20:30:00";
  const weddingStartDate = "2023-10-24T17:00:00";
  const heroPhotoUrl = "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1974";
  const datingPhotoUrl = "https://images.unsplash.com/photo-1518977956812-177a90c7a3c2?auto=format&fit=crop&w=800";
  const weddingPhotoUrl = "https://images.unsplash.com/photo-1520854221256-154540828145?auto=format&fit=crop&w=800";

  return (
    <>
      <Head>
        <title>Nossa Jornada no Tempo</title>
        <meta name="description" content={`Nossa Jornada no Tempo - Para ${wifeName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative overflow-hidden">
        <TimelinePath scrollProgress={scrollProgress} />

        <div className="relative z-10 container mx-auto px-4">
          <HeroSection
            mainPhotoUrl={heroPhotoUrl}
            wifeName={wifeName}
          />
          <MilestoneCard
            title="O Início de Tudo"
            date={datingStartDate}
            iconType="hearts"
            photoUrl={datingPhotoUrl}
            align="left"
          />
          <MilestoneCard
            title="O Dia do 'Sim'"
            date={weddingStartDate}
            iconType="ring"
            photoUrl={weddingPhotoUrl}
            align="right"
          />
          <CountersFinale
            datingStartDate={datingStartDate}
            weddingStartDate={weddingStartDate}
            yourName={yourName}
          />
        </div>
      </main>
    </>
  );
}
