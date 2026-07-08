import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Color Library - Free Online Color Tool',
  description: 'UI Color Library. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
