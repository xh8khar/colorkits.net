import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Microsoft Colors - Free Online Color Tool',
  description: 'Microsoft Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
