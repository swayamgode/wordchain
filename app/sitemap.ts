import type { MetadataRoute } from 'next';

const BASE_URL = 'https://wordchain.in';

const blogPostData: Record<string, string> = {
  'word-chain-game-online-free': '2026-03-15',
  'word-chain-words-a-to-z-dictionary': '2026-03-14',
  'shiritori-word-chain-generator-solver': '2026-03-12',
  'games-to-play-when-bored': '2026-03-10',
  'word-chain-game-for-classroom-students': '2026-03-09',
  'games-to-play-with-friends-online': '2026-03-08',
  'word-ladder-vs-word-chain': '2026-03-07',
  'quick-games-to-play-online': '2026-03-05',
  'hard-letters-word-chain-q-x-z-j': '2025-10-18',
  'word-chain-rules-variations': '2025-10-17',
  'best-word-chain-words': '2025-10-16',
  'what-is-word-chain-game': '2025-10-15',
  'word-chain-solver-tips': '2025-10-14',
  'word-chain-strategies-to-win': '2025-10-12',
  'best-online-word-games-2025': '2025-10-10',
  'shiritori-vs-word-chain': '2025-10-08',
  'vocabulary-building-word-games': '2025-10-05',
  'multiplayer-word-games-with-friends': '2025-10-01',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/create`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/matchmaking`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/practice`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/local`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = Object.entries(blogPostData).map(
    ([slug, date]) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(date),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  );

  return [...staticPages, ...blogPages];
}
