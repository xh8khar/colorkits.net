import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RAL Color Finder - Free Online Color Tool',
  description: 'RAL Color Finder. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
