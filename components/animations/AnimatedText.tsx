'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: 'word' | 'letter' | 'fade';
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  type = 'word',
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const text = typeof children === 'string' ? children : String(children);

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  if (type === 'letter') {
    const letters = text.split('');
    return (
      <span className={className}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: delay + index * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    );
  }

  if (type === 'word') {
    const words = text.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  // Fade type
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

