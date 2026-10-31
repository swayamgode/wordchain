import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2-Player Pass & Play Color Match — Color Clash',
  description: 'Play a local 2-player color matching game on the same device. Secretly adjust your RGB sliders and reveal who matched the hue best.',
  alternates: {
    canonical: 'https://wordchain.in/color-clash/local',
  },
};

export default function LocalColorClashLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

