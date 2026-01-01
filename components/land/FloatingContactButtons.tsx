import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-between items-end px-6 pointer-events-none">
      {/* WhatsApp Button - Right Side */}
      <div className="pointer-events-auto">
        <a
          href="https://wa.me/966534309221"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="تواصل عبر الواتساب"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            واتساب
          </span>
        </a>
      </div>

      {/* Phone Button - Left Side */}
      <div className="pointer-events-auto">
        <a
          href="tel:+966534309221"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="اتصل الآن"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute left-full ml-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            اتصل الآن
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingContactButtons;