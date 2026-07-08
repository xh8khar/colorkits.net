'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getToolContent } from '@/lib/tool-content'
import { tools } from '@/lib/navigation'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
      {children}
    </h2>
  )
}

export default function ContentSections() {
  const pathname = usePathname()
  const slug = pathname.replace(/^\//, '').replace(/\/$/, '')
  const content = getToolContent(slug)
  const tool = tools.find(t => t.id === slug)

  if (!content || !tool) return null

  return (
    <div className="mt-16 space-y-12 border-t border-slate-200 dark:border-slate-700 pt-12">
      <section>
        <SectionHeading>
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          What Is {tool.name}?
        </SectionHeading>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-3 prose prose-slate dark:prose-invert max-w-none">
          {content.whatIs.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          How to Use {tool.name}
        </SectionHeading>
        <ol className="space-y-4">
          {content.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-slate-600 dark:text-slate-400 leading-relaxed pt-1.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading>
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Frequently Asked Questions
        </SectionHeading>
        <div className="space-y-3">
          {content.faq.map((item, i) => (
            <details key={i} className="group rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span>{item.question}</span>
                <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          Related Tools
        </SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {content.relatedTools.map(rt => {
            const t = tools.find(t => t.id === rt.slug)
            if (!t) return null
            return (
              <Link
                key={rt.slug}
                href={`/${rt.slug}/`}
                className="group block p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-sm transition-all"
              >
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate">
                  {rt.name}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 capitalize">{t.category}</div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
