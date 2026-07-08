import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Neutral Color Library - Free Online Color Tool',
  description: 'Neutral Color Library. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
