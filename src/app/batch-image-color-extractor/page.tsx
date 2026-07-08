import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Batch Image Color Extractor - Free Online Color Tool',
  description: 'Batch Image Color Extractor. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
