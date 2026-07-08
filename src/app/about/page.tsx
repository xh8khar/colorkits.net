import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'ColorKits is a free collection of browser-based color tools for developers.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About ColorKits</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>ColorKits is a free collection of browser-based color tools for developers. Convert between color formats, generate palettes, check contrast ratios, and more.</p>
        <p>Every tool runs entirely in your browser using JavaScript. Nothing you paste or upload is ever sent to a server — which makes ColorKits safe to use with sensitive or proprietary design work.</p>
        <h2>Why ColorKits?</h2>
        <ul>
          <li><strong>Privacy first</strong> — All processing happens client-side. No data leaves your device.</li>
          <li><strong>Blazing fast</strong> — Tools run instantly with no network round-trip.</li>
          <li><strong>Completely free</strong> — No subscriptions, no hidden costs, no credit card required.</li>
          <li><strong>No sign-up</strong> — Start using any tool immediately, no account needed.</li>
        </ul>
      </div>
    </div>
  )
}
