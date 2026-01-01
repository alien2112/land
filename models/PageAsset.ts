import mongoose, { Schema, Document } from 'mongoose';

export interface IPageAsset extends Document {
    page: string;
    section: string;
    key: string;
    imageUrl: string;
    alt?: string;
    altAr?: string;
    text?: string;
    textAr?: string;
    order?: number;
}

const PageAssetSchema: Schema = new Schema({
    page: { type: String, required: true },
    section: { type: String, required: true },
    key: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: String,
    altAr: String,
    text: String,
    textAr: String,
    order: { type: Number, default: 0 }
}, { timestamps: true });

PageAssetSchema.index({ page: 1, section: 1, key: 1 }, { unique: true });

export default mongoose.models.PageAsset || mongoose.model<IPageAsset>('PageAsset', PageAssetSchema);
