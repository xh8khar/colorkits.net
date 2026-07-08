'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const onCloseRef = useRef(onClose)
  const savedExpandedRef = useRef<Set<string>>(new Set())
  const prevSearchRef = useRef('')

  onCloseRef.current = onClose

  useEffect(() => {
    onCloseRef.current()
  }, [pathname])

  useEffect(() => {
    const activeCategory = navItems.find(item =>
      item.children?.some(child => pathname === child.href || pathname?.startsWith(child.href))
    )
    if (activeCategory) {
      setExpandedCategories(prev => new Set(prev).add(activeCategory.label))
    }
  }, [pathname])

  useEffect(() => {
    const el = document.querySelector('[data-sidebar-active]')
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCloseRef.current()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const s = search.trim()
  useEffect(() => {
    if (s && !prevSearchRef.current) {
      savedExpandedRef.current = new Set(expandedCategories)
    }
    if (s) {
      const q = s.toLowerCase()
      const matching = new Set<string>()
      navItems.forEach(item => {
        if (item.children?.some(c => c.label.toLowerCase().includes(q))) {
          matching.add(item.label)
        }
      })
      setExpandedCategories(matching)
    } else if (prevSearchRef.current) {
      if (savedExpandedRef.current.size) {
        setExpandedCategories(savedExpandedRef.current)
        savedExpandedRef.current = new Set()
      }
    }
    prevSearchRef.current = s
  }, [s])

  const toggleCategory = (label: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const filteredNavItems = useMemo(() => {
    if (!s) return navItems
    const q = s.toLowerCase()
    return navItems
      .map(item => {
        if (!item.children) return item
        const filteredChildren = item.children.filter(child =>
          child.label.toLowerCase().includes(q)
        )
        return { ...item, children: filteredChildren }
      })
      .filter(item => !item.children || item.children.length > 0)
  }, [s])

  const hasActiveChild = (label: string) => {
    const item = navItems.find(i => i.label === label)
    return item?.children?.some(child => isActive(child.href)) ?? false
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col ${
          /* Mobile: fixed overlay drawer */
          isOpen ? 'fixed top-0 left-0 z-50 h-full translate-x-0 pt-14' : 'fixed top-0 left-0 z-50 h-full -translate-x-full'
        } md:static md:z-auto md:translate-x-0 md:h-screen md:sticky md:top-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-end h-14 px-4 md:hidden shrink-0">
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-3 pt-3 pb-2 shrink-0">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          {filteredNavItems.map(item => {
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              )
            }

            const isExpanded = expandedCategories.has(item.label)
            const anyActive = hasActiveChild(item.label)

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleCategory(item.label)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    anyActive
                      ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{item.label}</span>
                    <span className="shrink-0 text-xs bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full leading-none">
                      {item.children.length}
                    </span>
                  </span>
                  <svg
                    className={`shrink-0 w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="ml-2 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-0.5 pb-1 mt-0.5">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        data-sidebar-active={isActive(child.href) || undefined}
                        className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          isActive(child.href)
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 font-medium'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="px-3 py-3 shrink-0" />
      </aside>
    </>
  )
}
