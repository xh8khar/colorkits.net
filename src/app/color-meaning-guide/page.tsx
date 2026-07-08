import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Meaning Guide - Free Online Color Tool | ColorKits',
  description: 'Browse and explore color meaning guide for your design projects. Free online color meaning guide reference tool for designers and developers. Find colors with search, filter, and copy-ready color values.',
  keywords: ['color meaning guide', 'color meaning guide reference', 'color meaning guide library', 'color meaning guide online', 'color reference'],
  openGraph: {
    title: 'Color Meaning Guide - Free Online Color Tool | ColorKits',
    description: 'Browse and explore color meaning guide for your design projects.',
  },
  twitter: {
    title: 'Color Meaning Guide - Free Online Color Tool | ColorKits',
    description: 'Browse and explore color meaning guide for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
