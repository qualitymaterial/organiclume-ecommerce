import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allPosts, formatDate } from './posts';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function BlogList() {
  useEffect(() => {
    document.title = 'Journal — LUME Wellness';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Hair care tips, heatless styling guides, and beauty insights from the LUME team.';
  }, []);

  const [featured, ...rest] = allPosts;

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

      {/* Page title */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <p style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              The LUME Journal
            </p>
            <h1 style={{ fontSize: '3rem' }}>Hair care, decoded.</h1>
            <p style={{ maxWidth: '560px', margin: '1rem auto 0', color: 'var(--text-secondary)' }}>
              Tips, guides, and the science behind healthier hair—from the team behind LUME.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section style={{ padding: '0 5% 5rem' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '3rem',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                  <motion.img
                    src={featured.featuredImage}
                    alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div style={{ padding: '3rem 3rem 3rem 0' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    Featured
                  </p>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{featured.author}</span>
                    <span style={{ color: 'var(--accent-cream)' }}>·</span>
                    <span>{formatDate(featured.date)}</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* Remaining posts grid */}
      {rest.length > 0 && (
        <section style={{ padding: '0 5% 6rem' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}
            >
              {rest.map((post) => (
                <motion.article key={post.slug} variants={fadeInUp}>
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
                      <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                        <motion.img
                          src={post.featuredImage}
                          alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{post.excerpt}</p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {post.author} · {formatDate(post.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          article[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          article[style*="grid-template-columns: 1fr 1fr"] > div:last-child {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
