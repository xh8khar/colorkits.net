import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Accent Color Finder - Free Online Color Tool | ColorKits',
  description: 'Find accent colors from images for your design projects. Free online image accent color finder for designers and developers. Extract complementary accent colors from any uploaded image.',
  keywords: ['image accent color finder', 'image accent color finder tool', 'image accent color finder online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Image Accent Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find accent colors from images for your design projects.',
  },
  twitter: {
    title: 'Image Accent Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find accent colors from images for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
