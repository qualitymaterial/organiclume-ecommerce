import './index.css';
import logo from './assets/logo.png';
import product from './assets/product.png';
import lifestyle1 from '/marketing/lifestyle_1.png';
import lifestyle2 from '/marketing/lifestyle_2.png';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  return (
    <div className="lume-app">
      {/* Header / Nav */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: '2rem 0', textAlign: 'center' }}
      >
        <div className="container">
          <img src={logo} alt="LUME Logo" style={{ width: '120px', marginBottom: '1rem' }} />
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            className="hero-content" 
            style={{ textAlign: 'left' }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp}>
              Wake up to the hair of your dreams—without the heat damage.
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ margin: '1.5rem 0 2rem' }}>
              Get salon-quality curls while you sleep. No heat, no damage, just effortless style.
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <motion.a 
                href="#buy" 
                className="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get My LUME Set
              </motion.a>
              <span style={{ fontSize: '0.875rem', color: '#8a9681', fontWeight: 500 }}>
                Join 5,000+ happy women
              </span>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={product} alt="LUME Sage Curler Set" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <motion.section 
        className="section" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp} style={{ marginBottom: '4rem' }}>Your morning routine shouldn't start with a burn.</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <motion.div className="benefit-card" variants={fadeInUp}>
              <h3>100% Damage-Free</h3>
              <p>Made with premium mulberry silk to prevent frizz and breakage.</p>
            </motion.div>
            <motion.div className="benefit-card" variants={fadeInUp}>
              <h3>Save 30m Every Morning</h3>
              <p>Style while you sleep. Wake up, shake out, and go.</p>
            </motion.div>
            <motion.div className="benefit-card" variants={fadeInUp}>
              <h3>Salon Results at Home</h3>
              <p>Big, bouncy, long-lasting curls without the professional price tag.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '3rem' }}>Beauty sleep, redefined.</h2>
          <div className="steps" style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--accent-sage)' }}>01</span>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Prep</h3>
                <p>Place the curler on top of slightly damp hair.</p>
              </div>
            </div>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--accent-sage)' }}>02</span>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Wrap</h3>
                <p>Wrap small sections of hair around the rod and secure with LUME scrunchies.</p>
              </div>
            </div>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--accent-sage)' }}>03</span>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Sleep</h3>
                <p>Go to bed! In the morning, remove the rod to reveal perfect, bouncy curls.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Lifestyle / Experience Section */}
      <motion.section 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>The LUME Experience</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 4rem', color: 'var(--text-secondary)' }}>
            Elevate your nightly ritual with the soft touch of mulberry silk. Wake up refreshed, styled, and ready for whatever the day brings.
          </p>
          
          <div className="gallery">
            <div className="gallery-item">
              <img src={lifestyle1} alt="LUME Morning Routine" />
            </div>
            <div className="gallery-item" style={{ display: 'grid', gridTemplateRows: '1fr', gap: '1.5rem' }}>
              <div className="gallery-item" style={{ backgroundColor: 'var(--accent-sage)', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                <p style={{ fontSize: '1.5rem', fontFamily: 'inherit', fontWeight: 500, lineHeight: 1.4 }}>
                  "I was skeptical about heatless curls until I tried LUME. It's actually comfortable to sleep in and the results are better than my wand."
                </p>
                <cite style={{ marginTop: '2rem', fontStyle: 'normal', fontWeight: 600, opacity: 0.8 }}>— Sarah K., Verified Buyer</cite>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sustainability Section */}
      <motion.section 
        className="section"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <div className="feature-grid" style={{ gridTemplateColumns: 'minmax(400px, 1fr) 1fr', textAlign: 'left', alignItems: 'center' }}>
            <motion.div 
              style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src={lifestyle2} alt="LUME Sustainable Packaging" style={{ width: '100%', display: 'block' }} />
            </motion.div>
            <div style={{ paddingLeft: '2rem' }}>
              <span style={{ color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Our Ethics</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Sustainable Luxury</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                We believe beauty shouldn't cost the earth. Every LUME set arrives in plastic-free, recyclable packaging. From our raw cardboard boxes to our reusable silk pouches, we're committed to a cleaner planet and healthier hair.
              </p>
              <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-sage)' }}>✓</span> 100% Recyclable Packaging
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-sage)' }}>✓</span> Carbon Neutral Shipping
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-sage)' }}>✓</span> OEKO-TEX® Certified Silk
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Trust / FAQ Section */}
      <section className="section" id="buy" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Effortless curls are one sleep away.</h2>
            <p style={{ margin: '1rem 0 2rem' }}>Ready to ditch the heat? Get your LUME set today.</p>
            <div style={{ padding: '3rem', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
               <h3 style={{ marginBottom: '1rem' }}>LUME Heatless Set (Sage)</h3>
               <p style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>In Stock • Ships in 24 Hours</p>
               <p style={{ fontSize: '2.5rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2rem' }}>$19.99</p>
               <motion.button 
                 className="button" 
                 style={{ width: '100%', fontSize: '1rem', padding: '1.25rem' }}
                 whileHover={{ scale: 1.02, backgroundColor: '#8a9681' }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => window.open('https://buy.stripe.com/mock_lume_set', '_blank')}
               >
                 Secure Checkout
               </motion.button>
               <p style={{ fontSize: '0.75rem', marginTop: '1.5rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                 Guaranteed Safe Checkout by Stripe
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 0', borderTop: '1px solid #ddd' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>

      {/* Simple responsive adjustments for demo */}
      <style>{`
        @media (max-width: 768px) {
          section .container { grid-template-columns: 1fr !important; gap: 2rem !important; }
          h1 { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
