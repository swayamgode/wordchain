import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Clash — Free Online Multiplayer RGB Color Matching Game',
  description:
    'Play Color Clash free online! The real-time multiplayer RGB color matching game. Move Red, Green, and Blue sliders to match the secret target color. Closest hue wins the round. Solo bot practice & 2-player pass & play modes.',
  keywords: [
    'color clash',
    'rgb color matching game',
    'color matching game online',
    'guess the color game',
    'rgb game',
    'color guessing game multiplayer',
    'color slider game',
    'multiplayer color game',
    'rgb color picker game',
    'color match online free',
    'browser color games',
  ],
  alternates: {
    canonical: 'https://wordchain.in/color-clash',
  },
  openGraph: {
    title: 'Color Clash — Multiplayer RGB Color Matching Game',
    description:
      'Match the target color using RGB sliders in real-time multiplayer duels. Free browser game with zero downloads!',
    url: 'https://wordchain.in/color-clash',
    type: 'website',
    images: ['/icons/icon-512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Clash — Multiplayer RGB Color Game',
    description:
      'Challenge friends in real-time RGB slider battles. Free, instant play in your browser!',
    images: ['/icons/icon-512.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Color Clash',
  alternateName: ['Color Clash RGB Game', 'RGB Matcher Online', 'Multiplayer Color Matching Game'],
  description:
    'Free online multiplayer RGB color matching game. Players adjust Red, Green, and Blue sliders to replicate target color hues under a round clock.',
  url: 'https://wordchain.in/color-clash',
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Color Puzzle Game',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas or CSS3.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ColorClashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

