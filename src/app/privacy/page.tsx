import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ColorKits privacy policy — how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Last updated: 2025</p>
        <h2>Information We Collect</h2>
        <p>We do not collect, store, or transmit any color data you paste or upload. All processing happens entirely in your browser using client-side JavaScript.</p>
        <h2>Cookies</h2>
        <p>We use essential cookies for site functionality (theme preference). No tracking or advertising cookies are used.</p>
        <h2>Data Security</h2>
        <p>No user data is stored on our servers. All conversions are 100% client-side.</p>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:contact@colorkits.net" className="text-rose-500">contact@colorkits.net</a></p>
      </div>
    </div>
  )
}
