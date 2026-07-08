import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Premier League Colors - Free Online Color Tool',
  description: 'Premier League Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
