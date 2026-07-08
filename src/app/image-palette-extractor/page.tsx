import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Palette Extractor - Free Online Color Tool',
  description: 'Image Palette Extractor. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
