import React from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'أفضل النباتات للحدائق في المناخ السعودي',
      excerpt: 'تعرف على أفضل أنواع النباتات التي تتحمل المناخ الصحراوي وتزدهر في البيئة السعودية',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '15 ديسمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'نصائح زراعية'
    },
    {
      id: 2,
      title: 'كيفية توفير المياه في ري الحدائق',
      excerpt: 'طرق ذكية وعملية لتوفير المياه في ري الحدائق مع الحفاظ على جمال ونضارة النباتات',
      image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '10 ديسمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'أنظمة الري'
    },
    {
      id: 3,
      title: 'تصميم حدائق صغيرة: أفكار إبداعية',
      excerpt: 'أفكار مبتكرة لتصميم حدائق صغيرة تحقق أقصى استفادة من المساحات المحدودة',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '5 ديسمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'تصميم الحدائق'
    },
    {
      id: 4,
      title: 'العناية بالثيل الطبيعي في الصيف',
      excerpt: 'دليل شامل للعناية بالثيل الطبيعي خلال فصل الصيف الحار في المملكة العربية السعودية',
      image: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '1 ديسمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'العناية بالثيل'
    },
    {
      id: 5,
      title: 'اتجاهات تصميم الحدائق لعام 2024',
      excerpt: 'أحدث الاتجاهات والصيحات في عالم تصميم الحدائق التي ستهيمن على عام 2024',
      image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '25 نوفمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'اتجاهات التصميم'
    },
    {
      id: 6,
      title: 'فوائد النوافير في الحدائق المنزلية',
      excerpt: 'تعرف على الفوائد الجمالية والنفسية لإضافة النوافير والشلالات إلى حديقتك المنزلية',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '20 نوفمبر 2024',
      author: 'فريق لانسكيب ماستر',
      category: 'عناصر مائية'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">المدونة</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مقالات ونصائح متخصصة في تصميم وتنسيق الحدائق والعناية بالنباتات
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 ml-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 ml-1" />
                    {post.author}
                  </div>
                </div>
                
                <a
                  href="#"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 group"
                >
                  اقرأ المزيد
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105">
            عرض المزيد من المقالات
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;