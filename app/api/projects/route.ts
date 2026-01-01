import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { CACHE_DURATIONS, getCacheControlHeader, invalidateProjectsCache, isAdminRequest } from '@/lib/cache';

export async function GET(request: NextRequest) {
  // Skip caching for admin requests
  const isAdmin = isAdminRequest(request);
  
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const query: any = {};
    if (featured === 'true') query.featured = true;
    if (category && category !== 'ALL') query.category = category;
    const projects = await Project.find(query).sort({ createdAt: -1 });
    
    const response = NextResponse.json(projects);
    
    // Add cache headers only for non-admin requests
    if (!isAdmin) {
      response.headers.set(
        'Cache-Control',
        getCacheControlHeader(CACHE_DURATIONS.PROJECTS)
      );
    } else {
      // No cache for admin
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const project = await Project.create(body);
    
    // Invalidate cache after creating a new project
    invalidateProjectsCache();
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

