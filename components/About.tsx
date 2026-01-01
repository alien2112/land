'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sixtyfour } from 'next/font/google';

const sixtyfour = Sixtyfour({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const aboutImages = [
  {
    src: '/WhatsApp Image 2025-11-11 at 18.29.40_7cb1596f.webp',
    alt: 'Specialized door and window opening service',
  },
  {
    src: '/DeliberateService.webp',
    alt: 'Professional concrete cutting and demolition service',
  },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-black text-white safe-area-left safe-area-right">
      <div className="max-w-[min(1400px,95vw)] mx-auto">
        {/* Header Section - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {/* Horizontal line above */}
          <div style={{ width: 'clamp(30px, 5vw, 40px)', height: '1px', backgroundColor: 'white', marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)' }} />
          {/* ABOUT text */}
          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white uppercase tracking-wider mb-2">
            {t('about.title')}
          </h4>
          {/* ALMOHTAREF text */}
          <h3 
            className={`text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide ${sixtyfour.className}`}
            style={{ fontFamily: '"Sixtyfour", system-ui, -apple-system, sans-serif', fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}
          >
            ALMOHTAREF
          </h3>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(1.875rem,6vw,4.375rem)] font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight text-overflow-safe"
        >
          {t('about.heading')}
        </motion.h2>

        {/* Images and Description Section */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start mb-8 sm:mb-12 md:mb-16">
          {/* Three Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            {aboutImages.map((image) => (
              <div key={image.src} className="relative aspect-square rounded-lg border border-white overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 20vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </motion.div>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed text-overflow-safe"
            style={{ alignSelf: 'center', fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}
          >
            {t('about.description')}
          </motion.p>
        </div>

      </div>
    </section>
  );
}

