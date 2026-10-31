import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Color Clash Match — Host Multiplayer RGB Room',
  description: 'Create a private Color Clash multiplayer room. Customize round timer and total rounds, then invite friends with a 6-letter room code.',
  alternates: {
    canonical: 'https://wordchain.in/color-clash/create',
  },
};

export default function CreateColorClashLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

