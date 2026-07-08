import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brightness Analyzer - Free Online Color Tool',
  description: 'Brightness Analyzer. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
