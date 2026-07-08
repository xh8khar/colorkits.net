import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Apple Colors - Free Online Color Tool',
  description: 'Apple Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
