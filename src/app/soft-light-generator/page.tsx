import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Soft Light Generator - Free Online Color Tool',
  description: 'Soft Light Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
