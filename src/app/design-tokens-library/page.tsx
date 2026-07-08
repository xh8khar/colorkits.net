import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Design Tokens Library - Free Online Color Tool',
  description: 'Design Tokens Library. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
