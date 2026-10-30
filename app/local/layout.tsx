import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pass & Play Local Mode — 2 Player Word Chain Game | WordChain',
  description:
    'Play WordChain with friends on a single device in pass and play mode. Great for parties, classrooms, travel, and local multiplayer word challenges.',
  alternates: {
    canonical: 'https://wordchain.in/local',
  },
  openGraph: {
    title: 'Pass & Play Local Mode — 2 Player Word Chain',
    description: 'Play local 2-player word chain on one device. Perfect for parties and travel.',
    url: 'https://wordchain.in/local',
    type: 'website',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'WordChain Local Pass & Play' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pass & Play Local Mode — 2 Player Word Chain',
    description: 'Play local 2-player word chain on one device.',
    images: ['/icons/icon-512.png'],
  },
};

export default function LocalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
