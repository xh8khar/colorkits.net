import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Psychological Colors Guide - Free Online Color Tool | ColorKits',
  description: 'Browse and explore psychological colors guide for your design projects. Free online psychological colors guide reference tool for designers and developers. Find colors with search, filter, and copy-ready color values.',
  keywords: ['psychological colors guide', 'psychological colors guide reference', 'psychological colors guide library', 'psychological colors guide online', 'color reference'],
  openGraph: {
    title: 'Psychological Colors Guide - Free Online Color Tool | ColorKits',
    description: 'Browse and explore psychological colors guide for your design projects.',
  },
  twitter: {
    title: 'Psychological Colors Guide - Free Online Color Tool | ColorKits',
    description: 'Browse and explore psychological colors guide for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
