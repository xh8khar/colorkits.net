import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Random Color Generator - Free Online Color Tool',
  description: 'Random Color Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
