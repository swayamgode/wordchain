import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Player Profile & Match Stats | WordChain',
  description:
    'View your WordChain player profile, lifetime win stats, longest word streaks, and select your custom monster doodle avatar.',
  alternates: {
    canonical: 'https://wordchain.in/profile',
  },
  openGraph: {
    title: 'WordChain Player Profile & Stats',
    description: 'Track your personal word chain stats, win streaks, and customize your avatar.',
    url: 'https://wordchain.in/profile',
    type: 'website',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'WordChain Profile' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordChain Player Profile & Stats',
    description: 'Track your personal word chain stats and win streaks.',
    images: ['/icons/icon-512.png'],
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
