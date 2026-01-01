'use client';

import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';

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
}

interface BlogDetailProps {
    blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
    return (
        <div className="min-h-screen pt-20">
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
                        <ArrowRight className="w-4 h-4 ml-2" />
                        العودة إلى المدونة
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span suppressHydrationWarning>
                            {new Date(blog.createdAt).toLocaleDateString('ar-SA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={blog.image || '/placeholder-blog.jpg'}
                        alt={blog.title}
                        className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                    />
                </div>
            </section>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed 
                        prose-headings:text-gray-900 
                        prose-a:text-green-600 hover:prose-a:text-green-700
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-li:text-gray-600
                        prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: blog.processedContent || blog.content }}
                />

                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">الكلمات المفتاحية:</h3>
                        <div className="flex flex-wrap gap-3">
                            {blog.tags.map((tag, index) => (
                                <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                    <Tag className="w-3 h-3 ml-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
