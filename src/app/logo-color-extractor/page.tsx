import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Logo Color Extractor - Free Online Color Tool',
  description: 'Logo Color Extractor. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
