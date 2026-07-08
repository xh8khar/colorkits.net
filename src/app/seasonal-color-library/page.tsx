import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Seasonal Color Library - Free Online Color Tool',
  description: 'Seasonal Color Library. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
