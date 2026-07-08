import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to OKLab Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to OKLab color space values instantly. Free online HEX to OKLab converter for perceptually uniform color representation in modern web development.',
  keywords: ['hex to oklab', 'hex to oklab converter', 'oklab converter', 'hex to oklab color', 'oklab color space'],
  openGraph: {
    title: 'HEX to OKLab Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to OKLab color space values instantly.',
  },
  twitter: {
    title: 'HEX to OKLab Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to OKLab color space values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
