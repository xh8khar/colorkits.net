'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/navigation'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  onMenuClick: () => void
}

const rightLinks = [
  { label: 'Blog', href: '/blog/' },
  { label: 'Learn', href: '/learn/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
]

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  const categoryItems = navItems.filter(item => item.children && item.children.length > 0)

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href)
  const isChildActive = (item: (typeof navItems)[number]) =>
    item.children?.some(child => isActive(child.href)) ?? false

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white shrink-0">
            <span className="text-rose-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            ColorKits
          </Link>
        </div>

        <div ref={dropdownRef} className="hidden md:flex items-center gap-1">
          {categoryItems.map(item => {
            const anyActive = isChildActive(item)
            return (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    anyActive || openDropdown === item.label
                      ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full leading-none">
                    {item.children!.length}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg py-1 max-h-80 overflow-y-auto z-50">
                    {item.children!.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-1.5 text-sm transition-colors ${
                          isActive(child.href)
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
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
        </div>

        <div className="flex items-center gap-1">
          {rightLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden md:inline-flex px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
