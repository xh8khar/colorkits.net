import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Hard Light Generator - Free Online Color Tool',
  description: 'Hard Light Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
