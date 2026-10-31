import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/room/', '/color-clash/room/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/room/', '/color-clash/room/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/room/', '/color-clash/room/'],
      },
    ],
    sitemap: 'https://wordchain.in/sitemap.xml',
    host: 'https://wordchain.in',
  };
}
