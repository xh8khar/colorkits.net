import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Country Flag Colors - Free Online Color Tool',
  description: 'Country Flag Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
