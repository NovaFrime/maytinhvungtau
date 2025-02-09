'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It might have been removed, renamed, or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button>
              Return Home
            </Button>
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-8 space-x-4 text-sm">
          <Link
            href="/support"
            className="text-blue-600 hover:text-blue-700"
          >
            Contact Support
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/sitemap"
            className="text-blue-600 hover:text-blue-700"
          >
            View Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
}