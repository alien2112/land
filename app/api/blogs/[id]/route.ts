import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/models/Blog';
import { uploadFile } from '@/lib/gridfs';
import { generateSEOMetadata } from '@/lib/seo-utils';
import { generateInternalLinks } from '@/lib/internal-linking';
import SEOConfig from '@/models/SEOConfig';
import InternalLinkMapping from '@/models/InternalLinkMapping';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Database connection failed');
    }
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;

        let title, titleEn, titleAr, content, contentEn, contentAr, excerpt, excerptEn, excerptAr, author, featured, image;
        let autoSEO, autoInternalLinks, manualSEO, manualLinks;

        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const body = await request.json();
            title = body.title;
            titleEn = body.titleEn;
            titleAr = body.titleAr;
            content = body.content;
            contentEn = body.contentEn;
            contentAr = body.contentAr;
            excerpt = body.excerpt;
            excerptEn = body.excerptEn;
            excerptAr = body.excerptAr;
            author = body.author;
            featured = body.featured;
            image = body.image;
            autoSEO = body.autoSEO;
            autoInternalLinks = body.autoInternalLinks;
            manualSEO = body.manualSEO;
            manualLinks = body.manualLinks;
        } else {
            const formData = await request.formData();
            title = formData.get('title') as string;
            titleEn = formData.get('titleEn') as string;
            titleAr = formData.get('titleAr') as string;
            content = formData.get('content') as string;
            contentEn = formData.get('contentEn') as string;
            contentAr = formData.get('contentAr') as string;
            excerpt = formData.get('excerpt') as string;
            excerptEn = formData.get('excerptEn') as string;
            excerptAr = formData.get('excerptAr') as string;
            author = formData.get('author') as string;
            featured = formData.get('featured') === 'true';
            image = formData.get('image');
            autoSEO = formData.get('autoSEO');
            autoInternalLinks = formData.get('autoInternalLinks');
            manualSEO = formData.get('manualSEO');
            manualLinks = formData.get('manualLinks');
        }

        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        let imageUrl = undefined;
        if (image && typeof image === 'object' && 'name' in image) {
            const file = image as unknown as File;
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileId = await uploadFile(buffer, file.name, file.type);
            imageUrl = `/api/images/${fileId}`;
        } else if (typeof image === 'string') {
            if (image && !image.startsWith('/') && !image.startsWith('http')) {
                imageUrl = `/api/images/${image}`;
            } else {
                imageUrl = image;
            }
        }

        // Get global config
        let config = await SEOConfig.findOne({ configKey: 'global' });
        if (!config) {
            config = new SEOConfig({ configKey: 'global' });
            await config.save();
        }

        // Determine if we should use auto features
        const autoSEOBool = typeof autoSEO === 'string' ? autoSEO === 'true' : (autoSEO !== undefined ? autoSEO : existingBlog.autoSEO);
        const autoInternalLinksBool = typeof autoInternalLinks === 'string' ? autoInternalLinks === 'true' : (autoInternalLinks !== undefined ? autoInternalLinks : existingBlog.autoInternalLinks);

        const useAutoSEO = autoSEOBool && config.globalAutoSEO;
        const useAutoLinks = autoInternalLinksBool && config.globalAutoInternalLinks;

        // Generate SEO metadata (only if auto is enabled)
        let slug = existingBlog.slug;
        let metaTitle = existingBlog.metaTitle;
        let metaDescription = existingBlog.metaDescription;
        let metaKeywords = existingBlog.metaKeywords;

        if (useAutoSEO) {
            const seoMetadata = generateSEOMetadata(title || existingBlog.title, content || existingBlog.content, excerpt || existingBlog.excerpt);

            // Only update slug if title changed
            if (title && title !== existingBlog.title) {
                slug = seoMetadata.slug;
                let slugCounter = 1;
                while (await Blog.findOne({ slug, _id: { $ne: id } })) {
                    slug = `${seoMetadata.slug}-${slugCounter}`;
                    slugCounter++;
                }
            }

            metaTitle = seoMetadata.metaTitle;
            metaDescription = seoMetadata.metaDescription;
            metaKeywords = seoMetadata.metaKeywords;
        }

        // Parse manual links
        let parsedManualLinks = existingBlog.manualLinks || [];
        if (manualLinks) {
            try {
                parsedManualLinks = typeof manualLinks === 'string' ? JSON.parse(manualLinks) : manualLinks;
            } catch (e) {
                console.error('Failed to parse manualLinks:', e);
            }
        }

        // Generate internal links
        let processedContent = content || existingBlog.content; // Use new content or existing
        let internalLinksApplied: string[] = [];

        if (useAutoLinks || parsedManualLinks.length > 0) {
            const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }) : [];

            const linkResult = generateInternalLinks({
                content: processedContent,
                autoLinks: autoLinkMappings,
                manualLinks: parsedManualLinks,
                useAutoLinks,
                maxLinksPerPost: config.maxInternalLinksPerPost,
            });

            processedContent = linkResult.processedContent;
            internalLinksApplied = linkResult.linksApplied;
        }

        // Parse manual SEO
        let parsedManualSEO = existingBlog.manualSEO || {};
        if (manualSEO) {
            try {
                parsedManualSEO = typeof manualSEO === 'string' ? JSON.parse(manualSEO) : manualSEO;
            } catch (e) {
                console.error('Failed to parse manualSEO:', e);
            }
        }

        const updateData: any = {
            title,
            titleEn,
            titleAr,
            content,
            contentEn,
            contentAr,
            excerpt,
            excerptEn,
            excerptAr,
            author,
            featured: featured === true || featured === 'true',
            image: imageUrl,
            slug,
            autoSEO: useAutoSEO,
            autoInternalLinks: useAutoLinks,
            metaTitle,
            metaDescription,
            metaKeywords,
            manualSEO: parsedManualSEO,
            manualLinks: parsedManualLinks,
            processedContent,
            internalLinksApplied,
        };

        // Remove undefined fields to avoid overwriting with null
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
