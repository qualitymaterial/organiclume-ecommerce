import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { getPostBySlug, formatDate } from './posts';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — LUME Journal`;
    let descMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = post.excerpt;

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = post.title;

    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = post.excerpt;

    let ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.content = post.featuredImage;
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const html = marked(post.content) as string;

  return (
    <div className="lume-app">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: '2rem 0', textAlign: 'center', borderBottom: '1px solid var(--accent-cream)' }}
      >
        <div className="container">
          <Link to="/" style={{ display: 'inline-block' }}>
            <img src="/logo.png" alt="LUME Logo" style={{ width: '100px' }} />
          </Link>
          <nav style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Home</Link>
            <Link to="/blog" style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Journal</Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', aspectRatio: '21/7', overflow: 'hidden' }}
      >
        <img
          src={post.featuredImage}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* Article */}
      <article style={{ padding: '5rem 5%' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          {/* Byline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '2rem' }}
          >
            <Link
              to="/blog"
              style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}
            >
              ← Journal
            </Link>
            <h1 style={{ marginTop: '1.25rem', marginBottom: '1rem', fontSize: '2.75rem', lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      {/* CTA */}
      <motion.section
        className="section"
        style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '4rem', paddingBottom: '4rem' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Try it for yourself.</h2>
          <p style={{ marginBottom: '2rem' }}>LUME is launching soon. Join the waitlist to be first in line.</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.span
              className="button"
              style={{ display: 'inline-block', padding: '0.875rem 2rem', cursor: 'pointer' }}
              whileHover={{ scale: 1.02, backgroundColor: '#8a9681' }}
              whileTap={{ scale: 0.98 }}
            >
              Join the Waitlist
            </motion.span>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>
    </div>
  );
}
