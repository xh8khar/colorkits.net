import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'ColorKits cookie policy.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Cookie Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>ColorKits uses a single cookie to store your theme preference (light/dark mode). No tracking, analytics, or advertising cookies are used.</p>
      </div>
    </div>
  )
}
