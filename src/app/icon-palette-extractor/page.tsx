import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Icon Palette Extractor - Free Online Color Tool',
  description: 'Icon Palette Extractor. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
