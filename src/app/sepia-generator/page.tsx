import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Sepia Generator - Free Online Color Tool',
  description: 'Sepia Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
