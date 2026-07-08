import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ColorKits terms of service.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Terms of Service</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>By using ColorKits, you agree to these terms. All tools are provided free of charge. Tools are provided &quot;as is&quot; without warranty.</p>
      </div>
    </div>
  )
}
