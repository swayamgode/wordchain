import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Play Matchmaking — Play Word Chain Online 1v1 | WordChain',
  description:
    'Join real-time 1v1 WordChain matchmaking. Get paired with an online opponent in seconds for high-speed blitz word chain battles. Free, no download.',
  alternates: {
    canonical: 'https://wordchain.in/matchmaking',
  },
  openGraph: {
    title: 'Quick Play Matchmaking — Play Word Chain Online 1v1',
    description: 'Find online opponents instantly for fast-paced word chain duels.',
    url: 'https://wordchain.in/matchmaking',
    type: 'website',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'WordChain Quick Matchmaking' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Play Matchmaking — WordChain Online',
    description: 'Fast-paced 1v1 word chain matchmaking. Free online multiplayer.',
    images: ['/icons/icon-512.png'],
  },
};

export default function MatchmakingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
