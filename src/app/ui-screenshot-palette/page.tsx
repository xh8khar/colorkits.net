import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Screenshot Palette - Free Online Color Tool | ColorKits',
  description: 'Apply ui screenshot palette effects to colors and images. Free online blend mode generator for designers and developers. Experiment with layer blending effects and see real-time results.',
  keywords: ['ui screenshot palette', 'ui screenshot palette generator', 'blend mode tool', 'ui screenshot palette effect', 'color blending'],
  openGraph: {
    title: 'UI Screenshot Palette - Free Online Color Tool | ColorKits',
    description: 'Apply ui screenshot palette effects to colors and images.',
  },
  twitter: {
    title: 'UI Screenshot Palette - Free Online Color Tool | ColorKits',
    description: 'Apply ui screenshot palette effects to colors and images.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
