import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Instagram Colors - Free Online Color Tool',
  description: 'Instagram Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
