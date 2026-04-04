import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  category: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqSection[] = [
  {
    category: 'Product',
    items: [
      {
        q: 'Will your curlers work on my hair type?',
        a: 'Our silk curlers are designed for all hair types — straight, wavy, curly, and coily. If your hair is straight or wavy, you will get beautifully defined curls and waves. If your hair is naturally curly or coily, the curlers help smooth and refine your curl pattern while reducing frizz. We recommend leaving them in for at least 4 hours, or overnight, for the best results.',
      },
      {
        q: 'What is included in the Heatless Curling Ribbon set?',
        a: 'Each Heatless Curling Ribbon ($38) comes with one 100% Mulberry Silk curling ribbon, a matching silk scrunchie, and a step-by-step styling instruction card. Everything you need to get started is in the box.',
      },
      {
        q: 'How long should I leave the curlers in?',
        a: 'For the most defined, long-lasting curls, we recommend overnight wear (6–8 hours). A minimum of 4 hours works well for most hair types. Fine hair may set in as little as 3 hours, while thick or coarse hair benefits from the full overnight duration. There is no risk of leaving them in too long — silk is completely gentle on your hair.',
      },
      {
        q: 'Why silk instead of satin?',
        a: 'Silk is a natural protein fiber, while satin is typically a synthetic weave made from polyester. Silk naturally reduces friction and static, retains your hair\'s moisture, and is highly breathable for comfortable overnight wear. It is also hypoallergenic and more durable than satin. All LUME products use 100% Mulberry Silk — the highest grade available.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'Domestic (US): 3–5 business days for standard shipping, or 1–2 business days for express. International: 7–14 business days depending on your destination.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all domestic US orders over $50.',
      },
      {
        q: 'How do I track my order?',
        a: 'A tracking link is emailed to you as soon as your order ships. If you do not see it in your inbox, check your spam or promotions folder. If you still cannot find it, reach out to us at hello@organiclume.com and we will get you sorted.',
      },
    ],
  },
  {
    category: 'Returns',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day satisfaction guarantee. If you are not completely happy with your purchase, you can return it within 30 days of delivery for a full refund. Items should be in their original packaging — gently tried products are absolutely eligible. We want you to love your curlers.',
      },
      {
        q: 'How do I start a return?',
        a: 'Email us at hello@organiclume.com or use the "Start a Return" form on our website. Include your order number and reason for the return. We will send you a prepaid return label within one business day. Pack the item securely and drop it off at the carrier location. Refunds are processed within 5–7 business days after we receive the item, back to your original payment method.',
      },
      {
        q: 'I received a damaged or defective item. What should I do?',
        a: 'Contact us within 48 hours of delivery with photos of the damage. We will send a free replacement right away — no return required.',
      },
    ],
  },
  {
    category: 'Care',
    items: [
      {
        q: 'How do I wash my silk curlers?',
        a: 'Hand wash in lukewarm water with a gentle detergent, then lay flat to air dry. Avoid machine washing, bleach, and tumble drying. Light leave-in conditioners and water-based mists are fine to use with the curlers, but avoid heavy oils or gels that could stain the silk. With proper care, your curlers will last 6–12 months.',
      },
      {
        q: 'How do I care for my silk pillowcase?',
        a: 'Machine wash on the delicate cycle in cold water inside a mesh laundry bag. Use a silk-safe or gentle detergent — no bleach or fabric softener. Tumble dry on low or hang to air dry. Iron on the silk setting if needed. Your pillowcase will last 1–2 years with proper care.',
      },
    ],
  },
  {
    category: 'About LUME',
    items: [
      {
        q: "What is LUME's mission?",
        a: 'LUME is a minimalist beauty brand on a mission to make effortless, hair-safe styling accessible to everyone. We believe gorgeous curls should not come at the cost of heat damage. Every product we make is designed around one idea: beautiful results with zero compromise.',
      },
      {
        q: 'Are your products cruelty-free and sustainable?',
        a: 'Yes. All LUME products are cruelty-free and vegan. Our silk is ethically sourced and OEKO-TEX certified, meaning it has been tested for harmful substances and meets strict environmental standards. We are committed to responsible sourcing and sustainable packaging.',
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--accent-cream)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-sage)',
            fontSize: '1.25rem',
            fontWeight: 300,
            lineHeight: 1,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '1.25rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                fontSize: '1rem',
                margin: 0,
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = 'FAQ — Organic Lume';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Answers to common questions about LUME silk hair curlers — product details, shipping, returns, care instructions, and more.';
  }, []);

  function toggle(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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
            <Link to="/about" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>About</Link>
            <Link to="/faq" style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>FAQ</Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Support
            </p>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
            <p style={{ maxWidth: '520px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Everything you need to know about LUME silk curlers, shipping, returns, and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section style={{ padding: '0 5% 6rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {FAQ_DATA.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: si * 0.05 }}
              style={{ marginBottom: '3rem' }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--accent-sage)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--accent-sage)',
                }}
              >
                {section.category}
              </h2>
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                return (
                  <AccordionItem
                    key={key}
                    item={item}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </motion.div>
          ))}

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '2rem',
              padding: '3rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '24px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Still have questions?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Our team is happy to help. Reach out and we'll get back to you quickly.
            </p>
            <a
              href="mailto:hello@organiclume.com"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--accent-sage)',
                color: '#fff',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              hello@organiclume.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1.5rem' }}>Terms</Link>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy</Link>
          </p>
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>
    </div>
  );
}
