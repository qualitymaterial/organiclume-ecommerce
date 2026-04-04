import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Organic Lume';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = 'Privacy Policy for Organic Lume (organiclume.com). How we collect, use, and protect your personal information. Effective April 4, 2026.';
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
            <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Effective Date: April 4, 2026 &nbsp;·&nbsp; Last Updated: April 4, 2026
            </p>

            <div className="legal-body">
              <p>
                Organic Lume ("LUME," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your personal information when you visit organiclume.com (the "Site") or purchase our products. By using the Site, you agree to the practices described in this Privacy Policy.
              </p>

              <h2>1. Information We Collect</h2>

              <h3>1.1 Information You Provide Directly</h3>
              <p>When you create an account, place an order, subscribe to our email list, or contact us, we may collect:</p>
              <ul>
                <li>Name (first and last)</li>
                <li>Email address</li>
                <li>Shipping and billing address</li>
                <li>Phone number (optional)</li>
                <li>Payment information (processed securely via Stripe — we do not store full card numbers)</li>
                <li>Order history and preferences</li>
                <li>Communications you send us (support inquiries, reviews)</li>
              </ul>

              <h3>1.2 Information Collected Automatically</h3>
              <p>When you browse the Site, we automatically collect certain technical data:</p>
              <ul>
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited, time spent, and click patterns (via Google Analytics 4)</li>
                <li>Referral source (how you arrived at our Site)</li>
                <li>Cookie and session data</li>
              </ul>

              <h3>1.3 Information from Third Parties</h3>
              <p>We may receive information about you from:</p>
              <ul>
                <li><strong>Shopify</strong> — our e-commerce platform, which processes orders and account data</li>
                <li><strong>Stripe</strong> — our payment processor, which handles payment authorization and fraud detection</li>
                <li><strong>Klaviyo</strong> — our email marketing platform, which tracks email engagement (opens, clicks, conversions)</li>
                <li><strong>Google Analytics 4 (GA4)</strong> — analytics service that reports on Site traffic and user behavior</li>
                <li><strong>Meta and Pinterest</strong> — if you interact with our ads or social pages</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Fulfill and manage your orders — processing payments, arranging shipping, and sending order confirmations</li>
                <li>Provide customer support — responding to inquiries and resolving issues</li>
                <li>Send transactional emails — order confirmations, shipping notifications, and return updates</li>
                <li>Send marketing communications — promotional emails, product launches, and offers (with your consent, where required)</li>
                <li>Personalize your experience — showing relevant products, offers, and content</li>
                <li>Improve the Site — analyzing traffic patterns and user behavior via GA4 to enhance performance</li>
                <li>Prevent fraud and ensure security — detecting suspicious transactions and protecting your account</li>
                <li>Comply with legal obligations — meeting tax, accounting, and regulatory requirements</li>
              </ul>

              <h2>3. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience on the Site.</p>

              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-cream)' }}>Cookie Type</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-cream)' }}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Essential / Functional', 'Required for the Site to operate — shopping cart, login sessions, checkout'],
                      ['Analytics', 'Google Analytics 4 tracks page views, session data, and conversion events to help us understand Site usage'],
                      ['Marketing', 'Used to deliver targeted advertising on platforms like Meta and Pinterest; track ad campaign performance'],
                      ['Email Tracking', 'Klaviyo uses pixel tracking to measure email open rates and link click-throughs'],
                    ].map(([type, purpose], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--accent-cream)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{type}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect Site functionality.</p>

              <h2>4. How We Share Your Information</h2>
              <p>We do not sell your personal information. We share data only as necessary to operate our business:</p>
              <ul>
                <li><strong>Shopify</strong> — to power our storefront, process orders, and manage customer accounts</li>
                <li><strong>Stripe</strong> — to process payment transactions securely</li>
                <li><strong>Klaviyo</strong> — to send and track email communications</li>
                <li><strong>Google Analytics 4</strong> — to analyze website traffic (data is aggregated and anonymized where possible)</li>
                <li><strong>Shipping carriers</strong> (e.g., USPS, UPS, FedEx) — to fulfill and deliver your orders</li>
                <li><strong>Legal authorities</strong> — when required by law, court order, or to protect the rights and safety of LUME and its users</li>
                <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction</li>
              </ul>

              <h2>5. Email Marketing (Klaviyo)</h2>
              <p>We use <strong>Klaviyo</strong> to manage our email marketing programs, including welcome series, abandoned cart reminders, post-purchase follow-up sequences, and promotional campaigns.</p>
              <p><strong>Consent:</strong> You will only receive marketing emails if you have opted in.</p>
              <p><strong>Opt-out:</strong> You can unsubscribe at any time by clicking the "Unsubscribe" link in any of our emails, or by emailing hello@organiclume.com. Unsubscribing from marketing emails does not affect transactional emails related to your orders.</p>

              <h2>6. Your Rights</h2>

              <h3>California Residents (CCPA / CPRA)</h3>
              <p>If you are a California resident, you have the right to know, delete, correct, opt out of sale/sharing, and receive non-discriminatory treatment for your personal information. Submit requests to hello@organiclume.com with the subject line "California Privacy Request." We will respond within 45 days.</p>

              <h3>European Residents (GDPR)</h3>
              <p>If you are located in the EEA, UK, or Switzerland, you have the right to access, rectify, erase, restrict, and port your personal data, as well as to object to processing. Contact us at hello@organiclume.com. You also have the right to lodge a complaint with your local data protection authority.</p>

              <h2>7. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations (e.g., tax records retained for 7 years), resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.</p>

              <h2>8. Data Security</h2>
              <p>We implement industry-standard security measures including SSL/TLS encryption, PCI-DSS compliant payment processing via Stripe, and access controls limiting data access to authorized personnel. No method of transmission over the internet is 100% secure.</p>

              <h2>9. Children's Privacy</h2>
              <p>The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at hello@organiclume.com and we will promptly delete it.</p>

              <h2>10. Third-Party Links</h2>
              <p>The Site may contain links to third-party websites. This Privacy Policy applies only to organiclume.com. We are not responsible for the privacy practices of third-party sites.</p>

              <h2>11. International Data Transfers</h2>
              <p>Organic Lume is based in the United States. If you are visiting from outside the U.S., your information may be transferred to, stored, and processed in the U.S. For transfers from the EEA/UK, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) where required.</p>

              <h2>12. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically. When we make material changes, we will update the "Last Updated" date, notify you by email if you have an account or are subscribed, and post a notice on the Site. Your continued use of the Site after the effective date constitutes your acceptance of the updated Privacy Policy.</p>

              <h2>13. Contact Us</h2>
              <p>
                For privacy-related inquiries, to exercise your rights, or to report a concern:<br />
                <strong>Organic Lume</strong><br />
                Email: <a href="mailto:hello@organiclume.com" style={{ color: 'var(--accent-sage)' }}>hello@organiclume.com</a><br />
                Website: organiclume.com
              </p>
              <p>We aim to respond to all privacy requests within 30 days (or 45 days for CCPA requests).</p>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1.5rem' }}>Terms of Service</Link>
            <Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link>
          </p>
          <p style={{ fontSize: '0.875rem' }}>&copy; 2026 LUME Wellness. Minimalist Luxury for your Hair.</p>
        </div>
      </footer>
    </div>
  );
}
