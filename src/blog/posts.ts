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

// Simple frontmatter parser (no Node.js dependencies)
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }
  return { data, content: match[2] };
}

function parsePost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw);
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
