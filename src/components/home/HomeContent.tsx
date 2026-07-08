'use client'

import { useState } from 'react'
import { tools } from '@/lib/navigation'
import ToolCard from './ToolCard'

const categoryGroups: { label: string; value: string; description: string; color: string }[] = [
  { label: 'Converters', value: 'converter', description: 'Convert between HEX, RGB, HSL, CMYK, LAB & more', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: 'Pickers', value: 'picker', description: 'Pick and fine-tune colors with visual tools', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { label: 'Palettes', value: 'palette', description: 'Generate beautiful color palettes & schemes', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Gradients', value: 'gradient', description: 'Create linear, radial, conic & mesh gradients', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Accessibility', value: 'accessibility', description: 'Check contrast & simulate color blindness', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'Image', value: 'image', description: 'Extract palettes & analyze colors from images', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { label: 'Adjustments', value: 'adjustment', description: 'Tint, shade, mix, blend & adjust colors', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { label: 'Reference', value: 'reference', description: 'Browse CSS, Tailwind, brand & flag colors', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'Utilities', value: 'utility', description: 'Name, compare, export & generate color data', color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
]

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all')

  const filtered = tools.filter(t => {
    const matchesSearch = !searchQuery.trim() || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const categoryCounts = categoryGroups.map(g => ({ ...g, count: tools.filter(t => t.category === g.value).length }))

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full bg-rose-500" />
            <span className="w-8 h-8 rounded-full bg-amber-500" />
            <span className="w-8 h-8 rounded-full bg-emerald-500" />
            <span className="w-8 h-8 rounded-full bg-blue-500" />
            <span className="w-8 h-8 rounded-full bg-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Color Tools for Developers
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Fast, free &amp; privacy-friendly color tools. All processing happens in your browser — nothing is uploaded to servers.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tools.length} tools
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              100% client-side, nothing uploaded
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free, no sign-up
            </span>
          </div>
        </div>
      </section>

      {/* Search results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {searchQuery.trim() ? (
          <>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Results for &ldquo;{searchQuery}&rdquo; ({filtered.length})
            </h2>
            {filtered.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No tools found. Try a different search term.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map(t => <ToolCard key={t.id} tool={t} />)}</div>
            )}
          </>
        ) : (
          <>
            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {categoryCounts.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(activeCategory === cat.value ? 'all' : cat.value)}
                  className={`group text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.value
                      ? 'border-rose-300 dark:border-rose-600 bg-rose-50 dark:bg-rose-900/20 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{cat.label}</h3>
                    <span className="ml-auto text-xs font-medium text-slate-400">{cat.count}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>All</button>
              {categoryGroups.map(cat => (
                <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.value ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{cat.label}</button>
              ))}
            </div>

            {/* Tool grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
