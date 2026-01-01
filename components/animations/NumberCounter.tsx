'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

interface NumberCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function NumberCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.div>
  );
}

