'use client';

import React, { useState, useEffect } from 'react';
import { ArrowDown, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Banner {
  _id: string;
  page: 'home' | 'contact' | 'about';
  image: string;
}

const Hero = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  // Default banner image
  const defaultBannerUrl = 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

  // Fetch home banner from API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/banners?page=home');
        if (!response.ok) {
          throw new Error('Failed to fetch banner');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setBanner(data[0]);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // Helper function to get image URL (supports GridFS)
  const getImageUrl = (imageId: string | undefined) => {
    if (!imageId) return defaultBannerUrl;
    // If it's already a URL, return as is
    if (imageId.startsWith('http://') || imageId.startsWith('https://')) {
      return imageId;
    }
    // Otherwise, assume it's a GridFS ID
    return `/api/images/${imageId}`;
  };

  const backgroundImage = banner?.image ? getImageUrl(banner.image) : defaultBannerUrl;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
          opacity: loading ? 0.7 : 1
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="w-16 h-16 text-green-400 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {isRTL ? 'لانسكيب ماستر بالرياض' : 'Landscape Master Riyadh'}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
          {isRTL
            ? 'نحول أحلامك إلى حدائق خضراء مبهرة'
            : 'We transform your dreams into stunning green gardens'}
        </p>

        <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {isRTL
            ? 'شركة رائدة في تصميم وتنسيق الحدائق في المملكة العربية السعودية، نقدم حلولاً مبتكرة تجمع بين الجمال الطبيعي والوظائف العملية'
            : 'A leading company in garden design and landscaping in Saudi Arabia, offering innovative solutions that combine natural beauty with practical functionality'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#services"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isRTL ? 'اكتشف خدماتنا' : 'Discover Our Services'}
          </a>
          <a
            href="#portfolio"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {isRTL ? 'معرض الأعمال' : 'Our Portfolio'}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;