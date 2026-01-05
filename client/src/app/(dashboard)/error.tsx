// src/app/(dashboard)/error.tsx
'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void; 
}

export default function DashboardError({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          We're having trouble loading this page. This could be due to a temporary issue.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left bg-gray-50 p-4 rounded-lg text-sm">
            <summary className="font-medium text-gray-700 cursor-pointer mb-2">
              Error details (development only)
            </summary>
            <pre className="text-xs text-red-600 whitespace-pre-wrap overflow-x-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Reload Page
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          If the problem persists, contact support.
        </p>
      </div>
    </div>
  );
}