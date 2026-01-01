import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  image: string; // GridFS file ID
  alt: string;
  altAr?: string;
  category?: 'cutting' | 'perforation';
  categoryAr?: 'قص' | 'تخريم' | 'قطع' | 'حفر';
  order: number; // For ordering images in the gallery
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    altAr: {
      type: String,
    },
    category: {
      type: String,
      enum: ['cutting', 'perforation'],
      default: 'cutting',
    },
    categoryAr: {
      type: String,
      enum: ['قص', 'تخريم', 'قطع', 'حفر'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);






