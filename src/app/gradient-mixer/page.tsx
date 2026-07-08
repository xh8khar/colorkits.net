import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Mixer - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient mixer with customizable options. Free online gradient mixer generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient mixer', 'gradient blender', 'mix gradients', 'gradient combiner', 'gradient tool'],
  openGraph: {
    title: 'Gradient Mixer - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient mixer with customizable options.',
  },
  twitter: {
    title: 'Gradient Mixer - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient mixer with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
