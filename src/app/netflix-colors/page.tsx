import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Netflix Colors - Free Online Color Tool',
  description: 'Netflix Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
