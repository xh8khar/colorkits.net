import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HTML Named Colors - Free Online Color Tool',
  description: 'HTML Named Colors. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
