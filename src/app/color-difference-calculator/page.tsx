import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Difference Calculator - Free Online Color Tool | ColorKits',
  description: 'Calculate the difference and similarity between colors for design analysis. Free online color difference calculator for designers and developers. Measure color distance using Delta E, Euclidean distance, and perceptual difference formulas.',
  keywords: ['color difference', 'delta e calculator', 'color distance', 'color difference calculator tool', 'color similarity'],
  openGraph: {
    title: 'Color Difference Calculator - Free Online Color Tool | ColorKits',
    description: 'Calculate the difference and similarity between colors for design analysis.',
  },
  twitter: {
    title: 'Color Difference Calculator - Free Online Color Tool | ColorKits',
    description: 'Calculate the difference and similarity between colors for design analysis.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
