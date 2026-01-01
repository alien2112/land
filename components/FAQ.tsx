'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faq.items.0.question') || 'ما هي الخدمات التي تقدمونها؟',
      answer: t('faq.items.0.answer') || 'نقدم خدمات تصميم وتنسيق الحدائق، تركيب شبكات الري، زراعة الأشجار، تصميم النوافير والشلالات، والجلسات الخارجية.'
    },
    {
      question: t('faq.items.1.question') || 'هل تقدمون ضماناً على عملكم؟',
      answer: t('faq.items.1.answer') || 'نعم، نقدم ضماناً على جميع أعمالنا بما في ذلك النباتات وشبكات الري والأعمال المدنية.'
    },
    {
      question: t('faq.items.2.question') || 'كم يستغرق تنفيذ المشروع؟',
      answer: t('faq.items.2.answer') || 'تعتمد المدة على حجم وتفاصيل المشروع، ولكن عادة ما تتراوح بين أسبوعين إلى 4 أسابيع.'
    },
    {
      question: t('faq.items.3.question') || 'هل لديكم خدمات صيانة؟',
      answer: t('faq.items.3.answer') || 'نعم، نوفر عقود صيانة دورية لضمان بقاء حديقتكم في أفضل حالاتها.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-black text-white safe-area-left safe-area-right">
      <div className="max-w-[min(1400px,95vw)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          {/* Left Section - Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-10 bg-white"></div>
              <h4 className="text-sm font-normal text-white uppercase tracking-wider">
                {t('faq.title')}
              </h4>
            </div>
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight text-white text-overflow-safe">
              {t('faq.heading')}
            </h2>
          </motion.div>

          {/* Right Section - FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#111114] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-7 py-6 text-left flex items-center justify-between"
                >
                  <span className="text-base md:text-lg font-normal text-white pr-4 flex-1">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#111114] border border-gray-700 flex items-center justify-center relative">
                      <svg
                        className="w-5 h-5 text-white absolute"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        {/* Horizontal line - always visible */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12H4"
                        />
                        {/* Vertical line - animates */}
                        <motion.g
                          initial={{ opacity: 1, x: 0, rotate: 0 }}
                          animate={{
                            opacity: openIndex === index ? 0 : 1,
                            x: openIndex === index ? 8 : 0,
                            rotate: openIndex === index ? 90 : 0,
                          }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          style={{ transformOrigin: "12px 12px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16"
                          />
                        </motion.g>
                      </svg>
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-white/85 text-sm md:text-base">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

