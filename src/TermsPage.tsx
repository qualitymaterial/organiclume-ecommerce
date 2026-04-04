import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service — Organic Lume';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = 'Terms of Service for Organic Lume (organiclume.com). Effective April 4, 2026.';
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
            <Link to="/about" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>About</Link>
            <Link to="/faq" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>FAQ</Link>
          </nav>
        </div>
      </motion.header>

      {/* Content */}
      <article style={{ padding: '5rem 5% 6rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Legal
            </p>
            <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Terms of Service</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Effective Date: April 4, 2026 &nbsp;·&nbsp; Last Updated: April 4, 2026
            </p>

            <div className="legal-body">
              <p>
                Welcome to Organic Lume ("LUME," "we," "us," or "our"). By accessing or using our website at organiclume.com (the "Site") or purchasing our products, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully before placing an order.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By visiting the Site, creating an account, or placing an order, you confirm that you are at least 18 years of age (or the age of majority in your jurisdiction) and agree to these Terms in full. If you do not agree, please do not use the Site.
              </p>
              <p>
                We reserve the right to update these Terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised Terms. The most current version will always be posted at organiclume.com/terms.
              </p>

              <h2>2. Order Acceptance</h2>
              <p>
                Placing an order on organiclume.com constitutes an offer to purchase. We reserve the right to accept or decline any order at our sole discretion, including but not limited to cases involving:
              </p>
              <ul>
                <li>Product unavailability or stock limitations</li>
                <li>Errors in product descriptions or pricing</li>
                <li>Suspected fraudulent activity</li>
                <li>Incomplete or inaccurate order information</li>
              </ul>
              <p>
                Your order is confirmed when you receive an order confirmation email from us. Until that confirmation is sent, no contract of sale exists between you and LUME.
              </p>

              <h2>3. Pricing</h2>
              <p>All prices displayed on the Site are in U.S. Dollars (USD) unless otherwise stated. Prices are subject to change without notice.</p>
              <ul>
                <li><strong>Taxes:</strong> Applicable sales tax will be calculated and displayed at checkout based on your shipping address.</li>
                <li><strong>Currency:</strong> If you are purchasing from outside the United States, your bank or payment provider may apply currency conversion fees. LUME is not responsible for these charges.</li>
                <li><strong>Promotions:</strong> Discount codes and promotional pricing apply only to eligible products and cannot be combined unless explicitly stated. Promotions are valid for a limited time and may be withdrawn at any time.</li>
                <li><strong>Errors:</strong> In the event of a pricing error, we will notify you before processing your order and give you the option to proceed at the correct price or cancel.</li>
              </ul>

              <h2>4. Shipping</h2>
              <p>We ship to addresses within the United States and select international destinations.</p>
              <ul>
                <li><strong>Processing Time:</strong> Orders are typically processed within 1–3 business days of receipt.</li>
                <li><strong>Estimated Delivery:</strong> Shipping timeframes are estimates only and are not guaranteed. LUME is not liable for carrier delays, weather events, or circumstances beyond our control.</li>
                <li><strong>Shipping Costs:</strong> Calculated at checkout based on destination and selected shipping method. Free shipping thresholds, when applicable, will be displayed on the Site.</li>
                <li><strong>International Orders:</strong> Customers are responsible for any import duties, customs fees, or taxes imposed by their country. LUME cannot predict or control these charges.</li>
                <li><strong>Lost or Damaged Packages:</strong> If your order arrives damaged or does not arrive within the estimated window, contact us at hello@organiclume.com and we will work with the carrier to resolve the issue.</li>
              </ul>

              <h2>5. Returns &amp; Refunds</h2>
              <p>We want you to love your LUME products. If you are not fully satisfied, we offer the following return policy:</p>
              <ul>
                <li><strong>Return Window:</strong> Returns are accepted within 30 days of delivery.</li>
                <li><strong>Condition:</strong> Items must be unused, in original packaging, and in resalable condition.</li>
                <li><strong>Non-Returnable Items:</strong> Final sale items, gift cards, and opened personal care products are not eligible for return.</li>
                <li><strong>Process:</strong> To initiate a return, email hello@organiclume.com with your order number and reason for return. We will provide a return authorization and instructions.</li>
                <li><strong>Refunds:</strong> Once we receive and inspect your return, refunds will be issued to the original payment method within 5–10 business days. Original shipping charges are non-refundable unless the return is due to our error or a defective product.</li>
                <li><strong>Exchanges:</strong> We do not process direct exchanges. Please return the original item and place a new order.</li>
              </ul>

              <h2>6. Intellectual Property</h2>
              <p>
                All content on organiclume.com — including but not limited to text, images, graphics, logos, product photography, video, and brand elements — is the exclusive property of Organic Lume or its licensors and is protected by U.S. and international copyright, trademark, and other intellectual property laws.
              </p>
              <p>You may not:</p>
              <ul>
                <li>Copy, reproduce, modify, or distribute any content without our express written permission</li>
                <li>Use our trademarks, logos, or brand assets in any commercial context</li>
                <li>Scrape, crawl, or otherwise extract Site content using automated tools</li>
              </ul>
              <p>Personal, non-commercial use of Site content (e.g., sharing a product image on your personal social media) is permitted provided attribution to LUME is included and no content is altered.</p>

              <h2>7. User Accounts</h2>
              <p>If you create an account on our Site:</p>
              <ul>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You agree to provide accurate and current information.</li>
                <li>You must notify us immediately at hello@organiclume.com of any unauthorized use of your account.</li>
                <li>We reserve the right to terminate accounts that violate these Terms.</li>
              </ul>

              <h2>8. Prohibited Conduct</h2>
              <p>When using the Site, you agree not to:</p>
              <ul>
                <li>Engage in fraudulent, deceptive, or harmful activity</li>
                <li>Submit false or misleading information</li>
                <li>Attempt to gain unauthorized access to any part of the Site</li>
                <li>Use the Site for any unlawful purpose</li>
                <li>Post or transmit spam, malware, or harmful content</li>
              </ul>

              <h2>9. Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites for your convenience. LUME does not endorse, control, or assume responsibility for the content or practices of any third-party sites. Accessing third-party links is at your own risk.
              </p>

              <h2>10. Disclaimer of Warranties</h2>
              <p>
                The Site and all products and services are provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

              <h2>11. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Organic Lume, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, loss of profits, revenue, data, or goodwill, or damages arising from your use of or inability to use the Site or our products.
              </p>
              <p>
                Our total liability to you for any claim shall not exceed the greater of <strong>(a) the amount paid by you for the order giving rise to the claim</strong>, or <strong>(b) $50 USD</strong>.
              </p>

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Organic Lume and its affiliates, officers, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or related to your violation of these Terms or your use of the Site.
              </p>

              <h2>13. Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the <strong>State of California</strong>, without regard to its conflict of law principles. Any dispute shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the <strong>American Arbitration Association (AAA)</strong> Consumer Arbitration Rules in Los Angeles County, California. You waive any right to participate in a class action lawsuit or class-wide arbitration.
              </p>

              <h2>14. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.
              </p>

              <h2>15. Contact Us</h2>
              <p>
                For questions about these Terms, please contact:<br />
                <strong>Organic Lume</strong><br />
                Email: <a href="mailto:hello@organiclume.com" style={{ color: 'var(--accent-sage)' }}>hello@organiclume.com</a><br />
                Website: organiclume.com
              </p>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1.5rem' }}>Privacy Policy</Link>
            <Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link>
          </p>
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>
    </div>
  );
}
