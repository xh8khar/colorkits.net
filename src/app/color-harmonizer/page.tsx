import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Harmonizer - Free Online Color Tool',
  description: 'Color Harmonizer. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
