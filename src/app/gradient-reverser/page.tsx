import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Reverser - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient reverser with customizable options. Free online gradient reverser generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient reverser', 'reverse gradient', 'flip gradient', 'gradient direction', 'invert gradient'],
  openGraph: {
    title: 'Gradient Reverser - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient reverser with customizable options.',
  },
  twitter: {
    title: 'Gradient Reverser - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient reverser with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
