import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brand Color Finder - Free Online Color Tool',
  description: 'Brand Color Finder. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
