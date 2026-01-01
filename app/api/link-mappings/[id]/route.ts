import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import InternalLinkMapping from '@/models/InternalLinkMapping';
import { processAllBlogs } from '@/lib/blog-processor';

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(req: Request, { params }: Params) {
    await connectDB();
    try {
        const { id } = await params;
        const body = await req.json();

        // Remove _id from body if present to avoid immutable field error
        delete body._id;

        const updatedMapping = await InternalLinkMapping.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedMapping) {
            return NextResponse.json({ message: 'Mapping not found' }, { status: 404 });
        }

        // Trigger regeneration
        try {
            console.log('Regenerating blogs after updating mapping...');
            await processAllBlogs();
            console.log('Blog regeneration complete.');
        } catch (regenError) {
            console.error('Error regenerating blogs:', regenError);
        }

        return NextResponse.json(updatedMapping);
    } catch (error: any) {
        console.error('Error updating link mapping:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    await connectDB();
    try {
        const { id } = await params;

        const deletedMapping = await InternalLinkMapping.findByIdAndDelete(id);

        if (!deletedMapping) {
            return NextResponse.json({ message: 'Mapping not found' }, { status: 404 });
        }

        // Trigger regeneration
        try {
            console.log('Regenerating blogs after deleting mapping...');
            await processAllBlogs();
            console.log('Blog regeneration complete.');
        } catch (regenError) {
            console.error('Error regenerating blogs:', regenError);
        }

        return NextResponse.json({ message: 'Mapping deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting link mapping:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
