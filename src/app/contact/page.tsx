import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ColorKits team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
      <p className="text-slate-600 dark:text-slate-400">Email: <a href="mailto:contact@colorkits.net" className="text-rose-500 hover:text-rose-600">contact@colorkits.net</a></p>
    </div>
  )
}
