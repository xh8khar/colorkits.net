'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tools } from '@/lib/navigation'
import type { Tool, ToolCategory } from '@/types'

const categoryGroups: { label: string; value: ToolCategory }[] = [
  { label: 'Converters', value: 'converter' },
  { label: 'Pickers', value: 'picker' },
  { label: 'Palettes', value: 'palette' },
  { label: 'Gradients', value: 'gradient' },
  { label: 'Accessibility', value: 'accessibility' },
  { label: 'Image', value: 'image' },
  { label: 'Adjustments', value: 'adjustment' },
  { label: 'Reference', value: 'reference' },
  { label: 'Utilities', value: 'utility' },
]

const categoryColors: Record<string, string> = {
  converter: 'bg-blue-500',
  picker: 'bg-amber-500',
  palette: 'bg-purple-500',
  gradient: 'bg-pink-500',
  accessibility: 'bg-emerald-500',
  image: 'bg-orange-500',
  adjustment: 'bg-teal-500',
  reference: 'bg-indigo-500',
  utility: 'bg-cyan-500',
}

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [search, setSearch] = useState('')

  const activeCategory = useMemo(
    () => tools.find(t => t.slug === pathname || pathname?.startsWith(t.slug + '/'))?.category,
    [pathname]
  )

  const [expanded, setExpanded] = useState<Set<ToolCategory>>(() => new Set(['converter']))

  useEffect(() => {
    if (activeCategory) {
      setExpanded(prev => (prev.has(activeCategory) ? prev : new Set(prev).add(activeCategory)))
    }
  }, [activeCategory])

  const toggleCategory = (cat: ToolCategory) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const query = search.trim().toLowerCase()
  const searchResults: Tool[] = query
    ? tools.filter(t => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query))
    : []

  const isActive = (slug: string) => pathname === slug || pathname === `${slug}/`

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <img src="/favicon.svg" alt="ColorKits" className="w-7 h-7" />
            ColorKits
          </Link>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="relative">
            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${tools.length} tools...`}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {query ? (
            <div className="px-2">
              <p className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
              </p>
              {searchResults.length === 0 ? (
                <p className="px-2 py-4 text-sm text-slate-500 dark:text-slate-400">No tools found.</p>
              ) : (
                searchResults.map(tool => (
                  <Link
                    key={tool.id}
                    href={tool.slug}
                    onClick={onMobileClose}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive(tool.slug)
                        ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryColors[tool.category] || categoryColors.utility}`} />
                    <span className="truncate">{tool.name}</span>
                  </Link>
                ))
              )}
            </div>
          ) : (
            <div className="px-2 space-y-0.5">
              {categoryGroups.map(group => {
                const groupTools = tools.filter(t => t.category === group.value)
                const isOpen = expanded.has(group.value)
                return (
                  <div key={group.value}>
                    <button
                      onClick={() => toggleCategory(group.value)}
                      className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${categoryColors[group.value]}`} />
                        {group.label}
                        <span className="text-xs font-normal text-slate-400">({groupTools.length})</span>
                      </span>
                      <svg className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="ml-2 mb-1 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 animate-fade-in">
                        {groupTools.map(tool => (
                          <Link
                            key={tool.id}
                            href={tool.slug}
                            onClick={onMobileClose}
                            className={`block px-2 py-1.5 rounded-lg text-sm truncate transition-colors ${
                              isActive(tool.slug)
                                ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
