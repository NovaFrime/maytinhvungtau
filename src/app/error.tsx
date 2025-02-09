'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Refresh Page
          </Button>
          <Button onClick={reset}>
            Try Again
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600">
            If the problem persists, please try these options:
          </p>
          <div className="space-x-4 text-sm">
            <Link
              href="/support"
              className="text-blue-600 hover:text-blue-700"
            >
              Contact Support
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700"
            >
              Return Home
            </Link>
          </div>
        </div>

        {/* Technical Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md text-left">
            <p className="text-sm font-medium text-gray-900">Technical Details:</p>
            <pre className="mt-2 text-xs text-gray-600 overflow-auto">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}