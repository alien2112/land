'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-black text-white px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-40 border-t border-[#0f0f10]/90 overflow-hidden safe-area-left safe-area-right safe-area-bottom">
      {/* Gold glow at the very bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(178,146,0,0.35) 45%, rgba(178,146,0,0.65) 80%, rgba(178,146,0,0.85) 100%)',
          filter: 'blur(2px)',
        }}
      />

      <div className="relative max-w-[min(1400px,95vw)] mx-auto">
        {/* Top: Social */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-xs sm:text-sm tracking-wide text-white/90 mb-3 md:mb-4">{t('footer.social')}</h3>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            {/* Facebook */}
            <Link
              href="https://www.facebook.com"
              target="_blank"
              className="group"
              aria-label="Facebook"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.8" />
                <path
                  d="M19.2 19.5h2.2l.4-2.7h-2.6v-1.6c0-.9.3-1.4 1.3-1.4h1.3V11.2c-.6-.1-1.3-.2-2-.2-2 0-3.4 1.2-3.4 3.5v2.3h-2v2.7h2V25h2.8v-5.5z"
                  fill="white"
                />
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com"
              target="_blank"
              className="group"
              aria-label="Instagram"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.8" />
                <rect x="12" y="12" width="12" height="12" rx="6" stroke="white" />
                <circle cx="24.5" cy="11.5" r="1" fill="white" />
                <circle cx="18" cy="18" r="3.5" stroke="white" />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              className="group"
              aria-label="LinkedIn"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.8" />
                <path d="M12.8 15.2h2.8V25h-2.8V15.2zM14.2 11.5c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6z" fill="white" />
                <path d="M18.2 15.2h2.7v1.3h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v5.1h-2.8v-4.5c0-1.1 0-2.6-1.6-2.6-1.6 0-1.8 1.2-1.8 2.5V25h-2.8v-9.8z" fill="white" />
              </svg>
            </Link>

            {/* X/Twitter */}
            <Link href="https://x.com" target="_blank" className="group" aria-label="X">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.8" />
                <path
                  d="M21.8 11.5h2.3l-5 5.8 5.9 6.2h-3l-4.6-4.9-3.9 4.9h-2.3l5.3-6.5L11.8 11.5h3l4.1 4.4 2.9-3.4z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Divider and bottom row */}
        <div className="border-t border-white/20 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/15">
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FFDD00]"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p className="text-white/90 text-sm sm:text-base font-medium">{t('footer.address')}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-white/80 text-xs sm:text-sm text-center md:text-right">
              {t('footer.copyright')}{' '}
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors text-white/90">
                {t('footer.terms')}
              </Link>
            </p>
            <p className="text-white/80 text-xs sm:text-sm text-center md:text-right">
              {t('footer.designedBy')}{' '}
              <Link
                href="https://wa.me/966541430116"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFDD00] hover:text-white transition-colors"
              >
                {t('footer.designedByAgency')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

