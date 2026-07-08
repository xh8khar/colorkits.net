import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Universal Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert colors between HEX, RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, and HWB formats. Free online universal color converter with real-time preview and batch conversion support.',
  keywords: ['universal color converter', 'universal color converter tool', 'universal color converter online', 'universal color converter color tool'],
  openGraph: {
    title: 'Universal Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert colors between HEX, RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, and HWB formats.',
  },
  twitter: {
    title: 'Universal Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert colors between HEX, RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, and HWB formats.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
