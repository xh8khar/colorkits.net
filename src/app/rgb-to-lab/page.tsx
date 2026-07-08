import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to LAB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to CIELAB (L*a*b*) color space instantly. Free online RGB to LAB converter for accurate, device-independent color representation and analysis.',
  keywords: ['rgb to lab', 'rgb to lab converter', 'rgb color to lab', 'rgb to cielab', 'lab converter'],
  openGraph: {
    title: 'RGB to LAB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to CIELAB (L*a*b*) color space instantly.',
  },
  twitter: {
    title: 'RGB to LAB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to CIELAB (L*a*b*) color space instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
