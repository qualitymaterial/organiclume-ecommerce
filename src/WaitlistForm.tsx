import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const KLAVIYO_COMPANY_ID = import.meta.env.VITE_KLAVIYO_COMPANY_ID as string;
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID as string;

async function subscribeToKlaviyo(email: string, firstName: string): Promise<void> {
  const payload = {
    data: {
      type: 'subscription',
      attributes: {
        list_id: KLAVIYO_LIST_ID,
        email,
        custom_source: 'LUME Waitlist',
        ...(firstName.trim() && {
          properties: { $first_name: firstName.trim() },
        }),
      },
    },
  };

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        revision: '2024-02-15',
      },
      body: JSON.stringify(payload),
    }
  );

  // Klaviyo returns 202 Accepted on success
  if (!res.ok && res.status !== 202) {
    throw new Error(`Klaviyo error: ${res.status}`);
  }
}

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setFormState('loading');
    setErrorMsg('');

    try {
      await subscribeToKlaviyo(email.trim(), firstName);
      setFormState('success');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setFormState('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              margin: 0,
              fontWeight: 500,
            }}
          >
            You're on the list.
          </p>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              margin: 0,
            }}
          >
            We'll let you know the moment LUME launches.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '420px' }}
        >
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ ...inputStyle, flex: 1 }}
            />
            <motion.button
              type="submit"
              className="button"
              disabled={formState === 'loading'}
              whileHover={formState !== 'loading' ? { scale: 1.04 } : {}}
              whileTap={formState !== 'loading' ? { scale: 0.96 } : {}}
              style={{
                whiteSpace: 'nowrap',
                opacity: formState === 'loading' ? 0.7 : 1,
                cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
              }}
            >
              {formState === 'loading' ? 'Joining…' : 'Join Waitlist'}
            </motion.button>
          </div>
          {formState === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: '0.875rem', color: '#c0392b', margin: 0 }}
            >
              {errorMsg}
            </motion.p>
          )}
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Be the first to know when we launch. No spam, ever.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const inputStyle: CSSProperties = {
  padding: '0.85rem 1.25rem',
  borderRadius: '50px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  fontSize: '0.9rem',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.2s',
};
