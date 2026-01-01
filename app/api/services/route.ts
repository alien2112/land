import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { CACHE_DURATIONS, getCacheControlHeader, invalidateServicesCache, isAdminRequest } from '@/lib/cache';

export async function GET(request: NextRequest) {
  // Skip caching for admin requests
  const isAdmin = isAdminRequest(request);
  
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const query = featured === 'true' ? { featured: true } : {};
    const services = await Service.find(query).sort({ createdAt: -1 });
    
    const response = NextResponse.json(services);
    
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
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const service = await Service.create(body);
    
    // Invalidate cache after creating a new service
    invalidateServicesCache();
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

