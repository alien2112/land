import React from 'react';
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Leaf, 
  Star,
  CheckCircle,
  Heart
} from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-12 h-12" />,
      title: 'خبرة واسعة',
      description: 'أكثر من 15 سنة من الخبرة في تصميم وتنسيق الحدائق'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'فريق محترف',
      description: 'فريق من المتخصصين والخبراء في مجال تنسيق الحدائق'
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'جودة عالية',
      description: 'نستخدم أفضل المواد والتقنيات لضمان جودة العمل'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'التزام بالمواعيد',
      description: 'نلتزم بالمواعيد المحددة وننجز المشاريع في الوقت المناسب'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'ضمان الخدمة',
      description: 'نقدم ضمان شامل على جميع أعمالنا وخدماتنا'
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'صديق للبيئة',
      description: 'نحرص على استخدام حلول مستدامة وصديقة للبيئة'
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'تصاميم مبتكرة',
      description: 'نبتكر تصاميم عصرية تواكب أحدث الاتجاهات العالمية'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'رضا العملاء',
      description: 'رضا عملائنا هو أولويتنا الأولى ونسعى لتحقيق توقعاتهم'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      location: 'الرياض',
      rating: 5,
      comment: 'خدمة ممتازة وتصميم رائع. حولوا حديقتي إلى جنة خضراء مبهرة.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'فاطمة العلي',
      location: 'الرياض',
      rating: 5,
      comment: 'فريق محترف والتزام بالمواعيد. النتيجة فاقت توقعاتي بكثير.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'خالد السعد',
      location: 'الرياض',
      rating: 5,
      comment: 'أفضل شركة تنسيق حدائق في الرياض. جودة عالية وأسعار مناسبة.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا يختارنا العملاء؟</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نتميز بالخبرة والاحترافية والجودة العالية في جميع خدماتنا
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-green-600 mb-4 flex justify-center">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">آراء عملائنا</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ml-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">جاهز لتحويل حديقتك؟</h3>
          <p className="text-xl mb-8 text-green-100">
            تواصل معنا اليوم واحصل على استشارة مجانية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966534309221"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              اتصل الآن
            </a>
            <a
              href="https://wa.me/966534309221"
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;