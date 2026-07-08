import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Batch Color Converter - Free Online Color Tool',
  description: 'Batch Color Converter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
