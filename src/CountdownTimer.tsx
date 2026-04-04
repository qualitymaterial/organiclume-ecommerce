import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Launch date: June 15, 2026
const LAUNCH_DATE = new Date('2026-06-15T00:00:00Z');

function getTimeLeft() {
  const now = new Date().getTime();
  const distance = LAUNCH_DATE.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    launched: false,
  };
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '3.5rem' }}>
      <motion.div
        key={value}
        initial={{ opacity: 0.4, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="timer-digit"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginTop: '0.5rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <span
      style={{
        fontSize: '2rem',
        color: 'var(--accent-sage)',
        fontFamily: 'var(--font-serif)',
        lineHeight: 1,
        paddingBottom: '1.25rem',
        opacity: 0.5,
      }}
    >
      :
    </span>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  if (timeLeft.launched) {
    return (
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent-sage)' }}>
        We're live — shop now.
      </p>
    );
  }

  return (
    <div>
      <p
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent-sage)',
          fontWeight: 600,
          marginBottom: '1.25rem',
        }}
      >
        Launching in
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
        <TimerUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimerUnit value={timeLeft.hours} label="Hours" />
        <Separator />
        <TimerUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <TimerUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}
