import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Invert Color - Free Online Color Tool',
  description: 'Invert Color. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
