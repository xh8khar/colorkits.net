import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dominant Color Extractor - Free Online Color Tool',
  description: 'Dominant Color Extractor. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
