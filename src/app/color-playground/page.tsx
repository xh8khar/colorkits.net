import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Playground - Free Online Color Tool | ColorKits',
  description: 'Experiment and play with colors in an interactive playground. Free online color playground for designers and developers. Mix, blend, and explore colors with real-time visual feedback and multiple tools.',
  keywords: ['color playground', 'color playground', 'color playground tool', 'color experiment', 'interactive color tool'],
  openGraph: {
    title: 'Color Playground - Free Online Color Tool | ColorKits',
    description: 'Experiment and play with colors in an interactive playground.',
  },
  twitter: {
    title: 'Color Playground - Free Online Color Tool | ColorKits',
    description: 'Experiment and play with colors in an interactive playground.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
