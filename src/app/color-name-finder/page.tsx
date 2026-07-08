import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Name Finder - Free Online Color Tool',
  description: 'Color Name Finder. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
