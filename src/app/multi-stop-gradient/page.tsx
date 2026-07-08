import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multi-stop Gradient - Free Online Color Tool',
  description: 'Multi-stop Gradient. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
