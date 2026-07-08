import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Preview Tool - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient preview with customizable options. Free online gradient preview generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient preview', 'css gradient preview', 'gradient live preview', 'gradient visualizer', 'gradient tester'],
  openGraph: {
    title: 'Gradient Preview Tool - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient preview with customizable options.',
  },
  twitter: {
    title: 'Gradient Preview Tool - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient preview with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
