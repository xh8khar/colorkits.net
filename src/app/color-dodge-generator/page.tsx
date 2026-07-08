import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Dodge Generator - Free Online Color Tool',
  description: 'Color Dodge Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
