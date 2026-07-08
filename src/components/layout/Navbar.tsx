'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { navItems } from '@/lib/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpand, setMobileExpand] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openDropdown])

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white shrink-0">
            <span className="text-rose-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            ColorKits
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/' ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.startsWith('/blog') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/learn"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.startsWith('/learn') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Learn
            </Link>
            <div ref={dropdownRef} className="flex items-center gap-1">
              {navItems.map(item => (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      openDropdown === item.label ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                    <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && item.children && (
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.href) ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 font-medium' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === '/' ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname?.startsWith('/blog') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname?.startsWith('/learn') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Learn
            </Link>
            {navItems.map(item => (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpand(mobileExpand === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  {item.label}
                  <svg className={`w-3.5 h-3.5 transition-transform ${mobileExpand === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExpand === item.label && item.children && (
                  <div className="ml-4 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-1 pb-1">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-1.5 rounded-lg text-sm ${
                          isActive(child.href) ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 font-medium' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
