import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'NBA Team Colors - Free Online Color Tool',
  description: 'NBA Team Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
