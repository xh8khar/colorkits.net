import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Conic Gradient Generator - Free Online Color Tool',
  description: 'Conic Gradient Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
