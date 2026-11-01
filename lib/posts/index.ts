import { posts as basePosts } from '../../app/blog/[slug]/page';
import { additionalPosts, type BlogContent } from './additionalPosts';

// Export type definition
export type { BlogContent };

// Registry combining all blog posts
export const allPosts: Record<string, BlogContent> = {
  ...basePosts,
  ...additionalPosts,
};

// Helper: Get post by slug
export function getPostBySlug(slug: string): BlogContent | undefined {
  return allPosts[slug];
}

// Helper: Get all post slugs
export function getAllPostSlugs(): string[] {
  return Object.keys(allPosts);
}

// Helper: Get all posts sorted by date (newest first)
export function getAllPostsSorted(): Array<BlogContent & { slug: string }> {
  return Object.entries(allPosts)
    .map(([slug, post]) => ({
      ...post,
      slug,
      excerpt: post.excerpt || post.description,
      category: post.category || 'Word Strategy',
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper: Format sitemap entries automatically
export function getPostSitemapEntries(baseUrl = 'https://wordchain.in') {
  return Object.entries(allPosts).map(([slug, post]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.9 : 0.8,
  }));
}
