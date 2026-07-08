import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Color Names Search - Free Online Color Tool',
  description: 'CSS Color Names Search. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
