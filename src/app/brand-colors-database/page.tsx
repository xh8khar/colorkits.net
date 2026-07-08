import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brand Colors Database - Free Online Color Tool',
  description: 'Brand Colors Database. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
