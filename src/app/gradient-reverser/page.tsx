import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Reverser - Free Online Color Tool',
  description: 'Gradient Reverser. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
