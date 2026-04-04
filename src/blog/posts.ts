import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  date: string;
  author: string;
  featuredImage: string;
  excerpt: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Import all markdown files as raw strings via Vite
const rawFiles = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parsePost(raw: string): Post {
  const { data, content } = matter(raw);
  return {
    title: data.title ?? '',
    date: data.date ?? '',
    author: data.author ?? '',
    featuredImage: data.featuredImage ?? '',
    excerpt: data.excerpt ?? '',
    slug: data.slug ?? '',
    content,
  };
}

export const allPosts: Post[] = Object.values(rawFiles)
  .map(parsePost)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
