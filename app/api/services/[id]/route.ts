import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { CACHE_DURATIONS, getCacheControlHeader, invalidateServicesCache, invalidateImageCache, isAdminRequest } from '@/lib/cache';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Skip caching for admin requests
  const isAdmin = isAdminRequest(request);
  
  await connectDB();
  try {
    const { id } = await params;
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    const response = NextResponse.json(service);
    
    // Add cache headers only for non-admin requests
    if (!isAdmin) {
      response.headers.set(
        'Cache-Control',
        getCacheControlHeader(CACHE_DURATIONS.SERVICES)
      );
    } else {
      // No cache for admin
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const { id } = await params;
    const body = await request.json();
    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    // Invalidate cache after updating service
    invalidateServicesCache();
    
    // If image was updated, invalidate image cache
    if (body.image) {
      invalidateImageCache(body.image);
    }
    
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    // Invalidate cache after deleting service
    invalidateServicesCache();
    
    // If service had an image, invalidate image cache
    if (service.image) {
      invalidateImageCache(service.image);
    }
    
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

