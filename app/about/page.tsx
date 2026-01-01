"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Target, Eye, Heart, Award, Users, CheckCircle } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: string; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const endCount = parseInt(end.replace(/\D/g, ''));

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * endCount);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
        <div ref={counterRef} className="text-4xl font-bold mb-2">
            {count}{suffix}
        </div>
    );
};

const About = () => {
    const [banner, setBanner] = useState<string>('');
    const [introImage, setIntroImage] = useState<any>(null);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Banner
                const bannerRes = await fetch('/api/banners');
                const banners = await bannerRes.json();
                const aboutBanner = banners.find((b: any) => b.page === 'about');
                if (aboutBanner) setBanner(aboutBanner.image);

                // Fetch Page Assets
                const assetsRes = await fetch('/api/page-assets?page=about');
                const assets = await assetsRes.json();

                const mainImage = assets.find((a: any) => a.key === 'main-image');
                if (mainImage) setIntroImage(mainImage);

                const team = assets.filter((a: any) => a.section === 'team').sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                if (team.length > 0) setTeamMembers(team);

            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        { number: '500', label: 'مشروع منجز', suffix: '+' },
        { number: '15', label: 'سنة خبرة', suffix: '+' },
        { number: '300', label: 'عميل راضي', suffix: '+' },
        { number: '50', label: 'متخصص', suffix: '+' }
    ];

    // Helper to determine image source
    const getImageSrc = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('/')) return url;
        return `/api/images/${url}`;
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section
                className="py-20 relative bg-gray-900 text-white overflow-hidden"
                style={{
                    backgroundImage: banner ? `url(${getImageSrc(banner)})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
                    <p className="text-xl text-green-100 max-w-3xl mx-auto">
                        لاندسكيب ماسترز بالرياض - شركة رائدة في تصميم وتنسيق الحدائق في المملكة العربية السعودية
                    </p>
                </div>
            </section>

            {/* Company Introduction */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">خبرة واحترافية في خدمتكم</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                نحن في لانسكيب ماستر بالرياض نفخر بكوننا إحدى الشركات الرائدة في مجال تصميم وتنسيق الحدائق في المملكة العربية السعودية.
                                نمتلك فريق عمل متخصص وخبرة واسعة في تنفيذ مشاريع الحدائق باحترافية عالية.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                نسعى دائماً لتقديم أفضل الحلول المبتكرة التي تجمع بين الجمال الطبيعي والوظائف العملية،
                                لنخلق بيئات خارجية مبهرة تلبي احتياجات عملائنا وتلهمهم.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                مع أكثر من 15 سنة من الخبرة في هذا المجال، نجحنا في تنفيذ مئات المشاريع المتنوعة،
                                من الحدائق المنزلية الصغيرة إلى المشاريع الكبيرة والمجمعات السكنية والتجارية.
                            </p>
                        </div>

                        <div className="relative">
                            <img
                                src={introImage ? getImageSrc(introImage.imageUrl) : "https://www.landscapingkw.com/wp-content/uploads/2022/03/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AD%D8%AF%D8%A7%D8%A6%D9%82-%D9%81%D9%84%D9%84-%D8%A8%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D9%86%D8%B3%D9%8A%D9%82-%D8%AD%D8%AF%D8%A7%D8%A6%D9%82-%D9%81%D9%84%D9%84-%D8%A8%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA.jpg"}
                                alt={introImage?.altAr || "تنسيق حدائق فلل"}
                                className="rounded-lg shadow-xl w-full object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
                                <Users className="w-8 h-8 mb-2" />
                                <p className="font-bold">فريق محترف</p>
                                <p className="text-sm text-green-100">50+ متخصص</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا ورسالتنا وقيمنا</h2>
                        <p className="text-xl text-gray-600">الأسس التي نبني عليها نجاحنا</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-4">الرؤية</h3>
                            <p className="text-gray-600 leading-relaxed">
                                تقديم حلول تنسيق حدائق مبتكرة تجمع بين الجمال الطبيعي والوظائف العملية،
                                لنكون الخيار الأول في المملكة العربية السعودية لتصميم وتنسيق الحدائق.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-4">الرسالة</h3>
                            <p className="text-gray-600 leading-relaxed">
                                خلق بيئات خارجية مبهرة تلبي احتياجات العملاء وتلهمهم، من خلال تقديم خدمات متميزة
                                في تصميم وتنسيق الحدائق بأعلى معايير الجودة والاحترافية.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-4">القيم</h3>
                            <p className="text-gray-600 leading-relaxed">
                                الجودة، الابتكار، الالتزام، والاستدامة في جميع أعمالنا. نؤمن بأهمية الحفاظ على البيئة
                                وتقديم حلول مستدامة لأجيال المستقبل.
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
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">فريق العمل</h2>
                        <p className="text-xl text-gray-600">نخبة من المتخصصين والخبراء في مجال تنسيق الحدائق</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member, index) => (
                                <div key={member._id || index} className="text-center bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={getImageSrc(member.imageUrl)}
                                        alt={member.textAr || "عضو فريق"}
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.textAr}</h3>
                                    <p className="text-green-600 font-medium mb-2">{member.altAr}</p>
                                    <p className="text-gray-600 text-sm">خبرة 10 سنوات</p>
                                </div>
                            ))
                        ) : (
                            // Fallback if no data
                            [
                                {
                                    name: 'أحمد محمد',
                                    position: 'مدير التصميم',
                                    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                                },
                                {
                                    name: 'سارة أحمد',
                                    position: 'مهندسة زراعية',
                                    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                                },
                                {
                                    name: 'محمد علي',
                                    position: 'مشرف التنفيذ',
                                    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                                }
                            ].map((member, index) => (
                                <div key={index} className="text-center bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-green-600 font-medium mb-2">{member.position}</p>
                                    <p className="text-gray-600 text-sm">خبرة سنوات</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">إنجازاتنا بالأرقام</h2>
                        <p className="text-green-100 text-lg">نفخر بما حققناه من نجاحات</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                <AnimatedCounter
                                    end={stat.number}
                                    suffix={stat.suffix}
                                    duration={2500 + index * 200}
                                />
                                <div className="text-green-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company History */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">تاريخنا</h2>
                        <p className="text-xl text-gray-600">رحلة من النجاح والإنجازات</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2"></div>
                                <div className="mr-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2009 - البداية</h3>
                                    <p className="text-gray-600">تأسيس الشركة بفكرة تقديم خدمات تنسيق حدائق متميزة في الرياض</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2"></div>
                                <div className="mr-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2015 - التوسع</h3>
                                    <p className="text-gray-600">توسيع نطاق الخدمات لتشمل جميع أنحاء المملكة العربية السعودية</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2"></div>
                                <div className="mr-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2020 - الابتكار</h3>
                                    <p className="text-gray-600">إدخال تقنيات حديثة وأنظمة ري ذكية في جميع مشاريعنا</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2"></div>
                                <div className="mr-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">2024 - الريادة</h3>
                                    <p className="text-gray-600">أصبحنا من الشركات الرائدة في مجال تنسيق الحدائق بالمملكة</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
