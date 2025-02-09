'use client';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-pulse mb-4">
          <LoadingSpinner size="lg" />
        </div>
        <div className="animate-pulse flex flex-col items-center gap-4">
          {/* Skeleton loading elements */}
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// Product Loading State
export function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
        {/* Image Skeleton */}
        <div className="aspect-square bg-gray-200 rounded-lg" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
          <div className="h-12 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// Products Grid Loading State
export function ProductsGridLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Search Results Loading State
export function SearchLoading() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Cart Loading State
export function CartLoading() {
  return (
    <div className="animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b">
          <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded" />
        </div>
      ))}
      <div className="p-4 space-y-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}