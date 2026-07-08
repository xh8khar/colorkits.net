import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'FIFA Team Colors - Free Online Color Tool',
  description: 'FIFA Team Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
