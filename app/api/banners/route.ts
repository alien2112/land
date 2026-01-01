import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { CACHE_DURATIONS, getCacheControlHeader, invalidateBannersCache, invalidateImageCache, isAdminRequest } from '@/lib/cache';

export async function GET(request: NextRequest) {
  // Skip caching for admin requests
  const isAdmin = isAdminRequest(request);
  
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const query = page ? { page } : {};
    const banners = await Banner.find(query);
    
    const response = NextResponse.json(banners);
    
    // Add cache headers only for non-admin requests
    // Banners are cached for 30 minutes like images
    if (!isAdmin) {
      response.headers.set(
        'Cache-Control',
        getCacheControlHeader(CACHE_DURATIONS.IMAGES)
      );
    } else {
      // No cache for admin
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const { page, image } = body;
    const banner = await Banner.findOneAndUpdate(
      { page },
      { page, image },
      { new: true, upsert: true, runValidators: true }
    );
    
    // Invalidate cache after updating banner
    invalidateBannersCache();
    
    // If image was updated, invalidate image cache
    if (image) {
      invalidateImageCache(image);
    }
    
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

