import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to OKLCH - Free Online Color Tool',
  description: 'RGB to OKLCH. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
