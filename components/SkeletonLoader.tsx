'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'testimonial' | 'project' | 'service';
  count?: number;
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-800 rounded w-3/4 mb-4" />
        <div className="h-3 bg-gray-800 rounded w-full mb-2" />
        <div className="h-3 bg-gray-800 rounded w-5/6 mb-4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8 border border-gray-800">
      <div className="space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-800 rounded skeleton-shimmer" />
          ))}
        </div>
        {/* Text lines */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded w-full skeleton-shimmer" />
          <div className="h-4 bg-gray-800 rounded w-full skeleton-shimmer" />
          <div className="h-4 bg-gray-800 rounded w-3/4 skeleton-shimmer" />
        </div>
        {/* Author info */}
        <div className="border-t border-gray-800 pt-4 mt-6">
          <div className="h-4 bg-gray-800 rounded w-1/3 mb-2 skeleton-shimmer" />
          <div className="h-3 bg-gray-800 rounded w-1/2 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="group relative bg-[#111114] rounded-3xl overflow-hidden border border-white/30 flex flex-col">
      {/* Image skeleton */}
      <div className="relative w-full h-64 bg-gray-800 skeleton-shimmer">
        <div className="absolute top-4 right-4 w-16 h-6 bg-gray-700 rounded-full skeleton-shimmer" />
      </div>
      {/* Content skeleton */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="space-y-4">
          <div className="h-6 bg-gray-800 rounded w-3/4 skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full skeleton-shimmer" />
            <div className="h-4 bg-gray-800 rounded w-5/6 skeleton-shimmer" />
          </div>
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-800 rounded-full w-20 skeleton-shimmer" />
            <div className="h-6 bg-gray-800 rounded-full w-24 skeleton-shimmer" />
          </div>
          {/* Button skeleton */}
          <div className="h-12 bg-gray-800 rounded-xl w-full skeleton-shimmer mt-4" />
        </div>
      </div>
    </div>
  );
}

export function ServiceSkeleton() {
  return (
    <div className="h-full bg-[#111114] rounded-xl border border-white/20 p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        {/* Icon skeleton */}
        <div>
          <div className="w-16 h-16 bg-gray-800 rounded-lg skeleton-shimmer" />
        </div>
        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="h-7 bg-gray-800 rounded w-3/4 mb-3 skeleton-shimmer" />
          <div className="space-y-2 mb-6 flex-grow">
            <div className="h-4 bg-gray-800 rounded w-full skeleton-shimmer" />
            <div className="h-4 bg-gray-800 rounded w-5/6 skeleton-shimmer" />
            <div className="h-4 bg-gray-800 rounded w-4/5 skeleton-shimmer" />
          </div>
          {/* Features skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-800 rounded w-full skeleton-shimmer" />
            <div className="h-4 bg-gray-800 rounded w-5/6 skeleton-shimmer" />
          </div>
          {/* Button skeleton */}
          <div className="h-12 bg-gray-800 rounded-lg w-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonLoader({ variant = 'testimonial', count = 3, className = '' }: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {skeletons.map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={className}
        >
          {variant === 'testimonial' && <TestimonialSkeleton />}
          {variant === 'project' && <ProjectSkeleton />}
          {variant === 'service' && <ServiceSkeleton />}
        </motion.div>
      ))}
    </>
  );
}

