
// pages/timeline.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import BlurText from '../components/BlurText';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import { Milestone } from '../components/MilestoneCard';

const Particles = dynamic(() => import('../components/Particles'), {
  ssr: false,
  loading: () => null,
});

const milestones: Milestone[] = [
    {
        title: "Primeiro Encontro",
        date: "2021-12-10T20:30:07",
        icon: 'hearts',
        photoUrl: "/image/01.jpg",
        description: "O dia em que nossos corações se encontraram e uma nova jornada começou.",
        align: 'left',
    },
    {
        title: "Pedido de Namoro",
        date: "2021-12-15T18:00:00",
        icon: 'ring',
        photoUrl: "/image/02.jpg",
        description: "O início oficial da nossa jornada, um 'sim' que mudou tudo.",
        align: 'right',
    },
    {
        title: "Primeiro Passeio na Natureza",
        date: "2022-02-06T17:00:13",
        icon: 'hearts',
        photoUrl: "/image/03.jpg",
        description: "Aventuras e ar puro, construindo memórias ao ar livre.",
        align: 'left',
    },
    {
        title: "Chalé Juntos",
        date: "2022-03-14T08:00:00",
        icon: 'ring',
        photoUrl: "/image/04.jpg",
        description: "Nosso primeiro refúgio, um lugar só nosso para sonhar.",
        align: 'right',
    },
    {
        title: "Primeiro Show",
        date: "2022-04-17T20:30:07",
        icon: 'hearts',
        photoUrl: "/image/05.jpg",
        description: "A trilha sonora do nosso amor ganhando vida no palco.",
        align: 'left',
    },
    {
        title: "Viagem a Inhotim",
        date: "2022-08-04T18:00:00",
        icon: 'ring',
        photoUrl: "/image/06.jpg",
        description: "Entre arte e natureza, nosso amor florescendo ainda mais.",
        align: 'right',
    },
    {
        title: "Primeira Festa a Fantasia",
        date: "2022-11-04T17:00:13",
        icon: 'hearts',
        photoUrl: "/image/07.jpg",
        description: "Criatividade, diversão e a certeza de que somos a melhor dupla.",
        align: 'left',
    },
    {
        title: "Pedido de Casamento",
        date: "2022-12-14T08:00:00",
        icon: 'ring',
        photoUrl: "/image/08.jpg",
        description: "Um passo importante que selou nosso compromisso. Um 'sim' que mudou nossas vidas para sempre.",
        align: 'right',
    },
    {
        title: "Noivado Oficial",
        date: "2022-12-23T20:30:07",
        icon: 'hearts',
        photoUrl: "/image/09.jpg",
        description: "O compromisso se torna oficial, compartilhado com quem amamos.",
        align: 'left',
    },
    {
        title: "Fantasia Foda",
        date: "2023-02-15T18:00:00",
        icon: 'ring',
        photoUrl: "/image/11.jpg",
        description: "Mais uma festa, mais memórias inesquecíveis e fantasias incríveis.",
        align: 'right',
    },
    {
        title: "Conhecendo o Mar",
        date: "2023-07-10T17:00:13",
        icon: 'hearts',
        photoUrl: "/image/10.jpg",
        description: "O mar como testemunha do nosso amor, em uma viagem especial.",
        align: 'left',
    },
    {
        title: "Nosso Casamento",
        date: "2024-08-24T08:00:00",
        icon: 'ring',
        photoUrl: "/image/12.jpg",
        description: "O dia em que nos tornamos um só. A celebração do nosso amor com amigos e familiares.",
        align: 'right',
    },
];


export default function TimelinePage() {
  const wifeName = "Mirelle";
  const yourName = "Rafael";

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Head>
        <title>Nossa Linha do Tempo | {wifeName} & {yourName}</title>
        <meta name="description" content={`Nossa linha do tempo de relacionamento - ${wifeName} & ${yourName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2392A8D1'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>" />
      </Head>
      
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Suspense fallback={null}>
          <Particles 
            particleColors={['#FFFFFF', '#F8F7FF', '#FFF4E8', '#CAE8FF', '#92A8D1']}
            particleCount={1200}
            particleSpread={4}
            speed={0.4}
            particleBaseSize={70}
            sizeRandomness={1.8}
            moveParticlesOnHover={true}
            particleHoverFactor={0.3}
            alphaParticles={true}
            disableRotation={false}
          />
        </Suspense>
      </div>

      <Navbar />
      <header className="text-center py-8 md:py-16 pt-20">
          <div className="container mx-auto px-4">
              <BlurText
                as="h1"
                text="Nossa Linha do Tempo"
                className="font-script text-5xl md:text-8xl text-blue-500 mb-4 md:mb-6"
                delay={100}
                animateBy="letters"
              />
              <BlurText
                as="p"
                text="Reviva os momentos mais importantes da nossa história de amor."
                className="text-base md:text-xl text-blue-300 opacity-80 max-w-2xl mx-auto mt-2 md:mt-4 px-2"
                delay={50}
                animateBy="words"
              />
          </div>
      </header>

      <main className="flex-grow w-full">
        <Timeline milestones={milestones} />
      </main>

      <footer className="text-center py-4 md:py-6 text-blue-300 opacity-70 font-medium">
        <p>Desenvolvido com ❤️ por Rafael</p>
      </footer>
    </div>
  );
}
