import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Facebook,
  Instagram,
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'معرض الأعمال', href: '/portfolio' },
    { name: 'المدونة', href: '/blog' },
    { name: 'تواصل معنا', href: '/contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/logo-landscape-masters.png copy.jpg"
                alt="لاندسكيب ماسترز بالرياض"
                className="h-10 w-auto ml-3"
              />
              <h3 className="text-xl font-bold">لاندسكيب ماسترز بالرياض</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              شركة رائدة في تصميم وتنسيق الحدائق في المملكة العربية السعودية،
              نحول أحلامك إلى حدائق خضراء مبهرة بأعلى معايير الجودة والإبداع.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://www.facebook.com/profile.php?id=100081155241953"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/landscape_masters_riyadh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">معلومات التواصل</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                <a href="tel:+966534309221" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  +966 53 430 9221
                </a>
              </div>

              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                <a href="https://wa.me/966534309221" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  واتساب
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                <a href="mailto:shazash09@gmail.com" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  shazash09@gmail.com
                </a>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-green-500 ml-3 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-6 space-y-2">
              <a
                href="tel:+966534309221"
                className="block bg-green-600 hover:bg-green-700 text-center py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                اتصل الآن
              </a>
              <a
                href="https://wa.me/966534309221"
                className="block bg-green-500 hover:bg-green-600 text-center py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                واتساب
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              جميع الحقوق محفوظة لدى لاندسكيب ماسترز بالرياض © 2025.
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                شروط الاستخدام
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              تم التصميم والأرشفة بواسطة
              <a
                href="https://wa.me/966541430116/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline mx-1"
              >
                مؤسسة رواد الرقمية
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
