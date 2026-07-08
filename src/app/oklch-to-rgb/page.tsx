import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLCH to RGB - Free Online Color Tool',
  description: 'OKLCH to RGB. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
