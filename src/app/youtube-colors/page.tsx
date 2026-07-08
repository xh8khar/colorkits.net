import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'YouTube Colors - Free Online Color Tool',
  description: 'YouTube Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
