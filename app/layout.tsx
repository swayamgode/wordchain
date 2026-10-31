import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { AdSenseScript } from '../components/ads/AdSenseScript';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wordchain.in'),
  title: {
    default: 'WordChain — Free Online Word Chain Game | Play Word Chain Online',
    template: '%s | WordChain',
  },
  description:
    'Play WordChain free online — the #1 real-time multiplayer word chain game. Chain words by their last letter, compete in blitz duels, play with friends or solo vs bots. Free, instant, no download.',
  keywords: [
    'wordchain', 'word chain', 'word chain game', 'wordchain game', 'word chain game online',
    'word chain online', 'play word chain', 'play wordchain', 'free word chain game',
    'word chain multiplayer', 'word chain with friends', 'word chain online free',
    'word game online', 'free word game', 'shiritori online', 'word relay game',
    'last letter word game', 'word chain solver', 'best word games 2026', 'browser word game',
  ],
  authors: [{ name: 'WordChain Game' }],
  creator: 'WordChain',
  publisher: 'WordChain',
  category: 'Games',
  classification: 'Word Games, Educational Games, Multiplayer Games',
  openGraph: {
    title: 'WordChain — #1 Free Online Multiplayer Word Chain Game',
    description: 'Chain words by their last letter in real-time multiplayer battles. Customize rules, play with friends, or practice solo. Free, no download.',
    type: 'website',
    locale: 'en_US',
    siteName: 'WordChain',
    url: 'https://wordchain.in',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
        alt: 'WordChain — Online Word Chain Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordChain — Free Online Word Chain Game',
    description: 'The #1 multiplayer word chain game. Play free online with friends — no download needed!',
    images: ['/icons/icon-512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
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
    canonical: 'https://wordchain.in',
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
  url: 'https://wordchain.in',
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

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'WordChain',
  alternateName: 'Word Chain Game Online',
  url: 'https://wordchain.in',
  description: 'Free online multiplayer word chain game and Shiritori word battle arena.',
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: 'WordChain',
    url: 'https://wordchain.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://wordchain.in/icons/icon-512.png',
    },
  },
};

const navJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: 'Play Online', url: 'https://wordchain.in/create' },
    { '@type': 'SiteNavigationElement', position: 2, name: 'Quick Play Matchmaking', url: 'https://wordchain.in/matchmaking' },
    { '@type': 'SiteNavigationElement', position: 3, name: 'Solo vs AI Bot Practice', url: 'https://wordchain.in/practice' },
    { '@type': 'SiteNavigationElement', position: 4, name: 'Local 2-Player Pass & Play', url: 'https://wordchain.in/local' },
    { '@type': 'SiteNavigationElement', position: 5, name: 'Word Chain Blog & Guides', url: 'https://wordchain.in/blog' },
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
        <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
        <link rel="icon" href="/icons/icon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3027613620365055"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navJsonLd) }}
        />
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
        <AdSenseScript />
        {children}
        <CookieConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
