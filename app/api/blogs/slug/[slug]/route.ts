import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/models/Blog';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Database connection failed');
    }
};

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectDB();
        const { slug } = await params;
        const blog = await Blog.findOne({ slug: slug });
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}
