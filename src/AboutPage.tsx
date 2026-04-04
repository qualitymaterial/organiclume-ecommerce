import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function AboutPage() {
  useEffect(() => {
    document.title = 'About Us — Organic Lume';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Organic Lume is a minimalist beauty brand built on the belief that your healthiest hair is your most beautiful hair. Learn about our mission, materials, and values.';
  }, []);

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
          <nav style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Home</Link>
            <Link to="/blog" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Journal</Link>
            <Link to="/about" style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>About</Link>
            <Link to="/faq" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>FAQ</Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeInUp}
              style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}
            >
              Our Story
            </motion.p>
            <motion.h1 variants={fadeInUp} style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              Some things are worth doing differently.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Body content */}
      <article style={{ padding: '0 5% 6rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="about-body"
          >
            {/* Section 1 */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>A Different Way of Thinking About Hair</h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Most of the beauty industry is built around one idea: more power, more heat, more results.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                We started from a different place. What if the most beautiful results came from the gentlest approach? What if the best thing you could do for your hair was also the simplest — something that worked quietly, while you slept, with no heat and no compromise?
              </p>
              <p style={{ lineHeight: 1.85 }}>
                That question led us to silk. And to a completely different philosophy about what hair care can be.
              </p>
            </section>

            {/* Section 2 */}
            <section style={{ marginBottom: '4rem', padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>Why Silk Changes Everything</h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Not silk in the general sense — specifically, 22 momme 6A Mulberry silk. The highest grade available. The material at the heart of everything Organic Lume makes.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Mulberry silk is produced by silkworms raised on a controlled diet of white mulberry leaves, yielding fibers that are remarkably uniform, naturally smooth, and incredibly strong. At 22 momme, our silk carries the weight and density of true luxury — the same grade found in the world's finest bedding.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                For your hair, the difference is real and measurable. Heat opens the hair cuticle, strips moisture, and causes cumulative damage over time. Silk does the opposite: it lets your hair glide rather than grip, preserves natural oils, and creates curls through gentle tension rather than forced compliance. You wrap, you sleep, you wake up. The style is there — effortless, because it actually was.
              </p>
              <p style={{ lineHeight: 1.85 }}>
                Every Organic Lume curler is OEKO-TEX Standard 100 certified. That means our silk has been independently tested and verified free from harmful substances. It's not a marketing claim — it's a standard we hold ourselves to because we believe what touches your hair every single night deserves the highest possible bar.
              </p>
            </section>

            {/* Section 3 — Values */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>What We Stand For</h2>
              <p style={{ lineHeight: 1.85, marginBottom: '2rem' }}>
                Organic Lume was built on three beliefs that don't compromise each other:
              </p>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  {
                    label: 'Sustainability',
                    body: 'Materials matter. We choose silk not just because it performs beautifully, but because it outlasts synthetic alternatives and comes from a more responsible source. Less waste. More intention.',
                  },
                  {
                    label: 'Effortless beauty',
                    body: 'The best styling should feel like almost no effort at all. Our products are designed to work while you rest — so your routine becomes simpler, not more complicated.',
                  },
                  {
                    label: 'Premium quality',
                    body: 'We don\'t cut corners on materials. 22 momme, 6A grade, OEKO-TEX certified. These aren\'t buzzwords. They\'re commitments we make before anything reaches your hands.',
                  },
                ].map(({ label, body }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-sage)',
                        marginTop: '0.6rem',
                      }}
                    />
                    <p style={{ lineHeight: 1.75, margin: 0 }}>
                      <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{label}. </strong>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 — Mission */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>Our Mission</h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                We exist to make one case, clearly and consistently: your healthiest hair is your most beautiful hair. Heat styling works against that. Silk styling works with it.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Organic Lume is for people who are done choosing between a great hair day and healthy hair. You shouldn't have to pick. Everything we make is designed so you never have to.
              </p>
              <p style={{ lineHeight: 1.85 }}>
                We're a small brand with a clear point of view. We make fewer things, and we make them well. We're not trying to be everything — just the best decision your hair has ever been part of.
              </p>
            </section>

            {/* Tagline closer */}
            <section
              style={{
                padding: '3rem',
                backgroundColor: 'var(--accent-sage)',
                borderRadius: '24px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                Less heat. Healthier hair. That's the Organic Lume way.
              </p>
            </section>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1.5rem' }}>Terms</Link>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1.5rem' }}>Privacy</Link>
            <Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link>
          </p>
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>
    </div>
  );
}
