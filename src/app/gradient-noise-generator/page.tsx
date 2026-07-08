import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Noise Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient noise with customizable options. Free online gradient noise generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['noise gradient', 'gradient noise', 'noise texture gradient', 'gradient with noise', 'perlin noise gradient'],
  openGraph: {
    title: 'Gradient Noise Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient noise with customizable options.',
  },
  twitter: {
    title: 'Gradient Noise Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient noise with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
