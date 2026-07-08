import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to OKLab Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to OKLab color space instantly. Free online RGB to OKLab converter for perceptually uniform color representation in modern web development.',
  keywords: ['rgb to oklab', 'rgb to oklab converter', 'rgb to oklab color', 'oklab color space', 'rgb converter'],
  openGraph: {
    title: 'RGB to OKLab Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to OKLab color space instantly.',
  },
  twitter: {
    title: 'RGB to OKLab Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to OKLab color space instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
