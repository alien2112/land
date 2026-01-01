import React from 'react';
import { Target, Eye, Heart, Award, Users, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'الجودة',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'الابتكار',
      description: 'نبتكر حلولاً عصرية تواكب أحدث الاتجاهات'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'الالتزام',
      description: 'نلتزم بالمواعيد والوعود التي نقطعها لعملائنا'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'الاستدامة',
      description: 'نحرص على الحلول الصديقة للبيئة والمستدامة'
    }
  ];

  const stats = [
    { number: '500+', label: 'مشروع منجز' },
    { number: '15+', label: 'سنة خبرة' },
    { number: '300+', label: 'عميل راضي' },
    { number: '50+', label: 'متخصص' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">من نحن</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            لانسكيب ماستر بالرياض - شركة رائدة في تصميم وتنسيق الحدائق في المملكة العربية السعودية
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">خبرة واحترافية في خدمتكم</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              نحن في لانسكيب ماستر بالرياض نفخر بكوننا إحدى الشركات الرائدة في مجال تصميم وتنسيق الحدائق في المملكة العربية السعودية. 
              نمتلك فريق عمل متخصص وخبرة واسعة في تنفيذ مشاريع الحدائق باحترافية عالية.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              نسعى دائماً لتقديم أفضل الحلول المبتكرة التي تجمع بين الجمال الطبيعي والوظائف العملية، 
              لنخلق بيئات خارجية مبهرة تلبي احتياجات عملائنا وتلهمهم.
            </p>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="فريق العمل"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
              <Users className="w-8 h-8 mb-2" />
              <p className="font-bold">فريق محترف</p>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">الرؤية</h3>
            <p className="text-gray-600 leading-relaxed">
              تقديم حلول تنسيق حدائق مبتكرة تجمع بين الجمال الطبيعي والوظائف العملية
            </p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">الرسالة</h3>
            <p className="text-gray-600 leading-relaxed">
              خلق بيئات خارجية مبهرة تلبي احتياجات العملاء وتلهمهم
            </p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">القيم</h3>
            <p className="text-gray-600 leading-relaxed">
              الجودة، الابتكار، الالتزام، والاستدامة في جميع أعمالنا
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">قيمنا الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="text-green-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;