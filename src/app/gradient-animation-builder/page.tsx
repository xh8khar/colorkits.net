import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Animation Builder - Free Online Color Tool',
  description: 'Gradient Animation Builder. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
