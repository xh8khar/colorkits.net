import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Discord Colors - Free Online Color Tool',
  description: 'Discord Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
