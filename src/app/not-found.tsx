import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | ColorKits',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="flex -space-x-2">
            <span className="w-8 h-8 rounded-full bg-rose-500" />
            <span className="w-8 h-8 rounded-full bg-amber-500" />
            <span className="w-8 h-8 rounded-full bg-emerald-500" />
            <span className="w-8 h-8 rounded-full bg-blue-500" />
          </div>
        </div>
        <h1 className="text-7xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
