import Link from 'next/link'
import type { Tool } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  palette: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  layout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  eye: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  eyedropper: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  blend: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  sun: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  contrast: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  thermometer: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
}

const categoryColors: Record<string, string> = {
  converter: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500',
  picker: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-500',
  palette: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500',
  gradient: 'border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-500',
  accessibility: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-500',
  image: 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-500',
  adjustment: 'border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-500',
  reference: 'border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-500',
  utility: 'border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-500',
}

const categoryBadgeColors: Record<string, string> = {
  converter: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  picker: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  palette: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  gradient: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  accessibility: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  image: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  adjustment: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  reference: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  utility: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
}

const categoryLabels: Record<string, string> = {
  converter: 'Converter',
  picker: 'Picker',
  palette: 'Palette',
  gradient: 'Gradient',
  accessibility: 'Accessibility',
  image: 'Image',
  adjustment: 'Adjustment',
  reference: 'Reference',
  utility: 'Utility',
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.slug}
      className={`group block p-5 rounded-xl border bg-white dark:bg-slate-900 transition-all duration-200 hover:shadow-lg ${categoryColors[tool.category] || 'border-slate-200 dark:border-slate-700'}`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className={`p-2 rounded-lg shrink-0 ${categoryBadgeColors[tool.category] || 'bg-slate-100 text-slate-600'}`}>
          {iconMap[tool.icon] || iconMap.palette}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{tool.description}</p>
        </div>
      </div>
      <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${categoryBadgeColors[tool.category] || 'bg-slate-100 text-slate-600'}`}>
        {categoryLabels[tool.category] || tool.category}
      </span>
    </Link>
  )
}
