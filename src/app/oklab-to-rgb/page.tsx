import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLab to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert OKLab color space values to RGB format instantly. Free online OKLab to RGB converter for accurate color transformations using perceptually uniform color space.',
  keywords: ['oklab to rgb', 'oklab to rgb converter', 'oklab color to rgb', 'oklab to rgb value', 'oklab converter'],
  openGraph: {
    title: 'OKLab to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLab color space values to RGB format instantly.',
  },
  twitter: {
    title: 'OKLab to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLab color space values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
