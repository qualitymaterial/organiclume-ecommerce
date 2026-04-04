import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import product from './assets/product.png';
import { WaitlistForm } from './WaitlistForm';
import { CountdownTimer } from './CountdownTimer';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const TESTIMONIALS = [
  {
    quote: 'I was skeptical about heatless curls until I tried LUME. It\'s actually comfortable to sleep in and the results are better than my wand.',
    name: 'Sarah K.',
    handle: '@sarahkbeauty',
    stars: 5,
  },
  {
    quote: 'Finally something that actually works on thick hair. My curls last all day and I\'ve noticed way less breakage since switching.',
    name: 'Maya R.',
    handle: '@mayaroutine',
    stars: 5,
  },
  {
    quote: 'The silk feels so luxurious and it doesn\'t tangle. I\'ve tried four other heatless curl brands — LUME is the only one I\'ll repurchase.',
    name: 'Jess T.',
    handle: '@jesst_glam',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#c8a96a', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

export function ProductPage() {
  return (
    <div className="lume-app">
      {/* Nav */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ padding: '1.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              LUME
            </span>
          </Link>
          <Link
            to="/"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <img
              src={product}
              alt="LUME Silk Heatless Curler Set — Sage"
              style={{
                width: '100%',
                borderRadius: '28px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.07)',
              }}
            />
          </motion.div>

          {/* Hero copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ textAlign: 'left' }}
          >
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-sage)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Coming Soon
            </motion.p>
            <motion.h1 variants={fadeInUp} style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>
              LUME Silk Heatless Curler Set
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              Premium mulberry silk curlers that work while you sleep. No heat, no damage — just
              effortless, salon-quality curls every morning.
            </motion.p>

            {/* Countdown */}
            <motion.div variants={fadeInUp} style={{ marginBottom: '2.5rem' }}>
              <CountdownTimer />
            </motion.div>

            {/* Waitlist */}
            <motion.div variants={fadeInUp}>
              <p
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Join the waitlist for early access
              </p>
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <motion.section
        className="section"
        style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '5rem', paddingBottom: '5rem' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp} style={{ marginBottom: '1rem' }}>
            Why LUME?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ maxWidth: '520px', margin: '0 auto 3.5rem', color: 'var(--text-secondary)' }}>
            Everything your hair needs. Nothing it doesn't.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              {
                icon: '🌿',
                title: '100% Damage-Free',
                body: 'Premium mulberry silk prevents frizz and breakage — every single night.',
              },
              {
                icon: '⏱️',
                title: 'Save 30 Min Every Morning',
                body: 'Style while you sleep. Wake up, shake out, and go.',
              },
              {
                icon: '✨',
                title: 'Salon Results at Home',
                body: 'Big, bouncy, long-lasting curls without the professional price tag.',
              },
            ].map((card) => (
              <motion.div key={card.title} className="benefit-card" variants={fadeInUp}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works — 3-step process */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.h2 variants={fadeInUp} style={{ marginBottom: '0.75rem' }}>
            How it works
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ marginBottom: '3.5rem', color: 'var(--text-secondary)' }}>
            Three steps. Zero heat. Perfect curls.
          </motion.p>

          <div>
            {[
              {
                step: '01',
                title: 'Prep',
                body: 'Place the curler on top of slightly damp hair before bed.',
              },
              {
                step: '02',
                title: 'Wrap',
                body: 'Wrap small sections of hair around the silk rod and secure with the included LUME scrunchies.',
              },
              {
                step: '03',
                title: 'Sleep',
                body: 'Go to sleep. In the morning, gently remove the rod to reveal perfect, bouncy curls.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  textAlign: 'left',
                  paddingBottom: i < 2 ? '2.5rem' : 0,
                  marginBottom: i < 2 ? '2.5rem' : 0,
                  borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--accent-sage)',
                    fontFamily: 'var(--font-serif)',
                    minWidth: '2.5rem',
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social Proof — Testimonials */}
      <motion.section
        className="section"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp} style={{ marginBottom: '0.75rem' }}>
            What early testers are saying
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            style={{ maxWidth: '500px', margin: '0 auto 3.5rem', color: 'var(--text-secondary)' }}
          >
            Real results from real people — before we even launched.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'left',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <StarRating count={t.stars} />
                <p
                  style={{
                    fontSize: '0.975rem',
                    lineHeight: 1.75,
                    color: 'var(--text-primary)',
                    margin: '0 0 1.5rem',
                    fontStyle: 'italic',
                  }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {t.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-sage)' }}>{t.handle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social proof badges */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginTop: '4rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { stat: '2,400+', label: 'Waitlist sign-ups' },
              { stat: '4.9 / 5', label: 'Average tester rating' },
              { stat: '100%', label: 'Would recommend' },
            ].map((b) => (
              <div key={b.label} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.25rem',
                    color: 'var(--text-primary)',
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {b.stat}
                </p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {b.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom CTA — waitlist repeat */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Be first when we launch.</h2>
          <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
            Waitlist members get early access and an exclusive launch discount. No spam, ever.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WaitlistForm />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>© 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
          <Link to="/" style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', textDecoration: 'none', letterSpacing: '0.05em' }}>
            ← Home
          </Link>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section .container { grid-template-columns: 1fr !important; gap: 2rem !important; }
          h1 { font-size: 2.25rem !important; }
        }
      `}</style>
    </div>
  );
}
