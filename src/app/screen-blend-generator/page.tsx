import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Screen Blend Generator - Free Online Color Tool',
  description: 'Screen Blend Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
