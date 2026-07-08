import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Mood Generator - Free Online Color Tool | ColorKits',
  description: 'Generate image mood for your design projects. Free online image mood with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['image mood', 'image mood generator', 'image mood tool', 'image mood online', 'color generator'],
  openGraph: {
    title: 'Image Mood Generator - Free Online Color Tool | ColorKits',
    description: 'Generate image mood for your design projects.',
  },
  twitter: {
    title: 'Image Mood Generator - Free Online Color Tool | ColorKits',
    description: 'Generate image mood for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
