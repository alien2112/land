'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineLineProps {
  totalItems: number;
}

export default function TimelineLine({ totalItems }: TimelineLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const height = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);

  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        if (containerRef.current) {
          const height = containerRef.current.scrollHeight;
          setLineHeight(height);
        }
      };

      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [totalItems]);

  return (
    <div
      ref={containerRef}
      className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2 overflow-hidden"
    >
      <motion.div
        className="w-full bg-gradient-to-b from-[#FFDD00] via-[#FFDD00]/50 to-transparent"
        style={{ height }}
        initial={{ height: 0 }}
      />
    </div>
  );
}

