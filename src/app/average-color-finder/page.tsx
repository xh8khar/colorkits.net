import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Average Color Finder - Free Online Color Tool',
  description: 'Average Color Finder. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
