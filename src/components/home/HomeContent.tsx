'use client'

import { useState } from 'react'
import ToolGrid from './ToolGrid'

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Color Tools for Developers
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Fast, free &amp; privacy-friendly color tools. All processing happens in your browser — nothing is uploaded to servers.
          </p>
          <div className="max-w-md mx-auto">
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
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ToolGrid searchQuery={searchQuery} />
      </section>
    </div>
  )
}
