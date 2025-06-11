// pages/index.tsx
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CountersFinale from '../components/CountersFinale';

export default function Home() {
  // Dados de relacionamento
  const wifeName = "Amada";
  const yourName = "Seu Nome";
  const datingStartDate = "2021-01-15T20:30:00";
  const weddingStartDate = "2023-10-24T17:00:00";

  return (
    <>
      <Head>
        <title>Nossa História de Amor | {wifeName} & {yourName}</title>
        <meta name="description" content={`Contador de tempo do nosso relacionamento - ${wifeName} & ${yourName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4">
            <h1 className="title-large mb-6 animate-fade">
              {wifeName} & {yourName}
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade delay-1">
              Cada segundo ao seu lado é um presente. 
              Veja quanto tempo nossa história de amor já dura.
            </p>
            
            <div className="flex justify-center">
              <a href="#contadores" className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full font-medium hover:bg-blue-700 transition duration-300 animate-fade delay-2">
                Ver nosso tempo juntos
              </a>
            </div>
          </div>
        </section>

        {/* Decorative hearts */}
        <div className="fixed top-20 left-20 heart-decoration animate-pulse text-blue-300">♥</div>
        <div className="fixed bottom-20 right-20 heart-decoration animate-pulse text-blue-300">♥</div>
        
        {/* Counters Section */}
        <div id="contadores">
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
