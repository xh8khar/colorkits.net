'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  q: string
  a: string
}

interface RelatedTool {
  name: string
  href: string
  description: string
}

interface ToolContentProps {
  title: string
  description: string
  about?: string
  howToUse: string[]
  faq: FAQItem[]
  relatedTools?: RelatedTool[]
  children: React.ReactNode
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <svg
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ToolContent({
  title,
  description,
  about,
  howToUse,
  faq,
  relatedTools,
  children,
}: ToolContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      {children}

      <hr className="my-12 border-slate-200 dark:border-slate-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About {title}</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{about || description}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use</h2>
        <ol className="space-y-3">
          {howToUse.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h2>
        <FAQAccordion items={faq} />
      </section>

      {relatedTools && relatedTools.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-sm transition-all group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}