import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'ColorKits disclaimer.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Disclaimer</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>The color tools provided on ColorKits are for informational purposes only. While we strive for accuracy, we make no guarantees about the precision of color conversions. Always verify critical color values with professional tools.</p>
      </div>
    </div>
  )
}
