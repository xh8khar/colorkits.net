import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Exporter - Free Online Color Tool',
  description: 'Gradient Exporter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
