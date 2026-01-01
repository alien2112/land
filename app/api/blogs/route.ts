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

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

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

        let imageUrl = '';

        if (image && typeof image === 'object' && 'name' in image) {
            // It's a file (only possible via FormData)
            const file = image as unknown as File;
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileId = await uploadFile(buffer, file.name, file.type);
            imageUrl = `/api/images/${fileId}`;
        } else if (typeof image === 'string') {
            imageUrl = image;
            // If it's a raw ID and not a path, prefix it
            if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
                imageUrl = `/api/images/${imageUrl}`;
            }
        }

        // Get global config
        let config = await SEOConfig.findOne({ configKey: 'global' });
        if (!config) {
            config = new SEOConfig({ configKey: 'global' });
            await config.save();
        }

        // Determine if we should use auto features (global && per-post flags)
        // Convert string 'true'/'false' if coming from FormData
        const autoSEOBool = typeof autoSEO === 'string' ? autoSEO === 'true' : (autoSEO !== undefined ? autoSEO : true);
        const autoInternalLinksBool = typeof autoInternalLinks === 'string' ? autoInternalLinks === 'true' : (autoInternalLinks !== undefined ? autoInternalLinks : true);

        const useAutoSEO = autoSEOBool && config.globalAutoSEO;
        const useAutoLinks = autoInternalLinksBool && config.globalAutoInternalLinks;

        // Generate SEO metadata (only if auto is enabled)
        let slug = '';
        let metaTitle = '';
        let metaDescription = '';
        let metaKeywords: string[] = [];

        if (useAutoSEO) {
            const seoMetadata = generateSEOMetadata(title, content, excerpt);
            slug = seoMetadata.slug;
            metaTitle = seoMetadata.metaTitle;
            metaDescription = seoMetadata.metaDescription;
            metaKeywords = seoMetadata.metaKeywords;
        } else {
            // Use manual slug if provided in manualSEO or generate simple one
            let manualSlug = '';
            if (manualSEO) {
                const parsed = typeof manualSEO === 'string' ? JSON.parse(manualSEO) : manualSEO;
                manualSlug = parsed.slug;
            }
            slug = manualSlug || (title || '')
                .toLowerCase()
                .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
                || `blog-${Date.now()}`;
        }

        // Ensure unique slug
        let uniqueSlug = slug;
        let slugCounter = 1;
        while (await Blog.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${slugCounter}`;
            slugCounter++;
        }

        // Parse manual links if provided as JSON string
        let parsedManualLinks = [];
        if (manualLinks) {
            try {
                parsedManualLinks = typeof manualLinks === 'string' ? JSON.parse(manualLinks) : manualLinks;
            } catch (e) {
                console.error('Failed to parse manualLinks:', e);
            }
        }

        // Generate internal links (auto + manual merge or manual only)
        let processedContent = content;
        let internalLinksApplied: string[] = [];

        if (useAutoLinks || parsedManualLinks.length > 0) {
            const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }) : [];

            const linkResult = generateInternalLinks({
                content,
                autoLinks: autoLinkMappings,
                manualLinks: parsedManualLinks,
                useAutoLinks,
                maxLinksPerPost: config.maxInternalLinksPerPost,
            });

            processedContent = linkResult.processedContent;
            internalLinksApplied = linkResult.linksApplied;
        }

        // Parse manual SEO if provided as JSON string
        let parsedManualSEO = {};
        if (manualSEO) {
            try {
                parsedManualSEO = typeof manualSEO === 'string' ? JSON.parse(manualSEO) : manualSEO;
            } catch (e) {
                console.error('Failed to parse manualSEO:', e);
            }
        }

        const newBlog = new Blog({
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
            slug: uniqueSlug,
            autoSEO: useAutoSEO,
            autoInternalLinks: useAutoLinks,
            metaTitle,
            metaDescription,
            metaKeywords,
            manualSEO: parsedManualSEO,
            manualLinks: parsedManualLinks,
            processedContent,
            internalLinksApplied,
        });

        await newBlog.save();
        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
