'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface RippleButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
}

export default function RippleButton({
  children,
  className = '',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{
            width: 300,
            height: 300,
            x: ripple.x - 150,
            y: ripple.y - 150,
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
}

