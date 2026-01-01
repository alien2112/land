import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import SEOConfig from '@/models/SEOConfig';
import InternalLinkMapping from '@/models/InternalLinkMapping';
import { generateInternalLinks } from '@/lib/internal-linking';

/**
 * Regenerate internal links for all blogs based on current mappings and config
 */
export async function processAllBlogs() {
    await connectDB();

    console.log('Starting blog reprocessing...');

    // 1. Get Global Config
    let config: any = await SEOConfig.findOne().sort({ createdAt: -1 });
    if (!config) {
        // Default config if missing
        config = {
            globalAutoInternalLinks: true,
            maxInternalLinksPerPost: 5
        };
    }

    const globalAutoLinks = config ? config.globalAutoInternalLinks : true;
    const maxLinks = config ? (config.maxInternalLinksPerPost || 5) : 5;

    // 2. Get Active Mappings
    // sort by priority desc
    const linkMappings = await InternalLinkMapping.find({ isActive: true }).sort({ priority: -1 }).lean();

    // 3. Get All Blogs
    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs to check.`);

    // 4. Process each
    let updatedCount = 0;

    for (const blog of blogs) {
        // Logic:
        // If blog.autoInternalLinks is explicitly FALSE, do not auto link.
        // If blog.autoInternalLinks is TRUE or UNDEFINED, check global setting.
        // Actually, usually local override global. 
        // Let's assume: if blog.autoInternalLinks is defined, use it. Else use global.

        let useAuto = globalAutoLinks;
        if (typeof blog.autoInternalLinks === 'boolean') {
            useAuto = blog.autoInternalLinks;
        }

        // Even if useAuto is false, we might still have manual links to process? 
        // The generateInternalLinks function handles manual links separately from auto links.
        // But if useAuto is false, we pass useAutoLinks=false to generator.

        // Also, we must always re-process from RAW content to clear old links if settings changed.
        // So we always run generateInternalLinks, but maybe with empty mappings if disabled.

        const result = generateInternalLinks({
            content: blog.content, // Using raw content
            autoLinks: linkMappings,
            manualLinks: blog.manualLinks || [],
            useAutoLinks: useAuto,
            maxLinksPerPost: maxLinks
        });

        // Only update database if changed
        if (blog.processedContent !== result.processedContent) {
            blog.processedContent = result.processedContent;
            blog.internalLinksApplied = result.linksApplied;
            await blog.save();
            updatedCount++;
        }
    }

    console.log(`Reprocessed ${updatedCount} blogs.`);
    return updatedCount;
}
