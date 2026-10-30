import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Room — Custom Multiplayer Word Chain Game | WordChain',
  description:
    'Create a private or public WordChain room. Customize turn timers, lives, dictionary presets, word lengths, and invite friends with an instant room code.',
  alternates: {
    canonical: 'https://wordchain.in/create',
  },
  openGraph: {
    title: 'Create WordChain Room — Play with Friends',
    description: 'Host custom word chain matches with customized rules and timers. Free, no download.',
    url: 'https://wordchain.in/create',
    type: 'website',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'Create WordChain Room' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Room — Custom Multiplayer Word Chain Game',
    description: 'Host custom word chain matches with friends online.',
    images: ['/icons/icon-512.png'],
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
