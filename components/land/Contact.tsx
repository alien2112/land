'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Clock,
  Loader2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  _id: string;
  title: string;
  titleAr: string;
}

const Contact = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with your backend or email service here
    alert(isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' : 'Your message has been sent successfully! We will contact you soon.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {isRTL ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL
              ? 'نحن هنا لمساعدتك في تحويل حلمك إلى حديقة خضراء مبهرة'
              : 'We are here to help you transform your dream into a stunning green garden'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {isRTL ? 'معلومات التواصل' : 'Contact Information'}
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              <div className={`flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className={`bg-green-100 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isRTL ? 'اتصل بنا' : 'Call Us'}
                  </h4>
                  <a href="tel:+966534309221" className="text-green-600 hover:text-green-700 font-medium">
                    +966 53 430 9221
                  </a>
                </div>
              </div>

              <div className={`flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className={`bg-green-100 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isRTL ? 'واتساب' : 'WhatsApp'}
                  </h4>
                  <a href="https://wa.me/966534309221" className="text-green-600 hover:text-green-700 font-medium">
                    +966 53 430 9221
                  </a>
                </div>
              </div>

              <div className={`flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className={`bg-green-100 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </h4>
                  <a href="mailto:shazash09@gmail.com" className="text-green-600 hover:text-green-700 font-medium">
                    shazash09@gmail.com
                  </a>
                </div>
              </div>

              <div className={`flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className={`bg-green-100 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isRTL ? 'الموقع' : 'Location'}
                  </h4>
                  <p className="text-gray-600">
                    {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                  </p>
                </div>
              </div>

              <div className={`flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className={`bg-green-100 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isRTL ? 'ساعات العمل' : 'Working Hours'}
                  </h4>
                  <p className="text-gray-600">
                    {isRTL ? 'السبت - الخميس: 8:00 ص - 6:00 م' : 'Sat - Thu: 8:00 AM - 6:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {isRTL ? 'تابعنا على' : 'Follow Us'}
              </h4>
              <div className={`flex ${isRTL ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'رقم الهاتف *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder="05xxxxxxxx"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'الخدمة المطلوبة *' : 'Required Service *'}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">{isRTL ? 'اختر الخدمة' : 'Select a service'}</option>
                  {loadingServices ? (
                    <option disabled>{isRTL ? 'جاري التحميل...' : 'Loading...'}</option>
                  ) : (
                    services.map((service) => (
                      <option key={service._id} value={isRTL ? service.titleAr : service.title}>
                        {isRTL ? service.titleAr : service.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'الرسالة *' : 'Message *'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center`}
              >
                <Send className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'إرسال الرسالة' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {isRTL ? 'تواصل سريع' : 'Quick Contact'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966534309221"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Phone className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'اتصل الآن' : 'Call Now'}
            </a>
            <a
              href="https://wa.me/966534309221"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <MessageCircle className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;