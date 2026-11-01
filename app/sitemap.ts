import type { MetadataRoute } from 'next';
import { getPostSitemapEntries } from '../lib/posts';

const BASE_URL = 'https://wordchain.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/create`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/matchmaking`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/practice`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/local`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/how-to-play`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rules`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/color-clash`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/color-clash/create`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/color-clash/practice`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/color-clash/local`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // Dynamic automatic blog sitemap entries from our unified registry
  const blogPages: MetadataRoute.Sitemap = getPostSitemapEntries(BASE_URL);

  return [...staticPages, ...blogPages];
}
