import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Text Gradient Generator - Free Online Color Tool',
  description: 'Text Gradient Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
