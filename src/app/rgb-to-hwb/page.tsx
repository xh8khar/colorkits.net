import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HWB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to HWB (Hue, Whiteness, Blackness) format instantly. Free online RGB to HWB converter for CSS Color Module Level 4 format support.',
  keywords: ['rgb to hwb', 'rgb to hwb converter', 'rgb color to hwb', 'rgb to hwb calculator', 'hwb converter'],
  openGraph: {
    title: 'RGB to HWB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HWB (Hue, Whiteness, Blackness) format instantly.',
  },
  twitter: {
    title: 'RGB to HWB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HWB (Hue, Whiteness, Blackness) format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
