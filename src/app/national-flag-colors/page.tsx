import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'National Flag Colors - Free Online Color Tool',
  description: 'National Flag Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
