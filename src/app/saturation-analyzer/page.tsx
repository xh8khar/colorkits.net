import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Saturation Analyzer - Free Online Color Tool',
  description: 'Saturation Analyzer. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
