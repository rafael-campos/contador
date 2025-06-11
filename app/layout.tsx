// app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Dancing_Script } from 'next/font/google';
import '../styles/globals.css'; // Ensure globals.css is imported

// Setup Cormorant Garamond font
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Include necessary weights
  variable: '--font-cormorant-garamond', // CSS variable for this font
  display: 'swap',
});

// Setup Dancing Script font
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'], // Include necessary weights
  variable: '--font-dancing-script', // CSS variable for this font
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nossa Jornada no Tempo', // Default title, can be overridden by pages
  description: 'Uma jornada romântica através do tempo.', // Default description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* Apply font variables to the body */}
      <body className={`${cormorant.variable} ${dancingScript.variable} font-sans`}> {/* font-sans is a Tailwind utility that will use the --font-cormorant-garamond due to globals.css setup */}

        {/* This div is the animated, fixed background */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--background-dark)] to-[var(--background-light)] -z-10"
        />

        {/* The main content scrolls over the background */}
        {/* The 'relative z-0' on main ensures it creates a stacking context above the -z-10 background */}
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
