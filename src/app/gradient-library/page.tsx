import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Library - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient library with customizable options. Free online gradient library generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient library', 'css gradient examples', 'gradient collection', 'premade gradients', 'gradient inspiration'],
  openGraph: {
    title: 'Gradient Library - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient library with customizable options.',
  },
  twitter: {
    title: 'Gradient Library - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient library with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
