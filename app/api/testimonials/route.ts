import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { isAdminRequest } from '@/lib/cache';

export async function GET(request: NextRequest) {
  // Skip caching for admin requests
  const isAdmin = isAdminRequest(request);
  
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    const query = approved === 'true' ? { approved: true } : {};
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    
    const response = NextResponse.json(testimonials);
    
    // No cache for admin requests
    if (isAdmin) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

