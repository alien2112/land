import mongoose, { Schema, Model } from "mongoose";

export interface IBlog {
    title: string;
    titleEn?: string;
    titleAr?: string;
    content: string;
    contentEn?: string;
    contentAr?: string;
    excerpt: string;
    excerptEn?: string;
    excerptAr?: string;
    image: string;
    author: string;
    featured: boolean;
    slug: string;
    autoSEO?: boolean;
    autoInternalLinks?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    manualSEO?: {
        title?: string;
        description?: string;
        keywords?: string[];
        ogImage?: string;
        canonicalUrl?: string;
        noIndex?: boolean;
        noFollow?: boolean;
    };
    manualLinks?: any[];
    processedContent?: string;
    internalLinksApplied?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        titleEn: { type: String },
        titleAr: { type: String },
        content: { type: String, required: true },
        contentEn: { type: String },
        contentAr: { type: String },
        excerpt: { type: String },
        excerptEn: { type: String },
        excerptAr: { type: String },
        image: { type: String, required: true },
        author: { type: String, required: true },
        featured: { type: Boolean, default: false },
        slug: { type: String, required: true, unique: true },
        autoSEO: { type: Boolean, default: true },
        autoInternalLinks: { type: Boolean, default: true },
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: { type: [String] },
        manualSEO: {
            title: String,
            description: String,
            keywords: [String],
            ogImage: String,
            canonicalUrl: String,
            noIndex: Boolean,
            noFollow: Boolean,
        },
        manualLinks: { type: Array },
        processedContent: { type: String },
        internalLinksApplied: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
