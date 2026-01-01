'use client';

import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Droplets,
  Scissors,
  Waves,
  Umbrella,
  Flower,
  TreePine,
  Wrench,
  Hammer,
  PaintBucket,
  Loader2,
  LucideIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  image?: string;
  features: string[];
  featuresAr: string[];
  featured: boolean;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'tree-pine': TreePine,
  'treepine': TreePine,
  'leaf': Leaf,
  'droplets': Droplets,
  'scissors': Scissors,
  'waves': Waves,
  'umbrella': Umbrella,
  'flower': Flower,
  'wrench': Wrench,
  'hammer': Hammer,
  'paint-bucket': PaintBucket,
  'paintbucket': PaintBucket,
};

const Services = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(isRTL ? 'فشل في تحميل الخدمات' : 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [isRTL]);

  // Helper function to get image URL (supports GridFS)
  const getImageUrl = (imageId: string | undefined) => {
    if (!imageId) return 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
    // If it's already a URL, return as is
    if (imageId.startsWith('http://') || imageId.startsWith('https://')) {
      return imageId;
    }
    // Otherwise, assume it's a GridFS ID
    return `/api/images/${imageId}`;
  };

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const normalizedName = iconName?.toLowerCase().replace(/[-_\s]/g, '');
    const Icon = iconMap[normalizedName] || iconMap[iconName?.toLowerCase()] || Leaf;
    return <Icon className="w-12 h-12" />;
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {isRTL ? 'خدماتنا' : 'Our Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL ? 'لا توجد خدمات حالياً' : 'No services available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL
              ? 'نقدم مجموعة شاملة من الخدمات المتخصصة في تصميم وتنسيق الحدائق لتحويل مساحتك إلى واحة خضراء مبهرة'
              : 'We offer a comprehensive range of specialized services in garden design and landscaping to transform your space into a stunning green oasis'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={getImageUrl(service.image)}
                  alt={isRTL ? service.titleAr : service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className={`flex items-center mb-4 ${isRTL ? 'flex-row' : 'flex-row'}`}>
                  <div className={`text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isRTL ? service.titleAr : service.title}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {isRTL ? service.descriptionAr : service.description}
                </p>

                {/* Features list */}
                {((isRTL ? service.featuresAr : service.features) || []).length > 0 && (
                  <ul className={`mt-4 space-y-2 text-sm text-gray-500 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                    {(isRTL ? service.featuresAr : service.features).slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`text-green-500 ${isRTL ? 'ml-2' : 'mr-2'}`}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6">
                  <a
                    href="#contact"
                    className={`inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-200`}
                  >
                    {isRTL ? 'اطلب الخدمة' : 'Request Service'}
                    <svg className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;