import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solo RGB Color Practice vs AI Bots — Color Clash',
  description: 'Practice your color matching skills solo against AI bots. Move RGB sliders to match hues and see your precision percentage instantly.',
  alternates: {
    canonical: 'https://wordchain.in/color-clash/practice',
  },
};

export default function PracticeColorClashLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

