import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solo Practice Mode — Play Word Chain vs AI Bot | WordChain',
  description:
    'Play WordChain solo against intelligent AI bots. Train vocabulary, hone offensive last-letter strategies, and practice under blitz timers without waiting for opponents.',
  alternates: {
    canonical: 'https://wordchain.in/practice',
  },
  openGraph: {
    title: 'Solo Practice Mode — Play Word Chain vs AI Bot',
    description: 'Sharpen your word chain skills solo against smart AI bots. Free instant browser play.',
    url: 'https://wordchain.in/practice',
    type: 'website',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'WordChain Solo Practice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Practice Mode — Play Word Chain vs AI Bot',
    description: 'Play WordChain solo against intelligent AI bots.',
    images: ['/icons/icon-512.png'],
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
