import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multiply Blend Generator - Free Online Color Tool',
  description: 'Multiply Blend Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
