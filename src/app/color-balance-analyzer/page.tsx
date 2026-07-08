import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Balance Analyzer - Free Online Color Tool',
  description: 'Color Balance Analyzer. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
