import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WordChain — Think Fast. Chain Words. Real-Time Multiplayer Word Game',
  description:
    'WordChain is a competitive real-time multiplayer word battler. Chain words by their final letters, configure custom lengths, turn timers, and lives. Play with friends or practice vs bots.',
  keywords: ['word game', 'multiplayer word game', 'word chain', 'shiritori', 'vocabulary game', 'real-time game'],
  authors: [{ name: 'WordChain Game Systems' }],
  openGraph: {
    title: 'WordChain — Think Fast. Chain Words.',
    description: 'Competitive real-time multiplayer word game. Connect words by their final letters before time runs out!',
    type: 'website',
    locale: 'en_US',
    siteName: 'WordChain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordChain — Think Fast. Chain Words.',
    description: 'Competitive real-time multiplayer word game with customizable rules, turn timers, and monster mascots.',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WordChain',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFC928',
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
      </head>
      <body className="min-h-full flex flex-col selection:bg-[#FFC928] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}
