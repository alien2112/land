import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeSlide extends Document {
    title: string;
    titleAr: string;
    subtitle: string;
    subtitleAr: string;
    image: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const HomeSlideSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        titleAr: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        subtitleAr: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.HomeSlide || mongoose.model<IHomeSlide>('HomeSlide', HomeSlideSchema);
