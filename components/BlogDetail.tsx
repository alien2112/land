'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { buildBlogPath } from '@/lib/site';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';

interface Blog {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    processedContent?: string;
    image: string;
    author: string;
    featured: boolean;
    slug: string;
    tags?: string[];
    createdAt: string;
    updatedAt?: string;
}

interface BlogDetailProps {
    blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
        const encodedPath = buildBlogPath(blog.slug);
        if (window.location.pathname !== encodedPath) {
            window.history.replaceState(null, '', encodedPath);
        }
    }, [blog.slug]);

    if (!blog) return null;

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <article className="min-h-screen bg-white text-gray-900 pt-20 pb-20 overflow-x-hidden w-full relative">
            {/* Hero Banner */}
            <div className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] mb-8 md:mb-12">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={blog.image || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        {blog.featured && (
                            <span className="inline-block bg-green-600 text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 shadow-lg">
                                {language === 'ar' ? 'مميز' : 'Featured'}
                            </span>
                        )}
                        <h1
                            className="text-2xl md:text-5xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight break-words px-2 text-white drop-shadow-lg"
                        >
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-gray-100 text-[10px] sm:text-xs md:text-base font-medium">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                {blog.author}
                            </span>
                            <span>|</span>
                            <span suppressHydrationWarning>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-30 -mt-20 md:-mt-32">
                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 border border-gray-100 w-full overflow-hidden">

                    <Link
                        href="/blog"
                        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-8 font-medium"
                    >
                        <span className={`text-lg transition-transform duration-200 ${language === 'ar' ? 'ml-2 group-hover:-translate-x-1' : 'mr-2 group-hover:translate-x-1'}`}>
                            {language === 'ar' ? '←' : '←'}
                        </span>
                        {language === 'ar' ? 'العودة للمقالات' : 'Back to Blog'}
                    </Link>

                    <div
                        className="text-lg md:text-xl font-medium text-gray-600 mb-8 md:mb-10 leading-relaxed border-r-4 border-green-500 pr-4 italic"
                    >
                        {blog.excerpt}
                    </div>

                    {mounted ? (
                        <div
                            className="prose prose-lg max-w-none w-full break-words
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-p:text-gray-700 prose-p:leading-8
                    prose-a:text-green-600 hover:prose-a:text-green-700 
                    prose-strong:text-gray-900
                    prose-li:text-gray-700
                    text-gray-700
                    [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:mx-auto [&_img]:!max-w-full [&_img]:!h-auto
                    [&_iframe]:!w-full [&_iframe]:!aspect-video [&_iframe]:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: blog.processedContent || blog.content }}
                        />
                    ) : (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-32 bg-gray-200 rounded w-full mt-8"></div>
                        </div>
                    )}

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-green-600" />
                                {language === 'ar' ? 'الكلمات المفتاحية:' : 'Tags:'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 px-3 py-1 rounded-lg text-sm transition-colors duration-200">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
