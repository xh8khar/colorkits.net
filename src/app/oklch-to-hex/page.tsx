import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLCH to HEX - Free Online Color Tool',
  description: 'OKLCH to HEX. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
