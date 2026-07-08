import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate tailwind gradient for your design projects. Free online tailwind gradient with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['tailwind gradient', 'tailwind gradient generator', 'tailwind gradient tool', 'tailwind gradient online', 'color generator'],
  openGraph: {
    title: 'Tailwind Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tailwind gradient for your design projects.',
  },
  twitter: {
    title: 'Tailwind Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tailwind gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
