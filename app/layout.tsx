import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WordChain — Free Online Word Chain Game | Multiplayer Word Game 2025',
  description:
    'Play WordChain free online — the #1 real-time multiplayer word chain game. Chain words by last letter, customize rules, play with friends or solo. Like Shiritori, word relay, and word ladder games. No download needed.',
  keywords: [
    'word chain game', 'word chain game online', 'word chain game multiplayer',
    'word game online', 'word game multiplayer', 'free word game',
    'shiritori game', 'shiritori online', 'word relay game',
    'word ladder game', 'last letter word game', 'word association game',
    'vocabulary game', 'english word game', 'spelling game online',
    'multiplayer word game', 'real time word game', 'word battle game',
    'word puzzle game', 'brain game online', 'word chain challenge',
    'play word chain', 'word chain with friends', 'online word games free',
    'word games for adults', 'word games for kids', 'educational word game',
    'competitive word game', 'word chain rules', 'how to play word chain',
    'best word games 2025', 'browser word game', 'no download word game',
  ],
  authors: [{ name: 'WordChain Game' }],
  creator: 'WordChain',
  publisher: 'WordChain',
  category: 'Games',
  classification: 'Word Games, Educational Games, Multiplayer Games',
  openGraph: {
    title: 'WordChain — Free Online Multiplayer Word Chain Game',
    description: 'Chain words by their last letter in real-time multiplayer battles. Customize rules, play with friends, or practice solo. Free, no download.',
    type: 'website',
    locale: 'en_US',
    siteName: 'WordChain',
    url: 'https://wordchain-5hhv.onrender.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordChain — Free Online Word Chain Game',
    description: 'The #1 multiplayer word chain game. Play free online with friends — no download needed!',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WordChain',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wordchain-5hhv.onrender.com',
  },
  verification: {
    google: 'google57349f1768201984',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFC928',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'WordChain',
  alternateName: ['Word Chain Game', 'WordChain Online', 'Word Chain Multiplayer'],
  description: 'Free online multiplayer word chain game. Chain words by their last letter in real-time battles with friends. Customizable rules, multiple game modes.',
  url: 'https://wordchain-5hhv.onrender.com',
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Word Game',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Requires WebSocket support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  genre: ['Word Game', 'Puzzle', 'Educational', 'Multiplayer'],
  gamePlatform: ['Web Browser', 'Mobile Browser', 'PWA'],
  numberOfPlayers: {
    '@type': 'QuantitativeValue',
    minValue: 1,
    maxValue: 8,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a word chain game?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A word chain game is a word game where each player must say or type a word that begins with the last letter of the previous word. For example: CAT → TOP → PEN → NET. WordChain is a free online multiplayer version with customizable rules, timers, and lives.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you play WordChain online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Visit WordChain in your browser, choose a game mode (Quick Play, Play with Friends, Practice, or Local), customize your rules, and start chaining words! Each word must begin with the last letter of the previous word. No download or sign-up required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is WordChain free to play?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, WordChain is completely free to play. No downloads, no sign-ups, no ads. Just open your browser and start playing word chain games with friends or solo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I play word chain with friends online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Create a private room in WordChain and share the 6-character room code with your friends. They can join instantly from any browser. You can also use Quick Play to match with random players.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Shiritori?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shiritori is a Japanese word game where players take turns saying words that begin with the last syllable of the previous word. WordChain is the English version — words must start with the last letter of the previous word.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-[#FFC928] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}
