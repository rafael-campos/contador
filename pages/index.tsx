// pages/index.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Counters = dynamic(() => import('../components/Counters'), {
  ssr: false,
  // Optional: Add a loading component
});

export default function Home() {
  // Dados de relacionamento
  const wifeName = "Mirelle";
  const yourName = "Rafael";
  const datingStartDate = "2021-12-15T20:30:00";
  const weddingStartDate = "2024-08-24T17:00:00";

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Nossa História de Amor | {wifeName} & {yourName}</title>
        <meta name="description" content={`Contador de tempo do nosso relacionamento - ${wifeName} & {yourName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2392A8D1'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>" />
      </Head>

      <main className="flex-grow mt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
            <div className="container mx-auto px-4">
                <h1 className="font-script text-6xl md:text-8xl text-blue-500 mb-4">
                  {wifeName} & {yourName}
                </h1>
                <p className="text-lg md:text-xl text-blue-300 opacity-80 max-w-2xl mx-auto">
                  Cada segundo ao seu lado é um presente. Veja quanto tempo nossa história de amor já dura.
                </p>
            </div>
        </section>

        {/* Decorative hearts */}
        <div className="fixed top-20 left-20 heart-decoration animate-pulse text-blue-300">♥</div>
        <div className="fixed bottom-20 right-20 heart-decoration animate-pulse text-blue-300">♥</div>
        
        {/* Counters Section */}
        <div id="contadores">
          <Counters
            datingStartDate={datingStartDate}
            weddingStartDate={weddingStartDate}
          />
        </div>
      </main>

      <footer className="text-center py-6 text-blue-300 opacity-70 font-medium">
        <p>Desenvolvido com ❤️ por Rafael</p>
      </footer>
    </div>
  );
}
