import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to LAB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to CIELAB (L*a*b*) color space values instantly. Free online HEX to LAB converter for accurate, device-independent color representation.',
  keywords: ['hex to lab', 'hex to lab converter', 'lab color converter', 'hex to lab color', 'cielab converter'],
  openGraph: {
    title: 'HEX to LAB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to CIELAB (L*a*b*) color space values instantly.',
  },
  twitter: {
    title: 'HEX to LAB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to CIELAB (L*a*b*) color space values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
