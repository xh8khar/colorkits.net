import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Color Histogram - Free Online Color Tool',
  description: 'Image Color Histogram. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
