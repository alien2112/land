import { Metadata } from 'next';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
    title: 'المدونة | لاندسكيب ماسترز',
    description: 'مقالات ونصائح حول تصميم وتنسيق الحدائق، أحدث الاتجاهات، ومشاريعنا في الرياض.',
};

export const dynamic = 'force-dynamic';

async function getBlogs() {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return <BlogList initialBlogs={blogs} />;
}
